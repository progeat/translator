export type LanguageCode =
  | "en" // English
  | "ru" // Russian
  | "fr" // French
  | "es" // Spanish
  | "de" // German
  | "it" // Italian
  | "pt" // Portuguese
  | "zh" // Chinese
  | "ja" // Japanese
  | "ar"; // Arabic

export interface Language {
  code: LanguageCode;
  name: string;
  icon: string;
}

export interface LanguagePair {
  from: LanguageCode;
  to: LanguageCode;
}

export type LanguagesDictionary = Record<LanguageCode, Omit<Language, "code">>;
