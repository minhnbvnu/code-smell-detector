function getEffectiveRestType(signature) {
                if (signatureHasRestParameter(signature)) {
                    const restType = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                    if (!isTupleType(restType)) {
                        return restType;
                    }
                    if (restType.target.hasRestElement) {
                        return sliceTupleType(restType, restType.target.fixedLength);
                    }
                }
                return void 0;
            }