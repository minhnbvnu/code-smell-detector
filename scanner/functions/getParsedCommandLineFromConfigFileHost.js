function getParsedCommandLineFromConfigFileHost(configFileName2) {
                const onUnRecoverableConfigFileDiagnostic = parseConfigFileHost.onUnRecoverableConfigFileDiagnostic;
                parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = noop;
                const parsedCommandLine = getParsedCommandLineOfConfigFile(configFileName2, 
                /*optionsToExtend*/
                void 0, parseConfigFileHost, extendedConfigCache || (extendedConfigCache = /* @__PURE__ */ new Map()), watchOptionsToExtend);
                parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = onUnRecoverableConfigFileDiagnostic;
                return parsedCommandLine;
            }