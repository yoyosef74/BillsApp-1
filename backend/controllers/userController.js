const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync')
const {promisify} = require('util');
const crypto= require('crypto')



const signToken = id => {
    return jwt.sign({_id:id},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN});
}

const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id);
//   const cookieOptions = {
//     Expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //Millisec
//     ),
//     httpOnly: true //browser will store it and send it with every req on the server
//   };
//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//   res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


exports.signup = async(req,res) => {
    try{
    const newUser = await User.create({name: req.body.name,
                                       email:req.body.email,
                                       password: req.body.password,
                                       passwordConfirm: req.body.passwordConfirm,
                                       passwordChangedAt: req.body.passwordChangedAt,
                                       commercialSub: req.body.commercialSub,
                                       commercialNum: req.body.commercialNum
                                    });
    createSendToken(newUser,201,res)
    }
    catch(err) {
        res.status(400).json({
            status:'fail',
            message: "An error has occured while creatin your account"
        })
    }
}

exports.login = async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email}).select("+password");
        if(!user) 
            throw new Error();
        if(!await user.correctPassword(req.body.password,user.password))
             throw new Error();
         createSendToken(user,200,res)

    }
    catch(err) {
        res.status(400).json({
             status:'fail',
            message: "AInvalid Email or Password",
        })
    }
}

exports.forgotPassword = catchAsync(async(req,res,next) => {
   //1 get user based on email
    const user = await User.findOne({email:req.body.email});
    if(!user)
    return next(new AppError('No such User',404));
    //2 Generate random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave: false}); //we modified the doc but didnt update it in DB SO we save it

    //3 send it to users email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}` // protocol https or http,
    const message = `Forgot Password, submit a patch request with ur new password and passwordConfirm to ${resetURL}. If this is not you, you can ignore this safely`
    try{
    await sendEmail({
        email:user.email,
        subject: 'Reset Password, (valid for 10 minutes)',
        message
    })
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email'
    })}
    //cannot send here the token or anyone can get it 
    catch(err) {
        user.passwordResetToken = undefined,
        user.passwordResetExpires = undefined
        await user.save({validateBeforeSave: false});
        console.log(err)
        return  next(new AppError('Error sending email, try again later',500));
    }
})

exports.resetPassword = catchAsync(async(req,res,next) => {
    //1 get user 
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({passwordResetToken: hashedToken, 
        passwordResetExpires :{$gt: Date.now()}
    })
    //2 set new password if user and token not expired
    if(!user)
        return next(new AppError('Invalid Token',400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const token =signToken(user._id);
    //Log in the user, send JWT
   createSendToken(user,200,res)
    //3 update the changedPasswordAt property , in model using middleware
})

exports.updatePassword = catchAsync(async(req,res,next) => {
    //1 get user
    //const user = req.user;
    const user = await User.findById(req.user.id).select('+password')
    //2 check if posted pass is correct
    const flag = await user.correctPassword(req.body.passwordCurrent,user.password)
    console.log(flag)
    if(!flag)
    return next(new AppError('Invalid Password',400));
    //3 if correct update
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    createSendToken(user,200,res);
});

exports.protect = catchAsync(async(req,res,next)=> {
    //1 get token, check id exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1] //to get token
    if(!token) {
        return next(new AppError('Please Login',401));
    }
    //2 verification token to make sure payload not changed(userid) or expired
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET); //??
    
    //3check if user still exists
    const freshUser = await User.findById(decoded._id)
    if(!freshUser)
        return next(new AppError('Account Deleted',401));
    //4 check if user changed pass after token was issued
    if(freshUser.changePasswordAfter(decoded.iat))
        return next(new AppError('User changed password, login again',401))
   //Grant access to protected route
   req.user = freshUser;
    next();
})