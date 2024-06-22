
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    key:{
      type:String,
      required:true
    },
    last_res_id:{
        type:Number,
        required:true,
    },
    last_emp_id:{
        type:Number,
        required:true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Record || mongoose.model("Record", recordSchema);
