export type LanguageCode = 'en' | 'ru' | 'fr';

export interface Language {
  code: LanguageCode;
  label: string;
}

export interface LanguagePair {
  source: LanguageCode;
  target: LanguageCode;
}