function getJsxPropsTypeForSignatureFromMember(sig, forcedLookupLocation) {
                if (sig.compositeSignatures) {
                    const results = [];
                    for (const signature of sig.compositeSignatures) {
                        const instance = getReturnTypeOfSignature(signature);
                        if (isTypeAny(instance)) {
                            return instance;
                        }
                        const propType = getTypeOfPropertyOfType(instance, forcedLookupLocation);
                        if (!propType) {
                            return;
                        }
                        results.push(propType);
                    }
                    return getIntersectionType(results);
                }
                const instanceType = getReturnTypeOfSignature(sig);
                return isTypeAny(instanceType) ? instanceType : getTypeOfPropertyOfType(instanceType, forcedLookupLocation);
            }