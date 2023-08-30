import OWOPEvents from "./OWOP/events";


// Reference
export interface Vector2D {
    x: number;
    y: number;
}

export interface AuthorInfo {
    id: string;
    name: string;
    description: string;
}
export interface ArtInfoInterface {
    id: string;
    name: string;

    world: string;
    x: number;
    y: number;

    submitted: Date;

    categories: string[]; // eg porn, furry or a search function that works good instead
    description: string;
    
    
    sender: {
        id: string;
        name: string;
    }
    
    author?: {
        id?: string; // if he even uses Art2See
        name: string;
    }
    
    likes?: number;
    dislikes?: number;
    uniqueTeleports: number;
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
        buttons: number;
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
    world: {
        getPixel(x:number, y: number): [number, number, number] | undefined
    }
    fx: {
        player: {
            none: null
        }
    }
    cursors: {
        select: any;
    }
    RANK: {
        NONE: 0;
        USER: 1;
        MODERATOR: 2;
        ADMIN: 3;
    }
    tools: {
        class: any
    }
    // TODO fix typing here
    emit(eventId: typeof OWOPEvents.net.world.teleported, x: number, y: number): void;
    // windowSys: {
    //     addWindow(t: any): any
    //     centerWindow(t: any): any
    // }
    net?: {
        connection?: WebSocket
    }
    require?(name: string): any;
}

export type THEMES = "dark" | "light";