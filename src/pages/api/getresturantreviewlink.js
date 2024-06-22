import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let {res_id}=req.body;
      const resturant=await Resturant.findOne({res_id:res_id});
      const link=resturant.reviewlink;
      res.status(200).json({success:true, link:link});
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
