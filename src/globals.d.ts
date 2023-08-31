import { OWOPInterface } from "./interfaces";


declare global {
    var OWOP: OWOPInterface /* | undefined */;
    var PRODUCTION: boolean;
    var OPM_BUILD: boolean;

}


export {} // needed