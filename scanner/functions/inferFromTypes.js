function inferFromTypes(source, target) {
                    if (!couldContainTypeVariables(target)) {
                        return;
                    }
                    if (source === wildcardType) {
                        const savePropagationType = propagationType;
                        propagationType = source;
                        inferFromTypes(target, target);
                        propagationType = savePropagationType;
                        return;
                    }
                    if (source.aliasSymbol && source.aliasSymbol === target.aliasSymbol) {
                        if (source.aliasTypeArguments) {
                            const params = getSymbolLinks(source.aliasSymbol).typeParameters;
                            const minParams = getMinTypeArgumentCount(params);
                            const sourceTypes = fillMissingTypeArguments(source.aliasTypeArguments, params, minParams, isInJSFile(source.aliasSymbol.valueDeclaration));
                            const targetTypes = fillMissingTypeArguments(target.aliasTypeArguments, params, minParams, isInJSFile(source.aliasSymbol.valueDeclaration));
                            inferFromTypeArguments(sourceTypes, targetTypes, getAliasVariances(source.aliasSymbol));
                        }
                        return;
                    }
                    if (source === target && source.flags & 3145728 /* UnionOrIntersection */) {
                        for (const t of source.types) {
                            inferFromTypes(t, t);
                        }
                        return;
                    }
                    if (target.flags & 1048576 /* Union */) {
                        const [tempSources, tempTargets] = inferFromMatchingTypes(source.flags & 1048576 /* Union */ ? source.types : [source], target.types, isTypeOrBaseIdenticalTo);
                        const [sources, targets] = inferFromMatchingTypes(tempSources, tempTargets, isTypeCloselyMatchedBy);
                        if (targets.length === 0) {
                            return;
                        }
                        target = getUnionType(targets);
                        if (sources.length === 0) {
                            inferWithPriority(source, target, 1 /* NakedTypeVariable */);
                            return;
                        }
                        source = getUnionType(sources);
                    }
                    else if (target.flags & 2097152 /* Intersection */ && !every(target.types, isNonGenericObjectType)) {
                        if (!(source.flags & 1048576 /* Union */)) {
                            const [sources, targets] = inferFromMatchingTypes(source.flags & 2097152 /* Intersection */ ? source.types : [source], target.types, isTypeIdenticalTo);
                            if (sources.length === 0 || targets.length === 0) {
                                return;
                            }
                            source = getIntersectionType(sources);
                            target = getIntersectionType(targets);
                        }
                    }
                    else if (target.flags & (8388608 /* IndexedAccess */ | 33554432 /* Substitution */)) {
                        target = getActualTypeVariable(target);
                    }
                    if (target.flags & 8650752 /* TypeVariable */) {
                        if (isFromInferenceBlockedSource(source)) {
                            return;
                        }
                        const inference = getInferenceInfoForType(target);
                        if (inference) {
                            if (getObjectFlags(source) & 262144 /* NonInferrableType */ || source === nonInferrableAnyType) {
                                return;
                            }
                            if (!inference.isFixed) {
                                if (inference.priority === void 0 || priority < inference.priority) {
                                    inference.candidates = void 0;
                                    inference.contraCandidates = void 0;
                                    inference.topLevel = true;
                                    inference.priority = priority;
                                }
                                if (priority === inference.priority) {
                                    const candidate = propagationType || source;
                                    if (contravariant && !bivariant) {
                                        if (!contains(inference.contraCandidates, candidate)) {
                                            inference.contraCandidates = append(inference.contraCandidates, candidate);
                                            clearCachedInferences(inferences);
                                        }
                                    }
                                    else if (!contains(inference.candidates, candidate)) {
                                        inference.candidates = append(inference.candidates, candidate);
                                        clearCachedInferences(inferences);
                                    }
                                }
                                if (!(priority & 128 /* ReturnType */) && target.flags & 262144 /* TypeParameter */ && inference.topLevel && !isTypeParameterAtTopLevel(originalTarget, target)) {
                                    inference.topLevel = false;
                                    clearCachedInferences(inferences);
                                }
                            }
                            inferencePriority = Math.min(inferencePriority, priority);
                            return;
                        }
                        const simplified = getSimplifiedType(target, 
                        /*writing*/
                        false);
                        if (simplified !== target) {
                            inferFromTypes(source, simplified);
                        }
                        else if (target.flags & 8388608 /* IndexedAccess */) {
                            const indexType = getSimplifiedType(target.indexType, 
                            /*writing*/
                            false);
                            if (indexType.flags & 465829888 /* Instantiable */) {
                                const simplified2 = distributeIndexOverObjectType(getSimplifiedType(target.objectType, 
                                /*writing*/
                                false), indexType, 
                                /*writing*/
                                false);
                                if (simplified2 && simplified2 !== target) {
                                    inferFromTypes(source, simplified2);
                                }
                            }
                        }
                    }
                    if (getObjectFlags(source) & 4 /* Reference */ && getObjectFlags(target) & 4 /* Reference */ && (source.target === target.target || isArrayType(source) && isArrayType(target)) && !(source.node && target.node)) {
                        inferFromTypeArguments(getTypeArguments(source), getTypeArguments(target), getVariances(source.target));
                    }
                    else if (source.flags & 4194304 /* Index */ && target.flags & 4194304 /* Index */) {
                        inferFromContravariantTypes(source.type, target.type);
                    }
                    else if ((isLiteralType(source) || source.flags & 4 /* String */) && target.flags & 4194304 /* Index */) {
                        const empty = createEmptyObjectTypeFromStringLiteral(source);
                        inferFromContravariantTypesWithPriority(empty, target.type, 256 /* LiteralKeyof */);
                    }
                    else if (source.flags & 8388608 /* IndexedAccess */ && target.flags & 8388608 /* IndexedAccess */) {
                        inferFromTypes(source.objectType, target.objectType);
                        inferFromTypes(source.indexType, target.indexType);
                    }
                    else if (source.flags & 268435456 /* StringMapping */ && target.flags & 268435456 /* StringMapping */) {
                        if (source.symbol === target.symbol) {
                            inferFromTypes(source.type, target.type);
                        }
                    }
                    else if (source.flags & 33554432 /* Substitution */) {
                        inferFromTypes(source.baseType, target);
                        inferWithPriority(getSubstitutionIntersection(source), target, 4 /* SubstituteSource */);
                    }
                    else if (target.flags & 16777216 /* Conditional */) {
                        invokeOnce(source, target, inferToConditionalType);
                    }
                    else if (target.flags & 3145728 /* UnionOrIntersection */) {
                        inferToMultipleTypes(source, target.types, target.flags);
                    }
                    else if (source.flags & 1048576 /* Union */) {
                        const sourceTypes = source.types;
                        for (const sourceType of sourceTypes) {
                            inferFromTypes(sourceType, target);
                        }
                    }
                    else if (target.flags & 134217728 /* TemplateLiteral */) {
                        inferToTemplateLiteralType(source, target);
                    }
                    else {
                        source = getReducedType(source);
                        if (!(priority & 512 /* NoConstraints */ && source.flags & (2097152 /* Intersection */ | 465829888 /* Instantiable */))) {
                            const apparentSource = getApparentType(source);
                            if (apparentSource !== source && allowComplexConstraintInference && !(apparentSource.flags & (524288 /* Object */ | 2097152 /* Intersection */))) {
                                allowComplexConstraintInference = false;
                                return inferFromTypes(apparentSource, target);
                            }
                            source = apparentSource;
                        }
                        if (source.flags & (524288 /* Object */ | 2097152 /* Intersection */)) {
                            invokeOnce(source, target, inferFromObjectTypes);
                        }
                    }
                }