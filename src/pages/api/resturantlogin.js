import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let u;
      if (req.body.email.length > 0) {
        u = await Resturant.findOne({ email: req.body.email });
        try {
          if (u) {
            if (
              req.body.email == u.email &&
              req.body.password ==
                CryptoJS.AES.decrypt(
                  u.password,
                  process.env.CRYPTO_SECRET
                ).toString(CryptoJS.enc.Utf8)
            ) {
              var token = jwt.sign(
                { email: u.email, name: u.name },
                process.env.JWT_SECRET
              );
              let encrypted_token = CryptoJS.AES.encrypt(
                token,
                process.env.CRYPTO_SECRET
              ).toString();
    
              res.status(200).json({ success: true, token: encrypted_token });
            } else {
              res
                .status(400)
                .json({
                  success: false,
                  registered: true,
                  error: "Invalid credentials",
                });
            }
          } else {
            res
              .status(400)
              .json({
                success: false,
                registered: false,
                error: "Resturant not registered",
              });
          }
        } catch (error) {
          res
          .status(500)
          .json({
            success: false,
            error: error,
          });
        }
      } else if(req.body.phone.length > 0){
        u = await Resturant.findOne({ phone: req.body.phone });
        try {
          if (u) {
            if (
              req.body.phone == u.phone &&
              req.body.password ==
                CryptoJS.AES.decrypt(
                  u.password,
                  process.env.CRYPTO_SECRET
                ).toString(CryptoJS.enc.Utf8)
            ) {
              var token = jwt.sign(
                { email: u.email, name: u.name },
                process.env.JWT_SECRET
              );
              let encrypted_token = CryptoJS.AES.encrypt(
                token,
                process.env.CRYPTO_SECRET
              ).toString();
    
              res.status(200).json({ success: true, token: encrypted_token });
            } else {
              res
                .status(400)
                .json({
                  success: false,
                  registered: true,
                  error: "Invalid credentials",
                });
            }
          } else {
            res
              .status(400)
              .json({
                success: false,
                registered: false,
                error: "Resturant not registered",
              });
          }
        } catch (error) {
          res
              .status(500)
              .json({
                success: false,
                error: error,
              });
        }
      }
      

      
    } catch (e) {
      res.status(400).json({ login: false, data: "error occured" });
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
