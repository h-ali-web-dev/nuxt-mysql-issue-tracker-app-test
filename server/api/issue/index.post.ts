import { prisma } from "~/prisma/db";
import { randomUUID } from "node:crypto";
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

    const stat = formVal.get("status")?.toString()!;
    let status = "OPEN";
    if (stat == "OPEN") status = "OPEN";
    if (stat == "IN_PROGRESS") status = "IN_PROGRESS";
    if (stat == "CLOSED") status = "CLOSED";

    const issue = await prisma.issue.create({
      data: {
        title: formVal.get("title")?.toString()!,
        description: formVal.get("description")?.toString()!,
        //@ts-ignore
        status: status,
        assignedToUserId: formVal.get("assignedToUserId")?.toString()!,
        image: imageData ? fileName : null,
      },
    });
    console.log(`successfully added issue ${issue.id}`);
    return issue;
  } catch (error) {
    console.log(error);
    return error;
  }
});
