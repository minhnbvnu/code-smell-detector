function getIframePath() {
    const i = href.indexOf("/examples/")
    if (i === -1) { // npm run serve
        return '/iframe/';
    }
    return href.substring(0, i) + "/examples/src/iframe/";
}