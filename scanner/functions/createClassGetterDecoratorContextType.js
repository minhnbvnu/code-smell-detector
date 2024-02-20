function createClassGetterDecoratorContextType(thisType, valueType) {
                return tryCreateTypeReference(getGlobalClassGetterDecoratorContextType(
                /*reportErrors*/
                true), [thisType, valueType]);
            }