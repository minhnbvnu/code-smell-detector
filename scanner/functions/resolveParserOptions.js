function resolveParserOptions(parser, providedOptions, enabledEnvironments) {
        const parserOptionsFromEnv = enabledEnvironments
            .filter(env => env.parserOptions)
            .reduce((parserOptions, env) => merge(parserOptions, env.parserOptions), {});
        const mergedParserOptions = merge(parserOptionsFromEnv, providedOptions || {});
        const isModule = mergedParserOptions.sourceType === "module";
        if (isModule) {
            /*
             * can't have global return inside of modules
             * TODO: espree validate parserOptions.globalReturn when sourceType is setting to module.(@aladdin-add)
             */
            mergedParserOptions.ecmaFeatures = Object.assign({}, mergedParserOptions.ecmaFeatures, { globalReturn: false });
        }
        mergedParserOptions.ecmaVersion = normalizeEcmaVersion(parser, mergedParserOptions.ecmaVersion);
        return mergedParserOptions;
    }