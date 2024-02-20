function applyCoercions(argv) {
                let coerce;
                const applied = new Set();
                Object.keys(argv).forEach(function (key) {
                    if (!applied.has(key)) {
                        coerce = checkAllAliases(key, flags.coercions);
                        if (typeof coerce === 'function') {
                            try {
                                const value = maybeCoerceNumber(key, coerce(argv[key]));
                                ([].concat(flags.aliases[key] || [], key)).forEach(ali => {
                                    applied.add(ali);
                                    argv[ali] = value;
                                });
                            }
                            catch (err) {
                                error = err;
                            }
                        }
                    }
                });
            }