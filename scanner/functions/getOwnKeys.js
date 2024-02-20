function getOwnKeys(map2) {
            const keys = [];
            for (const key in map2) {
                if (hasOwnProperty.call(map2, key)) {
                    keys.push(key);
                }
            }
            return keys;
        }