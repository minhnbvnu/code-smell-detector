function combineIterationTypes(array) {
                let yieldTypes;
                let returnTypes;
                let nextTypes;
                for (const iterationTypes of array) {
                    if (iterationTypes === void 0 || iterationTypes === noIterationTypes) {
                        continue;
                    }
                    if (iterationTypes === anyIterationTypes) {
                        return anyIterationTypes;
                    }
                    yieldTypes = append(yieldTypes, iterationTypes.yieldType);
                    returnTypes = append(returnTypes, iterationTypes.returnType);
                    nextTypes = append(nextTypes, iterationTypes.nextType);
                }
                if (yieldTypes || returnTypes || nextTypes) {
                    return createIterationTypes(yieldTypes && getUnionType(yieldTypes), returnTypes && getUnionType(returnTypes), nextTypes && getIntersectionType(nextTypes));
                }
                return noIterationTypes;
            }