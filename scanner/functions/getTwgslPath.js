function getTwgslPath() {
    const i = href.indexOf("/examples/");
    if (i === -1) { // npm run serve
        return '/static/lib/twgsl/';
    }
    return href.substring(0, i) + "/examples/src/lib/twgsl/";
}