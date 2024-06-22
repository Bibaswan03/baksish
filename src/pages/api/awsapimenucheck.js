import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const key = req.body.key;
    
    try {
      const s3 = new S3Client({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
      });
      const params = {
        Bucket: "tipppz-res-menu",
        Key: `${key}.pdf`,
      };
      
      await s3.send(new HeadObjectCommand(params));
      
      res.status(201).json({ success: true });
    } catch (error) {
      if (error.name === "NotFound") {
        return res.status(201).json({ success: false , error:"Key Not Found"});
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Error checking key" });
      }
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};

export default handler;
