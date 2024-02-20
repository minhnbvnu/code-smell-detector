function loadConfigFile(filePath) {
        switch (path__default["default"].extname(filePath)) {
            case ".js":
            case ".cjs":
                return loadJSConfigFile(filePath);
            case ".json":
                if (path__default["default"].basename(filePath) === "package.json") {
                    return loadPackageJSONConfigFile(filePath);
                }
                return loadJSONConfigFile(filePath);
            case ".yaml":
            case ".yml":
                return loadYAMLConfigFile(filePath);
            default:
                return loadLegacyConfigFile(filePath);
        }
    }