import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const userId: string = query.id as string;
    const body = await readBody(event);
    const user = await prisma.user.update({
      where: { id: userId },
      data: body,
    });
    return user;
  } catch (error) {
    return error;
  }
});
