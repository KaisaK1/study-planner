import { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  title: string;
  children?: ReactNode;
}

export function PageLayout({ title, children }: Readonly<PageLayoutProps>) {
  return (
    <section className={styles.page}>
      <h1 className={styles.page__title}>{title}</h1>
      {children}
    </section>
  );
}