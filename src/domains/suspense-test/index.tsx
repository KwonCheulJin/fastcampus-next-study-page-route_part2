import { fetchUserList } from '@/api/user';
import { User } from '@/api/user/types';
import Suspense from '@/components/Suspense';
import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { FC } from 'react';

function SuspenseTestMain() {
  const { data } = useSuspenseQuery(getUserListQueryOptions());

  return (
    <main>
      Suspense Test
      <ul>
        {data?.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}

const SuspenseTestMainWithSuspense: FC = () => {
  return (
    <Suspense
      fallback={<>Loading...</>}
      suspense_query_key={[getUserListQueryOptions().queryKey]}
    >
      <SuspenseTestMain />
    </Suspense>
  );
};

export { SuspenseTestMainWithSuspense as SuspenseTestMain };

export function getUserListQueryOptions(): UseQueryOptions<User[], Error> {
  return {
    queryKey: ['user-list'],
    queryFn: async () => {
      const result = await fetchUserList();
      return result;
    },
  };
}
