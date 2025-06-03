import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';


import { createOpenAI } from '@ai-sdk/openai';

const qwen = createOpenAI({
  apiKey: process.env.QWEN_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

export const myProvider = customProvider({
  languageModels: {
    'chat-model': qwen('qwen-turbo'),
    'chat-model-reasoning': wrapLanguageModel({
      model: qwen('qwen-turbo'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': qwen('qwen-turbo'),
    'artifact-model': qwen('qwen-turbo'),
  },
});
