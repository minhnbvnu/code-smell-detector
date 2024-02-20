function validateGlobals(globalsConfig, source = null) {
        if (!globalsConfig) {
            return;
        }
        Object.entries(globalsConfig)
            .forEach(([configuredGlobal, configuredValue]) => {
            try {
                ConfigOps.normalizeConfigGlobal(configuredValue);
            }
            catch (err) {
                throw new Error(`ESLint configuration of global '${configuredGlobal}' in ${source} is invalid:\n${err.message}`);
            }
        });
    }