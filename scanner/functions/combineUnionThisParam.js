function combineUnionThisParam(left, right, mapper) {
                if (!left || !right) {
                    return left || right;
                }
                const thisType = getIntersectionType([getTypeOfSymbol(left), instantiateType(getTypeOfSymbol(right), mapper)]);
                return createSymbolWithType(left, thisType);
            }