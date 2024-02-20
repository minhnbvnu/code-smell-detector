function getPropertyAssignment(objectLiteral, key, key2) {
            return objectLiteral.properties.filter((property) => {
                if (property.kind === 299 /* PropertyAssignment */) {
                    const propName = tryGetTextOfPropertyName(property.name);
                    return key === propName || !!key2 && key2 === propName;
                }
                return false;
            });
        }