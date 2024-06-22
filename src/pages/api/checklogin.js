import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const encrypted_token = req.body.token;
    try {
      const token = CryptoJS.AES.decrypt(
        encrypted_token,
        process.env.CRYPTO_SECRET
      ).toString(CryptoJS.enc.Utf8);
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (decode) {
        let useremail = decode.email;
        let userinfo = await Resturant.findOne({ email: useremail });
        if (userinfo) {
          if (userinfo.name === decode.name) {
            res.status(201).json({ success: true, data: "valid login" , resturant:userinfo});
          } else {
            res.status(201).json({ success: false, data: "error token" });
          }
        } else {
          res.status(201).json({ success: false, data: "error token" });
        }
      } else {
        res.status(201).json({ success: false, data: "error token" });
      }
    } catch (err) {
      res
        .status(201)
        .json({ success: false, error: err, data: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
