function setConfigFileParsingResult(configFileParseResult) {
                rootFileNames = configFileParseResult.fileNames;
                compilerOptions = configFileParseResult.options;
                watchOptions = configFileParseResult.watchOptions;
                projectReferences = configFileParseResult.projectReferences;
                wildcardDirectories = configFileParseResult.wildcardDirectories;
                configFileParsingDiagnostics = getConfigFileParsingDiagnostics(configFileParseResult).slice();
                canConfigFileJsonReportNoInputFiles = canJsonReportNoInputFiles(configFileParseResult.raw);
                hasChangedConfigFileParsingErrors = true;
            }