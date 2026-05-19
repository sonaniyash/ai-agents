import { z } from 'zod';
import { Annotation } from '@langchain/langgraph';

export const TaskSchema = z.object({
    file: z.string().describe("The file path relative to the project root, e.g., src/components/CarCard.tsx"),
    description: z.string().describe("A detailed description of what needs to be implemented in this file"),
    dependencies: z.array(z.string()).describe("Paths of other files that this file depends on and must be generated first")
});

export const PlanSchema = z.object({
    tasks: z.array(TaskSchema)
});

export type Plan = z.infer<typeof PlanSchema>;
export type Task = z.infer<typeof TaskSchema>;

export const GraphState = Annotation.Root({
    task: Annotation<Task>(),
    context: Annotation<string>(),
    currentCode: Annotation<string>(),
    errorMessage: Annotation<string>(),
    retries: Annotation<number>({
        reducer: (current, update) => current + update,
        default: () => 0,
    }),
    isValid: Annotation<boolean>({
        reducer: (state, update) => update,
        default: () => false
    })
});
