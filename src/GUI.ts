import { mkHTML } from "./utils";
import A2SStyle from "./styles";
import { ArtInfoInterface } from "./interfaces";

import Page from "./GUIPage";
import HomePage from "./GUIPages/home";
import CollectionPage from "./GUIPages/collection";
import { Window } from "./WindowsManager";
// TODO add this somewhere https://github.com/LapisHusky/betteropm
class GUI extends Window {
    pageButtonsElements: HTMLDivElement = mkHTML("div");

    homePage = new HomePage();
    
    collectionPage = new CollectionPage();
    
    pages: Readonly<Page[]> = [this.homePage, this.collectionPage];

    constructor() {
        const titleNodes = ["Art", "2", "See"].map(x => mkHTML("span", {
            textContent: x
        }));

        super("Main", titleNodes);
        
        this.container.classList.add("main-window")
        this.titleBar.classList.add("A2S-main-window-title")

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