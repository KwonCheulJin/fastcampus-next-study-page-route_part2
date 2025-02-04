import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';

interface Props {
  test: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      test: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
  };
};

export default function SsrPage({ test }: Props) {
  return (
    <main>
      {test}
      <p>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</p>
    </main>
  );
}
