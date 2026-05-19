import OpenAI from 'openai';
import { z } from 'zod';

let openai: OpenAI;
let defaultModel: string;

export function initLLM(client: OpenAI, model: string) {
    openai = client;
    defaultModel = model;
}

export async function generateJSON<T>(prompt: string, schema: z.ZodType<T>): Promise<T> {
    if (!openai) throw new Error("LLM not initialized");

    const response = await openai.chat.completions.create({
        model: defaultModel,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message.content;
    if (!content) {
        throw new Error("Failed to get JSON response from OpenAI");
    }

    const parsed = JSON.parse(content);
    return schema.parse(parsed);
}

export async function generateCompletion(prompt: string, system?: string): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (system) {
        messages.push({ role: 'system', content: system });
    }

    messages.push({ role: 'user', content: prompt });

    if (!openai) throw new Error("LLM not initialized");

    const response = await openai.chat.completions.create({
        model: defaultModel,
        messages: messages,
    });

    return response.choices[0]?.message.content || '';
}
