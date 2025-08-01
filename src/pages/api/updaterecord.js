//record
import Record from "../../../models/Record";
import conndb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
        
        const key=req.body.key;
        const u = await Record.findOneAndUpdate({ key: key },
            { $set: { last_res_id: req.body.last_res_id , last_emp_id: req.body.last_emp_id} },
            { returnNewDocument : true })
          
      res.status(201).send({ success: true, data: u });
    
    } catch (error) {
      res.status(400).send({ success: false, error: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
