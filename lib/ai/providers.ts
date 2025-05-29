import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

import { openai, createOpenAI } from '@ai-sdk/openai';

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
  imageModels: {
    'small-model': xai.image('qwen-turbo'),
  },
});

// export const myProvider = isTestEnvironment
//   ? customProvider({
//       languageModels: {
//         'chat-model': chatModel,
//         'chat-model-reasoning': reasoningModel,
//         'title-model': titleModel,
//         'artifact-model': artifactModel,
//       },
//     })
//   : customProvider({
//       languageModels: {
//         'chat-model': xai('grok-2-vision-1212'),
//         'chat-model-reasoning': wrapLanguageModel({
//           model: xai('grok-3-mini-beta'),
//           middleware: extractReasoningMiddleware({ tagName: 'think' }),
//         }),
//         'title-model': xai('grok-2-1212'),
//         'artifact-model': xai('grok-2-1212'),
//       },
//       imageModels: {
//         'small-model': xai.image('grok-2-image'),
//       },
//     });
