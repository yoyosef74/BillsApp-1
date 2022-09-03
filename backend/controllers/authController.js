const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync')
const {promisify} = require('util');
const crypto= require('crypto')
const Email = require('../utils/email')



const signToken = id => {
    return jwt.sign({_id:id},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN});
}

const createSendToken = (user,statusCode,res) => {
    
    const token = signToken(user._id);
    const cookieOptions = {
    Expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //Millisec
    ),
    withCredentials: true,
    httpOnly: true //browser will store it and send it with every req on the server
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

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

exports.sendActivationEmail = catchAsync(async(req,res,next) => {
    const newUser = await User.findOne({email:req.body.email});
    if(!newUser)
        return next(new AppError('User not found, Incorrect Email',400))
    const activateToken = newUser.createActivationToken();
    await newUser.save({validateBeforeSave: false}); //we modified the doc but didnt update it in DB SO we save it

    //3 send it to users email
    const activateURL = `${req.protocol}://localhost:3000/activate/${activateToken}/${newUser._id}` // protocol https or http,
    const message = `Congratulations, we have revised your data and it appears to be genuine. Please click on this link ${activateURL} to activate your account`
    try{
      await new Email(newUser,activateURL).sendWelcome()
    // await sendEmail({
    //     email:newUser.email,
    //     subject: 'Aman Account Activation',
    //     message
    // })
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email'
    })}
    //cannot send here the token or anyone can get it 
    catch(err) {
        newUser.activateToken = undefined
        await newUser.save({validateBeforeSave: false});
        console.log(err)
        return  next(new AppError('Error sending email, try again later',500));
    }
})

exports.activateAccount = catchAsync(async(req,res,next)=> {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log(hashedToken)
    const user = await User.findOne({activationToken: hashedToken})
    //2 set new password if user and token not expired
    if(!user)
        return next(new AppError('Invalid Token',400));
    //const token =signToken(user._id);
    //Log in the user, send JWT
    user.active = true;
    user.emailVerified = true;
    //TODO send to the API of AMAN the new USER
    await user.save({validateBeforeSave: false});
    createSendToken(user,200,res)
})
exports.signup = catchAsync(async(req,res) => {
    let user = await User.findOne();
    let val;
    if(req.body.role === 'user')
    while(user) 
    {
        val = Math.floor(1000+Math.random()*9000);
        val ='90' + val;
        console.log(val);
        user = await User.findOne({billerCode: val})
    }
    const newUser = await User.create({name: req.body.name,
                                       email:req.body.email,
                                       password: req.body.password,
                                       passwordConfirm: req.body.passwordConfirm,
                                       passwordChangedAt: req.body.passwordChangedAt,
                                       commercialSub: req.body.commercialSub,
                                       commercialNum: req.body.commercialNum,
                                       role: req.body.role,
                                       billsCycle: req.body.billsCycle,
                                       reportsCycle: req.body.remindersCycle,
                                       billerCode: val
                                    });
   createSendToken(newUser,201,res)
})

exports.login = catchAsync(async(req,res,next) => {
        const user = await User.findOne({email:req.body.email}).select("+password");
        if(!user) 
            return next(new AppError('Invalid Email or Password',400))
        if(!await user.correctPassword(req.body.password,user.password))
             return next(new AppError('Invalid Email or Password',400))
      
        // if(user.active === false)
        // return next(new AppError('User not Activated yet, please wait and we will revise your data and respond as soon as possible',400))
         createSendToken(user,200,res)

    
})

