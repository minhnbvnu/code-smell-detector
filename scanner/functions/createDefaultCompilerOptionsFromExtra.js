function createDefaultCompilerOptionsFromExtra(parseSettings) {
        if (parseSettings.debugLevel.has('typescript')) {
            return Object.assign(Object.assign({}, DEFAULT_COMPILER_OPTIONS), { extendedDiagnostics: true });
        }
        return DEFAULT_COMPILER_OPTIONS;
    }