import Transaction from "../../../models/Transaction";
import conndb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let {orderId,name,email,phone,description,amount,emp_id,res_id}=req.body;
      const u=new Transaction({
        orderId:orderId,
        name:name,
        email:email,
        phone:phone,
        description:description,
        amount:amount,
        emp_id:emp_id,
        res_id:res_id
      });
      const u1=await u.save();
      res.status(200).json({success:true});
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
