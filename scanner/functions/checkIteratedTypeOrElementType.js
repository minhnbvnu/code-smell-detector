function checkIteratedTypeOrElementType(use, inputType, sentType, errorNode) {
                if (isTypeAny(inputType)) {
                    return inputType;
                }
                return getIteratedTypeOrElementType(use, inputType, sentType, errorNode, 
                /*checkAssignability*/
                true) || anyType;
            }