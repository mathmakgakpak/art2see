import Position from "../../elements/Position";
import { ArtInfoInterface } from "../../interfaces";
import { mkHTML } from "../../utils";

class ArtInfoElement {
    element = mkHTML("div", {
        className: "art-info-element"
    });
    name = mkHTML("span");
    categories = mkHTML("span");
    description = mkHTML("p");
    
    position = new Position();

    constructor(
        public artInfo: ArtInfoInterface
    ) {
        // name
        const header = mkHTML("header");
        this.name.textContent = artInfo.name;
        this.name.dataset.tooltip = artInfo.id;

        this.categories.textContent = artInfo.categories.join(", ");
        header.append(this.name, this.categories);
        
        // description
        this.description.textContent = artInfo.description;

        // position
        this.position.x = artInfo.x;
        this.position.y = artInfo.y;


        // adding all elements
        this.element.append(header, this.description, this.position.element);
    }
}
export default ArtInfoElement