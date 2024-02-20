function getCachedParsedConfigFile(state, configFilePath) {
            const value = state.configFileCache.get(configFilePath);
            return value && isParsedCommandLine(value) ? value : void 0;
        }