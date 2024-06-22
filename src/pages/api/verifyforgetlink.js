import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
        const token=req.body.token;
        const newpassword=req.body.password;
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const diff=parseInt(Date.now())-decode.time;
        if (decode && diff<=900000){    
            const encrypted_newpassword = CryptoJS.AES.encrypt(
                newpassword,
                process.env.CRYPTO_SECRET
              ).toString();
              //console.log("encryot : ", encrypted_newpassword);
              const u1 = await Resturant.findOneAndUpdate(
                { email: decode.email },
                {
                  password: encrypted_newpassword,
                })
            res.status(200).json({ success: true});      
          }
          else
          {
            res.status(201).json({success:false , error:"link expired"})
          }
    } catch (e) {
      res.status(400).json({ login: false, data: "error occured" });
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
