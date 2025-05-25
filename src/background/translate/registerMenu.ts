import { translate } from "@/i18n";


export const tabTranslateState = new Map<number, "original" | "translated">(); // 탭별 상태 저장

/**
 * Registers or updates the context menu item for translating a page in the browser.
 * 
 * This function updates the context menu item with the ID "translate-page" to reflect the current translation state.
 * If the menu item does not exist, it creates a new one. It also updates the translation state for the given tab.
 *
 * @param tabId - The ID of the browser tab for which the menu should be registered or updated.
 * @param isTranslated - Indicates whether the page is currently translated. If true, the menu will show the option to cancel translation; otherwise, it will show the option to start translation.
 */
export const registerPageTranslateMenu = (tabId: number, isTranslated: boolean) => {
  chrome.contextMenus.update(
    "translate-page",
    { 
      title: isTranslated ? translate("translation_cancel") : translate("translation_start")
    },
    () => {
      if (chrome.runtime.lastError) {
        chrome.contextMenus.create({
          id: "translate-page",
          title: isTranslated ? translate("translation_cancel") : translate("translation_start"),
          contexts: ["page"]
        });
      }
      tabTranslateState.set(tabId, isTranslated ? "translated" : "original");
    }
  );
};