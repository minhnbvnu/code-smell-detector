function instantiateMappedType(type, mapper, aliasSymbol, aliasTypeArguments) {
                const typeVariable = getHomomorphicTypeVariable(type);
                if (typeVariable) {
                    const mappedTypeVariable = instantiateType(typeVariable, mapper);
                    if (typeVariable !== mappedTypeVariable) {
                        return mapTypeWithAlias(getReducedType(mappedTypeVariable), (t) => {
                            if (t.flags & (3 /* AnyOrUnknown */ | 58982400 /* InstantiableNonPrimitive */ | 524288 /* Object */ | 2097152 /* Intersection */) && t !== wildcardType && !isErrorType(t)) {
                                if (!type.declaration.nameType) {
                                    let constraint;
                                    if (isArrayType(t) || t.flags & 1 /* Any */ && findResolutionCycleStartIndex(typeVariable, 4 /* ImmediateBaseConstraint */) < 0 && (constraint = getConstraintOfTypeParameter(typeVariable)) && everyType(constraint, isArrayOrTupleType)) {
                                        return instantiateMappedArrayType(t, type, prependTypeMapping(typeVariable, t, mapper));
                                    }
                                    if (isGenericTupleType(t)) {
                                        return instantiateMappedGenericTupleType(t, type, typeVariable, mapper);
                                    }
                                    if (isTupleType(t)) {
                                        return instantiateMappedTupleType(t, type, prependTypeMapping(typeVariable, t, mapper));
                                    }
                                }
                                return instantiateAnonymousType(type, prependTypeMapping(typeVariable, t, mapper));
                            }
                            return t;
                        }, aliasSymbol, aliasTypeArguments);
                    }
                }
                return instantiateType(getConstraintTypeFromMappedType(type), mapper) === wildcardType ? wildcardType : instantiateAnonymousType(type, mapper, aliasSymbol, aliasTypeArguments);
            }