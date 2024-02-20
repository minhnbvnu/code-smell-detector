function getOrCreateValueFromConfigFileMap(configFileMap, resolved, createT) {
            const existingValue = configFileMap.get(resolved);
            let newValue;
            if (!existingValue) {
                newValue = createT();
                configFileMap.set(resolved, newValue);
            }
            return existingValue || newValue;
        }