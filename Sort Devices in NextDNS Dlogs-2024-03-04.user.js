// ==UserScript==
// @name         Sort Devices in NextDNS Dlogs
// @namespace    http://tampermonkey.net/
// @version      2024-03-04
// @description  Sorts devices in the Logs and adds a search box
// @author       Remko Weijnen
// @match        https://my.nextdns.io/*/logs
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nextdns.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function sortDropdownItems(dropdown) {
        const items = Array.from(dropdown.querySelectorAll('.dropdown-item'));
        const sortedItems = items.sort((a, b) => {
            const textA = a.textContent.trim().toLowerCase();
            const textB = b.textContent.trim().toLowerCase();
            return textA.localeCompare(textB);
        });

        dropdown.innerHTML = '';
        sortedItems.forEach(item => dropdown.appendChild(item));
    }

    function addSearchBox(dropdown) {
        const searchBox = document.createElement('input');
        searchBox.setAttribute('type', 'text');
        searchBox.setAttribute('placeholder', 'Search...');
        searchBox.style.width = '100%';
        searchBox.style.boxSizing = 'border-box';
        searchBox.style.padding = '5px';
        searchBox.style.marginBottom = '5px';
        searchBox.addEventListener('keyup', function() {
            const filter = searchBox.value.toLowerCase();
            const items = dropdown.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? '' : 'none';
            });
        });

        dropdown.prepend(searchBox);
    }

    const observer = new MutationObserver(function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const dropdown = document.querySelector('.dropdown-menu');
                if (dropdown && !dropdown.querySelector('input[type="text"]')) {
                    sortDropdownItems(dropdown);
                    addSearchBox(dropdown);
                    observer.disconnect(); // Disconnect to prevent looping
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
