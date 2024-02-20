function getElementTypeOfSliceOfTupleType(type, index, endSkipCount = 0, writing = false, noReductions = false) {
                const length2 = getTypeReferenceArity(type) - endSkipCount;
                if (index < length2) {
                    const typeArguments = getTypeArguments(type);
                    const elementTypes = [];
                    for (let i = index; i < length2; i++) {
                        const t = typeArguments[i];
                        elementTypes.push(type.target.elementFlags[i] & 8 /* Variadic */ ? getIndexedAccessType(t, numberType) : t);
                    }
                    return writing ? getIntersectionType(elementTypes) : getUnionType(elementTypes, noReductions ? 0 /* None */ : 1 /* Literal */);
                }
                return void 0;
            }