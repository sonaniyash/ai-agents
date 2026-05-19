import { StateGraph, END, START } from '@langchain/langgraph';
import { GraphState } from '@shared/types';
import { generateCodeNode, validateCodeNode } from '@core/nodes';

function shouldContinue(state: typeof GraphState.State) {
    if (state.isValid) {
        return END;
    }

    if (state.retries >= 2) {
        console.log(`Max retries reached for ${state.task.file}. Giving up.`);
        return END;
    }

    return "generateCodeNode";
}

const workflow = new StateGraph(GraphState)
    .addNode("generateCodeNode", generateCodeNode)
    .addNode("validateCodeNode", validateCodeNode)
    .addEdge(START, "generateCodeNode")
    .addEdge("generateCodeNode", "validateCodeNode")
    .addConditionalEdges("validateCodeNode", shouldContinue, {
        [END]: END,
        "generateCodeNode": "generateCodeNode"
    });

export const app = workflow.compile();
