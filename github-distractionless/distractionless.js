// ==UserScript==
// @name        GitHub Distractionless
// @namespace   Violentmonkey Scripts
// @match       https://github.com/
// @grant       none
// @version     0.1
// @author      turtlebasket
// @website     https://github.com/turtlebasket/userscripts/tree/master/github-distractionless
// @description 2/9/2023, 4:24:34 PM
// @run-at      document-start
// ==/UserScript==

let hideEls = [];
let focusing = false;

// title bar links - custom behavior for now
const titleBarExclude = ["Explore", "Marketplace", "Codespaces"];
let titleBarEls = document.getElementsByClassName("js-selected-navigation-item")
for (let i = 0; i < titleBarEls.length; i++) {
    let el = titleBarEls[i];
    if (titleBarExclude.includes(el.innerHTML.trim())) {
        console.log(el.innerHTML);
        hideEls.push(el);
    }
}

// general exclusion list

[
    ["mail-status unread", [0], /.*/],
    ["UnderlineNav-item", [1], /^\/$/],
]
.forEach(([className, hideIndices, pageRegex]) => {
    hideIndices.forEach(i => {
        let el = document.getElementsByClassName(className)[i];
        if (typeof el === 'undefined') {
            console.log(`focus mode: unable to find element ${className} [ ${i} ]`)
        }
        else {
            hideEls.push(el);
        }
    });
})

// hide all els in els
function toggleFocus() {
    focusing = !focusing;
    for (let el of hideEls) {
        el.setAttribute(
            "style", 
            focusing ? "display: none;" : "display: auto;");
    }
}

// initial state
toggleFocus();

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
// focusModeSwitch.setAttribute("innerText", `Focus: ${focusing ? "on" : "off"}`);
// focusModeSwitch.setAttribute("style", btnStyle);
// focusModeSwitch.setAttribute("onclick", toggleFocus)
// document.getElementsByClassName("Header js-details-container Details")[0]
//     .appendChild(focusModeSwitch);