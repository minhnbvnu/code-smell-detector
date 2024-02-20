function fillMissingTypeArguments(typeArguments, typeParameters, minTypeArgumentCount, isJavaScriptImplicitAny) {
                const numTypeParameters = length(typeParameters);
                if (!numTypeParameters) {
                    return [];
                }
                const numTypeArguments = length(typeArguments);
                if (isJavaScriptImplicitAny || numTypeArguments >= minTypeArgumentCount && numTypeArguments <= numTypeParameters) {
                    const result = typeArguments ? typeArguments.slice() : [];
                    for (let i = numTypeArguments; i < numTypeParameters; i++) {
                        result[i] = errorType;
                    }
                    const baseDefaultType = getDefaultTypeArgumentType(isJavaScriptImplicitAny);
                    for (let i = numTypeArguments; i < numTypeParameters; i++) {
                        let defaultType = getDefaultFromTypeParameter(typeParameters[i]);
                        if (isJavaScriptImplicitAny && defaultType && (isTypeIdenticalTo(defaultType, unknownType) || isTypeIdenticalTo(defaultType, emptyObjectType))) {
                            defaultType = anyType;
                        }
                        result[i] = defaultType ? instantiateType(defaultType, createTypeMapper(typeParameters, result)) : baseDefaultType;
                    }
                    result.length = typeParameters.length;
                    return result;
                }
                return typeArguments && typeArguments.slice();
            }