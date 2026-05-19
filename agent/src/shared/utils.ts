export function extractCodeBlocks(markdown: string): string {
    const regex = /```(?:typescript|tsx|ts|javascript|js)?\n([\s\S]*?)```/g;
    let match;
    let code = '';
    let found = false;
    while ((match = regex.exec(markdown)) !== null) {
        code += match[1] + '\n';
        found = true;
    }
    return found ? code.trim() : markdown.trim();
}
