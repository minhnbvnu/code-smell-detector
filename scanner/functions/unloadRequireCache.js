function unloadRequireCache(matcher) {
    /* istanbul ignore else: impossible to test */
    if (matcher && typeof require !== 'undefined' && require && require.cache) {
        Object.keys(require.cache).forEach(filename => {
            if (matcher(filename)) {
                delete require.cache[filename];
            }
        });
    }
}