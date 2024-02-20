function toFullUrl(url) {
        // non-existent, or fully qualified already
        if (!url || url.indexOf(base) === 0 || !isLocalUrl(url)) return url;
        // absolute url
        if (url[0] == '/') return base + url;
        // relative url - browser can figure out ..
        return base + path + url;
    }