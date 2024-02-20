function urlToLocalWebPath(url) {
    console.assert(url !== undefined, 'Tried to convert undefined webPath');
    url = url.replace(/\\/g, '/');
    
    if (url.startsWith(location.origin + '/')) {
        url = url.substring(location.origin.length + 1);
    }

    if (url[0] !== '/') { url = '/' + url; }

    return url;
}