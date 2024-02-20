function getTypeOfDestructuredArrayElement(type, index) {
                return everyType(type, isTupleLikeType) && getTupleElementType(type, index) || includeUndefinedInIndexSignature(checkIteratedTypeOrElementType(65 /* Destructuring */, type, undefinedType, 
                /*errorNode*/
                void 0)) || errorType;
            }