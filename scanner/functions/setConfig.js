function setConfig(argv) {
                const configLookup = Object.create(null);
                applyDefaultsAndAliases(configLookup, flags.aliases, defaults);
                Object.keys(flags.configs).forEach(function (configKey) {
                    const configPath = argv[configKey] || configLookup[configKey];
                    if (configPath) {
                        try {
                            let config = null;
                            const resolvedConfigPath = mixin.resolve(mixin.cwd(), configPath);
                            const resolveConfig = flags.configs[configKey];
                            if (typeof resolveConfig === 'function') {
                                try {
                                    config = resolveConfig(resolvedConfigPath);
                                }
                                catch (e) {
                                    config = e;
                                }
                                if (config instanceof Error) {
                                    error = config;
                                    return;
                                }
                            }
                            else {
                                config = mixin.require(resolvedConfigPath);
                            }
                            setConfigObject(config);
                        }
                        catch (ex) {
                            if (ex.name === 'PermissionDenied')
                                error = ex;
                            else if (argv[configKey])
                                error = Error(__('Invalid JSON config file: %s', configPath));
                        }
                    }
                });
            }