import { registerContextMenus } from "@/background/contextMenu";
import { handleFullPageTranslate } from "@/background/translate/onClick";
import {
  registerPageTranslateMenu,
  tabTranslateState,
} from "@/background/translate/registerMenu";

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
    const replaced = Array.isArray(message.text)
      ? message.text.map(() => "Replaced Text")
      : [];

    if (sender.tab && sender.tab.id) {
      console.log("sender.tab: ", sender.tab.id);
      chrome.tabs.sendMessage(sender.tab.id, {
        type: "REPLACE_PAGE_TEXT",
        replacedTexts: replaced,
      });
    } else if (message.tabId) {
      console.log("message.tabId: ", message.tabId);
      // 혹시 tabId를 넘겼으면 이걸로
      chrome.tabs.sendMessage(message.tabId, {
        type: "REPLACE_PAGE_TEXT",
        replacedTexts: replaced,
      });
    }
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id) return;
  const state = tabTranslateState.get(tab.id) || "original";
  if (info.menuItemId === "translate-page") {
    if (state === "original") {
      // Start Translation
      chrome.tabs.sendMessage(tab.id, { type: "REQUEST_PAGE_TEXT" });
      registerPageTranslateMenu(tab.id, true);
    } else {
      // Cancel Translation
      chrome.tabs.sendMessage(tab.id, { type: "CANCEL_TRANSLATION" });
      registerPageTranslateMenu(tab.id, false);
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status === "loading") {
    tabTranslateState.set(tabId, "original");
    registerPageTranslateMenu(tabId, false);
  }
});