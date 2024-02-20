function getBaseNameFromUrl(url) {
    return url.split('/').pop().replace(/\.ko$/, '');
}