import {
  getUserListQueryOptions,
  SuspenseTestMain,
} from '@/domains/suspense-test';
import { getQueryClient } from '@/utils';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof SuspenseTestMain> {
  dehydrate_state: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const query_client = getQueryClient();
  const query_options = getUserListQueryOptions();

  await query_client.prefetchQuery(query_options);

  const dehydrate_state: DehydratedState = dehydrate(query_client);
  return {
    props: {
      dehydrate_state,
    },
  };
};
export default function SuspenseTestPage({ dehydrate_state, ...rest }: Props) {
  return (
    <HydrationBoundary state={dehydrate_state}>
      <SuspenseTestMain {...rest} />
    </HydrationBoundary>
  );
}
