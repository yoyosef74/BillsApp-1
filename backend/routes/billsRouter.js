const express = require("express");
const router = express.Router();

const billController = require("./../controllers/billController");

//app.post('/upload', upload.single('xlsx'), uploadXLSX);

router
  .route("/")
  .get(billController.getAllBills)
  .post(billController.uploadBill);
// .post(billController.upload.single('xlsx'), billController.uploadXLSX);

router
  .route("/:id")
  .get(billController.downloadBill)
  .delete(billController.deleteBill);

module.exports = router;
