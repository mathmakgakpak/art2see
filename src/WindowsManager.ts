
import { THEMES } from "./interfaces";
import { mkHTML } from "./utils";


export class Window {
    //  div apocalypse
    container = mkHTML("div", {
        className: "window"
    });
    titleBar = mkHTML("div", {
        className: "title"
    });
    content = mkHTML("div", {
        className: "content"
    });

    public x: number = 0;
    public y: number = 0;

    constructor(
        public windowsManager: WindowsManager,
        public name: string,
        public titleNodes: Node[]
    ) {
        this.initTitleBar();
        this.container.appendChild(this.content);
    }

    initTitleBar() { // image explaining mouseevent positions https://s1.o7planning.com/en/12293/images/36612997.png
        let offsetX: number;
        let offsetY: number;

        const onmousemove = (moveEvent: MouseEvent) => {
            this.move(moveEvent.clientX - offsetX, moveEvent.clientY - offsetY);
        }

        this.titleBar.addEventListener("mousedown", (downEvent) => {
            downEvent.stopPropagation();
            offsetX = downEvent.clientX - this.x;
            offsetY = downEvent.clientY - this.y;


            document.addEventListener("mousemove", onmousemove);
        });

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onmousemove);
        });



        this.titleBar.append(...this.titleNodes);
        this.container.appendChild(this.titleBar)
    }

    move(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.container.style.transform = `translate(${x}px, ${y}px)`;
    }
}

export default class WindowsManager {
    public windows: Window[] = [];
    public space: HTMLDivElement = mkHTML("div");
    public shadowRoot: ShadowRoot = this.space.attachShadow({ mode: "open" });
    public windowsSpace = mkHTML("div", {
        className: "windows-space"
    });

    constructor(
        private style: HTMLStyleElement,
    ) {
        this.shadowRoot.append(this.style, this.windowsSpace);
        this.changeStyle(/* localStorage.getItem() */ "dark") // window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    changeStyle(theme: THEMES) {
        this.windowsSpace.classList.remove("dark-theme", "light-theme");
        this.windowsSpace.classList.add(`${theme}-theme`);
    }
    addWindow(window: Window) {
        this.windowsSpace.appendChild(window.container);
        this.windows.push(window);
    }
}