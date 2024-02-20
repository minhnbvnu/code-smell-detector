function getIterationTypeOfGeneratorFunctionReturnType(kind, returnType, isAsyncGenerator) {
                if (isTypeAny(returnType)) {
                    return void 0;
                }
                const iterationTypes = getIterationTypesOfGeneratorFunctionReturnType(returnType, isAsyncGenerator);
                return iterationTypes && iterationTypes[getIterationTypesKeyFromIterationTypeKind(kind)];
            }