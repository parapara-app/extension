import { registerContextMenus } from "@/background/contextMenu";
import { handleFullPageTranslate } from "@/background/translate/onClick";

chrome.runtime.onInstalled.addListener(() => {
  registerContextMenus();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DOUBLE_CLICK_TEXT") {
    const { word, position } = message.payload;

    const meanings = ["This feature is currently under development"];

    chrome.tabs.sendMessage(sender.tab!.id!, {
      type: "SHOW_TOOLTIP",
      word: word,
      meanings,
      position,
    });
  }

  if (message.type === "PAGE_TEXT_RESULT") {
    // 번역/가공 (지금은 예시로 prefix만)
    const translated = `[번역결과] ${message.text.slice(0, 100)}...`;
    // 번역된 텍스트를 해당 탭 content script에 다시 보냄
    if (message.tabId) {
      chrome.tabs.sendMessage(message.tabId, {
        type: "REPLACE_PAGE_TEXT",
        text: translated,
      });
    }
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translate-page") {
    handleFullPageTranslate(tab);
  }
});
