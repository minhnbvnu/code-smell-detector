function getNameOfCompilerOptionValue(value, customTypeMap) {
            return forEachEntry(customTypeMap, (mapValue, key) => {
                if (mapValue === value) {
                    return key;
                }
            });
        }