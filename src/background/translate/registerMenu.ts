import { translate } from "@/i18n";

export const registerPageTranslateMenu = () => {
  chrome.contextMenus.create({
    id: "translate-page",
    title: translate("translate_page"),
    contexts: ["page"],
  });
};