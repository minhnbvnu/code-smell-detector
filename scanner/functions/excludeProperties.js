function excludeProperties(properties, excludedProperties) {
                    if (!excludedProperties || properties.length === 0)
                        return properties;
                    let result2;
                    for (let i = 0; i < properties.length; i++) {
                        if (!excludedProperties.has(properties[i].escapedName)) {
                            if (result2) {
                                result2.push(properties[i]);
                            }
                        }
                        else if (!result2) {
                            result2 = properties.slice(0, i);
                        }
                    }
                    return result2 || properties;
                }