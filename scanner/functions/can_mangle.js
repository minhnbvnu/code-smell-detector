function can_mangle(name) {
                if (unmangleable.has(name))
                    return false;
                if (reserved.has(name))
                    return false;
                if (options.only_cache) {
                    return cache.has(name);
                }
                if (/^-?[0-9]+(\.[0-9]+)?(e[+-][0-9]+)?$/.test(name))
                    return false;
                return true;
            }