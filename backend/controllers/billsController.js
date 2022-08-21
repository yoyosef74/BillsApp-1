const Bill = require("./../models/billsModel");
const multer = require("multer");
const XLSX = require("xlsx");

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();

    res.status(200).json({
      status: "success",
      results: bills.length,
      data: {
        bills: bills,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.uploadBill = async (req, res) => {
  try {
    const newBill = await Bill.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        bill: newBill,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.downloadBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        bill: bill,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.uploadXLSX = async (req, res, next) => {
  try {
    let path = req.file.path;
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "xml sheet has no data",
      });
    }
    let savedData = await Bill.create(jsonData, { validateBeforeSave: false });

    console.log(savedData);
    return res.status(201).json({
      success: true,
      message: savedData.length + " rows added to the database",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
exports.upload = multer({ storage: storage });
// app.post("/upload", upload.single("xlsx"), uploadXLSX);
