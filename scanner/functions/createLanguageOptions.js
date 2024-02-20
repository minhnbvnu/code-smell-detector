function createLanguageOptions({ globals: configuredGlobals, parser, parserOptions }) {
        const { ecmaVersion, sourceType } = parserOptions;
        return {
            globals: configuredGlobals,
            ecmaVersion: normalizeEcmaVersionForLanguageOptions(ecmaVersion),
            sourceType,
            parser,
            parserOptions
        };
    }