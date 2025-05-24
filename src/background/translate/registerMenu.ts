import { translate } from "@/i18n";

export const registerFullPageTranslateMenu = () => {
  chrome.contextMenus.create({
    id: "para-translate-page",
    title: translate("translate_page"),
    contexts: ["page"],
  });
};