
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