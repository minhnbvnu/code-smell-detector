function createClassFieldDecoratorContextType(thisType, valueType) {
                return tryCreateTypeReference(getGlobalClassFieldDecoratorContextType(
                /*reportErrors*/
                true), [thisType, valueType]);
            }