export interface Language {
  code: string;
  name: string;
  icon: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", icon: "🇬🇧" },
  { code: "ru", name: "Russian", icon: "🇷🇺" },
  { code: "fr", name: "French", icon: "🇫🇷" },
  { code: "es", name: "Spanish", icon: "🇪🇸" },
  { code: "de", name: "German", icon: "🇩🇪" },
];

export const DEFAULT_FROM_LANG = "en";
export const DEFAULT_TO_LANG = "ru";
