import { mkHTML } from "../utils";
class InteractivePositionElement {
    element = mkHTML("span", {
        className: "position"
    });
    elementX = mkHTML("input", {
        // className: ""
        type: "number",
        value: "0",
    })
    elementY = mkHTML("input", {
        // className: ""
        type: "number",
        value: "0",
    })
    constructor(
        x: number = 0,
        y: number = 0
    ) {
        this.x = x;
        this.y = y;
        this.element.append(this.elementX, this.elementY);
    }
    set x(value: number) {
        this.elementX.value = value.toString();
    }
    get x(): number {
        return +this.elementX.value;
    }
    set y(value: number) {
        this.elementY.value = value.toString();
    }
    get y(): number {
        return +this.elementY.value;
    }
    get disabled(): boolean {
        return this.elementX.disabled;
    }
    set disabled(value: boolean) {
        this.elementX.disabled = this.elementY.disabled = value;
    }
}

export default InteractivePositionElement;