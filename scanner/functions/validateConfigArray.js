function validateConfigArray(configArray) {
        const getPluginEnv = Map.prototype.get.bind(configArray.pluginEnvironments);
        const getPluginProcessor = Map.prototype.get.bind(configArray.pluginProcessors);
        const getPluginRule = Map.prototype.get.bind(configArray.pluginRules);
        // Validate.
        for (const element of configArray) {
            if (validated.has(element)) {
                continue;
            }
            validated.add(element);
            validateEnvironment(element.env, element.name, getPluginEnv);
            validateGlobals(element.globals, element.name);
            validateProcessor(element.processor, element.name, getPluginProcessor);
            validateRules(element.rules, element.name, getPluginRule);
        }
    }