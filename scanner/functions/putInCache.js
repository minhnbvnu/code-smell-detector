function putInCache(key, cache, result, res, expires) {
    if (key && cache) {
        cache.put(key, {result:result, res:{headers:res.headers,
            statusCode:res.statusCode}}, expires);
    }
}