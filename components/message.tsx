'use client';

import type { UIMessage } from 'ai';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';
import { Markdown } from './markdown';
import equal from 'fast-deep-equal';
import { cn, sanitizeText } from '@/lib/utils';
import { Qwen } from '@lobehub/icons';

const PurePreviewMessage = ({
  message,
  requiresScrollPadding,
}: {
  message: UIMessage;
  requiresScrollPadding: boolean;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${message.role}`}
        className='w-full mx-auto max-w-3xl px-4 group/message'
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}>
        <div
          className={cn(
            'flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl',
            'group-data-[role=user]/message:w-fit'
          )}>
          {message.role === 'assistant' && (
            <div className='size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background'>
              <div className='translate-y-px'>
                <Qwen.Color size={20} />
              </div>
            </div>
          )}

          <div
            className={cn('flex flex-col gap-4 w-full', {
              'min-h-96': message.role === 'assistant' && requiresScrollPadding,
            })}>
            {message.parts?.map((part, index) => {
              const { type } = part;
              const key = `message-${message.id}-part-${index}`;
              if (type === 'text') {
                return (
                  <div key={key} className='flex flex-row gap-2 items-start'>
                    <div
                      data-testid='message-content'
                      className={cn('flex flex-col gap-4', {
                        'bg-primary text-primary-foreground px-3 py-2 rounded-xl':
                          message.role === 'user',
                      })}>
                      <Markdown>{sanitizeText(part.text)}</Markdown>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.message.id !== nextProps.message.id) return false;
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding)
      return false;
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;

    return true;
  }
);

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <motion.div
      data-testid='message-assistant-loading'
      className='w-full mx-auto max-w-3xl px-4 group/message min-h-96'
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}>
      <div
        className={cx(
          'flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl',
          {
            'group-data-[role=user]/message:bg-muted': true,
          }
        )}>
        <div className='size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border'>
          <Qwen.Color size={20} />
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-4 text-muted-foreground'>
            思考中...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
