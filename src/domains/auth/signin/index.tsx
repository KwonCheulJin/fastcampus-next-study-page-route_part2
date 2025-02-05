import Button from '@/components/Button';

import Form from '@/components/Form';
import Input from '@/components/Input';
import Section from '@/components/Section';
import Title from '@/components/Title';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { SHA256 } from 'crypto-js';
import {
  signIn,
  SignInOptions,
  SignInResponse,
  signOut,
  useSession,
} from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';

export default function SigninMain() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const session = useSession();
  const { mutate, isPending } = useMutation(signinMutationOptions());

  const is_logged_in = session.status === 'authenticated';

  useEffect(() => {
    if (!email || !password || isPending) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, isPending, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashPassword = SHA256(password).toString();
    mutate({ email, password: hashPassword });
  };
  return (
    <main>
      <Section>
        <Title name="로그인" />
        <Form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="email"
            onChange={e => setEmail(e.currentTarget.value)}
          />
          <Input
            id="password"
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.currentTarget.value)}
          />
          <Button type="submit" disabled={isDisabled}>
            {isPending ? '로그인중...' : '로그인'}
          </Button>
        </Form>
        {is_logged_in && (
          <Button className="mt-3" onClick={() => signOut()}>
            로그아웃
          </Button>
        )}
      </Section>
    </main>
  );
}

function signinMutationOptions(): UseMutationOptions<
  SignInResponse | undefined,
  Error,
  SignInOptions & { email: string; password: string }
> {
  return {
    mutationFn: async params => {
      const result = await signIn('credentials', {
        redirect: false,
        ...params,
      });

      if (!result?.ok) {
        throw new Error('로그인에 실패하였습니다.');
      }

      return result;
    },
    onError: error => {
      alert(error.message);
    },
    onSuccess: () => {
      alert('로그인에 성공했습니다.');
    },
  };
}
