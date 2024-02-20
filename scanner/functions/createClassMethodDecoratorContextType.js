function createClassMethodDecoratorContextType(thisType, valueType) {
                return tryCreateTypeReference(getGlobalClassMethodDecoratorContextType(
                /*reportErrors*/
                true), [thisType, valueType]);
            }