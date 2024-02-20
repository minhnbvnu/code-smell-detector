function extendAliases(...args) {
                args.forEach(function (obj) {
                    Object.keys(obj || {}).forEach(function (key) {
                        if (flags.aliases[key])
                            return;
                        flags.aliases[key] = [].concat(aliases[key] || []);
                        flags.aliases[key].concat(key).forEach(function (x) {
                            if (/-/.test(x) && configuration['camel-case-expansion']) {
                                const c = camelCase(x);
                                if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                                    flags.aliases[key].push(c);
                                    newAliases[c] = true;
                                }
                            }
                        });
                        flags.aliases[key].concat(key).forEach(function (x) {
                            if (x.length > 1 && /[A-Z]/.test(x) && configuration['camel-case-expansion']) {
                                const c = decamelize(x, '-');
                                if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                                    flags.aliases[key].push(c);
                                    newAliases[c] = true;
                                }
                            }
                        });
                        flags.aliases[key].forEach(function (x) {
                            flags.aliases[x] = [key].concat(flags.aliases[key].filter(function (y) {
                                return x !== y;
                            }));
                        });
                    });
                });
            }