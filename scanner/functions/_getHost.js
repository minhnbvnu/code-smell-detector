function _getHost(url) {
        url = url.replace(/^(https?:\/\/)/, '', url);
        var host = url.split('/')[0];
        return host;
    }