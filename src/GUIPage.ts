import WindowsManager from "./WindowsManager";
import { THEMES } from "./interfaces";
import { mkHTML } from "./utils";

class Page {
    pageElement: HTMLDivElement;
    constructor(
        public windowsManager: WindowsManager,
        public name: string
    ) {
        this.pageElement = mkHTML("div", {
            className: "Page",
        });
    }
    get isVisible() {
        return this.pageElement.style.display !== "none";
    }
    set isVisible(value: boolean) {
        this.pageElement.style.display = value ? "" : "none";
    }
}

export default Page;
