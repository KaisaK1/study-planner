'use client';

import { useTranslations } from '@/hooks';
import styles from './PlaceholderPage.module.css';

export function PlaceholderPage({ title }: Readonly<{ title: string }>) {
  const { Common } = useTranslations();

  return (
    <section className={styles.placeholder}>
      <h1 className={styles.placeholder__title}>{title}</h1>
      <p className={styles.placeholder__note}>{Common.WorkInProgress}</p>
    </section>
  );
}