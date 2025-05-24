import { showTooltip } from "@/content/services/showTooltip";

export const registerOnMessageHandler = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SHOW_TOOLTIP") {
      console.log("Received SHOW_TOOLTIP message:", message);
      const { word, meanings, position } = message;
      showTooltip(word, meanings, position);
    }
  });
};
