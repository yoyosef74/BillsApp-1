const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const billsRouter = require("./routes/billsRouter");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/AppError');
const cookieParser = require('cookie-parser')

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());



app.use("/api/v1/users", userRouter);
app.use("/api/v1/bills", billsRouter);


app.all('*',(req,res,next)=>{
    
    next(new AppError(`Cant find ${req.params.originalUrl} on this server`,404));
})

app.use(globalErrorHandler)

module.exports = app;
