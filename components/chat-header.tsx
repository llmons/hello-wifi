'use client';

import { memo } from 'react';
import { ModeToggle } from './mode-toggle';

function PureChatHeader({
  selectedModelId,
}: {
  selectedModelId: string;
}) {

  return (
    <header className='flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2'>
      <div className='hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto'>
        <ModeToggle />
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
