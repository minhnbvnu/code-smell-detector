function checkExpressionForMutableLocationWithContextualType(next, sourcePropType) {
                pushContextualType(next, sourcePropType, 
                /*isCache*/
                false);
                const result = checkExpressionForMutableLocation(next, 1 /* Contextual */);
                popContextualType();
                return result;
            }