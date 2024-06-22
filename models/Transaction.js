
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    orderId:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true
    },
    description:{
      type:String,
      default:"Have a good day."
    },
    paymentId:{
      type:String,
      default:""
    },
    amount:{
      type:String,
      required:true
    },
    emp_id:{
      type:String,
      required:true
    },
    res_id:{
      type:String,
      required:true
    },
    paymentstatus:{
        type:String,
        default:"Initiated"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
