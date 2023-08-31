import WindowsManager from "./WindowsManager";

import GUI from "./GUI"
// import EventEmitter from "events";
import { ArtInfoInterface } from "./interfaces";
import A2SStyle from "./styles";
import { centerCameraAt, cameraTeleport, farTeleport, isOutsideTeleportBarrier, teleport } from "./OWOP/utils";
import { sleep } from "./utils";
// import {SmartBuffer} from "smart-buffer";


function load() {
    const windowsManager = new WindowsManager(A2SStyle);
    const gui = new GUI(windowsManager);
    windowsManager.addWindow(gui);

    const Arts: ArtInfoInterface[] = [];
    for (let i = 0; i < 5; i++) {
        Arts.push(
            {
                name: "Cute anime woman",
                world: "",
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,

                id: "bob fake id",
                categories: ["NSFW", "anime"],
                description: "big bo-obs anime woman",
                sender: {
                    id: "someuserid",
                    name: "Anime Lover"
                },
                uniqueTeleports: 0,
                submitted: new Date()
            }
        )
    }
    gui.collectionPage.updateArtsInfo(Arts);

    gui.move(window.innerWidth * 0.8, window.innerHeight * 0.2)
    document.body.appendChild(windowsManager.space);
}

window.addEventListener("load", load, { once: true });

if (!PRODUCTION) {
    module.exports = {
        centerCameraAt,
        cameraTeleport,
        farTeleport,
        isOutsideTeleportBarrier,
        teleport,
        // require(name: string) {
        //     // if(name === "A2NStyles.css") return;
        //     // TODO finish it
        //     return require(`./OWOP/${name}.ts`);
        // }
    }
}

// const buffer = new SmartBuffer()
// buffer.writeString("123")
// console.log(buffer.toBuffer());
// document