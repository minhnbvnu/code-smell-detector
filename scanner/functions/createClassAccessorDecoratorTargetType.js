function createClassAccessorDecoratorTargetType(thisType, valueType) {
                return tryCreateTypeReference(getGlobalClassAccessorDecoratorTargetType(
                /*reportError*/
                true), [thisType, valueType]);
            }