import { ComponentProps } from 'react';

interface Props extends ComponentProps<'form'> {}

export default function Form(props: Props) {
  const { className, ...rest } = props;

  return (
    <form className={`grid grid-cols-1 gap-2 ${className}`} {...rest}></form>
  );
}
