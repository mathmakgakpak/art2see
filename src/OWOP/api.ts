import { OWOPInterface } from "../interfaces";
import { sleep } from "../utils";
import getEvents from "./getEvents";

interface AvailableApis {
    vanilla: OWOPInterface,
    get net(): OWOPInterface["net"],
    require: OWOPInterface["require"],
    eventsList: ReturnType<typeof getEvents>;
}

export const availableApis: AvailableApis = {
    // @ts-ignore
    vanilla: undefined,
    get net() {
        return OWOP?.net;
    },
    require: undefined,
    eventsList: getEvents()
}
export let loaded = false;





export async function checkOWOPAvailability() {
    if(loaded) return true;
    // wait for OWOP to be availible
    {
        let i = 0;
        while(!OWOP) {
            await sleep(10);
            i += 10;
            if(i >= 20_000) {
                 // failed to load
                return false;
            }
        }
    }
    availableApis.vanilla = OWOP;

    if(OWOP.events.loaded - 1 !== 0) {
        availableApis.eventsList = getEvents(OWOP.events.loaded - 1);
    }
    

    // {
    //     let i = 0;
    //     while(!OWOP.net && i < 1_000) {
    //         await sleep(10);
    //         i += 10;
    //     }
    // }
    // // availableApis.net = OWOP.net;

    {
        let i = 0;
        while(!OWOP.require && i < 1_000) {
            await sleep(10);
            i += 10;
        }
    }
    availableApis.require = OWOP.require;

    loaded = true;
    return true;
}




