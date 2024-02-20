function mutateMapSkippingNewValues(map2, newMap, options) {
            const { onDeleteValue, onExistingValue } = options;
            map2.forEach((existingValue, key) => {
                const valueInNewMap = newMap.get(key);
                if (valueInNewMap === void 0) {
                    map2.delete(key);
                    onDeleteValue(existingValue, key);
                }
                else if (onExistingValue) {
                    onExistingValue(existingValue, valueInNewMap, key);
                }
            });
        }