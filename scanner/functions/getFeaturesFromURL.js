function getFeaturesFromURL(){var e={};if("undefined"==typeof window||void 0===window.location||void 0===window.location.search)return e;var t=getQueryParams(window.location.search);if(TENSORFLOWJS_FLAGS_PREFIX in t){var n={};t[TENSORFLOWJS_FLAGS_PREFIX].split(",").forEach(function(e){var t=e.split(":"),r=t[0],o=t[1];n[r]=o;}),URL_PROPERTIES.forEach(function(t){t.name in n&&(console.log("Setting feature override from URL "+t.name+": "+n[t.name]),t.type===Type.NUMBER?e[t.name]=+n[t.name]:t.type===Type.BOOLEAN?e[t.name]="true"===n[t.name]:t.type===Type.STRING?e[t.name]=n[t.name]:console.warn("Unknown URL param: "+t.name+"."));});}return e}