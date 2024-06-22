import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let info = await Resturant.findOne({ res_id: req.body.res_id });
      if (info) {
        res.status(201).json({ success: true, data: info });
      } else {
        res.status(201).json({ success: false, data: "error token" });
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
