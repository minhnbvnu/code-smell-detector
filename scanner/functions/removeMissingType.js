function removeMissingType(type, isOptional) {
                return exactOptionalPropertyTypes && isOptional ? removeType(type, missingType) : type;
            }