import { ComponentProps } from 'react';
import styles from './index.module.css';

interface Props extends ComponentProps<'button'> {}

export default function Button(props: Props) {
  const { className, ...rest } = props;
  return <button className={`${styles.container} ${className}`} {...rest} />;
}
