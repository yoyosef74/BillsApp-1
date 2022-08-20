const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  BILLER_CODE: {
    type: Number,
    required: [true, "A Bill must have a biller code"],
  },
  BILLER_NAME: {
    type: String,
    required: [true, "A bill must have a biller name"],
    trim: true,
  },
  BILL_NUMBER: {
    type: Number,
    required: [true, "A bill must have a bill number"],
    unique: true,
  },
  CUSTOMER_NAME: {
    type: String,
    required: [true, "A bill must have a customer name"],
  },
  NATIONAL_ID: {
    type: String,
    required: [true, "A bill must have a national id"],
  },
  MOBILE_NUMBER: {
    type: Number,
    required: [true, "A bill must have a mobile number"],
  },
  AMOUNT: {
    type: Number,
    required: [true, "A bill must have an amount"],
  },

  DUE_DATE: {
    type: Date,
  },

  EXPIRATION_DATE: {
    type: Date,
  },
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
