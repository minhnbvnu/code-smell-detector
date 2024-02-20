function parseConfigFile2() {
                Debug.assert(configFileName);
                setConfigFileParsingResult(getParsedCommandLineOfConfigFile(configFileName, optionsToExtendForConfigFile, parseConfigFileHost, extendedConfigCache || (extendedConfigCache = /* @__PURE__ */ new Map()), watchOptionsToExtend, extraFileExtensions));
            }