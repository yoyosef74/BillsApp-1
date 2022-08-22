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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
// app.use(mongoSanitize());

app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/bills", billsRouter);

const multer = require("multer");
const Bill = require("./models/billsModel");

// const uploadXLSX = async (req, res, next) => {
//   try {
//     let path = req.file.path;
//     var workbook = XLSX.readFile(path);
//     var sheet_name_list = workbook.SheetNames;
//     let jsonData = XLSX.utils.sheet_to_json(
//       workbook.Sheets[sheet_name_list[0]]
//     );
//     if (jsonData.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "xml sheet has no data",
//       });
//     }
//     //TODO VALIDATIONS
//     let savedData = await Bill.create(jsonData, { validateBeforeSave: false });
//     return res.status(201).json({
//       success: true,
//       message: savedData.length + " rows added to the database",
//     });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// app.post("/upload", upload.single("xlsx"), uploadXLSX);



app.all('*',(req,res,next)=>{
    
    next(new AppError(`Cant find ${req.params.originalUrl} on this server`,404));
})

app.use(globalErrorHandler)

module.exports = app;
