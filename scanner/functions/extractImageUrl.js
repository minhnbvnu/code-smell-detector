function extractImageUrl(url) {
    if (url.substring(0, prefix.length) === prefix) {
        return url;
    }
    return extractCssUrl(url);
}