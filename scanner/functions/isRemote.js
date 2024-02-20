function isRemote(url) {
    return ! url.startsWith(location.origin + '/');
}