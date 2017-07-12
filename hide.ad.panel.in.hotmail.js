// ==UserScript==
// @name         Hide Ad Panel in Hotmail
// @namespace    http://prantlf.tk/
// @version      0.1
// @description  Hides the right sidebar with ads and stretches the e-mail body to take its place.
// @author       prantlf@gmail.com
// @match        https://outlook.live.com/owa/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var observer;

    function removeAds(node) {
        console.log('[Hide Ad Panel in Hotmail] Hiding the ad panel.');
        node.style.display = 'none';
    }

    function stretchWidth(node) {
        console.log('[Hide Ad Panel in Hotmail] Stretching the e-mail body.');
        node.style.right = 0;
    }

    function checkNode(node) {
        var child;
        if (node instanceof HTMLElement) {
            if (node.matches('._n_h')) {
                removeAds(node);
            } else if (node.matches('._n_e > #GoToNextRegion + div')) {
                stretchWidth(node);
            } else {
                child = node.querySelector('._n_h');
                if (child) {
                    removeAds(child);
                }
                child = node.querySelector('._n_e > #GoToNextRegion + div');
                if (child) {
                    stretchWidth(child);
                }
            }
        }
    }

    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var addedNodes = mutation.addedNodes,
                target = mutation.target,
                i, count;
            if (addedNodes) {
                for (i = 0, count = addedNodes.length; i < count; ++i) {
                    checkNode(addedNodes[i]);
                }
            }
            if (target) {
                checkNode(target);
            }
        });
    });

    console.info('[Hide Ad Panel in Hotmail] Listenning to page changes.');
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

})();