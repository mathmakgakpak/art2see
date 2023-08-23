import { eventIds } from "./events"


const maxTeleportBeforeRebound = 500_000; // you can teleport here without any problem
const maxTeleportDistance =  10_000; // that's the maximum **distance** you can travel in one packet

/* some bullshit
// const maxTeleportDistance = Math.sqrt(maxTeleportDistanceInOneDirectionAfterBarrier ** 2 / 2) ;
a**2 + b**2 = c**2

\sqrt(2a**2) = c
*/

/*
var x = 507_071; // tje
A2S.teleport(x, x)
*/
export function centerCameraAt(x: number, y: number) {
    OWOP.emit(eventIds.net.world.teleported, x, y);
}

function decenterCameraX(x: number) {
    return x + window.innerWidth / OWOP.camera.zoom / 2;
}
function decenterCameraY(y: number) {
    return y + window.innerHeight / OWOP.camera.zoom / 2;
}

/**
 * Teleports where you tell it to
 * @param x
 * @param y 
 */
export function cameraTeleport(x: number, y: number) {
    // decenter the coordinates so the coords we specify would be in left top corner
    const decenteredX = decenterCameraX(x);
    const decenteredY = decenterCameraY(y);
    // get how far the mouse is from the top and left edge of screen // for reference look into main.js in owop
    const cursorOffsetX = OWOP.mouse.x / OWOP.camera.zoom;
    const cursorOffsetY = OWOP.mouse.y / OWOP.camera.zoom;
    // move the camera where we want
    centerCameraAt(decenteredX - cursorOffsetX, decenteredY - cursorOffsetY);
}


export async function farTeleport(x: number, y: number, wait: number = 50) {
    
}
