import { registerContextMenus } from "@/background/contextMenu";
import { handleFullPageTranslate } from "@/background/translate/onClick";

chrome.runtime.onInstalled.addListener(() => {
  registerContextMenus();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DOUBLE_CLICK_TEXT") {
    const selectedWord = message.payload;
    console.log("더블클릭된 단어:", selectedWord);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translate-page") {
    handleFullPageTranslate(tab);
  }
});
