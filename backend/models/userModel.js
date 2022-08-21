const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto= require('crypto')
      

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,"Please enter the merchant's name"]                              
    },
    commercialSub: {
        type: Number,
        required: true,
        unique: true,
    },
     commercialNum: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
         type: String,
         required:[true,'Please enter an email'],
         unique: true,
         lowercase: true,
         validate: [validator.isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordChangedAt: Date,
    passwordConfirm: {
        type: String,
        required:[true,'Please confrim your password'],
        validate: {
            //This works only on SAVE and Create!
            validator: function(el) {
                return el === this.password;
            },
            message:'Passwords do not match'
        }
    },
    active: {
        type: Boolean,
        default:false,
        select:false
    },
    passwordResetToken: String,
    passwordResetExpires: Date
})

//middlewares
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')) 
        return next();//if password not modified
    //hash pass with cost of 12
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
})

//instance methods

userSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken =  crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() +10*60*1000;
    return resetToken;
}

userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt){
        return JWTTimestamp < parseInt(this.passwordChangedAt.getTime()/1000,10);
        
    }
    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User;