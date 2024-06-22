//resturant signup
import Resturant from "../../../models/Resturant";
import conndb from "../../../middleware/mongoose";
import nodemailer from "nodemailer"
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { res_id, name, email, phone, password, state, city } = req.body;

      const email_check = await Resturant.findOne({ email: req.body.email });
      const phone_check = await Resturant.findOne({ phone: phone });
      const resid_check = await Resturant.findOne({ res_id: res_id });
      if (email_check) {
        if (email_check.email == req.body.email) {
          res.status(201).send({ success: false, error: 101 });
        }
      } else if (phone_check) {
        if (phone_check.phone == phone) {
          res.status(201).send({ success: false, error: 102 });
        }
      } else if (resid_check) {
        if (resid_check.res_id == res_id) {
          res.status(201).send({ success: false, error: 103 });
        }
      } else {
        const password_encrypted = CryptoJS.AES.encrypt(
          password,
          process.env.CRYPTO_SECRET
        ).toString();

        const u = new Resturant({
          res_id: res_id,
          name: name,
          email: email,
          phone: phone,
          password: password_encrypted,
          city: city,
          state: state,
        });

        const u1 = await u.save();
        const transporter = nodemailer.createTransport({
          service: "gmail",

          auth: {
            user: "baksish247@gmail.com",
            pass: process.env.NEXT_PUBLC_NODEMAILER_APP_KEY,
          },
        });

        const info = await transporter.sendMail({
          from: '"Baksish" ', // sender address
          to: email, // receiver
          subject: "Congratulations on Onboarding", // Subject line
          html: `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f8f9fa;
              color: #333;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 10px 0;
          }
          .header h1 {
              margin: 0;
              color: #0a0a0a;
          }
          .content {
              margin: 20px 0;
          }
          .content p {
              line-height: 1.6;
          }
          .footer {
              text-align: center;
              padding: 20px 0;
              font-size: 0.9em;
              color: #777;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Welcome to Baksish!</h1>
          </div>
          <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Congratulations and welcome to <strong>Baksish</strong>!<br/> We are thrilled to have you on board.</p>
              <p>At <strong>Baksish</strong>, we aim to enhance the tipping experience for both customers and staff. As part of our community, you'll enjoy:</p>
              <ul>
                  <li>Seamless tipping processes</li>
                  <li>Increased customer satisfaction</li>
                  <li>Boosted tips for your hardworking staff</li>
              </ul>
              <p>To get started, log in to your account and complete your profile. This will help us tailor our services to better meet your needs. If you have any questions or need assistance, our support team is here to help you at any time.</p>
              <p>We look forward to a successful partnership and helping your restaurant thrive!</p>
              <p>Best regards,<br>
              Team Baksish<br>
              <a href="mailto:baksish247@gmail.com">baksish247@gmail.com</a><br>
              <a href="https://tipppz.vercel.app">https://tipppz.vercel.app</a></p>
          </div>
          <div class="footer">
              <p>&copy; 2024 Baksish. All rights reserved.</p>
          </div>
      </div>
  </body>
</html>
  `, // html body
        });
        res.status(201).send({ success: true, data: u1 });
      }
    } catch (error) {
      res.status(400).send({ success: false, error: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
