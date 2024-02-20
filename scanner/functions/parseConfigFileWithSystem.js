function parseConfigFileWithSystem(configFileName, optionsToExtend, extendedConfigCache, watchOptionsToExtend, system, reportDiagnostic) {
            const host = system;
            host.onUnRecoverableConfigFileDiagnostic = (diagnostic) => reportUnrecoverableDiagnostic(system, reportDiagnostic, diagnostic);
            const result = getParsedCommandLineOfConfigFile(configFileName, optionsToExtend, host, extendedConfigCache, watchOptionsToExtend);
            host.onUnRecoverableConfigFileDiagnostic = void 0;
            return result;
        }