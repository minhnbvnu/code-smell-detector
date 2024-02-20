function getSimplifiedConditionalType(type, writing) {
                const checkType = type.checkType;
                const extendsType = type.extendsType;
                const trueType2 = getTrueTypeFromConditionalType(type);
                const falseType2 = getFalseTypeFromConditionalType(type);
                if (falseType2.flags & 131072 /* Never */ && getActualTypeVariable(trueType2) === getActualTypeVariable(checkType)) {
                    if (checkType.flags & 1 /* Any */ || isTypeAssignableTo(getRestrictiveInstantiation(checkType), getRestrictiveInstantiation(extendsType))) {
                        return getSimplifiedType(trueType2, writing);
                    }
                    else if (isIntersectionEmpty(checkType, extendsType)) {
                        return neverType;
                    }
                }
                else if (trueType2.flags & 131072 /* Never */ && getActualTypeVariable(falseType2) === getActualTypeVariable(checkType)) {
                    if (!(checkType.flags & 1 /* Any */) && isTypeAssignableTo(getRestrictiveInstantiation(checkType), getRestrictiveInstantiation(extendsType))) {
                        return neverType;
                    }
                    else if (checkType.flags & 1 /* Any */ || isIntersectionEmpty(checkType, extendsType)) {
                        return getSimplifiedType(falseType2, writing);
                    }
                }
                return type;
            }