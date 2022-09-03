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
        required: this.role==='user'?true:false,
        unique: this.role==='user'?true:false,
    },
     commercialNum: {
        type: Number,
        required: this.role==='user'?true:false,
        unique: this.role==='user'?true:false,
    },
    email: {
         type: String,
         required:[true,'Please enter an email'],
         unique: true,
         lowercase: true,
         validate: [validator.isEmail,'Please enter a valid email'],
         trim: true
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
    billsCycle: {
        type:String,
        enum:['monthly','weekly','quarterly'],
        default: 'monthly'  
    },
    reportsCycle : {
        type:String,
        enum:['monthly','weekly','quarterly'],
        default: 'monthly'  
    },
    role: {
        type:String,
        enum:['user','admin','financial-user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
    CCFLAG: {
        type: String,
        default: "n"
    },
    PPFLAG: {
        type: String,
        default: "n"
    },
    IRFLAG: {
        type: String,
        default: "n"
    },
    OTPFLAG: {
        type: String,
        default: "n"
    },
    billerCode: {
        type: Number,
        default: 90999
    },
    emailVerified : {
        type: Boolean,
        default:false},
    OTP :Number,
    OTPExpirationDate: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    activationToken: String
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
userSchema.pre('save',async function(next) {
    if(this.role !== 'user') this.active = true;
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
userSchema.methods.createActivationToken = function() {
    const activateToken = crypto.randomBytes(32).toString('hex');
    this.activationToken =  crypto.createHash('sha256').update(activateToken).digest('hex');
    return activateToken;
}

userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt){
        return JWTTimestamp < parseInt(this.passwordChangedAt.getTime()/1000,10);
        
    }
    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User;