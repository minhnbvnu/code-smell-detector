function getParameterCount(signature) {
                const length2 = signature.parameters.length;
                if (signatureHasRestParameter(signature)) {
                    const restType = getTypeOfSymbol(signature.parameters[length2 - 1]);
                    if (isTupleType(restType)) {
                        return length2 + restType.target.fixedLength - (restType.target.hasRestElement ? 0 : 1);
                    }
                }
                return length2;
            }