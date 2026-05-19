# AI Agent Code Generator

This is a standalone agent script that reads a natural language specification and builds out the application file-by-file into the parent directory's boilerplate.

## Architecture & How It Works

This agent uses a state machine workflow powered by **LangGraph** and the **OpenAI** SDK. The codebase is organized into a modular structure (`core`, `services`, `shared`, `config`) for better maintainability.

### The Agentic Loop
1. **Task Planner**: The agent starts by calling OpenAI (configured to `gpt-4o-mini` by default) to parse the specification and decompose it into an ordered list of tasks (e.g., creating files based on dependencies).
2. **Code Generator**: For each task, the agent uses the LLM to generate the raw code. It explicitly passes the previously generated code and required boilerplate files as context.
3. **Self-Validation**: The agent writes the generated file, then shells out to run `npm run typecheck && npm run test` in the target project.
4. **Error Recovery**: If the validation fails, it captures `stdout` and `stderr` and feeds it back to the LLM to attempt a fix. It does this in a retry loop (up to 2 times) automatically managed by LangGraph conditional edges.

## Setup

1. Copy `.env.example` to `.env` and add your OpenAI API Key:
   ```bash
   cp .env.example .env
   # Edit .env to add your OPENAI_API_KEY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Create a specification file (e.g., `spec.txt`) and run the agent:

```bash
npm start spec.txt
```

Example `spec.txt` contents:
```text
Build a responsive Car Inventory Manager with React, TypeScript, Apollo Client, and Material UI.
1. Create a SearchBar component with autocomplete.
2. Create a CarCard component that displays image, make, model, year, and price.
3. Use the GraphQL endpoint to fetch cars and display them in a Grid.
```
