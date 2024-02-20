function loadPackageJSONConfigFile(filePath) {
        debug$2(`Loading package.json config file: ${filePath}`);
        try {
            const packageData = loadJSONConfigFile(filePath);
            if (!Object.hasOwnProperty.call(packageData, "eslintConfig")) {
                throw Object.assign(new Error("package.json file doesn't have 'eslintConfig' field."), { code: "ESLINT_CONFIG_FIELD_NOT_FOUND" });
            }
            return packageData.eslintConfig;
        }
        catch (e) {
            debug$2(`Error reading package.json file: ${filePath}`);
            e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
            throw e;
        }
    }