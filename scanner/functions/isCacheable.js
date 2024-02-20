function isCacheable(url) {
        return _.isString(url) && (_.startsWith(url.toLowerCase(), 'http://') || _.startsWith(url.toLowerCase(), 'https://'));
    }