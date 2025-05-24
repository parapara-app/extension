export const registerSelectionTranslateMenu = () => {
  chrome.contextMenus.create({
    id: "para-translate-selection",
    title: "Para 번역 (선택 텍스트)",
    contexts: ["selection"],
  });
};