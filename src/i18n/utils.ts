import type { Lang, TranslationKey } from "./translations";
import { translations } from "./translations";

const VALID_LANGS: Lang[] = ["en", "id"];

export function isValidLang(value: string): value is Lang {
  return VALID_LANGS.includes(value as Lang);
}

export function resolveLang(
  paramValue: string | null,
  pathname = ""
): Lang {
  if (paramValue && isValidLang(paramValue)) return paramValue;
  if (pathname === "/id" || pathname.startsWith("/id/")) return "id";
  return "en";
}

export function localizedPath(lang: Lang, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (lang === "id") return cleanPath === "/" ? "/id/" : `/id${cleanPath}`;
  return cleanPath;
}

export function alternateLangPath(lang: Lang, pathname: string): string {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (lang === "id") {
    const withoutPrefix = normalized.replace(/^\/id(?=\/)/, "");
    return withoutPrefix === "" ? "/" : withoutPrefix;
  }
  return normalized === "/" ? "/id/" : `/id${normalized}`;
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
