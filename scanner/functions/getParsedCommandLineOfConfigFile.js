function getParsedCommandLineOfConfigFile(configFileName, optionsToExtend, host, extendedConfigCache, watchOptionsToExtend, extraFileExtensions) {
            const configFileText = tryReadFile(configFileName, (fileName) => host.readFile(fileName));
            if (!isString(configFileText)) {
                host.onUnRecoverableConfigFileDiagnostic(configFileText);
                return void 0;
            }
            const result = parseJsonText(configFileName, configFileText);
            const cwd = host.getCurrentDirectory();
            result.path = toPath(configFileName, cwd, createGetCanonicalFileName(host.useCaseSensitiveFileNames));
            result.resolvedPath = result.path;
            result.originalFileName = result.fileName;
            return parseJsonSourceFileConfigFileContent(result, host, getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd), optionsToExtend, getNormalizedAbsolutePath(configFileName, cwd), 
            /*resolutionStack*/
            void 0, extraFileExtensions, extendedConfigCache, watchOptionsToExtend);
        }