function getScriptsPath() {
    const i = href.indexOf("/examples/");
    if (i === -1) { // npm run serve
        return '/static/scripts/';
    }
    return href.substring(0, i) + "/scripts/";
}