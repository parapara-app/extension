export const registerDblclickHandler = () => {
  document.addEventListener("dblclick", (e) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      chrome.runtime.sendMessage({
        type: "DOUBLE_CLICK_TEXT",
        payload: {
          word: selection,
          position: { x: e.clientX, y: e.clientY },
        },
      });
    }
  });
};
