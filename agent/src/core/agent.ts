import fs from 'fs/promises';
import path from 'path';

import { planImplementation } from '@core/planner';
import { app } from '@core/workflow';
import { TARGET_DIR } from '@config/constants';

export async function runAgent(specPath: string) {
    const spec = await fs.readFile(specPath, 'utf-8');
    console.log("Loaded spec, generating plan...");

    const plan = await planImplementation(spec);
    console.log("Plan generated with", plan.tasks.length, "tasks:");
    plan.tasks.forEach((t, i) => console.log(` ${i + 1}. ${t.file}`));

    const contextFiles = new Map<string, string>();

    // Execute each task sequentially using the LangGraph state machine
    for (const task of plan.tasks) {
        console.log(`\n===========================================`);
        console.log(`Starting LangGraph execution for task: ${task.file}`);

        let context = `Context files:\n`;
        for (const dep of task.dependencies) {
            if (contextFiles.has(dep)) {
                context += `\n--- ${dep} ---\n${contextFiles.get(dep)}\n`;
            } else {
                try {
                    const existingCode = await fs.readFile(path.join(TARGET_DIR, dep), 'utf-8');
                    context += `\n--- ${dep} ---\n${existingCode}\n`;
                    contextFiles.set(dep, existingCode);
                } catch (e) { }
            }
        }

        const finalState = await app.invoke({
            task: task,
            context: context,
            currentCode: "",
            errorMessage: "",
            retries: 0,
            isValid: false
        });

        contextFiles.set(task.file, finalState.currentCode);
    }

    console.log("\n🎉 Agent finished execution!");
    console.log("Run `npm run dev` to start the app, or `npm run test` to run all tests.");
}
