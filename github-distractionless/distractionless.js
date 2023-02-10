// ==UserScript==
// @name        GitHub Distractionless
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*
// @grant       none
// @version     0.1.2
// @author      turtlebasket
// @website     https://github.com/turtlebasket/userscripts/tree/master/github-distractionless
// @license     MIT
// @description Userscript that makes sure that GitHub stays a work tool and doesn't turn into a social media website
// @run-at      document-idle
// ==/UserScript==

let hideEls = [];
let urlPath = new URL(window.location.href).pathname;

function runHideEls() {
    for (let el of hideEls) {
        el.setAttribute(
            "style", 
            getFocusing() ? "display: none;" : "display: auto;");
    }
}

function getFocusing() {
    let focusStatus = Boolean(localStorage.getItem("focusOn"));
    if (focusStatus == null) {
        localStorage.setItem(String(true))
        return true;
    }
}

function toggleFocusing() {
    localStorage.setItem(String(!getFocusing()));
    if (getFocusing()) {
        runHideEls();
    }
}

// title bar links - custom behavior for now
const titleBarExclude = ["Explore", "Marketplace", "Codespaces"];
let titleBarEls = document.getElementsByClassName("js-selected-navigation-item")
for (let i = 0; i < titleBarEls.length; i++) {
    let el = titleBarEls[i];
    if (titleBarExclude.includes(el.innerHTML.trim())) {
        hideEls.push(el);
    }
}

// general exclusion list
// [<class>, <instances of occurrence>, <page filter>]

[
    ["mail-status unread", [0], /^.*$/],
    ["UnderlineNav-item", [1], /^\/$/],
    ["menu-item", [6], /^\/search[.*]$/],
]
.forEach(([className, hideInstances, pathRegex]) => {
    hideInstances.forEach(i => {
        if (urlPath.search(pathRegex) > -1) {
            let el = document.getElementsByClassName(className)[i];
            if (typeof el === 'undefined') {
                console.log(`focus mode: unable to find element ${className} [ ${i} ]`)
            }
            else {
                hideEls.push(el);
            }
        }
    });
})

// initial state
runHideEls();

// toggle switch 
// NOTE: WIP, currently bugged due to github content policy. add later

// const btnStyle = `
//     background-color: black;
//     foreground-color: white;
//     borde-color: white;
//     border-width: 1px;
//     margin-left: 4px;
//     padding: 2px 4px;
//     font-size: 12pt;`;
// const focusModeSwitch = document.createElement("button");
// focusModeSwitch.setAttribute("innerText", `Focus: ${getFocusing() ? "on" : "off"}`);
// focusModeSwitch.setAttribute("style", btnStyle);
// focusModeSwitch.setAttribute("onclick", toggleFocus)
// document.getElementsByClassName("Header js-details-container Details")[0]
//     .appendChild(focusModeSwitch);
