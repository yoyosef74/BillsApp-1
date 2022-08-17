const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
      

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

const User = mongoose.model('User', userSchema);
module.exports = User;