function convertCompilerOptionsFromJsonWorker(jsonOptions, basePath, errors, configFileName) {
            const options = getDefaultCompilerOptions(configFileName);
            convertOptionsFromJson(getCommandLineCompilerOptionsMap(), jsonOptions, basePath, options, compilerOptionsDidYouMeanDiagnostics, errors);
            if (configFileName) {
                options.configFilePath = normalizeSlashes(configFileName);
            }
            return options;
        }