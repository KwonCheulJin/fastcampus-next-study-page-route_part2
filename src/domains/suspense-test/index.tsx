import { fetchUserList } from '@/api/user';
import { User } from '@/api/user/types';
import Suspense from '@/components/Suspense';
import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

function SuspenseTestMain() {
  const { data } = useSuspenseQuery(getUserListQueryOptions());

  return (
    <main>
      Suspense Test
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}

function SuspenseTestMainWithSuspense() {
  return (
    <Suspense>
      <SuspenseTestMain />
    </Suspense>
  );
}

export { SuspenseTestMainWithSuspense as SuspenseTestMain };

function getUserListQueryOptions(): UseQueryOptions<User[], Error> {
  return {
    queryKey: ['user-list'],
    queryFn: async () => {
      const result = await fetchUserList();
      return result;
    },
  };
}
