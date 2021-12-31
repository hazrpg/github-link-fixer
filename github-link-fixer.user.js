// ==UserScript==
// @name         GitHub Link Fixer - The Download Friendly fix you didn't know you needed!
// @namespace    https://github.com/hazrpg/
// @version      0.3
// @updateURL    https://raw.githubusercontent.com/hazrpg/github-link-fixer/master/github-link-fixer.user.js
// @description  This script fixes GitHub links are more usable. When you right-click and save-as it will now download the proper raw version. If you click it will continue to work as normal. This is the fix Linus from LTT needed.
// @author       hazrpg
// @match        https://*.github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @grant        none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    jQuery(document).ready(function() {
        console.log('GitHub Link Fixer warming up...');
        let links = jQuery('a.js-navigation-open');
        links.each(function() {
            // Define the required variables we'll need.
            let link = jQuery(this).attr('href');
            let raw = link.replace('/blob/', '/raw/');
            let filename = link.substring(link.lastIndexOf('/')+1);
            let isDotFile = filename.substring(0, 1) == '.';
            let isFile = link.includes('/blob/');
            let isFolder = link.includes('/tree/');

            // Change the links.
            jQuery(this).attr('href', raw);
            jQuery(this).attr('download', filename);

            // Add an informative graphic to let people know that its worked.
            // Check if its a file and add the graphic.
            if(isFile === true) {
                jQuery(this).after(' <i class="fas fa-mouse" title="Link is right-click and save-as enabled."></i>');
            }
            // Check if its a dot file and add extra information.
            if(isDotFile) {
                jQuery(this).after(' <i style="color: red;" class="fas fa-exclamation-circle" title="This file will download as a .txt, make sure to rename it to this: '+filename+'"></i>');
            }

            // Chanage the behaviour for clicking so that it takes you to the normal place - where devs expect.
            jQuery(this).click(function(e) {
                e.preventDefault();
                location.href = link;
                parent.location = link;
                window.location.href = link;
            });
        });
    });
})();
