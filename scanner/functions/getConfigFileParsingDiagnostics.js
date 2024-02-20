function getConfigFileParsingDiagnostics(configFileParseResult) {
            return configFileParseResult.options.configFile ? [...configFileParseResult.options.configFile.parseDiagnostics, ...configFileParseResult.errors] : configFileParseResult.errors;
        }