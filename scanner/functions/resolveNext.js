function resolveNext(i) {
            if (i >= config.length) {
                return callback(null, config);
            }

            var plugin = config[i];

            // Shortcut where string is used for plugin without any options.
            if (typeof plugin === "string") {
                plugin = config[i] = { packagePath: plugin };
            }
            // The plugin is a package on the disk.  We need to load it.
            if (plugin.hasOwnProperty("packagePath") && !plugin.hasOwnProperty("setup")) {
                resolveModule(base, plugin.packagePath, function(err, defaults) {
                    if (err) return callback(err);

                    Object.keys(defaults).forEach(function (key) {
                        if (!plugin.hasOwnProperty(key)) {
                            plugin[key] = defaults[key];
                        }
                    });
                    plugin.packagePath = defaults.packagePath;
                    try {
                        plugin.setup = require(plugin.packagePath);
                    } catch(e) {
                        return callback(e);
                    }

                    return resolveNext(++i);
                });
                return;
            }

            return resolveNext(++i);
        }