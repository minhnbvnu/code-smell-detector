function tryGetRestTypeOfSignature(signature) {
                if (signatureHasRestParameter(signature)) {
                    const sigRestType = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                    const restType = isTupleType(sigRestType) ? getRestTypeOfTupleType(sigRestType) : sigRestType;
                    return restType && getIndexTypeOfType(restType, numberType);
                }
                return void 0;
            }