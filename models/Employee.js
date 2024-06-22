
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    emp_id:{
        type:String,
        required:true,
    },
    res_id:{
        type:String,
        required:true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    upi_id: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
