
const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema(
  {
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
    password:{
        type: String,
      required: true,
    },
    city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      reviewlink:{
        type:String,
        default:"https://search.google.com/local/writereview?placeid="
      },
      verified:{
        type:Boolean,
        default:false
      }
  },
  { timestamps: true }
);

export default mongoose.models.Resturant || mongoose.model("Resturant", resturantSchema);
