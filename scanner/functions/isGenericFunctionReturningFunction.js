function isGenericFunctionReturningFunction(signature) {
                return !!(signature.typeParameters && isFunctionType(getReturnTypeOfSignature(signature)));
            }