// ==UserScript==
// @name Tomorrow theme
// @description A simple userscript to use native site controls to automatically enable an appropriate native dark theme on various sites for cookie-disabled browsers.
// @author matoro <matoro@airmail.cc>
// @namespace Violentmonkey Scripts
// @downloadURL https://raw.githubusercontent.com/matoro/tomorrow-theme/master/tomorrow-theme.user.js
// @license GPLv3 - https://www.gnu.org/licenses/gpl-3.0.txt
// @match *://8ch.net/*
// @match *://boards.4chan.org/*
// @match *://boards.4channel.org/*
// @match *://docs.microsoft.com/*
// @match *://duckduckgo.com/*
// @match *://en.wikipedia.org/*
// @match *://endchan.org/*
// @match *://gamefaqs.gamespot.com/*
// @match *://nyaa.si/*
// @match *://tvtropes.org/*
// @match *://videocardz.com/*
// @match *://wizchan.org/*
// @match *://youtu.be/*
// @match *://youtube.com/*
// @match *://www.youtube.com/*
// @grant none
// @version 0.1.012
// @updateURL https://raw.githubusercontent.com/matoro/tomorrow-theme/master/tomorrow-theme.user.js
// ==/UserScript==

/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

window.addEventListener("load", function()
  {
    switch(window.location.hostname)
    {
      case "8ch.net":
        var style = document.getElementById("stylechooser");
        style.value = "Tomorrow";
        style.dispatchEvent(new Event("change"));
        break;
      case "boards.4chan.org":
      case "boards.4channel.org":
        var style = document.getElementById("styleSelector");
        if(style.value !== "Tomorrow")
        {
          style.value = "Tomorrow";
          style.dispatchEvent(new Event("change"));
        }
        break;
      case "docs.microsoft.com":
        if(!document.documentElement.classList.contains("theme-dark"))
        {
          document.documentElement.classList.remove("theme-light");
          document.documentElement.classList.add("theme-dark");
        }
        break;
      case "duckduckgo.com":
        DDG.settings.set("kae", "d");
        break;
      case "en.wikipedia.org":
        waitForElm("#skin-client-pref-skin-theme-value-night").then((elm) => { elm.click(); });
        break;
      case "endchan.org":
        chooseStyle("Darkend", "color");
        break;
      case "gamefaqs.gamespot.com":
        var style = document.cookie.match(new RegExp("(^| )gf_css=([^;]+)"));
        if(!style || style[2] !== "dark-blue")
        {
          document.querySelector("li.footer_color_subnav_item:nth-child(2) > a:nth-child(1)").click();
        }
        break;
      case "nyaa.si":
        if(!document.body.classList.contains("dark"))
        {
          document.getElementById("themeToggle").click();
        }
        break;
      case "tvtropes.org":
        var style = document.getElementById("sidebar-toggle-nightvision");
        if(!Array.from(style.classList).includes("active"))
        {
          style.click();
        }
        break;
      case "videocardz.com":
        document.body.parentElement.setAttribute("data-theme", "dark");
        break;
      case "wizchan.org":
        var style = document.getElementById("style-select");
        style.childNodes.value = "10";
        style.childNodes[1].dispatchEvent(new Event("change"));
        break;
      case "youtu.be":
      case "youtube.com":
      case "www.youtube.com":
        for(var i = 0; i < 20; i++)
        {
          window.setTimeout(function() {
              document.documentElement.setAttribute("dark", true);
              document.documentElement.dispatchEvent(new Event("change"));
          }, i * 250);
        }
        break;
      default:
        break;
    }
  }
);
