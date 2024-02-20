function getThisTypeOfSignature(signature) {
                if (signature.thisParameter) {
                    return getTypeOfSymbol(signature.thisParameter);
                }
            }