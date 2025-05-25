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

  if (message.type === "RESULT_PAGE_TEXT") {
    console.log("[RESULT_PAGE_TEXT] ", message.text);

    // 번역 처리 
    const translated = `${message.text}`;

    // content script로 다시 결과 전달
    // if (sender.tab && sender.tab.id) {
    //   chrome.tabs.sendMessage(sender.tab.id, {
    //     type: "REPLACE_PAGE_TEXT",
    //     text: translated,
    //   });
    // }
  }

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translate-page") {
    handleFullPageTranslate(tab);
  }
});
