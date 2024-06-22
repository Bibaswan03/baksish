import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { email, password, newpassword } = req.body;
    //console.log(req.body);
    //console.log({ email, password, newpassword });
    try {
      const u = await Resturant.findOne({ email: email });
      try {
        if (
          password ==
          CryptoJS.AES.decrypt(u.password, process.env.CRYPTO_SECRET).toString(
            CryptoJS.enc.Utf8
          )
        ) {
          const encrypted_newpassword = CryptoJS.AES.encrypt(
            newpassword,
            process.env.CRYPTO_SECRET
          ).toString();
          //console.log("encryot : ", encrypted_newpassword);
          const u1 = await Resturant.findOneAndUpdate(
            { email: email },
            {
              password: encrypted_newpassword,
            }
          );
          res.status(200).json({ success: true });
        } else {
          res.status(201).json({
            success: false,
            error: "Current password incorrect",
          });
        }
      } catch (error) {
        res.status(401).json({
          success: false,
          error: "Unexpected error occured",
        });
      }
    } catch (e) {
      res
        .status(402)
        .json({ success: false, error: "Unexpected error occured" });
    }
  } else {
    res.status(403).send({ error: "error method" });
  }
};
export default conndb(handler);
