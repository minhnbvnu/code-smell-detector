function toEditorSettings(optionsAsMap) {
            let allPropertiesAreCamelCased = true;
            for (const key in optionsAsMap) {
                if (hasProperty(optionsAsMap, key) && !isCamelCase(key)) {
                    allPropertiesAreCamelCased = false;
                    break;
                }
            }
            if (allPropertiesAreCamelCased) {
                return optionsAsMap;
            }
            const settings = {};
            for (const key in optionsAsMap) {
                if (hasProperty(optionsAsMap, key)) {
                    const newKey = isCamelCase(key) ? key : key.charAt(0).toLowerCase() + key.substr(1);
                    settings[newKey] = optionsAsMap[key];
                }
            }
            return settings;
        }