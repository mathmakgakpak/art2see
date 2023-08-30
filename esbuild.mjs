import * as esbuild from 'esbuild'
import minimist from 'minimist';
import fs from "fs/promises";

const args = minimist(process.argv.slice(2));

const PRODUCTION = Boolean(args.production);
const WATCH = Boolean(args.watch);
const MINIFY = Boolean(args.minify);

const ctx = await esbuild.context({
    entryPoints: ["./src/index.ts"],
    outfile: "./Art2See.user.js",
    bundle: true,
    minify: PRODUCTION || MINIFY,

    loader: { '.css': 'text' }, // I would want to somehow mix the two types so it analyzes the css but outputs directly into file but idk how
    logLevel: "info",
    color: true,
    globalName: "A2S",
    platform: "browser",
    format: "iife",
    // inject: "Buffer-shim.js", // it is needed for later when i will want to use normal or smart buffer
    define: {
        "PRODUCTION": PRODUCTION.toString() // yes it is a boolean but you need to pass a string 
        // "STANDALONE"
    },
    banner: {
        js: await fs.readFile("./meta.user.js", "utf-8")
    }
})

if(WATCH) {
    await ctx.watch();
} else {
    await ctx.rebuild();
    await ctx.dispose();
}
