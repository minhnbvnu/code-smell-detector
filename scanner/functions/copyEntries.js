function copyEntries(source, target) {
            source.forEach((value, key) => {
                target.set(key, value);
            });
        }