// ==UserScript==
// @name         Belastingdienst - Inlogknop benadrukken
// @namespace    https://github.com/rweijnen/tampermonkey
// @version      1.0
// @description  Markeert de "Inloggen op Mijn Belastingdienst" knop met grote rode pijlen en tekst ter verduidelijking.
// @author       Remko Weijnen
// @match        https://www.belastingdienst.nl/wps/wcm/connect/nl/home/content/inloggen-mijn-belastingdienst*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const MARKER = 'bldHighlightAdded';

    function highlight() {
        const buttons = document.querySelectorAll('a.bld-knop-inloggen');
        for (const btn of buttons) {
            if (btn.dataset[MARKER]) continue;
            if (btn.textContent.trim() !== 'Inloggen op Mijn Belastingdienst') continue;

            // Maak de knop zelf opvallend
            btn.style.fontSize = '1.3em';
            btn.style.fontWeight = 'bold';
            btn.style.boxShadow = '0 0 0 4px red';

            // Wrapper om de knop heen met pijlen
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.gap = '15px';
            wrapper.style.margin = '20px 0';
            wrapper.style.flexWrap = 'wrap';

            const makeArrow = (text) => {
                const span = document.createElement('span');
                span.textContent = text;
                span.style.color = 'red';
                span.style.fontWeight = 'bold';
                span.style.fontSize = '1.4em';
                span.style.whiteSpace = 'nowrap';
                return span;
            };

            btn.parentNode.insertBefore(wrapper, btn);
            wrapper.appendChild(makeArrow('----> DRUK OP DEZE KNOP >>>'));
            wrapper.appendChild(btn);
            wrapper.appendChild(makeArrow('<<< DRUK OP DEZE KNOP <----'));

            btn.dataset[MARKER] = '1';
        }
    }

    highlight();

    const observer = new MutationObserver(highlight);
    observer.observe(document.body, { childList: true, subtree: true });
})();
