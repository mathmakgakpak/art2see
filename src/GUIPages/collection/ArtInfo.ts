import { ArtInfoInterface } from "../../interfaces";
import { mkHTML } from "../../utils";

class ArtInfoElement {
    element = mkHTML("div", {
        className: "ArtInfoElement"
    });
    name = mkHTML("span");
    categories = mkHTML("span");
    description = mkHTML("div");
    
    position = mkHTML("div")
    positionX = mkHTML("span");
    positionY = mkHTML("span");

    constructor(
        public artInfo: ArtInfoInterface
    ) {
        // name
        this.name.textContent = artInfo.name;
        this.name.ariaLabel = artInfo.id;

        this.categories.textContent = artInfo.categories.join(", ");
        this.description.textContent = artInfo.description;

        // position
        const XElem = mkHTML("span", {
            textContent: "X:"
        });
        this.positionX.textContent = artInfo.position.x.toString();
        const YElem = mkHTML("span", {
            textContent: "Y:"
        });
        this.positionY.textContent = artInfo.position.y.toString();
        this.position.append(XElem, this.positionX, YElem, this.positionY);

        // adding all elements
        this.element.append(this.name, this.categories, this.description, this.position);
    }
}
export default ArtInfoElement