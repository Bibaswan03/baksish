import nodemailer from 'nodemailer';

const handler = async (req,res)=>{
    try{
            console.log(req.body);
        const {from_name,from_email,message} = req.body;
      
        const transporter = nodemailer.createTransport({
          service: "gmail",
      
          auth: {
            user: "baksish247@gmail.com",
            pass: process.env.NEXT_PUBLC_NODEMAILER_APP_KEY,
          },
        });
        
        const info = await transporter.sendMail({
          from: '"Baksish" ', // sender address
          to: "baksish247@gmail.com", // receiver
          subject: "Client Message", // Subject line
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
                <h1>New contact request from client</h1>
            </div>
            <div class="content">
                <p>New message through website contact form ,</p>
                <p><strong>Name:</strong> ${from_name}</p>
                <p><strong>Email:</strong> ${from_email}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>Thank you for your excellent service!</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Baksish. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `, // html body
        });
        res.status(200).json({success: true});
      }
      catch(e){
        res.status(201).json({success: false});
        console.log(e)
      }
}
export default handler;