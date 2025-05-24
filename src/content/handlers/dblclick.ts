export const registerDblclickHandler = () => {
  document.addEventListener("dblclick", () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      chrome.runtime.sendMessage({
        type: "DOUBLE_CLICK_TEXT",
        payload: selection,
      });
    }
  });
};
