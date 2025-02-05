import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {}

export default function Button(props: Props) {
  const { className, ...rest } = props;
  return (
    <button
      className={`text-lg flex items-center justify-center p-3 bg-black text-white rounded-lg w-full transition-all ease-in-out delay-100 hover:transform hover:scale-[1.01] active:transform active:scale-[0.99] disabled:text-[#ccc] disabled:bg-[#aaa] ${className}`}
      {...rest}
    />
  );
}
