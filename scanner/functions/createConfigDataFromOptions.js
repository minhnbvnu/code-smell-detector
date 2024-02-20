function createConfigDataFromOptions(options) {
        const { ignorePattern, parser, parserOptions, plugins, rules } = options;
        const env = toBooleanMap(options.envs, true, "envs");
        const globals = toBooleanMap(options.globals, false, "globals");
        if (env === void 0 &&
            globals === void 0 &&
            (ignorePattern === void 0 || ignorePattern.length === 0) &&
            parser === void 0 &&
            parserOptions === void 0 &&
            plugins === void 0 &&
            rules === void 0) {
            return null;
        }
        return {
            env,
            globals,
            ignorePatterns: ignorePattern,
            parser,
            parserOptions,
            plugins,
            rules
        };
    }