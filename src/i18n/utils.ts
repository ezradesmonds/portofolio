import type { Lang, TranslationKey } from "./translations";
import { translations } from "./translations";

const VALID_LANGS: Lang[] = ["en", "id"];

export function isValidLang(value: string): value is Lang {
  return VALID_LANGS.includes(value as Lang);
}

export function resolveLang(
  paramValue: string | null,
  cookieValue: string | undefined
): Lang {
  if (paramValue && isValidLang(paramValue)) return paramValue;
  if (cookieValue && isValidLang(cookieValue)) return cookieValue;
  return "id";
}

export function t(lang: Lang, key: TranslationKey): string {
  const val = translations[lang][key];
  if (typeof val === "string") return val;
  return "";
}

export function tArray(lang: Lang, key: TranslationKey): string[] {
  const val = translations[lang][key];
  if (Array.isArray(val)) return (val as string[]).slice();
  return [];
}
