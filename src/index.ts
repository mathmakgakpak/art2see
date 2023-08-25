import WindowsManager from "./WindowsManager";

import GUI from "./GUI"
// import EventEmitter from "events";
import { ArtInfoInterface } from "./interfaces";
import A2SStyle from "./styles";
import { centerCameraAt, cameraTeleport, farTeleport, isOutsideTeleportBarrier, teleport } from "./OWOP/utils";
import { availableApis, checkOWOPAvailability } from "./OWOP/api";
// import {SmartBuffer} from "smart-buffer";



async function load() {
    if(!await checkOWOPAvailability()) {
        console.error("No OWOP variable or the site took too long to load");
        return;
    }

    const windowsManager = new WindowsManager(A2SStyle);
    const gui = new GUI();
    windowsManager.addWindow(gui);

    const Arts: ArtInfoInterface[] = [];
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
        )
    }

    gui.move(window.innerWidth * 0.8, window.innerHeight * 0.2)
    document.body.appendChild(windowsManager.space);
}

if(PRODUCTION) {
    window.addEventListener("load", load, {once: true});
} else {
    load();
}

if(!PRODUCTION) {
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
    }
}

// const buffer = new SmartBuffer()
// buffer.writeString("123")
// console.log(buffer.toBuffer());
// document