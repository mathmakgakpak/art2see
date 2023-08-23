import Page from "../GUIPage";
import { ArtInfoInterface } from "../interfaces";
import { mkHTML } from "../utils";

 // i want to put here art info. coords and the other things see ./interfaces
class CollectionPage extends Page {
    rows: HTMLElement = mkHTML("div");

    constructor() {
        super("Collection", "")

        this.pageElement.appendChild(this.rows);
    }
    
    addArt(artInfo: ArtInfoInterface) {
        const row = mkHTML("div", /* {
            display: "flex"
        } */);
        
        const nameField = mkHTML("div")
        nameField.innerHTML = artInfo.name;

        row.appendChild(nameField);


        const coordsField = mkHTML("div");
        
        coordsField.innerHTML = `X: ${artInfo.position.x} Y: ${artInfo.position.x}`;

        coordsField.addEventListener("click", mouseEvent => {
            
        })

        row.appendChild(coordsField);
        this.rows.appendChild(row);
        return row;
    }

    updateArtsInfo(artsInfo: ArtInfoInterface[]) {
        // remove every element
        Array.from(this.rows.children).forEach(x => x.remove());

        // push new elements
        artsInfo.forEach(artInfo => this.addArt(artInfo));
    }
}

export default CollectionPage