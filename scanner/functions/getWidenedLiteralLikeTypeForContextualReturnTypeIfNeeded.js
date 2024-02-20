function getWidenedLiteralLikeTypeForContextualReturnTypeIfNeeded(type, contextualSignatureReturnType, isAsync) {
                if (type && isUnitType(type)) {
                    const contextualType = !contextualSignatureReturnType ? void 0 : isAsync ? getPromisedTypeOfPromise(contextualSignatureReturnType) : contextualSignatureReturnType;
                    type = getWidenedLiteralLikeTypeForContextualType(type, contextualType);
                }
                return type;
            }