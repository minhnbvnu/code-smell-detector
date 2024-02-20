function compareTypeParametersIdentical(sourceParams, targetParams) {
                if (length(sourceParams) !== length(targetParams)) {
                    return false;
                }
                if (!sourceParams || !targetParams) {
                    return true;
                }
                const mapper = createTypeMapper(targetParams, sourceParams);
                for (let i = 0; i < sourceParams.length; i++) {
                    const source = sourceParams[i];
                    const target = targetParams[i];
                    if (source === target)
                        continue;
                    if (!isTypeIdenticalTo(getConstraintFromTypeParameter(source) || unknownType, instantiateType(getConstraintFromTypeParameter(target) || unknownType, mapper)))
                        return false;
                }
                return true;
            }