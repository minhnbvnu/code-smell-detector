function applyDefaultsAndAliases(obj, aliases, defaults, canLog = false) {
                Object.keys(defaults).forEach(function (key) {
                    if (!hasKey(obj, key.split('.'))) {
                        setKey(obj, key.split('.'), defaults[key]);
                        if (canLog)
                            defaulted[key] = true;
                        (aliases[key] || []).forEach(function (x) {
                            if (hasKey(obj, x.split('.')))
                                return;
                            setKey(obj, x.split('.'), defaults[key]);
                        });
                    }
                });
            }