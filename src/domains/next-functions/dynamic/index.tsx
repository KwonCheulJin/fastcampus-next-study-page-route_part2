import Button from '@/components/Button';
import Input from '@/components/Input';
import { NoSsr } from '@/components/NoSsr';
import dynamic from 'next/dynamic';
import { ChangeEventHandler, useState } from 'react';

const LazyLoadedComponent = dynamic(() => import('./SomeComponent'), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});
export default function DynamicMain() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = async e => {
    const dayjs = (await import('dayjs')).default;
    const date = dayjs(e.target.value).format('YYYY-MM-DD HH:mm:ss');
    setValue(date);
  };

  return (
    <main className="p-10">
      <section className="mb-10">
        <h1 className="text-2xl mb-3">Default</h1>
        <p>Main content</p>
      </section>
      <section className="mb-10">
        <h1>Lazy Loaded Component</h1>
        <Button className="w-1/2" onClick={() => setVisible(prev => !prev)}>
          Toggle
        </Button>
        {visible && <LazyLoadedComponent />}
      </section>
      <section className="mb-10">
        <h1>Lazy Load lib</h1>
        <Input type="date" onChange={handleChange} />
        <br />
        <p>Formatted: {value}</p>
      </section>
      <section>
        <h1>No SSR</h1>
        <NoSsr>asdsdf</NoSsr>
      </section>
    </main>
  );
}
