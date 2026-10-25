import et from "./translations/ee.json";

export type Locale = "et";
export type Translations = typeof et;

export const DICTIONARIES: Record<Locale, Translations> = { et };
export const DEFAULT_LOCALE: Locale = "et";

export function getTranslations(locale: Locale = DEFAULT_LOCALE): Translations {
  return DICTIONARIES[locale];
}
