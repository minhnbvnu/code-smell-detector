function getExactOptionalProperties(type) {
                return getPropertiesOfType(type).filter((targetProp) => containsMissingType(getTypeOfSymbol(targetProp)));
            }