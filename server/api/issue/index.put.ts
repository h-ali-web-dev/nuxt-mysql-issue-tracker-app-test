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

    let status: String | null = null;
    const stat = formVal.get("status")?.toString()!;

    if (stat) {
      if (stat == "OPEN") status = "OPEN";
      if (stat == "IN_PROGRESS") status = "IN_PROGRESS";
      if (stat == "CLOSED") status = "CLOSED";
    }
    const finalData: any = {};
    if (formVal.get("title")?.toString())
      finalData.title = formVal.get("title")?.toString();
    if (formVal.get("description")?.toString())
      finalData.title = formVal.get("description")?.toString();
    if (status) finalData.title = status;
    if (formVal.get("assignedToUserId")?.toString())
      finalData.title = formVal.get("assignedToUserId")?.toString();
    if (imageData) finalData.image = fileName;

    const issue = await prisma.issue.update({
      where: { id: parseInt(formVal.get("id")?.toString()!) },
      data: {
        title: formVal.get("title")?.toString()!,
        description: formVal.get("description")?.toString()!,
        //@ts-ignore
        status: status,
        assignedToUserId: formVal.get("assignedToUserId")?.toString()!,
        image: imageData ? fileName : null,
      },
    });

    return issue;
  } catch (error) {
    return error;
  }
});
