 const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync')

 
 exports.getAllNormalActiveUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({ role: "user", active: true });
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  });

exports.getAllUsers = catchAsync(async(req,res,next)=> {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

exports.getAllNormalUsers = catchAsync(async(req,res,next)=> {
    const users = await User.find({role: 'user'});
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

exports.getAllUnactiveUsers = catchAsync(async(req,res,next)=> {
    const users = await User.find({active: false});
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

exports.getUser = catchAsync(async(req,res,next) => {
    const user = await User.findOne({_id: req.params.id});
     res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

exports.getMe = catchAsync(async(req,res,next) => {
    const user = await User.findOne({_id: req.user._id});
     res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

exports.deleteUser = catchAsync(async(req,res,next)=> {
    await User.deleteOne(req.body.id);
     res.status(200).json({
        status: 'success',
    })  
})
