function createClassSetterDecoratorContextType(thisType, valueType) {
                return tryCreateTypeReference(getGlobalClassSetterDecoratorContextType(
                /*reportErrors*/
                true), [thisType, valueType]);
            }