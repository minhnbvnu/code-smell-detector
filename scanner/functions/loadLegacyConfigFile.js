function loadLegacyConfigFile(filePath) {
        debug$2(`Loading legacy config file: ${filePath}`);
        // lazy load YAML to improve performance when not used
        const yaml = require$1("js-yaml");
        try {
            return yaml.load(stripComments__default["default"](readFile(filePath))) || /* istanbul ignore next */ {};
        }
        catch (e) {
            debug$2("Error reading YAML file: %s\n%o", filePath, e);
            e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
            throw e;
        }
    }