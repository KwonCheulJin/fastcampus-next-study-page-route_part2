import { SignupInput, SignupResult } from '@/api/auth/signup/types';
import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Section from '@/components/Section';
import Title from '@/components/Title';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { SHA256 } from 'crypto-js';
import { FormEvent, useEffect, useState } from 'react';

export default function SignupMain() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { mutate } = useMutation(signupMutationOptions());

  useEffect(() => {
    if (!name || !email || !password) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, name, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashPassword = SHA256(password).toString();
    mutate({ name, email, password: hashPassword });
  };
  return (
    <main>
      <Section>
        <Title name="회원가입" />
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="이름"
            onChange={e => setName(e.currentTarget.value)}
          />
          <Input
            type="email"
            placeholder="이메일"
            onChange={e => setEmail(e.currentTarget.value)}
          />
          <Input
            type="password"
            placeholder="패스워드"
            onChange={e => setPassword(e.currentTarget.value)}
          />
          <Button type="submit" disabled={isDisabled}>
            회원가입
          </Button>
        </Form>
      </Section>
    </main>
  );
}

function signupMutationOptions(): UseMutationOptions<
  SignupResult,
  Error,
  SignupInput
> {
  return {
    mutationFn: async input => {
      const body = JSON.stringify(input);
      const result = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.error_message);
      }
      return data;
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
    },
    onError: error => {
      alert(error.message);
    },
  };
}
