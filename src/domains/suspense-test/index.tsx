import { fetchUserList } from '@/api/user';
import { User } from '@/api/user/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FC } from 'react';

function SuspenseTestMain() {
  const { data } = useQuery(getUserListQueryOptions());

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
    // <Suspense>
    <SuspenseTestMain />
    // </Suspense>
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
