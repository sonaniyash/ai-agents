import type { Plan } from '@shared/types';
import { PlanSchema } from '@shared/types';
import { generateJSON } from '@services/llm';

export async function planImplementation(spec: string): Promise<Plan> {
    const prompt = `
        You are an expert software architect.
        A user wants to build an application based on the following specification:

        <spec>
        ${spec}
        </spec>

        The target project is a React TypeScript application using Apollo Client and Material UI.
        Break down the implementation into a series of file creation/modification tasks.
        Order the tasks so that files are created AFTER their dependencies.
        
        Respond ONLY with a valid JSON object adhering to this structure:
        {
            "tasks": [
                {
                    "file": "string (The file path relative to the project root, e.g., src/components/CarCard.tsx)",
                    "description": "string (A detailed description of what needs to be implemented in this file)",
                    "dependencies": ["string"] (Paths of other files that this file depends on and must be generated first)
                }
            ]
        }
    `;

    const result = await generateJSON<Plan>(prompt, PlanSchema);
    return result;
}
