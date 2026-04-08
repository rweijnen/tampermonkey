// ==UserScript==
// @name         Belastingdienst - Inlogknop benadrukken
// @namespace    https://github.com/rweijnen/tampermonkey
// @version      1.1
// @description  Markeert de inlogknoppen op belastingdienst.nl en mijn.belastingdienst.nl met grote rode pijlen ter verduidelijking.
// @author       Remko Weijnen
// @match        https://www.belastingdienst.nl/wps/wcm/connect/nl/home/content/inloggen-mijn-belastingdienst*
// @match        https://mijn.belastingdienst.nl/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const MARKER = 'bldHighlightAdded';

    // Lijst met selectors + verwachte knoptekst
    const TARGETS = [
        { selector: 'a.bld-knop-inloggen', text: 'Inloggen op Mijn Belastingdienst' },
        { selector: 'a.bldc-card', text: 'Inloggen met DigiD' },
    ];

    function makeArrow(text) {
        const span = document.createElement('span');
        span.textContent = text;
        span.style.color = 'red';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.4em';
        span.style.whiteSpace = 'nowrap';
        return span;
    }

    function decorate(btn) {
        if (btn.dataset[MARKER]) return;

        btn.style.boxShadow = '0 0 0 4px red';
        btn.style.fontWeight = 'bold';

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '15px';
        wrapper.style.margin = '20px 0';
        wrapper.style.flexWrap = 'wrap';

        btn.parentNode.insertBefore(wrapper, btn);
        wrapper.appendChild(makeArrow('----> DRUK OP DEZE KNOP >>>'));
        wrapper.appendChild(btn);
        wrapper.appendChild(makeArrow('<<< DRUK OP DEZE KNOP <----'));

        btn.dataset[MARKER] = '1';
    }

    function highlight() {
        for (const { selector, text } of TARGETS) {
            const nodes = document.querySelectorAll(selector);
            for (const btn of nodes) {
                if (!btn.textContent.trim().startsWith(text)) continue;
                decorate(btn);
            }
        }
    }

    highlight();

    const observer = new MutationObserver(highlight);
    observer.observe(document.body, { childList: true, subtree: true });
})();
