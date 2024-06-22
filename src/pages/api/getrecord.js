//record
import Record from "../../../models/Record";
import conndb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const key = req.body.key;
      
      const key_check = await Record.findOne({ key: key });
      res.status(201).send({ success: true, data: key_check });
    
    } catch (error) {
      res.status(400).send({ success: false, error: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
