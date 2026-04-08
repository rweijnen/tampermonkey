// ==UserScript==
// @name         DigiD app login - Samsung hint
// @namespace    https://github.com/rweijnen/tampermonkey
// @version      1.2
// @description  Verduidelijkt de DigiD inlogpagina's: markeert de "Met de DigiD app" keuzeknop, voegt "op de Samsung Smartphone!" toe en vervangt de koppelcode-uitleg.
// @author       Remko Weijnen
// @match        https://digid.nl/inloggen*
// @match        https://www.digid.nl/inloggen*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const TARGET_TEXT = 'Open de DigiD app en voer uw pincode in';
    const HINT_TEXT = ' op de Samsung Smartphone!';
    const LABEL_TEXT = 'Vul daarna de koppelcode in die u in de DigiD app ziet.';
    const NEW_LABEL_TEXT = 'VUL EERST DE PINCODE IN OP DE SMARTPHONE, EN DAARNA PAS DE KOPPELCODE DIE DE SMARTPHONE GEEFT IN HET VELD HIERONDER';
    const MARKER = 'samsungHintAdded';
    const LABEL_MARKER = 'samsungLabelUpdated';
    const BUTTON_MARKER = 'samsungButtonHighlighted';

    function makeArrow(text) {
        const span = document.createElement('span');
        span.textContent = text;
        span.style.color = 'red';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.4em';
        span.style.whiteSpace = 'nowrap';
        return span;
    }

    function highlightAppButton() {
        const btn = document.querySelector('a#authentication_type_account_app');
        if (!btn || btn.dataset[BUTTON_MARKER]) return;

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

        btn.dataset[BUTTON_MARKER] = '1';
    }

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

        const labels = document.querySelectorAll('label.form__item__label');
        for (const l of labels) {
            if (l.dataset[LABEL_MARKER]) continue;
            if (l.textContent.trim() === LABEL_TEXT) {
                l.textContent = NEW_LABEL_TEXT;
                l.style.color = 'red';
                l.style.fontWeight = 'bold';
                l.dataset[LABEL_MARKER] = '1';
            }
        }
    }

    function run() {
        addHint();
        highlightAppButton();
    }

    run();

    // Voor het geval de pagina dynamisch (her)laadt
    const observer = new MutationObserver(run);
    observer.observe(document.body, { childList: true, subtree: true });
})();
