// import type { Properties as CSSProperties } from "csstype"


export function mkHTML<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    properties?: Partial<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
    const elm = document.createElement(tag);
    if (properties) for (const i in properties) {
        // @ts-ignore 
        elm[i as any] = properties[i];
    }
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