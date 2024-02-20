function quoteBaseName(modPath) {
        var modName = trimModName(stripQuotes(modPath));
        var path = getRootFilePath(modName);
        if(path == "") {
            return modPath;
        } else {
            var components = modName.split(path);
            var fileIndex = components.length > 1 ? 1 : 0;
            return quoteStr(components[fileIndex]);
        }
    }