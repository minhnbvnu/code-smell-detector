function createClassDecoratorContextType(classType) {
                return tryCreateTypeReference(getGlobalClassDecoratorContextType(
                /*reportErrors*/
                true), [classType]);
            }