const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



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