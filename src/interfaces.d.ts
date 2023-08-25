
export interface Vector2D {
    x: number;
    y: number;
}
// we don't need all of the features immediately
export interface ArtInfoInterface {
    id?: number;
    name: string;
    position: Vector2D;
    submitted?: Date;

    info: {
        name: string;
        category: string; // eg porn, furry or a search function that works good instead
        description: string; // prevent xss attacks
    }
    author: {
        name: string; // probably discord one
        sent?: number; // how much art did he sent
    }
    
    likes?: number;
    dislikes?: number;
}

export interface OWOPInterface {
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
    player: {
        selectedColor: [number, number, number];
        get toolId(): number | undefined;
    }
    // TODO fix typing here
    emit(eventId: eventIds.net.world.teleported, x: number, y: number): void;
    // windowSys: {
    //     addWindow(t: any): any
    //     centerWindow(t: any): any
    // }
    net?: {
        connection?: WebSocket
    }
    require?(name: string): any;
}