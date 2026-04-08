// ==UserScript==
// @name         DigiD app login - Samsung hint
// @namespace    https://github.com/rweijnen/tampermonkey
// @version      1.1
// @description  Verduidelijkt de DigiD app inlogpagina: voegt "op de Samsung Smartphone!" toe en vervangt de koppelcode-uitleg met een duidelijkere instructie.
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
    const LABEL_TEXT = 'Vul daarna de koppelcode in die u in de DigiD app ziet.';
    const NEW_LABEL_TEXT = 'VUL EERST DE PINCODE IN OP DE SMARTPHONE, EN DAARNA PAS DE KOPPELCODE DIE DE SMARTPHONE GEEFT IN HET VELD HIERONDER';
    const MARKER = 'samsungHintAdded';
    const LABEL_MARKER = 'samsungLabelUpdated';

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

    addHint();

    // Voor het geval de pagina dynamisch (her)laadt
    const observer = new MutationObserver(addHint);
    observer.observe(document.body, { childList: true, subtree: true });
})();
