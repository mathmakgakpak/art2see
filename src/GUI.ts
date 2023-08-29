import { mkHTML } from "./utils";

import Page from "./GUIPage";
import HomePage from "./GUIPages/home";
import CollectionPage from "./GUIPages/collection";
import { Window } from "./WindowsManager";
import TeleportPage from "./GUIPages/teleport";
import { THEMES } from "./interfaces";

class GUI extends Window {
    pageButtonsElements: HTMLDivElement = mkHTML("div", {
        className: "page-buttons"
    });

    homePage = new HomePage();
    
    collectionPage = new CollectionPage();

    teleportPage = new TeleportPage();
    
    pages: Readonly<Page[]> = [this.homePage, this.collectionPage, this.teleportPage];
    theme: THEMES = "dark";

    constructor() {
        const titleNodes: (HTMLSpanElement | HTMLButtonElement)[] = ["Art", "2", "See"].map(x => mkHTML("span", {
            textContent: x
        }));
        const changeStyleButton = mkHTML("button", {
            textContent: "🌕"
        });
        
        changeStyleButton.addEventListener("click", () => {
            if(this.theme === "light") {
                this.theme = "dark";
                changeStyleButton.textContent = "🌕";
            } else {
                this.theme = "light";
                changeStyleButton.textContent = "☀";
            }
            this.REQUEST_STYLE_CHANGE(this.theme);
        });
        titleNodes.push(changeStyleButton);

        super("Main", titleNodes);
        
        this.container.classList.add("main-window")

        this.initPageButtons();
        this.initPages();
    }

    initPageButtons() {
        for(const page of this.pages) {
            const button = mkHTML("button", {
                textContent: page.name
            });

            button.addEventListener("click", () => {
                this.switchPage(page.name);
            });

            this.pageButtonsElements.appendChild(button);
        }

        this.content.append(this.pageButtonsElements);
    }
    
    initPages() {
        this.collectionPage.ON_USER_REQUESTS_TELEPORT = (x: number, y: number) => {
            this.teleportPage.position.x = x;
            this.teleportPage.position.y = y;
            this.switchPage("Teleport");
        }

        this.switchPage("Home");
        
        for(const page of this.pages) {
            this.content.appendChild(page.pageElement);
        }
    }

    switchPage(name: string) {
        // shows page that it should and hides other pages
        for(const page of this.pages) {
            page.isVisible = page.name === name;
        }
    }
}

export default GUI