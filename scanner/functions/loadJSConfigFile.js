function loadJSConfigFile(filePath) {
        debug$2(`Loading JS config file: ${filePath}`);
        try {
            return importFresh__default["default"](filePath);
        }
        catch (e) {
            debug$2(`Error reading JavaScript file: ${filePath}`);
            e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
            throw e;
        }
    }