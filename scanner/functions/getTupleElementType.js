function getTupleElementType(type, index) {
                const propType = getTypeOfPropertyOfType(type, "" + index);
                if (propType) {
                    return propType;
                }
                if (everyType(type, isTupleType)) {
                    return mapType(type, (t) => {
                        const tupleType = t;
                        const restType = getRestTypeOfTupleType(tupleType);
                        if (!restType) {
                            return undefinedType;
                        }
                        if (compilerOptions.noUncheckedIndexedAccess && index >= tupleType.target.fixedLength + getEndElementCount(tupleType.target, 3 /* Fixed */)) {
                            return getUnionType([restType, undefinedType]);
                        }
                        return restType;
                    });
                }
                return void 0;
            }