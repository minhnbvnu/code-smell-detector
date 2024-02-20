function getIterationTypeOfIterable(use, typeKind, inputType, errorNode) {
                if (isTypeAny(inputType)) {
                    return void 0;
                }
                const iterationTypes = getIterationTypesOfIterable(inputType, use, errorNode);
                return iterationTypes && iterationTypes[getIterationTypesKeyFromIterationTypeKind(typeKind)];
            }