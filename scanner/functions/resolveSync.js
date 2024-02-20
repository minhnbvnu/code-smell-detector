function resolveSync(code, codeUrl, read, options) {
        var mapData;
        if (code === null) {
            var mapUrl = codeUrl;
            mapData = {
                sourceMappingURL: null,
                url: mapUrl,
                sourcesRelativeTo: mapUrl,
                map: null
            };
            mapData.map = readSync(read, mapUrl, mapData);
            mapData.map = parseMapToJSON(mapData.map, mapData);
        }
        else {
            mapData = resolveSourceMapSync(code, codeUrl, read);
            if (!mapData) {
                return null;
            }
        }
        var result = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read, options);
        mapData.sourcesResolved = result.sourcesResolved;
        mapData.sourcesContent = result.sourcesContent;
        return mapData;
    }