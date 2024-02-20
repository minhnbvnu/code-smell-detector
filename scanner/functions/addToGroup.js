function addToGroup(map2, key, value, getKey) {
                const keyString = String(getKey(key));
                const group2 = map2.get(keyString);
                if (group2) {
                    group2[1].push(value);
                }
                else {
                    map2.set(keyString, [key, [value]]);
                }
            }