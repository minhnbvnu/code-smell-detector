function shortURL(url) {
    const gamePath = gameSource.jsonURL.replace(/\/[^/]+\.game\.json$/, '/');
    if (url.startsWith(gamePath)) {
        return url.substring(gamePath.length);
    } else {
        return url;
    }
}