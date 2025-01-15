import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://MedAnalyzr_owner:Ypm2gEQAMnj9@ep-soft-king-a1nrtis2.ap-southeast-1.aws.neon.tech/MedAnalyzr?sslmode=require"
);
export const db = drizzle(sql, { schema });
