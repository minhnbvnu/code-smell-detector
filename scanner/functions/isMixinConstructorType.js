function isMixinConstructorType(type) {
                const signatures = getSignaturesOfType(type, 1 /* Construct */);
                if (signatures.length === 1) {
                    const s = signatures[0];
                    if (!s.typeParameters && s.parameters.length === 1 && signatureHasRestParameter(s)) {
                        const paramType = getTypeOfParameter(s.parameters[0]);
                        return isTypeAny(paramType) || getElementTypeOfArrayType(paramType) === anyType;
                    }
                }
                return false;
            }