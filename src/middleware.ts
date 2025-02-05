import * as jose from 'jose';
import { getToken, JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    decode: params => {
      const decode = jose.jwtVerify(
        params.token ?? '',
        new TextEncoder().encode(params.secret.toString())
      ) as unknown as JWT;
      return decode;
    },
  });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/user(.*)',
};
