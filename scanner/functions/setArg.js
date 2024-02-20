function setArg(key, val, shouldStripQuotes = inputIsString) {
                if (/-/.test(key) && configuration['camel-case-expansion']) {
                    const alias = key.split('.').map(function (prop) {
                        return camelCase(prop);
                    }).join('.');
                    addNewAlias(key, alias);
                }
                const value = processValue(key, val, shouldStripQuotes);
                const splitKey = key.split('.');
                setKey(argv, splitKey, value);
                if (flags.aliases[key]) {
                    flags.aliases[key].forEach(function (x) {
                        const keyProperties = x.split('.');
                        setKey(argv, keyProperties, value);
                    });
                }
                if (splitKey.length > 1 && configuration['dot-notation']) {
                    (flags.aliases[splitKey[0]] || []).forEach(function (x) {
                        let keyProperties = x.split('.');
                        const a = [].concat(splitKey);
                        a.shift();
                        keyProperties = keyProperties.concat(a);
                        if (!(flags.aliases[key] || []).includes(keyProperties.join('.'))) {
                            setKey(argv, keyProperties, value);
                        }
                    });
                }
                if (checkAllAliases(key, flags.normalize) && !checkAllAliases(key, flags.arrays)) {
                    const keys = [key].concat(flags.aliases[key] || []);
                    keys.forEach(function (key) {
                        Object.defineProperty(argvReturn, key, {
                            enumerable: true,
                            get() {
                                return val;
                            },
                            set(value) {
                                val = typeof value === 'string' ? mixin.normalize(value) : value;
                            }
                        });
                    });
                }
            }