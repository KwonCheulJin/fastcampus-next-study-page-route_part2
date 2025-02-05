import { auth_options } from '@/api/auth/signin';
import UserMain from '@/domains/user';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(
    context.req,
    context.res,
    auth_options
  );

  return {
    props: {},
  };
};
export default function UserPage() {
  return <UserMain />;
}
