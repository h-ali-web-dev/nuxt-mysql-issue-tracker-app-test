import sharp from "sharp";
import { storeImage } from "./minio";

export async function addImage(data: Buffer, fileName: string) {
  await sharp(data)
    .resize(100, 100, { fit: "cover" })
    .jpeg()
    .toBuffer()
    .then(async (data) => {
      data = data;
      await storeImage(data, fileName);
    });
}
