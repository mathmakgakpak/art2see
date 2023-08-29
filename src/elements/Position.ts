import { mkHTML } from "../utils";
class Position {
    element = mkHTML("span", {
        className: "position"
    });
    elementX = mkHTML("span", {
        textContent: "0",
    })
    elementY = mkHTML("span", {
        textContent: "0",
    })
    constructor(
        x: number = 0,
        y: number = 0
    ) {
        this.x = x;
        this.y = y;
        const XElem = mkHTML("span", {
            textContent: "X:"
        });
        const YElem = mkHTML("span", {
            textContent: "Y:"
        });

        this.element.append(XElem, this.elementX, YElem, this.elementY);
    }
    set x(value: number) {
        this.elementX.textContent = value.toString();
    }
    get x(): number {
        return +(this.elementX.textContent || "");
    }
    set y(value: number) {
        this.elementY.textContent = value.toString();
    }
    get y(): number {
        return +(this.elementX.textContent || "");
    }

}

export default Position;