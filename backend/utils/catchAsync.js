module.exports = fn => { //Video 116
    return(req,res,next) => {
    fn(req,res,next).catch(err => next(err))
}}