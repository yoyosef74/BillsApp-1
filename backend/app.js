const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter')
const billsRouter = require('./routes/billsRouter')


const jsonwebtoken = require('jsonwebtoken');
const cors = require("cors");
app.use(express.json());
app.use(cors())
app.use('/api/v1/users',userRouter);
app.use('/api/v1/bills',billsRouter);


app.all('*',(req,res,next)=>{
    res.status(404).json({
      status: 'fail',
      message: `Cant find this URL on this server`
    })
})

module.exports = app;