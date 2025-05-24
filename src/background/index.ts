import { registerContextMenus } from "@/background/contextMenu";
import { handleFullPageTranslate } from "@/background/translate/onClick";

chrome.runtime.onInstalled.addListener(() => {
  registerContextMenus();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DOUBLE_CLICK_TEXT") {
    const { word, position } = message.payload;

    const meanings = [
      "1. meaning",
      "2. meaning",
      "3. meaning",
    ];

    chrome.tabs.sendMessage(sender.tab!.id!, {
      type: "SHOW_TOOLTIP",
      word: word,
      meanings,
      position,
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translate-page") {
    handleFullPageTranslate(tab);
  }
});
