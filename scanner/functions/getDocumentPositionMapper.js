function getDocumentPositionMapper(host, generatedFileName, generatedFileLineInfo, readMapFile) {
            let mapFileName = tryGetSourceMappingURL(generatedFileLineInfo);
            if (mapFileName) {
                const match = base64UrlRegExp.exec(mapFileName);
                if (match) {
                    if (match[1]) {
                        const base64Object = match[1];
                        return convertDocumentToSourceMapper(host, base64decode(sys, base64Object), generatedFileName);
                    }
                    mapFileName = void 0;
                }
            }
            const possibleMapLocations = [];
            if (mapFileName) {
                possibleMapLocations.push(mapFileName);
            }
            possibleMapLocations.push(generatedFileName + ".map");
            const originalMapFileName = mapFileName && getNormalizedAbsolutePath(mapFileName, getDirectoryPath(generatedFileName));
            for (const location of possibleMapLocations) {
                const mapFileName2 = getNormalizedAbsolutePath(location, getDirectoryPath(generatedFileName));
                const mapFileContents = readMapFile(mapFileName2, originalMapFileName);
                if (isString(mapFileContents)) {
                    return convertDocumentToSourceMapper(host, mapFileContents, mapFileName2);
                }
                if (mapFileContents !== void 0) {
                    return mapFileContents || void 0;
                }
            }
            return void 0;
        }