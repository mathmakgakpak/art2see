


interface OWOP {
    events: {
        loaded: number; // most likely 1
    }
    camera: {
        get zoom(): number;
        get x(): number;
        get y(): number;
    }
    mouse: {
        x: number; // it is not a getter but idk if you can change it
        y: number;
        get tileX(): number; // what tile (integer)
        get tileY(): number;
        get worldX(): number; // float
        get worldY(): number;
    }
    emit(eventId: eventIds.net.world.teleported, x: number, y: number): void;
    // windowSys: {
    //     addWindow(t: any): any
    //     centerWindow(t: any): any
    // }
}



declare global {
    var OWOP: OWOP;
    var A2S: any;
    var PRODUCTION: boolean;
}


export {} // needed