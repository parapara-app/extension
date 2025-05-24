import { registerContextMenus } from "@/background/contextMenu";
import { handleFullPageTranslate } from "@/background/translate/onClick";
import { handleSelectionTranslate } from "@/background/selection-translate/onClick";

chrome.runtime.onInstalled.addListener(() => {
  registerContextMenus();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "para-translate-selection") {
    handleSelectionTranslate(info);
  }
  if (info.menuItemId === "para-translate-page") {
    handleFullPageTranslate(tab);
  }
});
