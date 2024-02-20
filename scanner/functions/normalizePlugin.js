function normalizePlugin(plugin) {
        // first check the cache
        let normalizedPlugin = normalizedPlugins.get(plugin);
        if (normalizedPlugin) {
            return normalizedPlugin;
        }
        normalizedPlugin = {
            configs: plugin.configs || {},
            environments: plugin.environments || {},
            processors: plugin.processors || {},
            rules: plugin.rules || {}
        };
        // save the reference for later
        normalizedPlugins.set(plugin, normalizedPlugin);
        return normalizedPlugin;
    }