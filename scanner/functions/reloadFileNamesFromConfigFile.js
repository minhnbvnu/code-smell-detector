function reloadFileNamesFromConfigFile() {
                writeLog("Reloading new file names and options");
                Debug.assert(compilerOptions);
                Debug.assert(configFileName);
                reloadLevel = 0 /* None */;
                rootFileNames = getFileNamesFromConfigSpecs(compilerOptions.configFile.configFileSpecs, getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory), compilerOptions, parseConfigFileHost, extraFileExtensions);
                if (updateErrorForNoInputFiles(rootFileNames, getNormalizedAbsolutePath(configFileName, currentDirectory), compilerOptions.configFile.configFileSpecs, configFileParsingDiagnostics, canConfigFileJsonReportNoInputFiles)) {
                    hasChangedConfigFileParsingErrors = true;
                }
                synchronizeProgram();
            }