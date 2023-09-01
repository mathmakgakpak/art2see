import Position from "../../elements/Position";
import { ArtInfoInterface } from "../../interfaces";
import { mkHTML } from "../../utils";

class ArtInfoElement {
    element = mkHTML("div", {
        className: "art-info-element"
    });
    name: HTMLSpanElement
    categories: HTMLSpanElement;
    description: HTMLParagraphElement;
    
    position: Position;

    constructor(
        public artInfo: ArtInfoInterface
    ) {
        // name
        const header = mkHTML("header");
        this.name = mkHTML("span", {
            textContent:  artInfo.name,
            dataset: {
                tooltip: artInfo.id
            }
        });

        this.categories = mkHTML("span", {
            textContent: artInfo.categories.join(", ")
        });

        header.append(this.name, this.categories);
        
        // description
        this.description = mkHTML("p", {
            textContent: artInfo.description
        });


        // position
        this.position = new Position(artInfo.x, artInfo.y);

        // adding all elements
        this.element.append(header, this.description, this.position.element);
    }
}
export default ArtInfoElement