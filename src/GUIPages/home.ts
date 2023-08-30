import Page from "../GUIPage";
import { mkHTML } from "../utils";

class HomePage extends Page {
    constructor() {
        super("Home")
        const test = mkHTML("div");
        test.textContent = "Do not close the tab. sus <a>";
        this.pageElement.appendChild(test);
    }
}

export default HomePage