import Resturant from "../../../models/Resturant";
import Employee from "../../../models/Employee";
import conndb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method == "POST") {
    const id=req.body.id;
    const name=req.body.name;
    try {
      const resturant=await Resturant.findOne({res_id:id});
      if(resturant){
      if(resturant.name==name)
        {
            const users=await Employee.find({res_id:id})
            if(users.length>0){
            res.status(201).json({success:true, data:users})
            }
            else
            {
                res.status(201).json({success:false , error:"no employees enrolled"})
            }
        }
      else{
        res.status(201).json({success:false , error:"error in request"})
      }
    }
    else
    {
        res.status(201).json({success:false , error:"error in request"})
    }
    } catch (err) {
      res
        .status(400)
        .json({ success: false, error: err, data: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
