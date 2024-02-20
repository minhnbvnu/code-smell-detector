function getUnionOrEvolvingArrayType(types, subtypeReduction) {
                    if (isEvolvingArrayTypeList(types)) {
                        return getEvolvingArrayType(getUnionType(map(types, getElementTypeOfEvolvingArrayType)));
                    }
                    const result = recombineUnknownType(getUnionType(sameMap(types, finalizeEvolvingArrayType), subtypeReduction));
                    if (result !== declaredType && result.flags & declaredType.flags & 1048576 /* Union */ && arraysEqual(result.types, declaredType.types)) {
                        return declaredType;
                    }
                    return result;
                }