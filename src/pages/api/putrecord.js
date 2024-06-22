//record
import Record from "../../../models/Record";
import conndb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
        
        const key=req.body.key;
        const u = new Record({
            key: key,
            last_res_id:1,
            last_emp_id:1
          });
    
          const u1 = await u.save();
      res.status(201).send({ success: true, data: u1 });
    
    } catch (error) {
      res.status(400).send({ success: false, error: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
