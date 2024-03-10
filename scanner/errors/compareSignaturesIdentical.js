function compareSignaturesIdentical(source, target, partialMatch, ignoreThisTypes, ignoreReturnTypes, compareTypes) {
                if (source === target) {
                    return -1 /* True */;
                }
                if (!isMatchingSignature(source, target, partialMatch)) {
                    return 0 /* False */;
                }
                if (length(source.typeParameters) !== length(target.typeParameters)) {
                    return 0 /* False */;
                }
                if (target.typeParameters) {
                    const mapper = createTypeMapper(source.typeParameters, target.typeParameters);
                    for (let i = 0; i < target.typeParameters.length; i++) {
                        const s = source.typeParameters[i];
                        const t = target.typeParameters[i];
                        if (!(s === t || compareTypes(instantiateType(getConstraintFromTypeParameter(s), mapper) || unknownType, getConstraintFromTypeParameter(t) || unknownType) && compareTypes(instantiateType(getDefaultFromTypeParameter(s), mapper) || unknownType, getDefaultFromTypeParameter(t) || unknownType))) {
                            return 0 /* False */;
                        }
                    }
                    source = instantiateSignature(source, mapper, 
                    /*eraseTypeParameters*/
                    true);
                }
                let result = -1 /* True */;
                if (!ignoreThisTypes) {
                    const sourceThisType = getThisTypeOfSignature(source);
                    if (sourceThisType) {
                        const targetThisType = getThisTypeOfSignature(target);
                        if (targetThisType) {
                            const related = compareTypes(sourceThisType, targetThisType);
                            if (!related) {
                                return 0 /* False */;
                            }
                            result &= related;
                        }
                    }
                }
                const targetLen = getParameterCount(target);
                for (let i = 0; i < targetLen; i++) {
                    const s = getTypeAtPosition(source, i);
                    const t = getTypeAtPosition(target, i);
                    const related = compareTypes(t, s);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                if (!ignoreReturnTypes) {
                    const sourceTypePredicate = getTypePredicateOfSignature(source);
                    const targetTypePredicate = getTypePredicateOfSignature(target);
                    result &= sourceTypePredicate || targetTypePredicate ? compareTypePredicatesIdentical(sourceTypePredicate, targetTypePredicate, compareTypes) : compareTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
                }
                return result;
            }