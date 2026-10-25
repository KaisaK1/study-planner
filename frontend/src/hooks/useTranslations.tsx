'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { DEFAULT_LOCALE, DICTIONARIES, Locale, Translations } from '@/dictionary';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Translations;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: Readonly<{
  children: ReactNode;
  initialLocale?: Locale;
}>) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const value = useMemo(
    () => ({ locale, setLocale, translations: DICTIONARIES[locale] }),
    [locale],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export const useTranslations = () => useI18n().translations;
export const useLocale = () => {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
};
