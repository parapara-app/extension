import en from "@/i18n/locales/en.json";
import ja from "@/i18n/locales/ja.json";
import ko from "@/i18n/locales/ko.json";

type LocaleKeys = keyof typeof ko;
type LocaleMessages = Record<LocaleKeys, string>;

const locales: Record<string, LocaleMessages> = { en, ja, ko };

export const translate = (key: LocaleKeys): string => {
  const lang = chrome.i18n.getUILanguage();
  const baseLang = lang.split("-")[0];

  const dict = locales[baseLang] || en;
  return dict[key] || key;
};
