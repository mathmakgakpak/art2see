// import type { Properties as CSSProperties } from "csstype"



function copyOn(obj: any, objToCopy: any) {
    for (const key in objToCopy) {
        let value = objToCopy[key];
        if (typeof obj[key] === "object" && typeof value === "object") {
            copyOn(obj[key], value);
            continue;
        }
        obj[key] = value;
    }
}

// window.sdf = {asd: {gfh: "lll"}, add: "2"};
// window.asdg = copyOn(sdf, {asd: {gf: "brr"}})



export function mkHTML<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    properties?: Partial<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
    const elm = document.createElement(tag);
    if (properties) copyOn(elm, properties);
    return elm;
}

export function addTextBeforeElement(text: string, element: Node) {
    const container = mkHTML("div");
    // const textElement = mkHTML("span", {
    //     textContent: text
    // });

    container.append(text, element);

    return container;
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    // it doesn't matter which one is bigger or smaller
    return Math.hypot(x2 - x1, y2 - y1);
}