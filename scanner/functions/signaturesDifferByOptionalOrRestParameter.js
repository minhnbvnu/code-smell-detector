function signaturesDifferByOptionalOrRestParameter(a, b) {
                const sig1 = a.params;
                const sig2 = b.params;
                const minLength = Math.min(sig1.length, sig2.length);
                const longer = sig1.length < sig2.length ? sig2 : sig1;
                const shorter = sig1.length < sig2.length ? sig1 : sig2;
                const shorterSig = sig1.length < sig2.length ? a : b;
                // If one is has 2+ parameters more than the other, they must all be optional/rest.
                // Differ by optional parameters: f() and f(x), f() and f(x, ?y, ...z)
                // Not allowed: f() and f(x, y)
                for (let i = minLength + 1; i < longer.length; i++) {
                    if (!parameterMayBeMissing(longer[i])) {
                        return undefined;
                    }
                }
                for (let i = 0; i < minLength; i++) {
                    const sig1i = sig1[i];
                    const sig2i = sig2[i];
                    const typeAnnotation1 = isTSParameterProperty(sig1i)
                        ? sig1i.parameter.typeAnnotation
                        : sig1i.typeAnnotation;
                    const typeAnnotation2 = isTSParameterProperty(sig2i)
                        ? sig2i.parameter.typeAnnotation
                        : sig2i.typeAnnotation;
                    if (!typesAreEqual(typeAnnotation1, typeAnnotation2)) {
                        return undefined;
                    }
                }
                if (minLength > 0 &&
                    shorter[minLength - 1].type === utils_1.AST_NODE_TYPES.RestElement) {
                    return undefined;
                }
                return {
                    extraParameter: longer[longer.length - 1],
                    kind: 'extra-parameter',
                    otherSignature: shorterSig,
                };
            }