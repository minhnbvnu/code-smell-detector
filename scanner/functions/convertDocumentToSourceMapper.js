function convertDocumentToSourceMapper(host, contents, mapFileName) {
            const map2 = tryParseRawSourceMap(contents);
            if (!map2 || !map2.sources || !map2.file || !map2.mappings) {
                return void 0;
            }
            if (map2.sourcesContent && map2.sourcesContent.some(isString))
                return void 0;
            return createDocumentPositionMapper(host, map2, mapFileName);
        }