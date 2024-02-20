function getPropertiesForCompletion(type, checker) {
            return type.isUnion() ? Debug.checkEachDefined(checker.getAllPossiblePropertiesOfTypes(type.types), "getAllPossiblePropertiesOfTypes() should all be defined") : Debug.checkEachDefined(type.getApparentProperties(), "getApparentProperties() should all be defined");
        }