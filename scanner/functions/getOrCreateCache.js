function getOrCreateCache(cacheWithRedirects, redirectedReference, key, create) {
            const cache = cacheWithRedirects.getOrCreateMapOfCacheRedirects(redirectedReference);
            let result = cache.get(key);
            if (!result) {
                result = create();
                cache.set(key, result);
            }
            return result;
        }