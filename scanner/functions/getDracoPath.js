function getDracoPath() {
    const i = href.indexOf("/examples/");
    if (i === -1) { // npm run serve
        return '/static/lib/draco/';
    }
    return href.substring(0, i) + "/examples/src/lib/draco/";
}