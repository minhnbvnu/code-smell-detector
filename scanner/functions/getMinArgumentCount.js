function getMinArgumentCount(signature, flags) {
                const strongArityForUntypedJS = flags & 1 /* StrongArityForUntypedJS */;
                const voidIsNonOptional = flags & 2 /* VoidIsNonOptional */;
                if (voidIsNonOptional || signature.resolvedMinArgumentCount === void 0) {
                    let minArgumentCount;
                    if (signatureHasRestParameter(signature)) {
                        const restType = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                        if (isTupleType(restType)) {
                            const firstOptionalIndex = findIndex(restType.target.elementFlags, (f) => !(f & 1 /* Required */));
                            const requiredCount = firstOptionalIndex < 0 ? restType.target.fixedLength : firstOptionalIndex;
                            if (requiredCount > 0) {
                                minArgumentCount = signature.parameters.length - 1 + requiredCount;
                            }
                        }
                    }
                    if (minArgumentCount === void 0) {
                        if (!strongArityForUntypedJS && signature.flags & 32 /* IsUntypedSignatureInJSFile */) {
                            return 0;
                        }
                        minArgumentCount = signature.minArgumentCount;
                    }
                    if (voidIsNonOptional) {
                        return minArgumentCount;
                    }
                    for (let i = minArgumentCount - 1; i >= 0; i--) {
                        const type = getTypeAtPosition(signature, i);
                        if (filterType(type, acceptsVoid).flags & 131072 /* Never */) {
                            break;
                        }
                        minArgumentCount = i;
                    }
                    signature.resolvedMinArgumentCount = minArgumentCount;
                }
                return signature.resolvedMinArgumentCount;
            }