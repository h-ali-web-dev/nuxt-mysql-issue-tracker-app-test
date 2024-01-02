import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    let issue;
    if (query.id) {
      const issueId: number = parseInt(query.id as string);
      issue = await prisma.issue.findFirst({
        where: { id: issueId },
        include: { assignedToUser: { select: { name: true, image: true } } },
      });
    } else {
      issue = await prisma.issue.findMany({
        include: { assignedToUser: { select: { name: true, image: true } } },
      });
    }
    return issue;
  } catch (error) {
    return error;
  }
});
