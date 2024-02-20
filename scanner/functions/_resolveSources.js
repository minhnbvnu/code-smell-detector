function _resolveSources(mapData) {
            resolveSources(mapData.map, mapData.sourcesRelativeTo, read, options, function (error, result) {
                if (error) {
                    return callback(error);
                }
                mapData.sourcesResolved = result.sourcesResolved;
                mapData.sourcesContent = result.sourcesContent;
                callback(null, mapData);
            });
        }