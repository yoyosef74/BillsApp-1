const AppError = require('../utils/AppError')

//Error Handlers
const handleCastErrorDB = (err)=>{
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Invalid token, please login again',401)

const handleJWTExpiredError = ()=> new AppError('Your token yas expired,please login again',401)

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; //regular expression to match field value entered which is between quotes
    console.log(value);
    const message = `Duplicate field value: ${value}. Please enter another value`;
    return new AppError(message, 400);
}
const handleValidationErrorDB = err=> {
    //get data from erros after seeing them in postman or console
    const errors = Object.values(err.errors).map(el => el.message); //get Errors 
    const message = `Invalid Input data ${errors.join('. ')}`;
    return new AppError(message, 400);

}
const sendErrorDev = (err,res) => {
     res.status(err.statusCode).json({
        status: err.status,
        error: err
        ,message: err.message,
        stack:err.stack
    })
}
const sendErrorProd = (err,res) => {
    //trusted errors Operational
    if(err.isOperational){
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
       
    })}
    //Programming or unknown err dont leak err details
    else {
        //1
       // console.error(err);
        //2 Send generic Message
        res.status(500).json({
            status:'error',
            message:'something went very wrong'
        })
    }
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if(process.env.NODE_ENV ==='development') {
         sendErrorDev(err,res)}
    else if(process.env.NODE_ENV === 'production') { 
        let error = {...err} //destructuring
        if(err.name ==='CastError')
            error = handleCastErrorDB(err);
        if(error.code === 11000) {
            error = handleDuplicateFieldsDB(err)
        }
        if(error._message === 'Tour validation failed') //try to find unique message/name/code when handling an error
            error = handleValidationErrorDB(err)
       
        if(error.name === 'JsonWebTokenError'){
            error = handleJWTError()
        }
        if(error.name === 'TokenExpiredError'){
            error = handleJWTExpiredError();
        }
         sendErrorProd(error,res);
    }
}
