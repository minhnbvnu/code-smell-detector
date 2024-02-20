function hasEffectiveRestParameter(signature) {
                if (signatureHasRestParameter(signature)) {
                    const restType = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                    return !isTupleType(restType) || restType.target.hasRestElement;
                }
                return false;
            }