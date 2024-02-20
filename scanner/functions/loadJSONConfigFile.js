function loadJSONConfigFile(filePath) {
        debug$2(`Loading JSON config file: ${filePath}`);
        try {
            return JSON.parse(stripComments__default["default"](readFile(filePath)));
        }
        catch (e) {
            debug$2(`Error reading JSON file: ${filePath}`);
            e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
            e.messageTemplate = "failed-to-read-json";
            e.messageData = {
                path: filePath,
                message: e.message
            };
            throw e;
        }
    }