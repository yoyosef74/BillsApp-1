const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/AppError');
const path = require('path')
const cookieParser = require('cookie-parser')

var corsOptions = {
    origin: ['http://localhost:3000','http://10.140.173.14:9096'],
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
app.use(express.static(path.join(__dirname, 'build')))


app.use("/api/v1/users", userRouter);
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.all('*',(req,res,next)=>{
    
    next(new AppError(`Cant find ${req.params.originalUrl} on this server`,404));
})

app.use(globalErrorHandler)

module.exports = app;
