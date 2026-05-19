import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

import { GraphState } from '@shared/types';
import { extractCodeBlocks } from '@shared/utils';
import { generateCompletion } from '@services/llm';
import { TARGET_DIR } from '@config/constants';

const execAsync = util.promisify(exec);

export async function generateCodeNode(state: typeof GraphState.State) {
    console.log(`[Node: generateCodeNode] Generating code for ${state.task.file} (Retry: ${state.retries})`);

    let prompt = "";
    if (state.errorMessage && state.currentCode) {
        prompt = `
        You are an expert TypeScript/React developer debugging a project.
        The file \`${state.task.file}\` failed validation.

        Current code:
        \`\`\`typescript
        ${state.currentCode}
        \`\`\`

        Error message:
        <error>
        ${state.errorMessage}
        </error>

        Please provide the corrected code to fix these errors. Provide ONLY the raw code inside a markdown block.
        `;
    } else {
        prompt = `
        You are an expert TypeScript/React developer.
        Your task is to implement the file: \`${state.task.file}\`

        Task Description:
        ${state.task.description}

        Context of existing dependencies:
        ${state.context}

        Provide ONLY the raw code for the file \`${state.task.file}\` inside a markdown block.
        `;
    }

    const system = "You output code based on requirements. Provide only the code inside markdown blocks.";
    const codeStr = await generateCompletion(prompt, system);

    return {
        currentCode: extractCodeBlocks(codeStr)
    };
}

export async function validateCodeNode(state: typeof GraphState.State) {
    console.log(`[Node: validateCodeNode] Writing and typechecking ${state.task.file}...`);

    const fullPath = path.join(TARGET_DIR, state.task.file);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, state.currentCode);

    try {
        await execAsync('npm run typecheck && npm run test', { cwd: TARGET_DIR });
        console.log(`✅ Validation passed for ${state.task.file}!`);
        return {
            isValid: true,
            errorMessage: ""
        };
    } catch (error: any) {
        const errorMsg = (error.stdout || '') + '\n' + (error.stderr || '');
        console.log(`❌ Validation failed for ${state.task.file}.`);
        console.log(errorMsg.slice(0, 500) + '...');
        return {
            isValid: false,
            errorMessage: errorMsg,
            retries: 1
        };
    }
}
