function checkConfig(config, lookup) {

    // Check for the required fields in each plugin.
    config.forEach(function (plugin) {
        if (plugin.checked) { return; }
        if (!plugin.hasOwnProperty("setup")) {
            throw new Error("Plugin is missing the setup function " + JSON.stringify(plugin));
        }
        if (!plugin.hasOwnProperty("provides")) {
            throw new Error("Plugin is missing the provides array " + JSON.stringify(plugin));
        }
        if (!plugin.hasOwnProperty("consumes")) {
            throw new Error("Plugin is missing the consumes array " + JSON.stringify(plugin));
        }
    });

    return checkCycles(config, lookup);
}