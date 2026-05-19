import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import { runAgent } from '@core/agent';
import { initLLM } from '@services/llm';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});
const DEFAULT_MODEL = process.env.MODEL_NAME || "gpt-4o-mini";

initLLM(openai, DEFAULT_MODEL);

const specPath = process.argv[2];
if (!specPath) {
  console.error("Usage: npm start <path-to-spec>");
  process.exit(1);
}

runAgent(specPath).catch((err: any) => {
  console.error("Agent failed:", err);
  process.exit(1);
});
