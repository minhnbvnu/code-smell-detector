function readConfigFile(fileName, readFile) {
            const textOrDiagnostic = tryReadFile(fileName, readFile);
            return isString(textOrDiagnostic) ? parseConfigFileTextToJson(fileName, textOrDiagnostic) : { config: {}, error: textOrDiagnostic };
        }