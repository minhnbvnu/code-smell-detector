function loadESLintIgnoreFile(filePath) {
        debug$2(`Loading .eslintignore file: ${filePath}`);
        try {
            return readFile(filePath)
                .split(/\r?\n/gu)
                .filter(line => line.trim() !== "" && !line.startsWith("#"));
        }
        catch (e) {
            debug$2(`Error reading .eslintignore file: ${filePath}`);
            e.message = `Cannot read .eslintignore file: ${filePath}\nError: ${e.message}`;
            throw e;
        }
    }