function getAssetPath() {
    const i = href.indexOf("/examples/");
    if (i === -1) { // npm run serve
        return '/static/assets/';
    }
    return href.substring(0, i) + "/examples/assets/";
}