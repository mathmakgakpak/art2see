"use strict";
var A2S = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/utils.ts
  function mkHTML(tag, properties) {
    const elm = document.createElement(tag);
    if (properties)
      for (const i in properties) {
        elm[i] = properties[i];
      }
    return elm;
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function calculateDistance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }
  var init_utils = __esm({
    "src/utils.ts"() {
      "use strict";
    }
  });

  // src/WindowsManager.ts
  var Window, WindowsManager;
  var init_WindowsManager = __esm({
    "src/WindowsManager.ts"() {
      "use strict";
      init_utils();
      Window = class {
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
      WindowsManager = class {
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
    }
  });

  // src/GUIPage.ts
  var Page, GUIPage_default;
  var init_GUIPage = __esm({
    "src/GUIPage.ts"() {
      "use strict";
      init_utils();
      Page = class {
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
      GUIPage_default = Page;
    }
  });

  // src/GUIPages/home.ts
  var HomePage, home_default;
  var init_home = __esm({
    "src/GUIPages/home.ts"() {
      "use strict";
      init_GUIPage();
      init_utils();
      HomePage = class extends GUIPage_default {
        constructor() {
          super("Home", "");
          const test = mkHTML("div");
          test.innerText = "bob <a>";
          this.pageElement.appendChild(test);
        }
      };
      home_default = HomePage;
    }
  });

  // src/GUIPages/collection.ts
  var CollectionPage, collection_default;
  var init_collection = __esm({
    "src/GUIPages/collection.ts"() {
      "use strict";
      init_GUIPage();
      init_utils();
      CollectionPage = class extends GUIPage_default {
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
      collection_default = CollectionPage;
    }
  });

  // src/GUI.ts
  var GUI, GUI_default;
  var init_GUI = __esm({
    "src/GUI.ts"() {
      "use strict";
      init_utils();
      init_home();
      init_collection();
      init_WindowsManager();
      GUI = class extends Window {
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
      GUI_default = GUI;
    }
  });

  // src/A2NStyles.css
  var A2NStyles_default;
  var init_A2NStyles = __esm({
    "src/A2NStyles.css"() {
      A2NStyles_default = ":host {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    pointer-events: none; /* prevent from clicking */\r\n}\r\n:root {\r\n    /* https://realtimecolors.com/?colors=091b11-ecf9f2-9abbdf-f2e1d4-be3c83 */\r\n    --text: #091b11;\r\n    --background: #ecf9f2;\r\n    --primary: #9abbdf;\r\n    --secondary: #f2e1d4;\r\n    --accent: #be3c83;\r\n}\r\n\r\n/* button {\r\n    \r\n}  */\r\n\r\n.window {\r\n    position: absolute;\r\n    pointer-events: initial;\r\n}\r\n\r\n.main-window {\r\n    background-color: rgba(192, 199, 200, 1.0);\r\n    \r\n    border: 3px solid;\r\n    border-color: #a89f90;\r\n    border-radius: 5px;\r\n}\r\n.A2S-main-window-title {\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n.A2S-main-window-title > :nth-child(1) {\r\n    color: #c41958;\r\n}\r\n.A2S-main-window-title > :nth-child(2) {\r\n    color: #37d644;\r\n}\r\n.A2S-main-window-title > :nth-child(3) {\r\n    color: #4237d6;\r\n}\r\n\r\n\r\n.Page {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n";
    }
  });

  // src/styles.ts
  var A2SStyle, styles_default;
  var init_styles = __esm({
    "src/styles.ts"() {
      "use strict";
      init_utils();
      init_A2NStyles();
      A2SStyle = mkHTML("style", {
        innerHTML: A2NStyles_default
      });
      styles_default = A2SStyle;
    }
  });

  // src/OWOP/getEvents.ts
  function getEvents(evtId = 0) {
    return {
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
  }
  var init_getEvents = __esm({
    "src/OWOP/getEvents.ts"() {
      "use strict";
    }
  });

  // src/OWOP/api.ts
  async function checkOWOPAvailability() {
    if (loaded)
      return true;
    {
      let i = 0;
      while (!OWOP) {
        await sleep(10);
        i += 10;
        if (i >= 2e4) {
          return false;
        }
      }
    }
    availableApis.vanilla = OWOP;
    if (OWOP.events.loaded - 1 !== 0) {
      availableApis.eventsList = getEvents(OWOP.events.loaded - 1);
    }
    {
      let i = 0;
      while (!OWOP.require && i < 1e3) {
        await sleep(10);
        i += 10;
      }
    }
    availableApis.require = OWOP.require;
    loaded = true;
    return true;
  }
  var availableApis, loaded;
  var init_api = __esm({
    "src/OWOP/api.ts"() {
      "use strict";
      init_utils();
      init_getEvents();
      availableApis = {
        // @ts-ignore
        vanilla: void 0,
        get net() {
          return OWOP?.net;
        },
        require: void 0,
        eventsList: getEvents()
      };
      loaded = false;
    }
  });

  // src/OWOP/packets.ts
  function updatePlayerPacket(x, y, toolId, selectedColor) {
    const array = new ArrayBuffer(12);
    const dv = new DataView(array);
    dv.setInt32(0, x * 16, true);
    dv.setInt32(4, y * 16, true);
    dv.setUint8(8, selectedColor[0]);
    dv.setUint8(9, selectedColor[1]);
    dv.setUint8(10, selectedColor[2]);
    dv.setUint8(11, toolId);
    return array;
  }
  var init_packets = __esm({
    "src/OWOP/packets.ts"() {
      "use strict";
    }
  });

  // src/OWOP/utils.ts
  function centerCameraAt(x, y) {
    if (availableApis.vanilla)
      availableApis.vanilla.emit(availableApis.eventsList.net.world.teleported, x, y);
  }
  function decenterCameraX(x, zoom) {
    return x + window.innerWidth / zoom / 2;
  }
  function decenterCameraY(y, zoom) {
    return y + window.innerHeight / zoom / 2;
  }
  function cameraTeleport(x, y) {
    const zoom = availableApis.vanilla.camera.zoom;
    const { x: mx, y: my } = availableApis.vanilla.mouse;
    const decenteredX = decenterCameraX(x, zoom);
    const decenteredY = decenterCameraY(y, zoom);
    const cursorOffsetX = mx / zoom;
    const cursorOffsetY = my / zoom;
    centerCameraAt(decenteredX - cursorOffsetX, decenteredY - cursorOffsetY);
  }
  function teleport(x, y) {
    const ws = availableApis.net?.connection;
    if (ws?.readyState !== WebSocket.OPEN || !availableApis.vanilla)
      return false;
    const ABuf = updatePlayerPacket(x, y, availableApis.vanilla.player.toolId || 0, availableApis.vanilla.player.selectedColor);
    ws.send(ABuf);
    return true;
  }
  function* line(x1, y1, x2, y2) {
    var dx = Math.abs(x2 - x1), sx = x1 < x2 ? 1 : -1;
    var dy = -Math.abs(y2 - y1), sy = y1 < y2 ? 1 : -1;
    var err = dx + dy, e2;
    while (true) {
      yield [x1, y1];
      if (x1 == x2 && y1 == y2)
        break;
      e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x1 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y1 += sy;
      }
    }
  }
  function isOutsideTeleportBarrier(x, y) {
    return Math.abs(x) > maxTeleportBeforeRebound || Math.abs(y) > maxTeleportBeforeRebound;
  }
  function getLastPixelBeforeBarrier(x1, y1, x2, y2) {
    let lastX = x1;
    let lastY = y1;
    let shouldBreakIfOutsideTheBorder = false;
    for (const [tpX, tpY] of line(lastX, lastY, x2, y2)) {
      if (isOutsideTeleportBarrier(tpX, tpY)) {
        if (shouldBreakIfOutsideTheBorder) {
          break;
        }
      } else {
        shouldBreakIfOutsideTheBorder = true;
        lastX = tpX;
        lastY = tpY;
      }
    }
    if (!shouldBreakIfOutsideTheBorder)
      return;
    return {
      x: lastX,
      y: lastY,
      distance: calculateDistance(lastX, lastY, x2, y2)
    };
  }
  async function farTeleport(x, y, wait = 200, forceCamera = false) {
    if (farTeleporting)
      return false;
    let { tileX: spx, tileY: spy } = availableApis.vanilla.mouse;
    if (spx === x && spy === y)
      return 0;
    farTeleporting = true;
    let tpMethod;
    let updatePlayerCopy;
    if (availableApis.net && !forceCamera) {
      tpMethod = teleport;
      updatePlayerCopy = availableApis.net.protocol.constructor.prototype.sendUpdates;
      availableApis.net.protocol.constructor.prototype.sendUpdates = () => {
      };
    } else {
      tpMethod = cameraTeleport;
    }
    async function finish() {
      centerCameraAt(x, y);
      await sleep(wait);
      if (updatePlayerCopy) {
        availableApis.net.protocol.constructor.prototype.sendUpdates = updatePlayerCopy;
        availableApis.net.protocol.sendUpdates();
        await sleep(wait);
      }
      farTeleporting = false;
    }
    if (!isOutsideTeleportBarrier(x, y)) {
      tpMethod(x, y);
      await sleep(wait);
      await finish();
      return 1;
    }
    const distanceFromPlayerToDestination = calculateDistance(spx, spy, x, y);
    const pixelPassingTheBarrier = getLastPixelBeforeBarrier(spx, spy, x, y);
    const fromSpawnToBarrier = getLastPixelBeforeBarrier(0, 0, x, y);
    const shortest = Math.min(distanceFromPlayerToDestination, pixelPassingTheBarrier?.distance || Infinity, fromSpawnToBarrier?.distance || Infinity);
    if (shortest === pixelPassingTheBarrier?.distance) {
      spx = pixelPassingTheBarrier.x;
      spy = pixelPassingTheBarrier.y;
      tpMethod(spx, spy);
      await sleep(wait);
    } else if (shortest === fromSpawnToBarrier?.distance) {
      spx = fromSpawnToBarrier.x;
      spy = fromSpawnToBarrier.y;
      tpMethod(spx, spy);
      await sleep(wait);
    }
    let [lastX, lastY] = [spx, spy];
    let teleports = 0;
    let distanceLeft = shortest;
    while (distanceLeft > 0) {
      const distance = distanceLeft >= maxTeleportDistance ? maxTeleportDistance : distanceLeft;
      distanceLeft -= distance;
      const angle = Math.atan2(y - lastY, x - lastX);
      const xJump = Math.cos(angle) * distance;
      const yJump = Math.sin(angle) * distance;
      lastX += xJump;
      lastY += yJump;
      tpMethod(lastX, lastY);
      teleports++;
      await sleep(wait);
    }
    await finish();
    return teleports;
  }
  var maxTeleportBeforeRebound, maxTeleportDistance, farTeleporting;
  var init_utils2 = __esm({
    "src/OWOP/utils.ts"() {
      "use strict";
      init_utils();
      init_api();
      init_packets();
      maxTeleportBeforeRebound = 5e5;
      maxTeleportDistance = 1e4 - 2;
      farTeleporting = false;
    }
  });

  // src/index.ts
  var require_src = __commonJS({
    "src/index.ts"(exports, module) {
      init_WindowsManager();
      init_GUI();
      init_styles();
      init_utils2();
      init_api();
      async function load() {
        if (!await checkOWOPAvailability()) {
          console.error("No OWOP variable or the site took too long to load");
          return;
        }
        const windowsManager = new WindowsManager(styles_default);
        const gui = new GUI_default();
        windowsManager.addWindow(gui);
        const Arts = [];
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
      }
      if (false) {
        window.addEventListener("load", load, { once: true });
      } else {
        load();
      }
      if (true) {
        module.exports = {
          centerCameraAt,
          cameraTeleport,
          farTeleport,
          isOutsideTeleportBarrier,
          availableApis,
          teleport
          // require(name: string) {
          //     // if(name === "A2NStyles.css") return;
          //     // TODO finish it
          //     return require(`./OWOP/${name}.ts`);
          // }
        };
      }
    }
  });
  return require_src();
})();
