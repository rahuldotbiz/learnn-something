import { createTRPCRouter } from "./trpc";
import { airTableRouter } from "./routers/airtable";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  airtable: airTableRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
