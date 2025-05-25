import { showTooltip } from "@/content/services/showTooltip";
import { extractParagraphsFromPage, replaceParagraphsOnPage } from "@/content/services/translatePage";

export const registerOnMessageHandler = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SHOW_TOOLTIP") {
      const { word, meanings, position } = message;
      showTooltip(word, meanings, position);
    } else if (message.type === "REQUEST_PAGE_TEXT") {
      console.log("[REQUEST_PAGE_TEXT]");
      const text = extractParagraphsFromPage();
      chrome.runtime.sendMessage({ type: "RESULT_PAGE_TEXT", text });
    } else if (message.type === "REPLACE_PAGE_TEXT") {
      replaceParagraphsOnPage(message.replacedTexts);
    }
  });
};
