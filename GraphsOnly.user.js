// ==UserScript==
// @name         AT-Quia-GraphsOnly
// @namespace    https://github.com/Quiaaaa/AutoTrimps
// @version      3.0-Quia
// @updateURL    https://github.com/Quiaaaa/AutoTrimps/GraphsOnly.user.js
// @description  Graphs Module (only) from AutoTrimps
// @author       zininzinin, spindrjr, belaith, ishakaru, genBTC, Zek, Quia
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @grant        none
// ==/UserScript==
var script = document.createElement('script');
script.id = 'AutoTrimps-Graphs';
script.src = 'https://by22dgb.github.io/autotrimps3/GraphsOnly.js';
script.setAttribute('crossorigin', "anonymous");
document.head.appendChild(script);
