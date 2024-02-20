function cachedNumberFormat(locale, options) {
        // Create a sorted, stringified version of `options`
        // for use as part of the cache key
        var optionsString = map(
            keys(options).sort(),
            function(key) {
                return key + ':' + options[key];
            }
        ).join(',');

        // Set our cache key
        var cacheKey = locale + '+' + optionsString;

        // If we don't have this configuration cached, configure and cache it
        if (!cachedNumberFormat.cache[cacheKey]) {
            cachedNumberFormat.cache[cacheKey] = Intl.NumberFormat(locale, options);
        }

        // Return the cached version of this configuration
        return cachedNumberFormat.cache[cacheKey];
    }