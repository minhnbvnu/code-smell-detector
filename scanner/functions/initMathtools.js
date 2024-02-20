function initMathtools(config) {
        new SymbolMap_js_1.CommandMap(exports.PAIREDDELIMS, {}, {});
        config.append(Configuration_js_1.Configuration.local({ handler: { macro: [exports.PAIREDDELIMS] }, priority: -5 }));
    }