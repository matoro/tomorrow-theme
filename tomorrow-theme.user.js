// ==UserScript==
// @name Tomorrow theme
// @description A simple userscript to use native site controls to automatically enable an appropriate native dark theme on various sites for cookie-disabled browsers.
// @author matoro <matoro@airmail.cc>
// @namespace Violentmonkey Scripts
// @downloadURL https://raw.githubusercontent.com/matoro/tomorrow-theme/master/tomorrow-theme.user.js
// @license GPLv3 - https://www.gnu.org/licenses/gpl-3.0.txt
// @match http://8ch.net/*
// @match https://8ch.net/*
// @match http://boards.4chan.org/*
// @match https://boards.4chan.org/*
// @match http://boards.4channel.org/*
// @match https://boards.4channel.org/*
// @match http://duckduckgo.com/*
// @match https://duckduckgo.com/*
// @match http://endchan.org/*
// @match https://endchan.org/*
// @match http://nyaa.si/*
// @match https://nyaa.si/*
// @match http://wizchan.org/*
// @match https://wizchan.org/*
// @grant none
// @version 0.1
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

switch(window.location.hostname)
{
  case "8ch.net":
    window.onload = function() {
      var style = document.getElementById("stylechooser");
      if(style.value !== "Tomorrow")
      {
        style.value = "Tomorrow";
        style.dispatchEvent(new Event("change"));
      }
    };
    break;
  case "boards.4chan.org":
  case "boards.4channel.org":
    window.onload = function() {
      var style = document.getElementById("styleSelector");
      if(style.value !== "Tomorrow")
      {
        style.value = "Tomorrow";
        style.dispatchEvent(new Event("change"));
      }
    };
    break;
  case "duckduckgo.com":
    window.onload = function() {
      var current_style = document.getElementsByClassName("nav-menu__theme  js-side-menu-theme theme-is-selected")[0];
      if(current_style.children[0].children[0].getAttribute("style") !== "background-color:#444;"
        || current_style.children[0].children[1].getAttribute("style") !== "background-color:#222;")
      {
        var style = null;
        var styles = document.getElementsByClassName("nav-menu__theme  js-side-menu-theme");
        for(var ticker = 0; ticker < styles.length && style === null; ticker++)
        {
          if(styles[ticker].children[0].children[0].getAttribute("style") === "background-color:#444;"
            && styles[ticker].children[0].children[1].getAttribute("style") === "background-color:#222;")
          {
             style = styles[ticker];
          }
        }
        style.click();
      }
    };
    break;
  case "endchan.org":
    chooseStyle("Darkend", "color");
    break;
  case "nyaa.si":
    if(document.body.classname !== "dark")
    {
      toggleDarkMode();
    }
    break;
  case "wizchan.org":
    var style = document.getElementById("style-select");
    style.childNodes.value = "10";
    style.childNodes[1].dispatchEvent(new Event("change"));
    break;
  default:
    break;
}
