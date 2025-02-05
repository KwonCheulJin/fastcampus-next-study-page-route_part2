/**
 * @DIR /src/api/user/types.ts
 */

import { ErrorResult } from '@/api/types';
import { NextApiRequest, NextApiResponse } from 'next';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserInput {}

interface SuccessResult {
  list: User[];
}

type UserResult = SuccessResult | ErrorResult;

interface UserRequest extends NextApiRequest {
  body: Partial<UserInput>;
}

type UserResponse = NextApiResponse<UserResult>;

export type {
  UserInput,
  UserRequest,
  UserResponse,
  UserResult,
  SuccessResult as UserSuccessResult,
};
