import { NoSsr } from '@/components/NoSsr';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { ComponentProps, Fragment, Suspense as ReactSuspense } from 'react';

interface Props extends ComponentProps<typeof ReactSuspense> {
  suspense_query_key?: QueryKey[];
}
export default function Suspense({
  children,
  suspense_query_key,
  ...rest
}: Props) {
  const query_client = useQueryClient();

  const not_prefetched = suspense_query_key?.some(key => {
    const query_status = query_client.getQueryState(key);
    const is_prefetched = query_status?.status === 'success';
    return !is_prefetched;
  });

  const Wrapper = not_prefetched ? NoSsr : Fragment;

  return (
    <ReactSuspense {...rest}>
      <Wrapper>{children}</Wrapper>
    </ReactSuspense>
  );
}
