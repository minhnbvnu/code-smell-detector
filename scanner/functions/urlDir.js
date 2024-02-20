function urlDir(url) {
    return url.replace(/\?.*$/, '').replace(/\/[^/]*$/, '/');
}