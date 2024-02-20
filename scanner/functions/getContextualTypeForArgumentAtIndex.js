function getContextualTypeForArgumentAtIndex(callTarget, argIndex) {
                if (isImportCall(callTarget)) {
                    return argIndex === 0 ? stringType : argIndex === 1 ? getGlobalImportCallOptionsType(
                    /*reportErrors*/
                    false) : anyType;
                }
                const signature = getNodeLinks(callTarget).resolvedSignature === resolvingSignature ? resolvingSignature : getResolvedSignature(callTarget);
                if (isJsxOpeningLikeElement(callTarget) && argIndex === 0) {
                    return getEffectiveFirstArgumentForJsxSignature(signature, callTarget);
                }
                const restIndex = signature.parameters.length - 1;
                return signatureHasRestParameter(signature) && argIndex >= restIndex ? getIndexedAccessType(getTypeOfSymbol(signature.parameters[restIndex]), getNumberLiteralType(argIndex - restIndex), 256 /* Contextual */) : getTypeAtPosition(signature, argIndex);
            }