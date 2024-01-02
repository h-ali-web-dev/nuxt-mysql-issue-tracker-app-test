import { prisma } from "~/prisma/db";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import { addImage } from "~/server/sharp";

export default defineEventHandler(async (event) => {
  try {
    let imageData: Buffer | null = null;
    let fileName = randomUUID();
    const dataBody = await readMultipartFormData(event);
    const formVal = new FormData();

    dataBody?.forEach((item) => {
      if (item.name != "image") {
        formVal.append(item.name!, item.data.toString());
      } else {
        imageData = item.data.toString() == "null" ? null : item.data;
      }
    });

    if (imageData) {
      await addImage(imageData, fileName);
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(
      formVal.get("password")?.toString()!,
      salt
    );

    prisma.user
      .create({
        data: {
          email: formVal.get("email")?.toString()!,
          name: formVal.get("name")?.toString()!,
          password: hasedPassword,
          image: imageData ? fileName : null,
        },
      })
      .then((val) => console.log(`successfully added user ${val.id}`));
  } catch (error) {
    console.log(error);
    return error;
  }
});
