function getExactOptionalUnassignableProperties(source, target) {
                if (isTupleType(source) && isTupleType(target))
                    return emptyArray;
                return getPropertiesOfType(target).filter((targetProp) => isExactOptionalPropertyMismatch(getTypeOfPropertyOfType(source, targetProp.escapedName), getTypeOfSymbol(targetProp)));
            }