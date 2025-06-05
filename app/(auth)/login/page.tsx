'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from '@/components/toast';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login, type LoginActionState } from '../actions';
import { useSession } from 'next-auth/react';

export default function Page() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    }
  );

  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === 'failed') {
      toast({
        type: 'error',
        description: '未知错误',
      });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: '用户名或密码错误',
      });
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setUsername(formData.get('username') as string);
    formAction(formData);
  };

  return (
    <div className='flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background'>
      <div className='w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12'>
        <div className='flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16'>
          <h3 className='text-xl font-semibold dark:text-zinc-50'>
            Hello WiFi
          </h3>
        </div>
        <AuthForm action={handleSubmit} defaultUsername={username}>
          <SubmitButton isSuccessful={isSuccessful}>登录</SubmitButton>
        </AuthForm>
      </div>
    </div>
  );
}
