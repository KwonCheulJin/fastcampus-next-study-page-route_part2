import { NoSsr } from '@/components/NoSsr';
import { ComponentProps, Suspense as ReactSuspense } from 'react';

interface Props extends ComponentProps<typeof ReactSuspense> {}
export default function Suspense(props: Props) {
  const { children, ...rest } = props;
  return (
    <ReactSuspense {...rest}>
      <NoSsr>{children}</NoSsr>
    </ReactSuspense>
  );
}
