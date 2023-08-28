import { OWOPInterface } from "./interfaces";


declare global {
    var OWOP: OWOPInterface /* | undefined */;
    var PRODUCTION: boolean;

}


export {} // needed