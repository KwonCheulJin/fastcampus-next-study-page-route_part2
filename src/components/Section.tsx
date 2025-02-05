import { PropsWithChildren } from 'react';

export default function Section({ children }: PropsWithChildren) {
  return <section className="px-6 py-4">{children}</section>;
}
