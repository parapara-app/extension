import { replacePageText } from "@/content/services/replacePageText";
import { showTooltip } from "@/content/services/showTooltip";

export const registerOnMessageHandler = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SHOW_TOOLTIP") {
      const { word, meanings, position } = message;
      showTooltip(word, meanings, position);
    } else if (message.type === "REPLACE_PAGE_TEXT") {
      replacePageText(message.text);
    } 
  });
};
