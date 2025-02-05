import { ComponentProps } from 'react';

interface Props extends ComponentProps<'input'> {}

export default function Input(props: Props) {
  const { className, ...rest } = props;
  return (
    <input
      className={`block w-full p-3 outline-none border border-[#ababab] rounded-lg transition-all ease-in-out delay-150 hover:bg-[#f5f5f5] focus:border-black ${className}`}
      {...rest}
    />
  );
}
