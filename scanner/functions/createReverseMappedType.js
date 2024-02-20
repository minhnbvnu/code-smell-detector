function createReverseMappedType(source, target, constraint) {
                if (!(getIndexInfoOfType(source, stringType) || getPropertiesOfType(source).length !== 0 && isPartiallyInferableType(source))) {
                    return void 0;
                }
                if (isArrayType(source)) {
                    return createArrayType(inferReverseMappedType(getTypeArguments(source)[0], target, constraint), isReadonlyArrayType(source));
                }
                if (isTupleType(source)) {
                    const elementTypes = map(getTypeArguments(source), (t) => inferReverseMappedType(t, target, constraint));
                    const elementFlags = getMappedTypeModifiers(target) & 4 /* IncludeOptional */ ? sameMap(source.target.elementFlags, (f) => f & 2 /* Optional */ ? 1 /* Required */ : f) : source.target.elementFlags;
                    return createTupleType(elementTypes, elementFlags, source.target.readonly, source.target.labeledElementDeclarations);
                }
                const reversed = createObjectType(1024 /* ReverseMapped */ | 16 /* Anonymous */, 
                /*symbol*/
                void 0);
                reversed.source = source;
                reversed.mappedType = target;
                reversed.constraintType = constraint;
                return reversed;
            }