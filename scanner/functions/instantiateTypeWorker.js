function instantiateTypeWorker(type, mapper, aliasSymbol, aliasTypeArguments) {
                const flags = type.flags;
                if (flags & 262144 /* TypeParameter */) {
                    return getMappedType(type, mapper);
                }
                if (flags & 524288 /* Object */) {
                    const objectFlags = type.objectFlags;
                    if (objectFlags & (4 /* Reference */ | 16 /* Anonymous */ | 32 /* Mapped */)) {
                        if (objectFlags & 4 /* Reference */ && !type.node) {
                            const resolvedTypeArguments = type.resolvedTypeArguments;
                            const newTypeArguments = instantiateTypes(resolvedTypeArguments, mapper);
                            return newTypeArguments !== resolvedTypeArguments ? createNormalizedTypeReference(type.target, newTypeArguments) : type;
                        }
                        if (objectFlags & 1024 /* ReverseMapped */) {
                            return instantiateReverseMappedType(type, mapper);
                        }
                        return getObjectTypeInstantiation(type, mapper, aliasSymbol, aliasTypeArguments);
                    }
                    return type;
                }
                if (flags & 3145728 /* UnionOrIntersection */) {
                    const origin = type.flags & 1048576 /* Union */ ? type.origin : void 0;
                    const types = origin && origin.flags & 3145728 /* UnionOrIntersection */ ? origin.types : type.types;
                    const newTypes = instantiateTypes(types, mapper);
                    if (newTypes === types && aliasSymbol === type.aliasSymbol) {
                        return type;
                    }
                    const newAliasSymbol = aliasSymbol || type.aliasSymbol;
                    const newAliasTypeArguments = aliasSymbol ? aliasTypeArguments : instantiateTypes(type.aliasTypeArguments, mapper);
                    return flags & 2097152 /* Intersection */ || origin && origin.flags & 2097152 /* Intersection */ ? getIntersectionType(newTypes, newAliasSymbol, newAliasTypeArguments) : getUnionType(newTypes, 1 /* Literal */, newAliasSymbol, newAliasTypeArguments);
                }
                if (flags & 4194304 /* Index */) {
                    return getIndexType(instantiateType(type.type, mapper));
                }
                if (flags & 134217728 /* TemplateLiteral */) {
                    return getTemplateLiteralType(type.texts, instantiateTypes(type.types, mapper));
                }
                if (flags & 268435456 /* StringMapping */) {
                    return getStringMappingType(type.symbol, instantiateType(type.type, mapper));
                }
                if (flags & 8388608 /* IndexedAccess */) {
                    const newAliasSymbol = aliasSymbol || type.aliasSymbol;
                    const newAliasTypeArguments = aliasSymbol ? aliasTypeArguments : instantiateTypes(type.aliasTypeArguments, mapper);
                    return getIndexedAccessType(instantiateType(type.objectType, mapper), instantiateType(type.indexType, mapper), type.accessFlags, 
                    /*accessNode*/
                    void 0, newAliasSymbol, newAliasTypeArguments);
                }
                if (flags & 16777216 /* Conditional */) {
                    return getConditionalTypeInstantiation(type, combineTypeMappers(type.mapper, mapper), aliasSymbol, aliasTypeArguments);
                }
                if (flags & 33554432 /* Substitution */) {
                    const newBaseType = instantiateType(type.baseType, mapper);
                    const newConstraint = instantiateType(type.constraint, mapper);
                    if (newBaseType.flags & 8650752 /* TypeVariable */ && isGenericType(newConstraint)) {
                        return getSubstitutionType(newBaseType, newConstraint);
                    }
                    if (newConstraint.flags & 3 /* AnyOrUnknown */ || isTypeAssignableTo(getRestrictiveInstantiation(newBaseType), getRestrictiveInstantiation(newConstraint))) {
                        return newBaseType;
                    }
                    return newBaseType.flags & 8650752 /* TypeVariable */ ? getSubstitutionType(newBaseType, newConstraint) : getIntersectionType([newConstraint, newBaseType]);
                }
                return type;
            }