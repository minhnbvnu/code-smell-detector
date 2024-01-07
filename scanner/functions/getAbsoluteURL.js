function getAbsoluteURL(url) {
    if (url && url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        return url;
    }
    let a = document.createElement('a');
    a.href = url;
    url = a.href;
    a = null;
    return url;
}