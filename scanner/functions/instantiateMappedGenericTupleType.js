function instantiateMappedGenericTupleType(tupleType, mappedType, typeVariable, mapper) {
                const elementFlags = tupleType.target.elementFlags;
                const elementTypes = map(getTypeArguments(tupleType), (t, i) => {
                    const singleton = elementFlags[i] & 8 /* Variadic */ ? t : elementFlags[i] & 4 /* Rest */ ? createArrayType(t) : createTupleType([t], [elementFlags[i]]);
                    return instantiateMappedType(mappedType, prependTypeMapping(typeVariable, singleton, mapper));
                });
                const newReadonly = getModifiedReadonlyState(tupleType.target.readonly, getMappedTypeModifiers(mappedType));
                return createTupleType(elementTypes, map(elementTypes, (_) => 8 /* Variadic */), newReadonly);
            }