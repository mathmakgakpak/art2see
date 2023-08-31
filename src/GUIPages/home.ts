import Page from "../GUIPage";
import WindowsManager from "../WindowsManager";
import { mkHTML } from "../utils";

class HomePage extends Page {
    constructor(windowsManager: WindowsManager) {
        super(windowsManager, "Home")
        const test = mkHTML("div");
        test.textContent = "Do not close the tab. sus <a>";
        this.pageElement.appendChild(test);
    }
}

export default HomePage