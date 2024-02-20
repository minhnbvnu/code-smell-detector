function defaultValue(key) {
                if (!checkAllAliases(key, flags.bools) &&
                    !checkAllAliases(key, flags.counts) &&
                    `${key}` in defaults) {
                    return defaults[key];
                }
                else {
                    return defaultForType(guessType(key));
                }
            }