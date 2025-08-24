import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema.ts",
  driver: "expo",
  out: "./db/migrations",
  /* dbCredentials: {
    url: "testdb", 
  }, */
});

