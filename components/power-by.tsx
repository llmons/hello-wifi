'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from './ui/separator';
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiVercel,
  SiShadcnui,
} from 'react-icons/si';
import { Qwen } from '@lobehub/icons';

export function PowerBy() {
  return (
    <div className='flex flex-col gap-3 justify-center p-2 rounded-md my-4'>
      {/* Author */}
      <Separator className='my-4' />
      <span className='text-lg font-semibold px-2 rounded-md'>Author</span>
      <Link
        href='https://github.com/llmons'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <Image src='/images/avatar.png' alt='llmons' width={28} height={28} />
        <span className='text-lg'>llmons</span>
      </Link>

      {/* Repo */}
      <Separator className='my-4' />
      <span className='text-lg font-semibold px-2 rounded-md'>Repo</span>
      <Link
        href='https://github.com/llmons/hello-wifi'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <SiGithub className='text-2xl' />
        <span className='text-lg'>hello-wifi</span>
      </Link>

      {/* Power by */}
      <Separator className='my-2' />
      <span className='text-lg font-semibold px-2 rounded-md'>Power by</span>
      <Link
        href='https://react.dev'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <SiReact className='text-2xl' />
        <span className='text-lg'>React</span>
      </Link>
      <Link
        href='https://nextjs.org/'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <SiNextdotjs className='text-2xl' />
        <span className='text-lg'>Nextjs</span>
      </Link>
      <Link
        href='https://ai-sdk.dev/docs/introduction'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <SiVercel className='text-2xl' />
        <span className='text-lg'>AI-SDK</span>
      </Link>
      <Link
        href='https://www.tongyi.com/'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <Qwen className='text-2xl' />
        <span className='text-lg'>Qwen</span>
      </Link>
      <Link
        href='https://ui.shadcn.com/'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <SiShadcnui className='text-2xl' />
        <span className='text-lg'>ShadcnUI</span>
      </Link>

      {/* Template from */}
      <Separator className='my-2' />
      <span className='text-lg font-semibold px-2 rounded-md'>
        Template from
      </span>
      <Link
        href='https://vercel.com/templates/next.js/nextjs-ai-chatbot'
        className='flex flex-row gap-3 items-center px-2 hover:bg-muted rounded-md cursor-pointer'>
        <SiVercel className='text-2xl' />
        <span className='text-lg'>AI-Chatbot</span>
      </Link>
    </div>
  );
}
