function should_mangle(name) {
                if (regex && !regex.test(name))
                    return false;
                if (reserved.has(name))
                    return false;
                return cache.has(name)
                    || names_to_mangle.has(name);
            }