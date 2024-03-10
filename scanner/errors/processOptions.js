function processOptions({ allowInlineConfig = true, // ← we cannot use `overrideConfig.noInlineConfig` instead because `allowInlineConfig` has side-effect that suppress warnings that show inline configs are ignored.
    baseConfig = null, cache = false, cacheLocation = ".eslintcache", cacheStrategy = "metadata", cwd = process.cwd(), errorOnUnmatchedPattern = true, fix = false, fixTypes = null, // ← should be null by default because if it's an array then it suppresses rules that don't have the `meta.type` property.
    globInputPaths = true, ignore = true, ignorePatterns = null, overrideConfig = null, overrideConfigFile = null, plugins = {}, reportUnusedDisableDirectives = null, // ← should be null by default because if it's a string then it overrides the 'reportUnusedDisableDirectives' setting in config files. And we cannot use `overrideConfig.reportUnusedDisableDirectives` instead because we cannot configure the `error` severity with that.
    ...unknownOptions }) {
        const errors = [];
        const unknownOptionKeys = Object.keys(unknownOptions);
        if (unknownOptionKeys.length >= 1) {
            errors.push(`Unknown options: ${unknownOptionKeys.join(", ")}`);
            if (unknownOptionKeys.includes("cacheFile")) {
                errors.push("'cacheFile' has been removed. Please use the 'cacheLocation' option instead.");
            }
            if (unknownOptionKeys.includes("configFile")) {
                errors.push("'configFile' has been removed. Please use the 'overrideConfigFile' option instead.");
            }
            if (unknownOptionKeys.includes("envs")) {
                errors.push("'envs' has been removed.");
            }
            if (unknownOptionKeys.includes("extensions")) {
                errors.push("'extensions' has been removed.");
            }
            if (unknownOptionKeys.includes("resolvePluginsRelativeTo")) {
                errors.push("'resolvePluginsRelativeTo' has been removed.");
            }
            if (unknownOptionKeys.includes("globals")) {
                errors.push("'globals' has been removed. Please use the 'overrideConfig.languageOptions.globals' option instead.");
            }
            if (unknownOptionKeys.includes("ignorePath")) {
                errors.push("'ignorePath' has been removed.");
            }
            if (unknownOptionKeys.includes("ignorePattern")) {
                errors.push("'ignorePattern' has been removed. Please use the 'overrideConfig.ignorePatterns' option instead.");
            }
            if (unknownOptionKeys.includes("parser")) {
                errors.push("'parser' has been removed. Please use the 'overrideConfig.languageOptions.parser' option instead.");
            }
            if (unknownOptionKeys.includes("parserOptions")) {
                errors.push("'parserOptions' has been removed. Please use the 'overrideConfig.languageOptions.parserOptions' option instead.");
            }
            if (unknownOptionKeys.includes("rules")) {
                errors.push("'rules' has been removed. Please use the 'overrideConfig.rules' option instead.");
            }
            if (unknownOptionKeys.includes("rulePaths")) {
                errors.push("'rulePaths' has been removed. Please define your rules using plugins.");
            }
        }
        if (typeof allowInlineConfig !== "boolean") {
            errors.push("'allowInlineConfig' must be a boolean.");
        }
        if (typeof baseConfig !== "object") {
            errors.push("'baseConfig' must be an object or null.");
        }
        if (typeof cache !== "boolean") {
            errors.push("'cache' must be a boolean.");
        }
        if (!isNonEmptyString(cacheLocation)) {
            errors.push("'cacheLocation' must be a non-empty string.");
        }
        if (cacheStrategy !== "metadata" &&
            cacheStrategy !== "content") {
            errors.push("'cacheStrategy' must be any of \"metadata\", \"content\".");
        }
        if (!isNonEmptyString(cwd) || !path.isAbsolute(cwd)) {
            errors.push("'cwd' must be an absolute path.");
        }
        if (typeof errorOnUnmatchedPattern !== "boolean") {
            errors.push("'errorOnUnmatchedPattern' must be a boolean.");
        }
        if (typeof fix !== "boolean" && typeof fix !== "function") {
            errors.push("'fix' must be a boolean or a function.");
        }
        if (fixTypes !== null && !isFixTypeArray(fixTypes)) {
            errors.push("'fixTypes' must be an array of any of \"directive\", \"problem\", \"suggestion\", and \"layout\".");
        }
        if (typeof globInputPaths !== "boolean") {
            errors.push("'globInputPaths' must be a boolean.");
        }
        if (typeof ignore !== "boolean") {
            errors.push("'ignore' must be a boolean.");
        }
        if (typeof overrideConfig !== "object") {
            errors.push("'overrideConfig' must be an object or null.");
        }
        if (!isNonEmptyString(overrideConfigFile) && overrideConfigFile !== null && overrideConfigFile !== true) {
            errors.push("'overrideConfigFile' must be a non-empty string, null, or true.");
        }
        if (typeof plugins !== "object") {
            errors.push("'plugins' must be an object or null.");
        }
        else if (plugins !== null && Object.keys(plugins).includes("")) {
            errors.push("'plugins' must not include an empty string.");
        }
        if (Array.isArray(plugins)) {
            errors.push("'plugins' doesn't add plugins to configuration to load. Please use the 'overrideConfig.plugins' option instead.");
        }
        if (reportUnusedDisableDirectives !== "error" &&
            reportUnusedDisableDirectives !== "warn" &&
            reportUnusedDisableDirectives !== "off" &&
            reportUnusedDisableDirectives !== null) {
            errors.push("'reportUnusedDisableDirectives' must be any of \"error\", \"warn\", \"off\", and null.");
        }
        if (errors.length > 0) {
            throw new ESLintInvalidOptionsError(errors);
        }
        return {
            allowInlineConfig,
            baseConfig,
            cache,
            cacheLocation,
            cacheStrategy,
            // when overrideConfigFile is true that means don't do config file lookup
            configFile: overrideConfigFile === true ? false : overrideConfigFile,
            overrideConfig,
            cwd,
            errorOnUnmatchedPattern,
            fix,
            fixTypes,
            globInputPaths,
            ignore,
            ignorePatterns,
            reportUnusedDisableDirectives
        };
    }