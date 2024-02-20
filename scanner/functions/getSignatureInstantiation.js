function getSignatureInstantiation(signature, typeArguments, isJavascript, inferredTypeParameters) {
                const instantiatedSignature = getSignatureInstantiationWithoutFillingInTypeArguments(signature, fillMissingTypeArguments(typeArguments, signature.typeParameters, getMinTypeArgumentCount(signature.typeParameters), isJavascript));
                if (inferredTypeParameters) {
                    const returnSignature = getSingleCallOrConstructSignature(getReturnTypeOfSignature(instantiatedSignature));
                    if (returnSignature) {
                        const newReturnSignature = cloneSignature(returnSignature);
                        newReturnSignature.typeParameters = inferredTypeParameters;
                        const newInstantiatedSignature = cloneSignature(instantiatedSignature);
                        newInstantiatedSignature.resolvedReturnType = getOrCreateTypeFromSignature(newReturnSignature);
                        return newInstantiatedSignature;
                    }
                }
                return instantiatedSignature;
            }