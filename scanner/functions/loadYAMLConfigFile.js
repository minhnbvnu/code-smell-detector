function loadYAMLConfigFile(filePath) {
        debug$2(`Loading YAML config file: ${filePath}`);
        // lazy load YAML to improve performance when not used
        const yaml = require$1("js-yaml");
        try {
            // empty YAML file can be null, so always use
            return yaml.load(readFile(filePath)) || {};
        }
        catch (e) {
            debug$2(`Error reading YAML file: ${filePath}`);
            e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
            throw e;
        }
    }