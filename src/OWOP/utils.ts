import { calculateDistance, sleep } from "../utils";
import OWOPEvents from "./events";
import { updatePlayerPacket } from "./packets";


const maxTeleportBeforeRebound = 500_000; // you can teleport here without any problem
const maxTeleportDistance = 10_000 - 2; // that's the maximum **distance** you can travel in one packet
// -2 just to be safe

export function centerCameraAt(x: number, y: number) {
    OWOP.emit(OWOPEvents.net.world.teleported, x, y);
}

function decenterCameraX(x: number, zoom: number) {
    return x + window.innerWidth / zoom / 2;
}
function decenterCameraY(y: number, zoom: number) {
    return y + window.innerHeight / zoom / 2;
}

/**
 * Teleports where you tell it to
 * @param x
 * @param y 
 */
export function cameraTeleport(x: number, y: number) {
    const zoom = OWOP.camera.zoom;
    const { x: mx, y: my } = OWOP.mouse;

    // decenter the coordinates so the coords we specify would be in left top corner
    const decenteredX = decenterCameraX(x, zoom);
    const decenteredY = decenterCameraY(y, zoom);
    // get how far the mouse is from the top and left edge of screen // for reference look into main.js in owop
    const cursorOffsetX = mx / zoom;
    const cursorOffsetY = my / zoom;
    // move the camera where we want
    centerCameraAt(decenteredX - cursorOffsetX, decenteredY - cursorOffsetY);
}


export function teleport(x: number, y: number) {
    const ws = OWOP.net?.connection;
    if (ws?.readyState !== WebSocket.OPEN || !OWOP) return false;

    const ABuf = updatePlayerPacket(x, y, OWOP.player.toolId || 0, OWOP.player.selectedColor);
    ws.send(ABuf);
    return true;
}

// Took it from owop it's https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
export function* line(x1: number, y1: number, x2: number, y2: number) {
    var dx = Math.abs(x2 - x1), sx = x1 < x2 ? 1 : -1;
    var dy = -Math.abs(y2 - y1), sy = y1 < y2 ? 1 : -1;
    var err = dx + dy,
        e2;

    while (true) {
        yield [x1, y1];
        if (x1 == x2 && y1 == y2) break;
        e2 = 2 * err;
        if (e2 >= dy) { err += dy; x1 += sx; }
        if (e2 <= dx) { err += dx; y1 += sy; }
    }
}
export function isOutsideTeleportBarrier(x: number, y: number) {
    return Math.abs(x) > maxTeleportBeforeRebound || Math.abs(y) > maxTeleportBeforeRebound;
}




// less event listeners more complicated
// export class EventWaiter {
//     private resolve?: () => void;
//     private reject?: (reason?: any) => void;
//     promise: Promise<void>;
//     private boundPromiseResolve: typeof this.resolvePromise
//     constructor(
//         public eventSys: any,
//         public on: any 
//     ) {
//         this.promise = this.createPromise();
//         this.boundPromiseResolve = this.resolvePromise.bind(this);
//         this.eventSys.on(on, this.boundPromiseResolve);
//     }
//     createPromise() {
//         return new Promise<void>((resolve, reject) => {
//             this.resolve = resolve;
//             this.reject = reject;
//         });
//     }

//     private resolvePromise() {
//         this.resolve?.();
//         this.promise = this.createPromise();
//     }
//     destroy() {
//         this.reject?.("Destroyed the EventWaiter. If you see this you probably destroyed the eventWaiter before waiting for promisem to finish.");
//         // this.promise = undefined; // complicates a lot
//         this.eventSys.removeListener(this.on, this.boundPromiseResolve);
//     }
// }

// export function waitForEventOnce(eventSys: any, event: any) {
//     return new Promise(r => eventSys.once(event, r))
// }


function getLastPixelBeforeBarrier(x1: number, y1: number, x2: number, y2: number) {
    let lastX = x1; // last x passing before barrier
    let lastY = y1;
    let shouldBreakIfOutsideTheBorder = false;
    for (const [tpX, tpY] of line(lastX, lastY, x2, y2)) {
        if(isOutsideTeleportBarrier(tpX, tpY)) {
            if(shouldBreakIfOutsideTheBorder) {
                break;
            }
        } else {
            shouldBreakIfOutsideTheBorder = true;
            lastX = tpX;
            lastY = tpY;
        }
    }
    if(!shouldBreakIfOutsideTheBorder) return; // it didn't cross the barrier
    return {
        x: lastX,
        y: lastY
    };
}




let farTeleporting = false;

