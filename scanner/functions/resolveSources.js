function resolveSources(map, mapUrl, read, options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var pending = map.sources ? map.sources.length : 0;
        var result = {
            sourcesResolved: [],
            sourcesContent: []
        };
        if (pending === 0) {
            callbackAsync(callback, null, result);
            return;
        }
        var done = function () {
            pending--;
            if (pending === 0) {
                callback(null, result);
            }
        };
        resolveSourcesHelper(map, mapUrl, options, function (fullUrl, sourceContent, index) {
            result.sourcesResolved[index] = fullUrl;
            if (typeof sourceContent === "string") {
                result.sourcesContent[index] = sourceContent;
                callbackAsync(done, null);
            }
            else {
                var readUrl = customDecodeUriComponent(fullUrl);
                read(readUrl, function (error, source) {
                    result.sourcesContent[index] = error ? error : String(source);
                    done();
                });
            }
        });
    }