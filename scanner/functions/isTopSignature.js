function isTopSignature(s) {
                if (!s.typeParameters && (!s.thisParameter || isTypeAny(getTypeOfParameter(s.thisParameter))) && s.parameters.length === 1 && signatureHasRestParameter(s)) {
                    const paramType = getTypeOfParameter(s.parameters[0]);
                    const restType = isArrayType(paramType) ? getTypeArguments(paramType)[0] : paramType;
                    return !!(restType.flags & (1 /* Any */ | 131072 /* Never */) && getReturnTypeOfSignature(s).flags & 3 /* AnyOrUnknown */);
                }
                return false;
            }