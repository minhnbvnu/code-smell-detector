function compareSignaturesRelated(source, target, checkMode, reportErrors2, errorReporter, incompatibleErrorReporter, compareTypes, reportUnreliableMarkers) {
                if (source === target) {
                    return -1 /* True */;
                }
                if (!(checkMode & 16 /* StrictTopSignature */ && isTopSignature(source)) && isTopSignature(target)) {
                    return -1 /* True */;
                }
                if (checkMode & 16 /* StrictTopSignature */ && isTopSignature(source) && !isTopSignature(target)) {
                    return 0 /* False */;
                }
                const targetCount = getParameterCount(target);
                const sourceHasMoreParameters = !hasEffectiveRestParameter(target) && (checkMode & 8 /* StrictArity */ ? hasEffectiveRestParameter(source) || getParameterCount(source) > targetCount : getMinArgumentCount(source) > targetCount);
                if (sourceHasMoreParameters) {
                    return 0 /* False */;
                }
                if (source.typeParameters && source.typeParameters !== target.typeParameters) {
                    target = getCanonicalSignature(target);
                    source = instantiateSignatureInContextOf(source, target, 
                    /*inferenceContext*/
                    void 0, compareTypes);
                }
                const sourceCount = getParameterCount(source);
                const sourceRestType = getNonArrayRestType(source);
                const targetRestType = getNonArrayRestType(target);
                if (sourceRestType || targetRestType) {
                    void instantiateType(sourceRestType || targetRestType, reportUnreliableMarkers);
                }
                const kind = target.declaration ? target.declaration.kind : 0 /* Unknown */;
                const strictVariance = !(checkMode & 3 /* Callback */) && strictFunctionTypes && kind !== 171 /* MethodDeclaration */ && kind !== 170 /* MethodSignature */ && kind !== 173 /* Constructor */;
                let result = -1 /* True */;
                const sourceThisType = getThisTypeOfSignature(source);
                if (sourceThisType && sourceThisType !== voidType) {
                    const targetThisType = getThisTypeOfSignature(target);
                    if (targetThisType) {
                        const related = !strictVariance && compareTypes(sourceThisType, targetThisType, 
                        /*reportErrors*/
                        false) || compareTypes(targetThisType, sourceThisType, reportErrors2);
                        if (!related) {
                            if (reportErrors2) {
                                errorReporter(Diagnostics.The_this_types_of_each_signature_are_incompatible);
                            }
                            return 0 /* False */;
                        }
                        result &= related;
                    }
                }
                const paramCount = sourceRestType || targetRestType ? Math.min(sourceCount, targetCount) : Math.max(sourceCount, targetCount);
                const restIndex = sourceRestType || targetRestType ? paramCount - 1 : -1;
                for (let i = 0; i < paramCount; i++) {
                    const sourceType = i === restIndex ? getRestTypeAtPosition(source, i) : tryGetTypeAtPosition(source, i);
                    const targetType = i === restIndex ? getRestTypeAtPosition(target, i) : tryGetTypeAtPosition(target, i);
                    if (sourceType && targetType) {
                        const sourceSig = checkMode & 3 /* Callback */ ? void 0 : getSingleCallSignature(getNonNullableType(sourceType));
                        const targetSig = checkMode & 3 /* Callback */ ? void 0 : getSingleCallSignature(getNonNullableType(targetType));
                        const callbacks = sourceSig && targetSig && !getTypePredicateOfSignature(sourceSig) && !getTypePredicateOfSignature(targetSig) && (getTypeFacts(sourceType) & 50331648 /* IsUndefinedOrNull */) === (getTypeFacts(targetType) & 50331648 /* IsUndefinedOrNull */);
                        let related = callbacks ? compareSignaturesRelated(targetSig, sourceSig, checkMode & 8 /* StrictArity */ | (strictVariance ? 2 /* StrictCallback */ : 1 /* BivariantCallback */), reportErrors2, errorReporter, incompatibleErrorReporter, compareTypes, reportUnreliableMarkers) : !(checkMode & 3 /* Callback */) && !strictVariance && compareTypes(sourceType, targetType, 
                        /*reportErrors*/
                        false) || compareTypes(targetType, sourceType, reportErrors2);
                        if (related && checkMode & 8 /* StrictArity */ && i >= getMinArgumentCount(source) && i < getMinArgumentCount(target) && compareTypes(sourceType, targetType, 
                        /*reportErrors*/
                        false)) {
                            related = 0 /* False */;
                        }
                        if (!related) {
                            if (reportErrors2) {
                                errorReporter(Diagnostics.Types_of_parameters_0_and_1_are_incompatible, unescapeLeadingUnderscores(getParameterNameAtPosition(source, i)), unescapeLeadingUnderscores(getParameterNameAtPosition(target, i)));
                            }
                            return 0 /* False */;
                        }
                        result &= related;
                    }
                }
                if (!(checkMode & 4 /* IgnoreReturnTypes */)) {
                    const targetReturnType = isResolvingReturnTypeOfSignature(target) ? anyType : target.declaration && isJSConstructor(target.declaration) ? getDeclaredTypeOfClassOrInterface(getMergedSymbol(target.declaration.symbol)) : getReturnTypeOfSignature(target);
                    if (targetReturnType === voidType || targetReturnType === anyType) {
                        return result;
                    }
                    const sourceReturnType = isResolvingReturnTypeOfSignature(source) ? anyType : source.declaration && isJSConstructor(source.declaration) ? getDeclaredTypeOfClassOrInterface(getMergedSymbol(source.declaration.symbol)) : getReturnTypeOfSignature(source);
                    const targetTypePredicate = getTypePredicateOfSignature(target);
                    if (targetTypePredicate) {
                        const sourceTypePredicate = getTypePredicateOfSignature(source);
                        if (sourceTypePredicate) {
                            result &= compareTypePredicateRelatedTo(sourceTypePredicate, targetTypePredicate, reportErrors2, errorReporter, compareTypes);
                        }
                        else if (isIdentifierTypePredicate(targetTypePredicate)) {
                            if (reportErrors2) {
                                errorReporter(Diagnostics.Signature_0_must_be_a_type_predicate, signatureToString(source));
                            }
                            return 0 /* False */;
                        }
                    }
                    else {
                        result &= checkMode & 1 /* BivariantCallback */ && compareTypes(targetReturnType, sourceReturnType, 
                        /*reportErrors*/
                        false) || compareTypes(sourceReturnType, targetReturnType, reportErrors2);
                        if (!result && reportErrors2 && incompatibleErrorReporter) {
                            incompatibleErrorReporter(sourceReturnType, targetReturnType);
                        }
                    }
                }
                return result;
            }