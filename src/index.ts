import WindowsManager from "./WindowsManager";

import GUI from "./GUI"
// import EventEmitter from "events";
import { ArtInfoInterface } from "./interfaces";
import A2SStyle from "./styles";
import { centerCameraAt, cameraTeleport } from "./OWOP/utils";
// import {SmartBuffer} from "smart-buffer";

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
// gui.updateArtsInfo(Arts);
gui.move(window.innerWidth * 0.8, window.innerHeight * 0.2)
document.body.appendChild(windowsManager.space);




if(!PRODUCTION) {
    window.A2S = {
        centerCameraAt,
        teleport: cameraTeleport
    }
}


// const buffer = new SmartBuffer()
// buffer.writeString("123")
// console.log(buffer.toBuffer());
// document