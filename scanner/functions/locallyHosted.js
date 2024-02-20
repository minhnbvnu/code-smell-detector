function locallyHosted(url) {
    url = url || gameURL;
    return url.startsWith('quad://') || url.startsWith(location.origin) || ! /^([A-Za-z]){3,6}:\/\//.test(url);
}