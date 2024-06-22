//employee signup
import Employee from "../../../models/Employee";
import conndb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const users =await Employee.findOne({emp_id:req.body.emp_id})
      if (users) {
        res.status(201).send({ success: true, data: users });
      }
      else {
        res.status(201).send({ success: false, error: "could not find employee" });
    }
    } catch (error) {
      res.status(400).send({ success: false, error: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
