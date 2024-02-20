function isBuiltIn(url) {
    if (ALLOW_EDITING_EXAMPLES) { return false; }
    
    if (url.startsWith('quad://examples/') ||
        url.startsWith('quad://games/') ||
        url.startsWith('quad://sprites/') ||
        url.startsWith('quad://fonts/') ||
        url.startsWith('quad://scripts/') ||
        url.startsWith('quad://console/') ||
        url.startsWith('quad://doc/')) {
        return true;
    }
    
    if (! url.startsWith('http://') || url.startsWith('https://')) {
        url = location.origin + url;
    }
    
    const quadPath = location.href.replace(/\/console\/quadplay\.html.*$/, '/');

    return url.startsWith(quadPath) && // Early out
        ((! ALLOW_EDITING_EXAMPLES && url.startsWith(quadPath + 'examples/')) ||
         url.startsWith(quadPath + 'sprites/') ||
         url.startsWith(quadPath + 'fonts/') ||
         url.startsWith(quadPath + 'sounds/') ||
         url.startsWith(quadPath + 'scripts/') ||
         url.startsWith(quadPath + 'games/') ||
         url.startsWith(quadPath + 'console/') ||
         url.startsWith(quadPath + 'doc/'));
}