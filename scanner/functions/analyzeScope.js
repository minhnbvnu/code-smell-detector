function analyzeScope(ast, languageOptions, visitorKeys) {
        const parserOptions = languageOptions.parserOptions;
        const ecmaFeatures = parserOptions.ecmaFeatures || {};
        const ecmaVersion = languageOptions.ecmaVersion || DEFAULT_ECMA_VERSION;
        return eslintScope.analyze(ast, {
            ignoreEval: true,
            nodejsScope: ecmaFeatures.globalReturn,
            impliedStrict: ecmaFeatures.impliedStrict,
            ecmaVersion: typeof ecmaVersion === "number" ? ecmaVersion : 6,
            sourceType: languageOptions.sourceType || "script",
            childVisitorKeys: visitorKeys || evk.KEYS,
            fallback: Traverser.getKeys
        });
    }