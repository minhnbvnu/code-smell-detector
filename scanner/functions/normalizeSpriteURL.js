function normalizeSpriteURL(url, format, extension, accessToken) {
    const urlObject = parseUrl(url);
    if (!isMapboxURL(url)) {
        urlObject.path += `${format}${extension}`;
        return formatUrl(urlObject);
    }
    urlObject.path = `/styles/v1${urlObject.path}/sprite${format}${extension}`;
    return makeAPIURL(urlObject, accessToken);
}