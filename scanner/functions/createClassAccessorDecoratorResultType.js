function createClassAccessorDecoratorResultType(thisType, valueType) {
                return tryCreateTypeReference(getGlobalClassAccessorDecoratorResultType(
                /*reportError*/
                true), [thisType, valueType]);
            }