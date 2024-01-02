import { getServerSession } from "#auth";
import { authOptions } from "../api/auth/[...]";
export default eventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  if (event.path.includes("/api/issue") && process.env.AUTH_BYPASS == "false") {
    if (!session) {
      throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
    }
  }
});
