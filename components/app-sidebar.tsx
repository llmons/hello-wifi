'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { PowerBy } from '@/components/power-by';
import { signOut } from 'next-auth/react';
import { Separator } from './ui/separator';

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className='group-data-[side=left]:border-r-0'>
      <SidebarHeader>
        <SidebarMenu>
          <div className='flex flex-row justify-between items-center'>
            <Link
              href='/'
              onClick={() => {
                setOpenMobile(false);
              }}
              className='flex flex-row gap-3 items-center'>
              <span className='text-4xl font-semibold italic px-2 hover:bg-muted rounded-md cursor-pointer'>
                Hello WiFi
              </span>
            </Link>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <PowerBy />
        <Separator className='my-2' />
        <Button
          variant='outline'
          onClick={() => {
            signOut({
              redirectTo: '/',
            });
          }}>
          退出登录
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
