function signaturesCanBeUnified(a, b, isTypeParameter) {
                // Must return the same type.
                const aTypeParams = a.typeParameters !== undefined ? a.typeParameters.params : undefined;
                const bTypeParams = b.typeParameters !== undefined ? b.typeParameters.params : undefined;
                if (ignoreDifferentlyNamedParameters &&
                    a.params.length === b.params.length) {
                    for (let i = 0; i < a.params.length; i += 1) {
                        if (a.params[i].type === b.params[i].type &&
                            getStaticParameterName(a.params[i]) !==
                                getStaticParameterName(b.params[i])) {
                            return false;
                        }
                    }
                }
                return (typesAreEqual(a.returnType, b.returnType) &&
                    // Must take the same type parameters.
                    // If one uses a type parameter (from outside) and the other doesn't, they shouldn't be joined.
                    util.arraysAreEqual(aTypeParams, bTypeParams, typeParametersAreEqual) &&
                    signatureUsesTypeParameter(a, isTypeParameter) ===
                        signatureUsesTypeParameter(b, isTypeParameter));
            }