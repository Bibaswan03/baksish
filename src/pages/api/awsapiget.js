import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const key = req.body.key;
    
    try {
      const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
      });

      const getObjectURL = async (key) => {
        const command = new GetObjectCommand({
          Bucket: "tipppz-emp-photos",
          Key: `${key}.jpg`,
        });
        const url = await getSignedUrl(s3Client, command);
        return url;
      };
      const get_url = await getObjectURL(key);
      if (get_url) {
        res.status(201).json({ success: true, url: get_url });
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
