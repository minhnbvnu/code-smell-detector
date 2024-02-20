function resolveSourcesSync(map, mapUrl, read, options) {
        var result = {
            sourcesResolved: [],
            sourcesContent: []
        };
        if (!map.sources || map.sources.length === 0) {
            return result;
        }
        resolveSourcesHelper(map, mapUrl, options, function (fullUrl, sourceContent, index) {
            result.sourcesResolved[index] = fullUrl;
            if (read !== null) {
                if (typeof sourceContent === "string") {
                    result.sourcesContent[index] = sourceContent;
                }
                else {
                    var readUrl = customDecodeUriComponent(fullUrl);
                    try {
                        result.sourcesContent[index] = String(read(readUrl));
                    }
                    catch (error) {
                        result.sourcesContent[index] = error;
                    }
                }
            }
        });
        return result;
    }