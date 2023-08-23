"use strict";
(() => {
  // src/utils.ts
  function mkHTML(tag, properties) {
    const elm = document.createElement(tag);
    if (properties)
      for (const i in properties) {
        elm[i] = properties[i];
      }
    return elm;
  }

  // src/WindowsManager.ts
  var Window = class {
    constructor(name, titleNodes) {
      this.name = name;
      this.titleNodes = titleNodes;
      this.initTitleBar();
      this.container.appendChild(this.content);
    }
    //  div apocalypse
    container = mkHTML("div", {
      className: "window"
    });
    titleBar = mkHTML("div");
    content = mkHTML("div");
    x = 0;
    y = 0;
    initTitleBar() {
      let offsetX;
      let offsetY;
      const onmousemove = (moveEvent) => {
        this.move(moveEvent.clientX - offsetX, moveEvent.clientY - offsetY);
      };
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
      this.container.appendChild(this.titleBar);
    }
    move(x, y) {
      this.x = x;
      this.y = y;
      this.container.style.transform = `translate(${x}px, ${y}px)`;
    }
  };
  var WindowsManager = class {
    constructor(style) {
      this.style = style;
      this.shadowRoot.appendChild(this.style);
    }
    windows = [];
    space = mkHTML("div");
    shadowRoot = this.space.attachShadow({ mode: "open" });
    addWindow(window2) {
      this.shadowRoot.appendChild(window2.container);
      this.windows.push(window2);
    }
  };

  // src/GUIPage.ts
  var Page = class {
    constructor(name, className) {
      this.name = name;
      this.pageElement = mkHTML("div", {
        className: "Page"
      });
      if (className.length)
        this.pageElement.classList.add(className);
    }
    pageElement;
    get isVisible() {
      return this.pageElement.style.display !== "none";
    }
    set isVisible(value) {
      this.pageElement.style.display = value ? "" : "none";
    }
  };
  var GUIPage_default = Page;

  // src/GUIPages/home.ts
  var HomePage = class extends GUIPage_default {
    constructor() {
      super("Home", "");
      const test = mkHTML("div");
      test.innerText = "bob <a>";
      this.pageElement.appendChild(test);
    }
  };
  var home_default = HomePage;

  // src/GUIPages/collection.ts
  var CollectionPage = class extends GUIPage_default {
    rows = mkHTML("div");
    constructor() {
      super("Collection", "");
      this.pageElement.appendChild(this.rows);
    }
    addArt(artInfo) {
      const row = mkHTML(
        "div"
        /* {
            display: "flex"
        } */
      );
      const nameField = mkHTML("div");
      nameField.innerHTML = artInfo.name;
      row.appendChild(nameField);
      const coordsField = mkHTML("div");
      coordsField.innerHTML = `X: ${artInfo.position.x} Y: ${artInfo.position.x}`;
      coordsField.addEventListener("click", (mouseEvent) => {
      });
      row.appendChild(coordsField);
      this.rows.appendChild(row);
      return row;
    }
    updateArtsInfo(artsInfo) {
      Array.from(this.rows.children).forEach((x) => x.remove());
      artsInfo.forEach((artInfo) => this.addArt(artInfo));
    }
  };
  var collection_default = CollectionPage;

  // src/GUI.ts
  var GUI = class extends Window {
    pageButtonsElements = mkHTML("div");
    homePage = new home_default();
    collectionPage = new collection_default();
    pages = [this.homePage, this.collectionPage];
    constructor() {
      const titleNodes = ["Art", "2", "See"].map((x) => mkHTML("span", {
        textContent: x
      }));
      super("Main", titleNodes);
      this.container.classList.add("main-window");
      this.titleBar.classList.add("A2S-main-window-title");
      this.initPageButtons();
      this.initPages();
    }
    initPageButtons() {
      for (const page of this.pages) {
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
      for (const page of this.pages) {
        this.content.appendChild(page.pageElement);
      }
    }
    switchPage(name) {
      for (const page of this.pages) {
        page.isVisible = page.name === name;
      }
    }
  };
  var GUI_default = GUI;

  // src/A2NStyles.css
  var A2NStyles_default = ":host {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    pointer-events: none; /* prevent from clicking */\r\n}\r\n:root {\r\n    /* https://realtimecolors.com/?colors=091b11-ecf9f2-9abbdf-f2e1d4-be3c83 */\r\n    --text: #091b11;\r\n    --background: #ecf9f2;\r\n    --primary: #9abbdf;\r\n    --secondary: #f2e1d4;\r\n    --accent: #be3c83;\r\n}\r\n\r\n/* button {\r\n    \r\n}  */\r\n\r\n.window {\r\n    position: absolute;\r\n    pointer-events: initial;\r\n}\r\n\r\n.main-window {\r\n    background-color: rgba(192, 199, 200, 1.0);\r\n    \r\n    border: 3px solid;\r\n    border-color: #a89f90;\r\n    border-radius: 5px;\r\n}\r\n.A2S-main-window-title {\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n.A2S-main-window-title > :nth-child(1) {\r\n    color: #c41958;\r\n}\r\n.A2S-main-window-title > :nth-child(2) {\r\n    color: #37d644;\r\n}\r\n.A2S-main-window-title > :nth-child(3) {\r\n    color: #4237d6;\r\n}\r\n\r\n\r\n.Page {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n";

  // src/styles.ts
  var A2SStyle = mkHTML("style", {
    textContent: A2NStyles_default
  });
  var styles_default = A2SStyle;

  // src/OWOP/events.ts
  var evtId = OWOP.events.loaded - 1;
  var eventIds = {
    loaded: ++evtId,
    init: ++evtId,
    tick: ++evtId,
    misc: {
      toolsRendered: ++evtId,
      toolsInitialized: ++evtId,
      logoMakeRoom: ++evtId,
      worldInitialized: ++evtId,
      windowAdded: ++evtId,
      captchaToken: ++evtId,
      loadingCaptcha: ++evtId
    },
    renderer: {
      addChunk: ++evtId,
      rmChunk: ++evtId,
      updateChunk: ++evtId
    },
    camera: {
      moved: ++evtId,
      zoom: ++evtId
      /* (zoom value), note that this event should not be used to SET zoom level. */
    },
    net: {
      connecting: ++evtId,
      connected: ++evtId,
      disconnected: ++evtId,
      playerCount: ++evtId,
      chat: ++evtId,
      devChat: ++evtId,
      world: {
        leave: ++evtId,
        join: ++evtId,
        /* (worldName string) */
        joining: ++evtId,
        /* (worldName string) */
        setId: ++evtId,
        playersMoved: ++evtId,
        /* (Object with all the updated player values) */
        playersLeft: ++evtId,
        tilesUpdated: ++evtId,
        teleported: ++evtId
      },
      chunk: {
        load: ++evtId,
        /* (Chunk class) */
        unload: ++evtId,
        /* (x, y) */
        set: ++evtId,
        /* (x, y, data), backwards compat */
        lock: ++evtId,
        allLoaded: ++evtId
      },
      sec: {
        rank: ++evtId
      },
      maxCount: ++evtId,
      donUntil: ++evtId
    }
  };

  // src/OWOP/utils.ts
  function centerCameraAt(x, y) {
    OWOP.emit(eventIds.net.world.teleported, x, y);
  }
  function decenterCameraX(x) {
    return x + window.innerWidth / OWOP.camera.zoom / 2;
  }
  function decenterCameraY(y) {
    return y + window.innerHeight / OWOP.camera.zoom / 2;
  }
  function cameraTeleport(x, y) {
    const decenteredX = decenterCameraX(x);
    const decenteredY = decenterCameraY(y);
    const cursorOffsetX = OWOP.mouse.x / OWOP.camera.zoom;
    const cursorOffsetY = OWOP.mouse.y / OWOP.camera.zoom;
    centerCameraAt(decenteredX - cursorOffsetX, decenteredY - cursorOffsetY);
  }

  // src/index.ts
  var windowsManager = new WindowsManager(styles_default);
  var gui = new GUI_default();
  windowsManager.addWindow(gui);
  var Arts = [];
  for (let i = 0; i < 12; i++) {
    Arts.push(
      // @ts-ignore just for now
      {
        name: "test",
        position: {
          x: 13,
          y: 43
        }
      }
    );
  }
  gui.move(window.innerWidth * 0.8, window.innerHeight * 0.2);
  document.body.appendChild(windowsManager.space);
  if (true) {
    window.A2S = {
      centerCameraAt,
      teleport: cameraTeleport
    };
  }
})();
