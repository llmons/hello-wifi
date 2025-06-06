'use server';

import { z } from 'zod';

import { signIn } from './auth';

const authFormSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/)
    .min(3),
  password: z.string().min(3),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      username: formData.get('username'),
      password: formData.get('password'),
    });

    await signIn('credentials', {
      username: validatedData.username,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};
