export const handleFullPageTranslate = (tab?: chrome.tabs.Tab) => {
  console.log("Translation Requested");
  console.log("Current Tab: ", tab);

  if (!tab?.id) return;
  chrome.tabs.sendMessage(tab.id, { type: "REQUEST_PAGE_TEXT" });
};
