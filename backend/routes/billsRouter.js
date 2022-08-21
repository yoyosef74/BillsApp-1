const express = require("express");
const router = express.Router();
const billController = require("./../controllers/billsController");

//app.post('/upload', upload.single('xlsx'), uploadXLSX);

router
  .route("/")
  .get(billController.getAllBills)
  .post(billController.upload.single("xlsx"), billController.uploadXLSX);
// .post(billController.upload.single('xlsx'), billController.uploadXLSX);

router
  .route("/:id")
  .get(billController.downloadBill)
  .delete(billController.deleteBill);
//router.post("/upload", upload.single("xlsx"), uploadXLSX);
module.exports = router;
