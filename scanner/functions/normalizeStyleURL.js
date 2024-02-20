function normalizeStyleURL(url, accessToken) {
    if (!isMapboxURL(url)) { return url; }
    const urlObject = parseUrl(url);
    urlObject.path = `/styles/v1${urlObject.path}`;
    return makeAPIURL(urlObject, accessToken);
}