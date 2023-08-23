import Page from "../GUIPage";
import { mkHTML } from "../utils";

class HomePage extends Page {
    constructor() {
        super("Home", "")
        const test = mkHTML("div");
        test.innerText = "bob <a>";
        this.pageElement.appendChild(test);
    }
}

export default HomePage