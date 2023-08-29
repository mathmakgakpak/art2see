import Page from "../../GUIPage";
import { ArtInfoInterface } from "../../interfaces";
import { mkHTML } from "../../utils";
import ArtInfoElement from "./ArtInfo";

 // i want to put here art info. coords and the other things see ./interfaces
class CollectionPage extends Page {
    rows: HTMLElement = mkHTML("div", {
        className: "art-rows"
    });

    constructor() {
        super("Collection")


        this.pageElement.appendChild(this.rows);
    }
    
    addArt(artInfo: ArtInfoInterface) {
        const artInfoElement = new ArtInfoElement(artInfo);

        artInfoElement.position.element.addEventListener("click", () => {
            this.ON_USER_REQUESTS_TELEPORT(artInfo.x, artInfo.y);
        })

        this.rows.appendChild(artInfoElement.element);
        return artInfoElement;
    }

    updateArtsInfo(artsInfo: ArtInfoInterface[]) {
        // remove every element
        Array.from(this.rows.children).forEach(x => x.remove());

        // push new elements
        artsInfo.forEach(artInfo => this.addArt(artInfo));
    }
    ON_USER_REQUESTS_TELEPORT(x: number, y: number) {
        // event for GUI
    }
}

export default CollectionPage