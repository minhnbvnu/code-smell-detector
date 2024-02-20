function resolveSourceMap(code, codeUrl, read, callback) {
        var mapData;
        try {
            mapData = resolveSourceMapHelper(code, codeUrl);
        }
        catch (error) {
            return callbackAsync(callback, error);
        }
        if (!mapData || mapData.map) {
            return callbackAsync(callback, null, mapData);
        }
        var readUrl = customDecodeUriComponent(mapData.url);
        read(readUrl, function (error, result) {
            if (error) {
                error.sourceMapData = mapData;
                return callback(error);
            }
            mapData.map = String(result);
            try {
                mapData.map = parseMapToJSON(mapData.map, mapData);
            }
            catch (error) {
                return callback(error);
            }
            callback(null, mapData);
        });
    }