exports.forgotPassword = catchAsync(async(req,res,next) => {
   //1 get user based on email
    const user = await User.findOne({email:req.body.email});
    if(!user)
    return next(new AppError('No such User',404));
    //2 Generate random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave: false}); //we modified the doc but didnt update it in DB SO we save it

    //3 send it to users email
    const resetURL = `${req.protocol}://localhost:3000/resetPassword/${resetToken}` // protocol https or http,
    // const message = `Forgot Password, submit a patch request with ur new password and passwordConfirm to ${resetURL}. If this is not you, you can ignore this safely`
    try{
        await new Email(user,resetURL).sendPasswordReset()
    // await sendEmail({
    //     email:user.email,
    //     subject: 'Reset Password, (valid for 10 minutes)',
    //     message
    // })
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
    });
    console.log('Here!!@')
    //2 set new password if user and token not expired
    if(!user)
        return next(new AppError('Invalid Token',400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    // const token =signToken(user._id);
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
    else if(req.cookies.jwt)
      token = req.cookies.jwt;
    if(!token) {
        return next(new AppError('Please Login',401));
    }
    // console.log(req)
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


exports.protect2 = catchAsync(async(req,res,next)=> {
    //1 get token, check id exists
    let token;
    if(req.headers.authorization)
            token = req.headers.authorization //to get token
     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    //  console.log(hashedToken)
    const freshUser = await User.findOne({activationToken:hashedToken})
    if(!freshUser)
        return next(new AppError('Invalid Token',401));
        console.log(freshUser)
   //Grant access to protected route
   req.user = freshUser;
    next();
})
exports.restrictToAdmin = catchAsync(async(req,res,next)=>{
   
    if(req.user.role !=='admin')
        return next(new AppError('Unauthorized Access, You are not an Admin',400))
    next();
});

exports.restrictToAdminAndFinance = catchAsync(async(req,res,next)=>{
   
    if(req.user.role ==='user')
        return next(new AppError('Unauthorized Access, You are not an Admin or a Financial User',400))
    next();
});

exports.restrictToFinance = catchAsync(async (req, res, next) => {
     console.log(req.user.email)
    if (req.user.role !== "financial-user")
      return next(new AppError("Unauthorized Access", 400));
    next();
  });
  

///WARNING!!!!!!!!///
//DANGEROUS ZONE!!!! ONLY RUN ONCE AT FIRST, IT'LL CHANGE ALL USER EMAILS AND PASSWORDS!!!!/////
exports.setDefaultCredentialsForEnrolledUsers = catchAsync(async(req,res,next)=> { 
    const users = await User.find({role:'user'});
    users.forEach(async(el) => {
        el.email = el.name+ "" + el.billerCode + "@billsApp.com";
        el.email = el.email.replaceAll(' ','-')
        console.log("after: ",el.email)
        el.password = el.billerCode + "000";
        el.passwordConfirm = el.billerCode + "000";
        await el.save();
    })
    res.status(200).json({
            message: "success"
        })
})

exports.updateEmailAfterFirstLogin = catchAsync(async(req,res,next)=>{
    //getUser and set OTP/OTP Expiration Time
     let OTP = Math.floor(1000+Math.random()*9000);
     let OTPExpirationTime = Date.now() + 5*1000; //miliseconds
     const user = req.user
     user.email = req.body.email;
     user.OTP = OTP;
     user.OTPExpirationTime =OTPExpirationTime
     await user.save({validateBeforeSave:false});

     //send OTP to email
     try{

        await new Email(user,OTP).sendOTP()
    // await sendEmail({
    //     email:user.email,
    //     subject: 'Verify Email, (valid for 5 minutes)',
    //     message: `Your OTP code is ${OTP}`
    // })
    res.status(200).json({
        status: 'success',
        message: 'OTP sent to email'
    })}
    catch(err) {
        user.OTP = undefined,
        user.OTPExpirationTime = undefined
        await user.save({validateBeforeSave: false});
        return  next(new AppError('Error sending email, try again later',500));
    }
});

exports.verifyEmailAfterFirstLogin = catchAsync(async(req,res,next)=>{
     const user = req.user
     if(req.body.OTP*1 !== user.OTP*1 || Date.now()>user.OTPExpirationTime)
        return next(new AppError('Invlid OTP',400))
    user.emailVerified= true,
     await user.save({validateBeforeSave:false});
     res.status(200).json({
        status: 'success',
        message: 'Email Verified, You can now use our service'
    })
});

// exports.isVerifiedAndActive = catchAsync(async(req,res,next)=>{
//     if(!req.user.emailVerified || !req.user.active)
//         return next(new AppError('Account not yet Activated or email not yet verified',400));
// })