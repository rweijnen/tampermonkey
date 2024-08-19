// ==UserScript==
// @name         Dumpert NSFW and Preroll Modifier via XMLHttpRequest
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Modify the nsfw and nopreroll properties in the JSON response from Dumpert API via XMLHttpRequest interception
// @author       Your Name
// @match        https://www.dumpert.nl/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Save a reference to the original XMLHttpRequest open method
    const originalOpen = XMLHttpRequest.prototype.open;

    // Override the open method to intercept all XMLHttpRequests
    XMLHttpRequest.prototype.open = function(method, url) {

        // Add event listener to process the response when it's ready
        this.addEventListener('readystatechange', function() {
            if (this.readyState === 4 && this.status === 200 && url.includes('/mobile_api/json/info/')) {

                let jsonResponse;
                try {
                    jsonResponse = JSON.parse(this.responseText);
                } catch (e) {
                    console.error('Failed to parse JSON:', e);
                    return;
                }

                // Modify the nsfw and nopreroll properties
                jsonResponse.items.forEach(item => {
                    if (item.nsfw === true) {
                        item.nsfw = false;
                    }
                    if (item.nopreroll === false) {
                        item.nopreroll = true;
                    }
                });

                // Override the response text with the modified JSON
                Object.defineProperty(this, 'responseText', { value: JSON.stringify(jsonResponse) });
                Object.defineProperty(this, 'response', { value: JSON.stringify(jsonResponse) });
            }
        });

        // Call the original open method with the arguments
        return originalOpen.apply(this, arguments);
    };
})();
