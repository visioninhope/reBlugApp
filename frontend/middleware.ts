import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/freetrials",
    "/contact",
    "/email",
    "/agency",
    "/testdynamo",
    "/influenzas",
    "/marketplace",
    "/api/chat_bot",
    "/api/trendToolsAI",
    "/api/aiTools",
    "/api/email-parser",
    "/testTrial",
    "/api/chat/route",
    "/tools",
    "/api/email/test-email",
    "/api/email/email-template",
    "/api/email/prospectTemplate",
    "/api/email/emailLogic",
    "/api/emailfiles",
    "/emailTest",
    "/api/chatbot-opened",
    "/api/chat",
    "/component/waitingList",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
