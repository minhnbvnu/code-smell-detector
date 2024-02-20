function convertCompilerOptionsFromJson(jsonOptions, basePath, configFileName) {
            const errors = [];
            const options = convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName);
            return { options, errors };
        }