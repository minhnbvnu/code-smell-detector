function normalizeSourceURL(url, accessToken) {
    if (!isMapboxURL(url)) { return url; }
    const urlObject = parseUrl(url);
    urlObject.path = `/v4/${urlObject.authority}.json`;
    urlObject.params.push('secure');
    return makeAPIURL(urlObject, accessToken);
}