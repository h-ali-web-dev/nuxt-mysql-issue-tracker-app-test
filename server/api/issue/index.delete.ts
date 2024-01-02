import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    //@ts-ignore
    const issueId = parseInt(query.id);
    const issues = await prisma.issue.delete({
      where: { id: issueId },
    });
    return issues;
  } catch (error) {
    console.log(error);

    return error;
  }
});
