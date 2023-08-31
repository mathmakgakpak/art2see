import * as esbuild from 'esbuild'
import minimist from 'minimist';
import fs from "fs/promises";
import generateHeader from './generateHeader.mjs';
import packageJSON from "./package.json" assert { type: "json" };

const args = minimist(process.argv.slice(2));

const PRODUCTION = Boolean(args.production);
const WATCH = Boolean(args.watch);
const MINIFY = Boolean(args.minify);
const OPM = Boolean(args.opm || args.OPM);

const ctx = await esbuild.context({
    entryPoints: ["./src/index.ts"],
    outfile: "./Art2See.user.js",
    bundle: true,
    minify: PRODUCTION || MINIFY,

    loader: { '.css': 'text' }, // I would want to somehow mix the two types so it analyzes the css but outputs directly into file but idk how
    logLevel: "info",
    color: true,
    // globalName: OPM ? undefined : "A2S", // it's a bad idea to use unsafeWindow because we could by mistake expose some api e.g. GM_SetValue
    platform: "browser",
    format: "iife",
    // inject: "Buffer-shim.js", // it is needed for later when i will want to use normal or smart buffer
    define: {
        "PRODUCTION": PRODUCTION.toString(), // yes it is a boolean but you need to pass a string 
        "OPM_BUILD": OPM.toString(),
    },
    banner: {
        js: generateHeader({
            name: packageJSON.name,
            description: packageJSON.description,
            downloadURL: "http://localhost:8080/Art2See.user.js",
        })
    }
})

if(WATCH) {
    await ctx.watch();
} else {
    await ctx.rebuild();
    await ctx.dispose();
}
