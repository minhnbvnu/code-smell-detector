function cacheUrl(url, options, getCachedFile) {
        if (!isCacheable(url)) {
            return Promise.reject(new Error('Url is not cacheable'));
        }
        // allow CachedImage to provide custom options
        _.defaults(options, defaultOptions);
        // cacheableUrl contains only the needed query params
        const cacheableUrl = path.getCacheableUrl(url, options.useQueryParamsInCacheKey);
        // note: urlCache may remove the entry if it expired so we need to remove the leftover file manually
        return urlCache.get(cacheableUrl)
            .then(fileRelativePath => {
                if (!fileRelativePath) {
                    // console.log('ImageCacheManager: url cache miss', cacheableUrl);
                    throw new Error('URL expired or not in cache');
                }
                // console.log('ImageCacheManager: url cache hit', cacheableUrl);
                const cachedFilePath = `${options.cacheLocation}/${fileRelativePath}`;

                return fs.exists(cachedFilePath)
                    .then((exists) => {
                        if (exists) {
                            return cachedFilePath
                        } else {
                            throw new Error('file under URL stored in url cache doesn\'t exsts');
                        }
                    });
            })
            // url is not found in the cache or is expired
            .catch(() => {
                const fileRelativePath = path.getImageRelativeFilePath(cacheableUrl);
                const filePath = `${options.cacheLocation}/${fileRelativePath}`

                // remove expired file if exists
                return fs.deleteFile(filePath)
                    // get the image to cache (download / copy / etc)
                    .then(() => getCachedFile(filePath))
                    // add to cache
                    .then(() => urlCache.set(cacheableUrl, fileRelativePath, options.ttl))
                    // return filePath
                    .then(() => filePath);
            });
    }