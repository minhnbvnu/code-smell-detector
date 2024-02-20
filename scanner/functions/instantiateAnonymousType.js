function instantiateAnonymousType(type, mapper, aliasSymbol, aliasTypeArguments) {
                const result = createObjectType(type.objectFlags | 64 /* Instantiated */, type.symbol);
                if (type.objectFlags & 32 /* Mapped */) {
                    result.declaration = type.declaration;
                    const origTypeParameter = getTypeParameterFromMappedType(type);
                    const freshTypeParameter = cloneTypeParameter(origTypeParameter);
                    result.typeParameter = freshTypeParameter;
                    mapper = combineTypeMappers(makeUnaryTypeMapper(origTypeParameter, freshTypeParameter), mapper);
                    freshTypeParameter.mapper = mapper;
                }
                if (type.objectFlags & 8388608 /* InstantiationExpressionType */) {
                    result.node = type.node;
                }
                result.target = type;
                result.mapper = mapper;
                result.aliasSymbol = aliasSymbol || type.aliasSymbol;
                result.aliasTypeArguments = aliasSymbol ? aliasTypeArguments : instantiateTypes(type.aliasTypeArguments, mapper);
                result.objectFlags |= result.aliasTypeArguments ? getPropagatingFlagsOfTypes(result.aliasTypeArguments) : 0;
                return result;
            }