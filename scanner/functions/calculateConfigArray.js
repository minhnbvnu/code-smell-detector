async function calculateConfigArray(eslint, { cwd, baseConfig, overrideConfig, configFile, ignore: shouldIgnore, ignorePatterns }) {
        // check for cached instance
        const slots = privateMembers.get(eslint);
        if (slots.configs) {
            return slots.configs;
        }
        // determine where to load config file from
        let configFilePath;
        let basePath = cwd;
        if (typeof configFile === "string") {
            debug(`Override config file path is ${configFile}`);
            configFilePath = path.resolve(cwd, configFile);
        }
        else if (configFile !== false) {
            debug("Searching for eslint.config.js");
            configFilePath = await findFlatConfigFile(cwd);
            if (!configFilePath) {
                throw new Error("Could not find config file.");
            }
            basePath = path.resolve(path.dirname(configFilePath));
        }
        const configs = new FlatConfigArray(baseConfig || [], { basePath, shouldIgnore });
        // load config file
        if (configFilePath) {
            const fileConfig = await loadFlatConfigFile(configFilePath);
            if (Array.isArray(fileConfig)) {
                configs.push(...fileConfig);
            }
            else {
                configs.push(fileConfig);
            }
        }
        // add in any configured defaults
        configs.push(...slots.defaultConfigs);
        let allIgnorePatterns = [];
        // append command line ignore patterns
        if (ignorePatterns) {
            if (typeof ignorePatterns === "string") {
                allIgnorePatterns.push(ignorePatterns);
            }
            else {
                allIgnorePatterns.push(...ignorePatterns);
            }
        }
        /*
         * If the config file basePath is different than the cwd, then
         * the ignore patterns won't work correctly. Here, we adjust the
         * ignore pattern to include the correct relative path. Patterns
         * loaded from ignore files are always relative to the cwd, whereas
         * the config file basePath can be an ancestor of the cwd.
         */
        if (basePath !== cwd && allIgnorePatterns.length) {
            const relativeIgnorePath = path.relative(basePath, cwd);
            allIgnorePatterns = allIgnorePatterns.map(pattern => {
                const negated = pattern.startsWith("!");
                const basePattern = negated ? pattern.slice(1) : pattern;
                return (negated ? "!" : "") +
                    path.posix.join(relativeIgnorePath, basePattern);
            });
        }
        if (allIgnorePatterns.length) {
            /*
             * Ignore patterns are added to the end of the config array
             * so they can override default ignores.
             */
            configs.push({
                ignores: allIgnorePatterns
            });
        }
        if (overrideConfig) {
            if (Array.isArray(overrideConfig)) {
                configs.push(...overrideConfig);
            }
            else {
                configs.push(overrideConfig);
            }
        }
        await configs.normalize();
        // cache the config array for this instance
        slots.configs = configs;
        return configs;
    }