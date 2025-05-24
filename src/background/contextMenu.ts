import { registerFullPageTranslateMenu } from "@/background/translate/registerMenu";
import { registerSelectionTranslateMenu } from "@/background/selection-translate/registerMenu";

export const registerContextMenus = () => {
  registerSelectionTranslateMenu();
  registerFullPageTranslateMenu();
};
