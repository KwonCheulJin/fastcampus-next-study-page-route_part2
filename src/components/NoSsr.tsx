import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

function NoSsrWrapper({ children }: PropsWithChildren) {
  return <>{children}</>;
}
export const NoSsr = dynamic(() => Promise.resolve(NoSsrWrapper), {
  ssr: false,
});
