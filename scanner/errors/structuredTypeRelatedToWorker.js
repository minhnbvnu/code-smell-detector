function structuredTypeRelatedToWorker(source2, target2, reportErrors2, intersectionState, saveErrorInfo) {
                    let result2;
                    let originalErrorInfo;
                    let varianceCheckFailed = false;
                    let sourceFlags = source2.flags;
                    const targetFlags = target2.flags;
                    if (relation === identityRelation) {
                        if (sourceFlags & 3145728 /* UnionOrIntersection */) {
                            let result3 = eachTypeRelatedToSomeType(source2, target2);
                            if (result3) {
                                result3 &= eachTypeRelatedToSomeType(target2, source2);
                            }
                            return result3;
                        }
                        if (sourceFlags & 4194304 /* Index */) {
                            return isRelatedTo(source2.type, target2.type, 3 /* Both */, 
                            /*reportErrors*/
                            false);
                        }
                        if (sourceFlags & 8388608 /* IndexedAccess */) {
                            if (result2 = isRelatedTo(source2.objectType, target2.objectType, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                if (result2 &= isRelatedTo(source2.indexType, target2.indexType, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    return result2;
                                }
                            }
                        }
                        if (sourceFlags & 16777216 /* Conditional */) {
                            if (source2.root.isDistributive === target2.root.isDistributive) {
                                if (result2 = isRelatedTo(source2.checkType, target2.checkType, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    if (result2 &= isRelatedTo(source2.extendsType, target2.extendsType, 3 /* Both */, 
                                    /*reportErrors*/
                                    false)) {
                                        if (result2 &= isRelatedTo(getTrueTypeFromConditionalType(source2), getTrueTypeFromConditionalType(target2), 3 /* Both */, 
                                        /*reportErrors*/
                                        false)) {
                                            if (result2 &= isRelatedTo(getFalseTypeFromConditionalType(source2), getFalseTypeFromConditionalType(target2), 3 /* Both */, 
                                            /*reportErrors*/
                                            false)) {
                                                return result2;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (sourceFlags & 33554432 /* Substitution */) {
                            if (result2 = isRelatedTo(source2.baseType, target2.baseType, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                if (result2 &= isRelatedTo(source2.constraint, target2.constraint, 3 /* Both */, 
                                /*reportErrors*/
                                false)) {
                                    return result2;
                                }
                            }
                        }
                        if (!(sourceFlags & 524288 /* Object */)) {
                            return 0 /* False */;
                        }
                    }
                    else if (sourceFlags & 3145728 /* UnionOrIntersection */ || targetFlags & 3145728 /* UnionOrIntersection */) {
                        if (result2 = unionOrIntersectionRelatedTo(source2, target2, reportErrors2, intersectionState)) {
                            return result2;
                        }
                        if (!(sourceFlags & 465829888 /* Instantiable */ || sourceFlags & 524288 /* Object */ && targetFlags & 1048576 /* Union */ || sourceFlags & 2097152 /* Intersection */ && targetFlags & (524288 /* Object */ | 1048576 /* Union */ | 465829888 /* Instantiable */))) {
                            return 0 /* False */;
                        }
                    }
                    if (sourceFlags & (524288 /* Object */ | 16777216 /* Conditional */) && source2.aliasSymbol && source2.aliasTypeArguments && source2.aliasSymbol === target2.aliasSymbol && !(isMarkerType(source2) || isMarkerType(target2))) {
                        const variances = getAliasVariances(source2.aliasSymbol);
                        if (variances === emptyArray) {
                            return 1 /* Unknown */;
                        }
                        const params = getSymbolLinks(source2.aliasSymbol).typeParameters;
                        const minParams = getMinTypeArgumentCount(params);
                        const sourceTypes = fillMissingTypeArguments(source2.aliasTypeArguments, params, minParams, isInJSFile(source2.aliasSymbol.valueDeclaration));
                        const targetTypes = fillMissingTypeArguments(target2.aliasTypeArguments, params, minParams, isInJSFile(source2.aliasSymbol.valueDeclaration));
                        const varianceResult = relateVariances(sourceTypes, targetTypes, variances, intersectionState);
                        if (varianceResult !== void 0) {
                            return varianceResult;
                        }
                    }
                    if (isSingleElementGenericTupleType(source2) && !source2.target.readonly && (result2 = isRelatedTo(getTypeArguments(source2)[0], target2, 1 /* Source */)) || isSingleElementGenericTupleType(target2) && (target2.target.readonly || isMutableArrayOrTuple(getBaseConstraintOfType(source2) || source2)) && (result2 = isRelatedTo(source2, getTypeArguments(target2)[0], 2 /* Target */))) {
                        return result2;
                    }
                    if (targetFlags & 262144 /* TypeParameter */) {
                        if (getObjectFlags(source2) & 32 /* Mapped */ && !source2.declaration.nameType && isRelatedTo(getIndexType(target2), getConstraintTypeFromMappedType(source2), 3 /* Both */)) {
                            if (!(getMappedTypeModifiers(source2) & 4 /* IncludeOptional */)) {
                                const templateType = getTemplateTypeFromMappedType(source2);
                                const indexedAccessType = getIndexedAccessType(target2, getTypeParameterFromMappedType(source2));
                                if (result2 = isRelatedTo(templateType, indexedAccessType, 3 /* Both */, reportErrors2)) {
                                    return result2;
                                }
                            }
                        }
                        if (relation === comparableRelation && sourceFlags & 262144 /* TypeParameter */) {
                            let constraint = getConstraintOfTypeParameter(source2);
                            if (constraint && hasNonCircularBaseConstraint(source2)) {
                                while (constraint && someType(constraint, (c) => !!(c.flags & 262144 /* TypeParameter */))) {
                                    if (result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                                    /*reportErrors*/
                                    false)) {
                                        return result2;
                                    }
                                    constraint = getConstraintOfTypeParameter(constraint);
                                }
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (targetFlags & 4194304 /* Index */) {
                        const targetType = target2.type;
                        if (sourceFlags & 4194304 /* Index */) {
                            if (result2 = isRelatedTo(targetType, source2.type, 3 /* Both */, 
                            /*reportErrors*/
                            false)) {
                                return result2;
                            }
                        }
                        if (isTupleType(targetType)) {
                            if (result2 = isRelatedTo(source2, getKnownKeysOfTupleType(targetType), 2 /* Target */, reportErrors2)) {
                                return result2;
                            }
                        }
                        else {
                            const constraint = getSimplifiedTypeOrConstraint(targetType);
                            if (constraint) {
                                if (isRelatedTo(source2, getIndexType(constraint, target2.stringsOnly), 2 /* Target */, reportErrors2) === -1 /* True */) {
                                    return -1 /* True */;
                                }
                            }
                            else if (isGenericMappedType(targetType)) {
                                const nameType = getNameTypeFromMappedType(targetType);
                                const constraintType = getConstraintTypeFromMappedType(targetType);
                                let targetKeys;
                                if (nameType && isMappedTypeWithKeyofConstraintDeclaration(targetType)) {
                                    const modifiersType = getApparentType(getModifiersTypeFromMappedType(targetType));
                                    const mappedKeys = [];
                                    forEachMappedTypePropertyKeyTypeAndIndexSignatureKeyType(modifiersType, 8576 /* StringOrNumberLiteralOrUnique */, 
                                    /*stringsOnly*/
                                    false, (t) => void mappedKeys.push(instantiateType(nameType, appendTypeMapping(targetType.mapper, getTypeParameterFromMappedType(targetType), t))));
                                    targetKeys = getUnionType([...mappedKeys, nameType]);
                                }
                                else {
                                    targetKeys = nameType || constraintType;
                                }
                                if (isRelatedTo(source2, targetKeys, 2 /* Target */, reportErrors2) === -1 /* True */) {
                                    return -1 /* True */;
                                }
                            }
                        }
                    }
                    else if (targetFlags & 8388608 /* IndexedAccess */) {
                        if (sourceFlags & 8388608 /* IndexedAccess */) {
                            if (result2 = isRelatedTo(source2.objectType, target2.objectType, 3 /* Both */, reportErrors2)) {
                                result2 &= isRelatedTo(source2.indexType, target2.indexType, 3 /* Both */, reportErrors2);
                            }
                            if (result2) {
                                return result2;
                            }
                            if (reportErrors2) {
                                originalErrorInfo = errorInfo;
                            }
                        }
                        if (relation === assignableRelation || relation === comparableRelation) {
                            const objectType = target2.objectType;
                            const indexType = target2.indexType;
                            const baseObjectType = getBaseConstraintOfType(objectType) || objectType;
                            const baseIndexType = getBaseConstraintOfType(indexType) || indexType;
                            if (!isGenericObjectType(baseObjectType) && !isGenericIndexType(baseIndexType)) {
                                const accessFlags = 4 /* Writing */ | (baseObjectType !== objectType ? 2 /* NoIndexSignatures */ : 0);
                                const constraint = getIndexedAccessTypeOrUndefined(baseObjectType, baseIndexType, accessFlags);
                                if (constraint) {
                                    if (reportErrors2 && originalErrorInfo) {
                                        resetErrorInfo(saveErrorInfo);
                                    }
                                    if (result2 = isRelatedTo(source2, constraint, 2 /* Target */, reportErrors2, 
                                    /* headMessage */
                                    void 0, intersectionState)) {
                                        return result2;
                                    }
                                    if (reportErrors2 && originalErrorInfo && errorInfo) {
                                        errorInfo = countMessageChainBreadth([originalErrorInfo]) <= countMessageChainBreadth([errorInfo]) ? originalErrorInfo : errorInfo;
                                    }
                                }
                            }
                        }
                        if (reportErrors2) {
                            originalErrorInfo = void 0;
                        }
                    }
                    else if (isGenericMappedType(target2) && relation !== identityRelation) {
                        const keysRemapped = !!target2.declaration.nameType;
                        const templateType = getTemplateTypeFromMappedType(target2);
                        const modifiers = getMappedTypeModifiers(target2);
                        if (!(modifiers & 8 /* ExcludeOptional */)) {
                            if (!keysRemapped && templateType.flags & 8388608 /* IndexedAccess */ && templateType.objectType === source2 && templateType.indexType === getTypeParameterFromMappedType(target2)) {
                                return -1 /* True */;
                            }
                            if (!isGenericMappedType(source2)) {
                                const targetKeys = keysRemapped ? getNameTypeFromMappedType(target2) : getConstraintTypeFromMappedType(target2);
                                const sourceKeys = getIndexType(source2, 
                                /*stringsOnly*/
                                void 0, 
                                /*noIndexSignatures*/
                                true);
                                const includeOptional = modifiers & 4 /* IncludeOptional */;
                                const filteredByApplicability = includeOptional ? intersectTypes(targetKeys, sourceKeys) : void 0;
                                if (includeOptional ? !(filteredByApplicability.flags & 131072 /* Never */) : isRelatedTo(targetKeys, sourceKeys, 3 /* Both */)) {
                                    const templateType2 = getTemplateTypeFromMappedType(target2);
                                    const typeParameter = getTypeParameterFromMappedType(target2);
                                    const nonNullComponent = extractTypesOfKind(templateType2, ~98304 /* Nullable */);
                                    if (!keysRemapped && nonNullComponent.flags & 8388608 /* IndexedAccess */ && nonNullComponent.indexType === typeParameter) {
                                        if (result2 = isRelatedTo(source2, nonNullComponent.objectType, 2 /* Target */, reportErrors2)) {
                                            return result2;
                                        }
                                    }
                                    else {
                                        const indexingType = keysRemapped ? filteredByApplicability || targetKeys : filteredByApplicability ? getIntersectionType([filteredByApplicability, typeParameter]) : typeParameter;
                                        const indexedAccessType = getIndexedAccessType(source2, indexingType);
                                        if (result2 = isRelatedTo(indexedAccessType, templateType2, 3 /* Both */, reportErrors2)) {
                                            return result2;
                                        }
                                    }
                                }
                                originalErrorInfo = errorInfo;
                                resetErrorInfo(saveErrorInfo);
                            }
                        }
                    }
                    else if (targetFlags & 16777216 /* Conditional */) {
                        if (isDeeplyNestedType(target2, targetStack, targetDepth, 10)) {
                            return 3 /* Maybe */;
                        }
                        const c = target2;
                        if (!c.root.inferTypeParameters && !isDistributionDependent(c.root)) {
                            const skipTrue = !isTypeAssignableTo(getPermissiveInstantiation(c.checkType), getPermissiveInstantiation(c.extendsType));
                            const skipFalse = !skipTrue && isTypeAssignableTo(getRestrictiveInstantiation(c.checkType), getRestrictiveInstantiation(c.extendsType));
                            if (result2 = skipTrue ? -1 /* True */ : isRelatedTo(source2, getTrueTypeFromConditionalType(c), 2 /* Target */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                result2 &= skipFalse ? -1 /* True */ : isRelatedTo(source2, getFalseTypeFromConditionalType(c), 2 /* Target */, 
                                /*reportErrors*/
                                false, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (result2) {
                                    return result2;
                                }
                            }
                        }
                    }
                    else if (targetFlags & 134217728 /* TemplateLiteral */) {
                        if (sourceFlags & 134217728 /* TemplateLiteral */) {
                            if (relation === comparableRelation) {
                                return templateLiteralTypesDefinitelyUnrelated(source2, target2) ? 0 /* False */ : -1 /* True */;
                            }
                            instantiateType(source2, reportUnreliableMapper);
                        }
                        if (isTypeMatchedByTemplateLiteralType(source2, target2)) {
                            return -1 /* True */;
                        }
                    }
                    else if (target2.flags & 268435456 /* StringMapping */) {
                        if (!(source2.flags & 268435456 /* StringMapping */)) {
                            if (isMemberOfStringMapping(source2, target2)) {
                                return -1 /* True */;
                            }
                        }
                    }
                    if (sourceFlags & 8650752 /* TypeVariable */) {
                        if (!(sourceFlags & 8388608 /* IndexedAccess */ && targetFlags & 8388608 /* IndexedAccess */)) {
                            const constraint = getConstraintOfType(source2) || unknownType;
                            if (result2 = isRelatedTo(constraint, target2, 1 /* Source */, 
                            /*reportErrors*/
                            false, 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                return result2;
                            }
                            else if (result2 = isRelatedTo(getTypeWithThisArgument(constraint, source2), target2, 1 /* Source */, reportErrors2 && constraint !== unknownType && !(targetFlags & sourceFlags & 262144 /* TypeParameter */), 
                            /*headMessage*/
                            void 0, intersectionState)) {
                                return result2;
                            }
                            if (isMappedTypeGenericIndexedAccess(source2)) {
                                const indexConstraint = getConstraintOfType(source2.indexType);
                                if (indexConstraint) {
                                    if (result2 = isRelatedTo(getIndexedAccessType(source2.objectType, indexConstraint), target2, 1 /* Source */, reportErrors2)) {
                                        return result2;
                                    }
                                }
                            }
                        }
                    }
                    else if (sourceFlags & 4194304 /* Index */) {
                        if (result2 = isRelatedTo(keyofConstraintType, target2, 1 /* Source */, reportErrors2)) {
                            return result2;
                        }
                    }
                    else if (sourceFlags & 134217728 /* TemplateLiteral */ && !(targetFlags & 524288 /* Object */)) {
                        if (!(targetFlags & 134217728 /* TemplateLiteral */)) {
                            const constraint = getBaseConstraintOfType(source2);
                            if (constraint && constraint !== source2 && (result2 = isRelatedTo(constraint, target2, 1 /* Source */, reportErrors2))) {
                                return result2;
                            }
                        }
                    }
                    else if (sourceFlags & 268435456 /* StringMapping */) {
                        if (targetFlags & 268435456 /* StringMapping */) {
                            if (source2.symbol !== target2.symbol) {
                                return 0 /* False */;
                            }
                            if (result2 = isRelatedTo(source2.type, target2.type, 3 /* Both */, reportErrors2)) {
                                return result2;
                            }
                        }
                        else {
                            const constraint = getBaseConstraintOfType(source2);
                            if (constraint && (result2 = isRelatedTo(constraint, target2, 1 /* Source */, reportErrors2))) {
                                return result2;
                            }
                        }
                    }
                    else if (sourceFlags & 16777216 /* Conditional */) {
                        if (isDeeplyNestedType(source2, sourceStack, sourceDepth, 10)) {
                            return 3 /* Maybe */;
                        }
                        if (targetFlags & 16777216 /* Conditional */) {
                            const sourceParams = source2.root.inferTypeParameters;
                            let sourceExtends = source2.extendsType;
                            let mapper;
                            if (sourceParams) {
                                const ctx = createInferenceContext(sourceParams, 
                                /*signature*/
                                void 0, 0 /* None */, isRelatedToWorker);
                                inferTypes(ctx.inferences, target2.extendsType, sourceExtends, 512 /* NoConstraints */ | 1024 /* AlwaysStrict */);
                                sourceExtends = instantiateType(sourceExtends, ctx.mapper);
                                mapper = ctx.mapper;
                            }
                            if (isTypeIdenticalTo(sourceExtends, target2.extendsType) && (isRelatedTo(source2.checkType, target2.checkType, 3 /* Both */) || isRelatedTo(target2.checkType, source2.checkType, 3 /* Both */))) {
                                if (result2 = isRelatedTo(instantiateType(getTrueTypeFromConditionalType(source2), mapper), getTrueTypeFromConditionalType(target2), 3 /* Both */, reportErrors2)) {
                                    result2 &= isRelatedTo(getFalseTypeFromConditionalType(source2), getFalseTypeFromConditionalType(target2), 3 /* Both */, reportErrors2);
                                }
                                if (result2) {
                                    return result2;
                                }
                            }
                        }
                        else {
                            const distributiveConstraint = hasNonCircularBaseConstraint(source2) ? getConstraintOfDistributiveConditionalType(source2) : void 0;
                            if (distributiveConstraint) {
                                if (result2 = isRelatedTo(distributiveConstraint, target2, 1 /* Source */, reportErrors2)) {
                                    return result2;
                                }
                            }
                        }
                        const defaultConstraint = getDefaultConstraintOfConditionalType(source2);
                        if (defaultConstraint) {
                            if (result2 = isRelatedTo(defaultConstraint, target2, 1 /* Source */, reportErrors2)) {
                                return result2;
                            }
                        }
                    }
                    else {
                        if (relation !== subtypeRelation && relation !== strictSubtypeRelation && isPartialMappedType(target2) && isEmptyObjectType(source2)) {
                            return -1 /* True */;
                        }
                        if (isGenericMappedType(target2)) {
                            if (isGenericMappedType(source2)) {
                                if (result2 = mappedTypeRelatedTo(source2, target2, reportErrors2)) {
                                    return result2;
                                }
                            }
                            return 0 /* False */;
                        }
                        const sourceIsPrimitive = !!(sourceFlags & 134348796 /* Primitive */);
                        if (relation !== identityRelation) {
                            source2 = getApparentType(source2);
                            sourceFlags = source2.flags;
                        }
                        else if (isGenericMappedType(source2)) {
                            return 0 /* False */;
                        }
                        if (getObjectFlags(source2) & 4 /* Reference */ && getObjectFlags(target2) & 4 /* Reference */ && source2.target === target2.target && !isTupleType(source2) && !(isMarkerType(source2) || isMarkerType(target2))) {
                            if (isEmptyArrayLiteralType(source2)) {
                                return -1 /* True */;
                            }
                            const variances = getVariances(source2.target);
                            if (variances === emptyArray) {
                                return 1 /* Unknown */;
                            }
                            const varianceResult = relateVariances(getTypeArguments(source2), getTypeArguments(target2), variances, intersectionState);
                            if (varianceResult !== void 0) {
                                return varianceResult;
                            }
                        }
                        else if (isReadonlyArrayType(target2) ? isArrayOrTupleType(source2) : isArrayType(target2) && isTupleType(source2) && !source2.target.readonly) {
                            if (relation !== identityRelation) {
                                return isRelatedTo(getIndexTypeOfType(source2, numberType) || anyType, getIndexTypeOfType(target2, numberType) || anyType, 3 /* Both */, reportErrors2);
                            }
                            else {
                                return 0 /* False */;
                            }
                        }
                        else if ((relation === subtypeRelation || relation === strictSubtypeRelation) && isEmptyObjectType(target2) && getObjectFlags(target2) & 8192 /* FreshLiteral */ && !isEmptyObjectType(source2)) {
                            return 0 /* False */;
                        }
                        if (sourceFlags & (524288 /* Object */ | 2097152 /* Intersection */) && targetFlags & 524288 /* Object */) {
                            const reportStructuralErrors = reportErrors2 && errorInfo === saveErrorInfo.errorInfo && !sourceIsPrimitive;
                            result2 = propertiesRelatedTo(source2, target2, reportStructuralErrors, 
                            /*excludedProperties*/
                            void 0, 
                            /*optionalsOnly*/
                            false, intersectionState);
                            if (result2) {
                                result2 &= signaturesRelatedTo(source2, target2, 0 /* Call */, reportStructuralErrors, intersectionState);
                                if (result2) {
                                    result2 &= signaturesRelatedTo(source2, target2, 1 /* Construct */, reportStructuralErrors, intersectionState);
                                    if (result2) {
                                        result2 &= indexSignaturesRelatedTo(source2, target2, sourceIsPrimitive, reportStructuralErrors, intersectionState);
                                    }
                                }
                            }
                            if (varianceCheckFailed && result2) {
                                errorInfo = originalErrorInfo || errorInfo || saveErrorInfo.errorInfo;
                            }
                            else if (result2) {
                                return result2;
                            }
                        }
                        if (sourceFlags & (524288 /* Object */ | 2097152 /* Intersection */) && targetFlags & 1048576 /* Union */) {
                            const objectOnlyTarget = extractTypesOfKind(target2, 524288 /* Object */ | 2097152 /* Intersection */ | 33554432 /* Substitution */);
                            if (objectOnlyTarget.flags & 1048576 /* Union */) {
                                const result3 = typeRelatedToDiscriminatedType(source2, objectOnlyTarget);
                                if (result3) {
                                    return result3;
                                }
                            }
                        }
                    }
                    return 0 /* False */;
                    function countMessageChainBreadth(info) {
                        if (!info)
                            return 0;
                        return reduceLeft(info, (value, chain) => value + 1 + countMessageChainBreadth(chain.next), 0);
                    }
                    function relateVariances(sourceTypeArguments, targetTypeArguments, variances, intersectionState2) {
                        if (result2 = typeArgumentsRelatedTo(sourceTypeArguments, targetTypeArguments, variances, reportErrors2, intersectionState2)) {
                            return result2;
                        }
                        if (some(variances, (v) => !!(v & 24 /* AllowsStructuralFallback */))) {
                            originalErrorInfo = void 0;
                            resetErrorInfo(saveErrorInfo);
                            return void 0;
                        }
                        const allowStructuralFallback = targetTypeArguments && hasCovariantVoidArgument(targetTypeArguments, variances);
                        varianceCheckFailed = !allowStructuralFallback;
                        if (variances !== emptyArray && !allowStructuralFallback) {
                            if (varianceCheckFailed && !(reportErrors2 && some(variances, (v) => (v & 7 /* VarianceMask */) === 0 /* Invariant */))) {
                                return 0 /* False */;
                            }
                            originalErrorInfo = errorInfo;
                            resetErrorInfo(saveErrorInfo);
                        }
                    }
                }