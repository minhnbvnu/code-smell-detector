function parseConfigFile(state, configFileName, configFilePath) {
            const { configFileCache } = state;
            const value = configFileCache.get(configFilePath);
            if (value) {
                return isParsedCommandLine(value) ? value : void 0;
            }
            mark("SolutionBuilder::beforeConfigFileParsing");
            let diagnostic;
            const { parseConfigFileHost, baseCompilerOptions, baseWatchOptions, extendedConfigCache, host } = state;
            let parsed;
            if (host.getParsedCommandLine) {
                parsed = host.getParsedCommandLine(configFileName);
                if (!parsed)
                    diagnostic = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
            }
            else {
                parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = (d) => diagnostic = d;
                parsed = getParsedCommandLineOfConfigFile(configFileName, baseCompilerOptions, parseConfigFileHost, extendedConfigCache, baseWatchOptions);
                parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = noop;
            }
            configFileCache.set(configFilePath, parsed || diagnostic);
            mark("SolutionBuilder::afterConfigFileParsing");
            measure("SolutionBuilder::Config file parsing", "SolutionBuilder::beforeConfigFileParsing", "SolutionBuilder::afterConfigFileParsing");
            return parsed;
        }