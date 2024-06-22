//employee signup
import Employee from "../../../models/Employee";
import conndb from "../../../middleware/mongoose";
import nodemailer from "nodemailer";
import Resturant from "../../../models/Resturant";
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { emp_id, res_id, name, email, phone, upi_id, photo } = req.body;
      const resturant = await Resturant.findOne({ res_id });
      
      const email_check = await Employee.findOne({ email: req.body.email });
      const phone_check = await Employee.findOne({ phone: phone });
      const empid_check = await Employee.findOne({ emp_id: emp_id });

      if (email_check) {
        if (email_check.email == req.body.email) {
          res.status(201).send({ success: false, error: 101 });
          return;
        }
      } else if (phone_check) {
        if (phone_check.phone == phone) {
          
          res.status(201).send({ success: false, error: 102 });
          return;
        }
      } else if (empid_check) {
        if (empid_check.emp_id == emp_id) {
          res.status(201).send({ success: false, error: 102 });
          return
        }
      } else {
        const u = new Employee({
          emp_id: emp_id,
          res_id: res_id,
          name: name,
          email: email,
          phone: phone,
          upi_id: upi_id,
          photo: photo,
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
          subject: "Congratulations!", // Subject line
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
              <p>Dear <strong>${name||""}</strong>,</p>
              <p>Congratulations! You have been onboarded to <strong>Baksish</strong> by ${resturant.name}. We are thrilled to have you as part of our community.</p>
              <p>Please verify your details :<br>
                  <strong>Name : ${name||""}</strong><br>
                  <strong>Phone no. : ${phone||""}</strong><br>
                  <strong>UPI id : ${upi_id||""}</strong><br>
              </p>
              <p>For any query or change of your personal information , feel free to contact us at <a href="mailto:baksish247@gmail.com">baksish247@gmail.com<a/></p>
              <br><p>At <strong>Baksish</strong>, our mission is to make tipping easier and more rewarding for dedicated professionals like you. As a member of our platform, you will benefit from:</p>
              <ul>
                  <li>Seamless and quick tipping from satisfied customers</li>
                  <li>Increased earnings and recognition for your hard work</li>
                  <li>Enhanced customer interactions</li>
              </ul>
              <br/>
              <p>We look forward to supporting you and watching your success grow with Baksish!</p>
              <p>Best regards,<br>
              Team Baksish<br>
              Baksish<br>

          </div>
          <div class="footer">
              <p>&copy; 2024 Baksish. All rights reserved.</p>
          </div>
      </div>
  </body>
</html>
`,
        });
        
        res.status(201).send({ success: true, data: u1 });
      }
    } catch (error) {
      
      res.status(201).send({ success: false, error: "error occured" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};
export default conndb(handler);
