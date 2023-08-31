import Page from "../GUIPage";
import WindowsManager from "../WindowsManager";
import { THEMES } from "../interfaces";
import { addTextBeforeElement, mkHTML } from "../utils";

class SettingsPage extends Page {
    theme: THEMES = "dark";
    changeStyleButton: HTMLButtonElement;
    constructor(windowsManager: WindowsManager) {
        super(windowsManager, "Settings")

        this.changeStyleButton = mkHTML("button", {
            textContent: "🌕"
        });
        this.changeStyleButton.addEventListener("click", () => {
            if(this.theme === "light") {
                this.theme = "dark";
                this.changeStyleButton.textContent = "🌕";
            } else {
                this.theme = "light";
                this.changeStyleButton.textContent = "☀";
            }
            this.windowsManager.changeStyle(this.theme);
        });
        const themeChangerContainer = addTextBeforeElement("Theme: ", this.changeStyleButton);

        
        this.pageElement.append(themeChangerContainer);
    }
}

export default SettingsPage