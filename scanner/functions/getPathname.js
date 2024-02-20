function getPathname(req) {
    try {
        return parseUrl(req).pathname;
    } catch (err) {
        return undefined;
    }
}