// ==UserScript==
// @name         DigiD app login - Samsung hint
// @namespace    https://github.com/rweijnen/tampermonkey
// @version      1.0
// @description  Voegt in rode letters "op de Samsung Smartphone!" toe aan de DigiD app inlogpagina ter verduidelijking.
// @author       Remko Weijnen
// @match        https://digid.nl/inloggen_app*
// @match        https://www.digid.nl/inloggen_app*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const TARGET_TEXT = 'Open de DigiD app en voer uw pincode in';
    const HINT_TEXT = ' op de Samsung Smartphone!';
    const MARKER = 'samsung-hint-added';

    function addHint() {
        const headings = document.querySelectorAll('h2.orange_heading');
        for (const h of headings) {
            if (h.dataset[MARKER]) continue;
            if (h.textContent.trim() === TARGET_TEXT) {
                const span = document.createElement('span');
                span.textContent = HINT_TEXT;
                span.style.color = 'red';
                span.style.fontWeight = 'bold';
                h.appendChild(span);
                h.dataset[MARKER] = '1';
            }
        }
    }

    addHint();

    // Voor het geval de pagina dynamisch (her)laadt
    const observer = new MutationObserver(addHint);
    observer.observe(document.body, { childList: true, subtree: true });
})();
