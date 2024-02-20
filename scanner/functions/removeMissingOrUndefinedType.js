function removeMissingOrUndefinedType(type) {
                return exactOptionalPropertyTypes ? removeType(type, missingType) : getTypeWithFacts(type, 524288 /* NEUndefined */);
            }