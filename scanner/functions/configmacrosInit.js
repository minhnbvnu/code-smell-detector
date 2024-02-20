function configmacrosInit(config) {
        new SymbolMap_js_1.CommandMap(MACROSMAP, {}, {});
        new SymbolMap_js_1.EnvironmentMap(ENVIRONMENTMAP, ParseMethods_js_1.default.environment, {}, {});
        config.append(Configuration_js_1.Configuration.local({
            handler: {
                macro: [MACROSMAP],
                environment: [ENVIRONMENTMAP]
            },
            priority: 3
        }));
    }