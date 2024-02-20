function tryGetTypeAtPosition(signature, pos) {
                const paramCount = signature.parameters.length - (signatureHasRestParameter(signature) ? 1 : 0);
                if (pos < paramCount) {
                    return getTypeOfParameter(signature.parameters[pos]);
                }
                if (signatureHasRestParameter(signature)) {
                    const restType = getTypeOfSymbol(signature.parameters[paramCount]);
                    const index = pos - paramCount;
                    if (!isTupleType(restType) || restType.target.hasRestElement || index < restType.target.fixedLength) {
                        return getIndexedAccessType(restType, getNumberLiteralType(index));
                    }
                }
                return void 0;
            }