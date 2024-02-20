function resolvePluginConfig(name, plugin) {
    let config = {};

    Object.keys(plugin.rules).forEach(function(ruleName) {
        config [name + "/" + ruleName] = plugin.rules [ruleName].meta.docs.type;
    });

    return config;
}