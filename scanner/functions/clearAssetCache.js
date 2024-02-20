function clearAssetCache() {
    if (! useIDE || fastReload) {
        // Remove non-builtins from the asset cache, but keep the
        // builtin assets since we don't expect them to change and can
        // reduce loading time. Make a copy of the keys since we'll be
        // mutating the object while iterating through it.
        const keys = Object.keys(assetCache);
        for (let i = 0; i < keys.length; ++i) {
            const url = keys[i];
            if (! isBuiltIn(url)) {
                delete assetCache[url];
            }
        }
    } else {
        // Wipe the entire asset cache
        assetCache = {};
    }
}