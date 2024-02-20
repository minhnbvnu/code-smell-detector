function resolveConfigSync(config, base) {
        config.forEach(function (plugin, index) {
            // Shortcut where string is used for plugin without any options.
            if (typeof plugin === "string") {
                plugin = config[index] = { packagePath: plugin };
            }
            // The plugin is a package on the disk.  We need to load it.
            if (plugin.hasOwnProperty("packagePath") && !plugin.hasOwnProperty("setup")) {
                var defaults = resolveModuleSync(base, plugin.packagePath);
                Object.keys(defaults).forEach(function (key) {
                    if (!plugin.hasOwnProperty(key)) {
                        plugin[key] = defaults[key];
                    }
                });
                plugin.packagePath = defaults.packagePath;
                plugin.setup = require(plugin.packagePath);
            }
        });
        return config;
    }