// if i wanted to replace the wait I would probably need to overhear the websocket communication and get the player id from world update see: https://i.imgur.com/x9CjWfo.png
/**
 * 
 * @param x 
 * @param y 
 * @param delay - amount of ms to wait after each teleport 
 * @returns false if it can't teleport because it is already teleporting or number of teleports  
 */
export async function farTeleport(x: number, y: number, delay: number = 200, forceCamera: boolean = false ) {
    if (farTeleporting) return false;
    
    // starting point x
    let { tileX: spx, tileY: spy } = OWOP.mouse;
    if(spx === x && spy === y) return 0;

    farTeleporting = true;

    let tpMethod;
    let updatePlayerCopy: any;
    if (OWOP.net && !forceCamera) {
        tpMethod = teleport;
        // @ts-ignore - preventing user from sending move packets
        updatePlayerCopy = OWOP.net.protocol.constructor.prototype.sendUpdates;
        // @ts-ignore
        OWOP.net.protocol.constructor.prototype.sendUpdates = () => { };
    } else {
        tpMethod = cameraTeleport; // sadly I don't know any way to prevent chunk requesting
    }
    
    async function finish() {
        centerCameraAt(x, y);
        await sleep(delay);

        if (updatePlayerCopy) {
            // @ts-ignore
            OWOP.net.protocol.constructor.prototype.sendUpdates = updatePlayerCopy;
            // @ts-ignore
            OWOP.net.protocol.sendUpdates();
            await sleep(delay);
        }
        farTeleporting = false;
    }

    if(!isOutsideTeleportBarrier(x, y)) {
        tpMethod(x, y);
        await sleep(delay);

        await finish();
        return 1;
    }
    

    // trying to skip some of the road by checking if it's faster going directly to the barrier and skipping a lot of pixles
    // idk how to explain
    // check if any x or y passes through spawn
    const distanceFromPlayerToDestination = calculateDistance(spx, spy, x, y);
    // create a line from player to destination the barrier and get
    // last pixel before passing the barrier if it exists
    const pixelPassingTheBarrier = getLastPixelBeforeBarrier(spx, spy, x, y)
    const distanceFromPixel = pixelPassingTheBarrier ? calculateDistance(pixelPassingTheBarrier.x, pixelPassingTheBarrier.y, x, y) : Infinity;
    // ^
    const distanceFromSpawnToDestination = calculateDistance(0, 0, x, y);
    
    const shortest = Math.min(distanceFromPlayerToDestination, distanceFromPixel, distanceFromSpawnToDestination);

    if(shortest === distanceFromPixel && pixelPassingTheBarrier) {
        spx = pixelPassingTheBarrier.x;
        spy = pixelPassingTheBarrier.y;
        tpMethod(spx, spy)
        await sleep(delay);
        // console.log("From player to barrier", pixelPassingTheBarrier.distance)
    } else if(shortest === distanceFromSpawnToDestination) {
        const fromSpawnToBarrier = getLastPixelBeforeBarrier(spx, spy, x, y)
        if (fromSpawnToBarrier) {
            spx = fromSpawnToBarrier.x;
            spy = fromSpawnToBarrier.y;
            tpMethod(spx, spy)
            await sleep(delay);
        }
        // console.log("From spawn to barrier", fromSpawnToBarrier.distance);
    }/*  else {
        console.log("From player to destination", distanceFromPlayerToDestination);
    } */
    
    
    // console.log(spx, spy, shortest);
    let [lastX, lastY] = [spx, spy];
    let teleports = 0;
    let distanceLeft = shortest;
    while (distanceLeft > 0) {
        const distance = distanceLeft >= maxTeleportDistance ? maxTeleportDistance : distanceLeft;
        distanceLeft -= distance;

        const angle = Math.atan2(y - lastY, x - lastX); // NOTE maybe put these outside the while loop later
        const xJump = Math.cos(angle) * distance;
        const yJump = Math.sin(angle) * distance;

        lastX += xJump;
        lastY += yJump;

        tpMethod(lastX, lastY);
        teleports++;
        // console.log(
        //     `Angle: ${angle} ${angle * 180 / Math.PI}\n` +
        //     `Jump: ${xJump} ${yJump}\n` +
        //     `Distance:${Math.hypot(xJump, yJump)} ${distance}\n` +
        //     `Distance left: ${distanceLeft}`
        // );
        
        await sleep(delay);
    }

    // console.log(lastX, lastY, x, y, Math.hypot(x - lastX, y - lastY), "last");

    await finish();
    
    return teleports;
}
