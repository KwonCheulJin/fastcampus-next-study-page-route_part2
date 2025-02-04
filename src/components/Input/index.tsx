import { ComponentProps } from 'react';
import styles from './index.module.css';

interface Props extends ComponentProps<'input'> {}

export default function Input(props: Props) {
  const { className, ...rest } = props;
  return <input className={`${styles.container} ${className}`} {...rest} />;
}
