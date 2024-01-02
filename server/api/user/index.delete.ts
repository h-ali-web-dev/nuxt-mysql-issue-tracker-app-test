import { prisma } from "~/prisma/db";
import { deleteImage } from "~/server/minio";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const userId: string = query.id as string;
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    if (user.image) {
      deleteImage(user.image);
    }
    return user;
  } catch (error) {
    console.log(error);

    return error;
  }
});
