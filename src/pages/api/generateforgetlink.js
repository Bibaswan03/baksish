import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
        const u = await Resturant.findOne({ email: req.body.email });
        if(u)
          {
            const token = jwt.sign(
              { email: req.body.email, time: Date.now().toString() },
              process.env.JWT_SECRET
            );
            res.status(200).json({ success: true, token: token , name:u.name});      
          }
          else
          {
            res.status(201).json({success:false, error:"email not registered"})
          }
    } catch (e) {
      res.status(400).json({ login: false, data: "error occured" });
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
