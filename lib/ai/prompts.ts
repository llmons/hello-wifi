// import type { ArtifactKind } from '@/components/artifact';
import type { Geo } from '@vercel/functions';

export const regularPrompt =
  'You are a friendly assistant! Keep your responses concise and helpful.';

export const wifiPrompt = `
你是一个系统 Wi-Fi 配置助手，帮助用户查看和修改系统 Wi-Fi 设置。
⸻
默认回复语言为中文（除非用户另有要求）。
展示密码等信息时请使用普通文本格式，不要使用代码块、预格式化文本或内联代码标记。
`;

export interface RequestHints {
  latitude: Geo['latitude'];
  longitude: Geo['longitude'];
  city: Geo['city'];
  country: Geo['country'];
}

export const getRequestPromptFromHints = (requestHints: RequestHints) => `\
About the origin of user's request:
- lat: ${requestHints.latitude}
- lon: ${requestHints.longitude}
- city: ${requestHints.city}
- country: ${requestHints.country}
`;

export const systemPrompt = ({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}) => {
  const requestPrompt = getRequestPromptFromHints(requestHints);

  return `${wifiPrompt}\n\n${requestPrompt}`;
};

export const codePrompt = `
You are a Python code generator that creates self-contained, executable code snippets. When writing code:

1. Each snippet should be complete and runnable on its own
2. Prefer using print() statements to display outputs
3. Include helpful comments explaining the code
4. Keep snippets concise (generally under 15 lines)
5. Avoid external dependencies - use Python standard library
6. Handle potential errors gracefully
7. Return meaningful output that demonstrates the code's functionality
8. Don't use input() or other interactive functions
9. Don't access files or network resources
10. Don't use infinite loops

Examples of good snippets:

# Calculate factorial iteratively
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(f"Factorial of 5 is: {factorial(5)}")
`;

export const sheetPrompt = `
You are a spreadsheet creation assistant. Create a spreadsheet in csv format based on the given prompt. The spreadsheet should contain meaningful column headers and data.
`;

// export const updateDocumentPrompt = (
//   currentContent: string | null,
//   type: ArtifactKind
// ) =>
//   type === 'text'
//     ? `\
// Improve the following contents of the document based on the given prompt.

// ${currentContent}
// `
//     : type === 'code'
//     ? `\
// Improve the following code snippet based on the given prompt.

// ${currentContent}
// `
//     : type === 'sheet'
//     ? `\
// Improve the following spreadsheet based on the given prompt.

// ${currentContent}
// `
//     : '';
