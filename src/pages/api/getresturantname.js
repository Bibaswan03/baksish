//resturant
import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {   
      const res_account = await Resturant.find({ res_id: req.body.key });
      const data={
        id:res_account[0].res_id,
        name:res_account[0].name
      }
      if(data){
      res.status(201).send({ success: true, data: data });
      }
      else
      {
        res.status(201).send({ success: false, error: "data not found" });
      }
    
    } catch (error) {
      res.status(400).send({ success: false, error: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
