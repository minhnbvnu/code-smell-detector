function runPreloadTask(prefetcher, imageCacheManager) {
    const url = prefetcher.next();
    if (!url) {
        return Promise.resolve();
    }
    // console.log('START', url);
    return imageCacheManager.downloadAndCacheUrl(url)
        // allow prefetch task to fail without terminating other prefetch tasks
        .catch(_.noop)
        // .then(() => {
        //     console.log('END', url);
        // })
        // then run next task
        .then(() => runPreloadTask(prefetcher, imageCacheManager));
}