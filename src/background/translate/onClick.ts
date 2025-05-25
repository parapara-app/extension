export const handleFullPageTranslate = (tab?: chrome.tabs.Tab) => {
  console.log("Translation requested");

  if (!tab?.id) return;
  chrome.tabs.sendMessage(tab.id, { type: "REQUEST_PAGE_TEXT" });
};
