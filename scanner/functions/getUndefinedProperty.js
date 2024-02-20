function getUndefinedProperty(prop) {
                const cached = undefinedProperties.get(prop.escapedName);
                if (cached) {
                    return cached;
                }
                const result = createSymbolWithType(prop, undefinedOrMissingType);
                result.flags |= 16777216 /* Optional */;
                undefinedProperties.set(prop.escapedName, result);
                return result;
            }