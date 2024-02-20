function combineIntersectionThisParam(left, right, mapper) {
                if (!left || !right) {
                    return left || right;
                }
                const thisType = getUnionType([getTypeOfSymbol(left), instantiateType(getTypeOfSymbol(right), mapper)]);
                return createSymbolWithType(left, thisType);
            }