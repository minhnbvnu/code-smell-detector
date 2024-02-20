function getWidenedLiteralLikeTypeForContextualIterationTypeIfNeeded(type, contextualSignatureReturnType, kind, isAsyncGenerator) {
                if (type && isUnitType(type)) {
                    const contextualType = !contextualSignatureReturnType ? void 0 : getIterationTypeOfGeneratorFunctionReturnType(kind, contextualSignatureReturnType, isAsyncGenerator);
                    type = getWidenedLiteralLikeTypeForContextualType(type, contextualType);
                }
                return type;
            }