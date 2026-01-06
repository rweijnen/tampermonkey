// ==UserScript==
  // @name         AD.nl Region Setter
  // @namespace    http://tampermonkey.net/
  // @version      1.0
  // @description  Auto-set Den Bosch region for AD.nl
  // @match        *://*.ad.nl/*
  // @match        *://ad.nl/*
  // @run-at       document-start
  // @grant        none
  // ==/UserScript==

  (function() {
      'use strict';

      // Set cookie with 10-year expiration
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 10);

      document.cookie = `selectedRegio=den-bosch; domain=.ad.nl; path=/; expires=${expires.toUTCString()}; secure;samesite=lax`;
  })();
