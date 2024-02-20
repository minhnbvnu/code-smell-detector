function setConfigObject(config, prev) {
                Object.keys(config).forEach(function (key) {
                    const value = config[key];
                    const fullKey = prev ? prev + '.' + key : key;
                    if (typeof value === 'object' && value !== null && !Array.isArray(value) && configuration['dot-notation']) {
                        setConfigObject(value, fullKey);
                    }
                    else {
                        if (!hasKey(argv, fullKey.split('.')) || (checkAllAliases(fullKey, flags.arrays) && configuration['combine-arrays'])) {
                            setArg(fullKey, value);
                        }
                    }
                });
            }