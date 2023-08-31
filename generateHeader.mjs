

export default function generateHeader({
    name,
    description,
    downloadURL,
    author,
    version
}) {
    return `// ==UserScript==
// @name        ${name}
// @namespace   Violentmonkey Scripts
// @description ${description}
// @match       https://ourworldofpixels.com/*
// @downloadURL ${downloadURL}
// @grant       GM_addStyle
// @version     0.0.1
// @author      felpcereti
// ==/UserScript==
// This script should work without Violentmonkey or Tampermonkey.
// You should be able to just paste it into console and it should work.
// TODO It doesn't behave like that yet
`
}