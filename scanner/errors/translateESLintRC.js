function translateESLintRC(eslintrcConfig, { resolveConfigRelativeTo, resolvePluginsRelativeTo, pluginEnvironments, pluginProcessors }) {
        const flatConfig = {};
        const configs = [];
        const languageOptions = {};
        const linterOptions = {};
        const keysToCopy = ["settings", "rules", "processor"];
        const languageOptionsKeysToCopy = ["globals", "parser", "parserOptions"];
        const linterOptionsKeysToCopy = ["noInlineConfig", "reportUnusedDisableDirectives"];
        // copy over simple translations
        for (const key of keysToCopy) {
            if (key in eslintrcConfig && typeof eslintrcConfig[key] !== "undefined") {
                flatConfig[key] = eslintrcConfig[key];
            }
        }
        // copy over languageOptions
        for (const key of languageOptionsKeysToCopy) {
            if (key in eslintrcConfig && typeof eslintrcConfig[key] !== "undefined") {
                // create the languageOptions key in the flat config
                flatConfig.languageOptions = languageOptions;
                if (key === "parser") {
                    debug(`Resolving parser '${languageOptions[key]}' relative to ${resolveConfigRelativeTo}`);
                    if (eslintrcConfig[key].error) {
                        throw eslintrcConfig[key].error;
                    }
                    languageOptions[key] = eslintrcConfig[key].definition;
                    continue;
                }
                // clone any object values that are in the eslintrc config
                if (eslintrcConfig[key] && typeof eslintrcConfig[key] === "object") {
                    languageOptions[key] = {
                        ...eslintrcConfig[key]
                    };
                }
                else {
                    languageOptions[key] = eslintrcConfig[key];
                }
            }
        }
        // copy over linterOptions
        for (const key of linterOptionsKeysToCopy) {
            if (key in eslintrcConfig && typeof eslintrcConfig[key] !== "undefined") {
                flatConfig.linterOptions = linterOptions;
                linterOptions[key] = eslintrcConfig[key];
            }
        }
        // move ecmaVersion a level up
        if (languageOptions.parserOptions) {
            if ("ecmaVersion" in languageOptions.parserOptions) {
                languageOptions.ecmaVersion = languageOptions.parserOptions.ecmaVersion;
                delete languageOptions.parserOptions.ecmaVersion;
            }
            if ("sourceType" in languageOptions.parserOptions) {
                languageOptions.sourceType = languageOptions.parserOptions.sourceType;
                delete languageOptions.parserOptions.sourceType;
            }
            // check to see if we even need parserOptions anymore and remove it if not
            if (Object.keys(languageOptions.parserOptions).length === 0) {
                delete languageOptions.parserOptions;
            }
        }
        // overrides
        if (eslintrcConfig.criteria) {
            flatConfig.files = [absoluteFilePath => eslintrcConfig.criteria.test(absoluteFilePath)];
        }
        // translate plugins
        if (eslintrcConfig.plugins && typeof eslintrcConfig.plugins === "object") {
            debug(`Translating plugins: ${eslintrcConfig.plugins}`);
            flatConfig.plugins = {};
            for (const pluginName of Object.keys(eslintrcConfig.plugins)) {
                debug(`Translating plugin: ${pluginName}`);
                debug(`Resolving plugin '${pluginName} relative to ${resolvePluginsRelativeTo}`);
                const { definition: plugin, error } = eslintrcConfig.plugins[pluginName];
                if (error) {
                    throw error;
                }
                flatConfig.plugins[pluginName] = plugin;
                // create a config for any processors
                if (plugin.processors) {
                    for (const processorName of Object.keys(plugin.processors)) {
                        if (processorName.startsWith(".")) {
                            debug(`Assigning processor: ${pluginName}/${processorName}`);
                            configs.unshift({
                                files: [`**/*${processorName}`],
                                processor: pluginProcessors.get(`${pluginName}/${processorName}`)
                            });
                        }
                    }
                }
            }
        }
        // translate env - must come after plugins
        if (eslintrcConfig.env && typeof eslintrcConfig.env === "object") {
            for (const envName of Object.keys(eslintrcConfig.env)) {
                // only add environments that are true
                if (eslintrcConfig.env[envName]) {
                    debug(`Translating environment: ${envName}`);
                    if (environments.has(envName)) {
                        // built-in environments should be defined first
                        configs.unshift(...translateESLintRC(environments.get(envName), {
                            resolveConfigRelativeTo,
                            resolvePluginsRelativeTo
                        }));
                    }
                    else if (pluginEnvironments.has(envName)) {
                        // if the environment comes from a plugin, it should come after the plugin config
                        configs.push(...translateESLintRC(pluginEnvironments.get(envName), {
                            resolveConfigRelativeTo,
                            resolvePluginsRelativeTo
                        }));
                    }
                }
            }
        }
        // only add if there are actually keys in the config
        if (Object.keys(flatConfig).length > 0) {
            configs.push(flatConfig);
        }
        return configs;
    }