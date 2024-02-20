function resolveSourcesHelper(map, mapUrl, options, fn) {
        options = options || {};
        mapUrl = convertWindowsPath(mapUrl);
        var fullUrl;
        var sourceContent;
        var sourceRoot;
        for (var index = 0, len = map.sources.length; index < len; index++) {
            sourceRoot = null;
            if (typeof options.sourceRoot === "string") {
                sourceRoot = options.sourceRoot;
            }
            else if (typeof map.sourceRoot === "string" && options.sourceRoot !== false) {
                sourceRoot = map.sourceRoot;
            }
            // If the sourceRoot is the empty string, it is equivalent to not setting
            // the property at all.
            if (sourceRoot === null || sourceRoot === '') {
                fullUrl = resolveUrl(mapUrl, map.sources[index]);
            }
            else {
                // Make sure that the sourceRoot ends with a slash, so that `/scripts/subdir` becomes
                // `/scripts/subdir/<source>`, not `/scripts/<source>`. Pointing to a file as source root
                // does not make sense.
                fullUrl = resolveUrl(mapUrl, sourceRoot.replace(endingSlash, "/"), map.sources[index]);
            }
            sourceContent = (map.sourcesContent || [])[index];
            fn(fullUrl, sourceContent, index);
        }
    }