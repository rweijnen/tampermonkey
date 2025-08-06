// ==UserScript==
// @name         Telegraaf.nl Force Day Mode
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Forces Telegraaf.nl to use day mode by setting cookie
// @author       Remko Weijnen
// @match        https://www.telegraaf.nl/*
// @match        https://telegraaf.nl/*
// @grant        none
// @run-at       document-start
// @updateURL    https://github.com/rweijnen/tampermonkey/
// @downloadURL  https://github.com/rweijnen/tampermonkey/
// ==/UserScript==

(function() {
    'use strict';

    // Set the correct cookie for day mode
    document.cookie = "dsy-color-mode=light; path=/; max-age=31536000";

})();
