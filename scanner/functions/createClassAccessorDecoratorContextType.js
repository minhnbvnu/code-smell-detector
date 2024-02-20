function createClassAccessorDecoratorContextType(thisType, valueType) {
                return tryCreateTypeReference(getGlobalClassAccessorDecoratorContextType(
                /*reportErrors*/
                true), [thisType, valueType]);
            }