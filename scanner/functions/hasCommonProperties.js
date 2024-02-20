function hasCommonProperties(source, target, isComparingJsxAttributes) {
                for (const prop of getPropertiesOfType(source)) {
                    if (isKnownProperty(target, prop.escapedName, isComparingJsxAttributes)) {
                        return true;
                    }
                }
                return false;
            }