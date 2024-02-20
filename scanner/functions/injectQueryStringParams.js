function injectQueryStringParams(url, params) {
        return url +
            (url.indexOf('?') === -1 ? '?' : '&') +
            encodeParams(params);
    }