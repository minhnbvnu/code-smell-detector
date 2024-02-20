function resolveSourceMapSync(code, codeUrl, read) {
        var mapData = resolveSourceMapHelper(code, codeUrl);
        if (!mapData || mapData.map) {
            return mapData;
        }
        mapData.map = readSync(read, mapData.url, mapData);
        mapData.map = parseMapToJSON(mapData.map, mapData);
        return mapData;
    }