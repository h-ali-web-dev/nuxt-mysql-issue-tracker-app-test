import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    let user;
    if (query.id) {
      const userId: string = query.id as string;
      user = await prisma.user.findFirst({ where: { id: userId } });
    } else {
      user = await prisma.user.findMany();
    }
    return user;
  } catch (error) {
    return error;
  }
});
