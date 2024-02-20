function getTypeOfDestructuredSpreadExpression(type) {
                return createArrayType(checkIteratedTypeOrElementType(65 /* Destructuring */, type, undefinedType, 
                /*errorNode*/
                void 0) || errorType);
            }