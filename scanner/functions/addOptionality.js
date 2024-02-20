function addOptionality(type, isProperty = false, isOptional = true) {
                return strictNullChecks && isOptional ? getOptionalType(type, isProperty) : type;
            }