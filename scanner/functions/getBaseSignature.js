function getBaseSignature(signature) {
                const typeParameters = signature.typeParameters;
                if (typeParameters) {
                    if (signature.baseSignatureCache) {
                        return signature.baseSignatureCache;
                    }
                    const typeEraser = createTypeEraser(typeParameters);
                    const baseConstraintMapper = createTypeMapper(typeParameters, map(typeParameters, (tp) => getConstraintOfTypeParameter(tp) || unknownType));
                    let baseConstraints = map(typeParameters, (tp) => instantiateType(tp, baseConstraintMapper) || unknownType);
                    for (let i = 0; i < typeParameters.length - 1; i++) {
                        baseConstraints = instantiateTypes(baseConstraints, baseConstraintMapper);
                    }
                    baseConstraints = instantiateTypes(baseConstraints, typeEraser);
                    return signature.baseSignatureCache = instantiateSignature(signature, createTypeMapper(typeParameters, baseConstraints), 
                    /*eraseTypeParameters*/
                    true);
                }
                return signature;
            }