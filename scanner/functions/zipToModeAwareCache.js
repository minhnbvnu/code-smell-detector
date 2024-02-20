function zipToModeAwareCache(file, keys, values, nameAndModeGetter) {
            Debug.assert(keys.length === values.length);
            const map2 = createModeAwareCache();
            for (let i = 0; i < keys.length; ++i) {
                const entry = keys[i];
                map2.set(nameAndModeGetter.getName(entry), nameAndModeGetter.getMode(entry, file), values[i]);
            }
            return map2;
        }