export const handleSelectionTranslate = (info: chrome.contextMenus.OnClickData) => {
  console.log("✅ 선택 텍스트 번역:", info.selectionText);
  // OpenAI fetch 또는 임시 처리
};