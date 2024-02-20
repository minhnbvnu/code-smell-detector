function mutateMap(map2, newMap, options) {
            mutateMapSkippingNewValues(map2, newMap, options);
            const { createNewValue } = options;
            newMap.forEach((valueInNewMap, key) => {
                if (!map2.has(key)) {
                    map2.set(key, createNewValue(key, valueInNewMap));
                }
            });
        }