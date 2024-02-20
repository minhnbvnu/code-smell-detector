function tryParsePatterns(paths) {
            return mapDefined(getOwnKeys(paths), (path) => tryParsePattern(path));
        }