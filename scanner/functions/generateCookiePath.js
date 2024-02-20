function generateCookiePath() {
    var path = window.location.pathname;

    // Firefox 64 and IE 11 use trailing slash for client-side set cookies,
    // Chrome 71 does not.
    // So ensure cookie path ends in "/" for consistency
    // https://stackoverflow.com/a/53784228/319878
    if (!window.location.pathname.match(/\/$/)) {
        var parts = path.split("/");
        parts.length -= 1;
        path = parts.join("/") + "/";
    }

    return path;
}