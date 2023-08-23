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

