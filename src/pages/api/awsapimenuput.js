import { S3Client, GetObjectCommand , PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const key = req.body.key;
    const type = req.body.type;
    
    try {
      const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
      });

      const putObjectURL = async (key,type) => {
        const command =new PutObjectCommand({
          Bucket: "tipppz-res-menu",
          Key: `${key}.pdf`,
          ContentType: type,
        });
        const url=await getSignedUrl(s3Client,command);
        return url;
      };
      const put_url=await putObjectURL(key,type);
      
      if (put_url) {
        res.status(201).json({ success: true, url: put_url });
      } else {
        res.status(201).json({ success: false, error: "error occured" });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: "error occured in try" });
    }
  } else {
    res.status(201).send({ success: false, error: "error method" });
  }
};

export default handler;
