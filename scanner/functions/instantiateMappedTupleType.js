function instantiateMappedTupleType(tupleType, mappedType, mapper) {
                const elementFlags = tupleType.target.elementFlags;
                const elementTypes = map(getTypeArguments(tupleType), (_, i) => instantiateMappedTypeTemplate(mappedType, getStringLiteralType("" + i), !!(elementFlags[i] & 2 /* Optional */), mapper));
                const modifiers = getMappedTypeModifiers(mappedType);
                const newTupleModifiers = modifiers & 4 /* IncludeOptional */ ? map(elementFlags, (f) => f & 1 /* Required */ ? 2 /* Optional */ : f) : modifiers & 8 /* ExcludeOptional */ ? map(elementFlags, (f) => f & 2 /* Optional */ ? 1 /* Required */ : f) : elementFlags;
                const newReadonly = getModifiedReadonlyState(tupleType.target.readonly, modifiers);
                return contains(elementTypes, errorType) ? errorType : createTupleType(elementTypes, newTupleModifiers, newReadonly, tupleType.target.labeledElementDeclarations);
            }