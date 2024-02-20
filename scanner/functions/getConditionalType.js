function getConditionalType(root, mapper, aliasSymbol, aliasTypeArguments) {
                let result;
                let extraTypes;
                let tailCount = 0;
                while (true) {
                    if (tailCount === 1e3) {
                        error(currentNode, Diagnostics.Type_instantiation_is_excessively_deep_and_possibly_infinite);
                        result = errorType;
                        break;
                    }
                    const checkTuples = isSimpleTupleType(root.node.checkType) && isSimpleTupleType(root.node.extendsType) && length(root.node.checkType.elements) === length(root.node.extendsType.elements);
                    const checkType = instantiateType(getActualTypeVariable(root.checkType), mapper);
                    const checkTypeDeferred = isDeferredType(checkType, checkTuples);
                    const extendsType = instantiateType(root.extendsType, mapper);
                    if (checkType === wildcardType || extendsType === wildcardType) {
                        return wildcardType;
                    }
                    let combinedMapper;
                    if (root.inferTypeParameters) {
                        const freshParams = sameMap(root.inferTypeParameters, maybeCloneTypeParameter);
                        const freshMapper = freshParams !== root.inferTypeParameters ? createTypeMapper(root.inferTypeParameters, freshParams) : void 0;
                        const context = createInferenceContext(freshParams, 
                        /*signature*/
                        void 0, 0 /* None */);
                        if (freshMapper) {
                            const freshCombinedMapper = combineTypeMappers(mapper, freshMapper);
                            for (const p of freshParams) {
                                if (root.inferTypeParameters.indexOf(p) === -1) {
                                    p.mapper = freshCombinedMapper;
                                }
                            }
                        }
                        if (!checkTypeDeferred) {
                            inferTypes(context.inferences, checkType, instantiateType(extendsType, freshMapper), 512 /* NoConstraints */ | 1024 /* AlwaysStrict */);
                        }
                        const innerMapper = combineTypeMappers(freshMapper, context.mapper);
                        combinedMapper = mapper ? combineTypeMappers(innerMapper, mapper) : innerMapper;
                    }
                    const inferredExtendsType = combinedMapper ? instantiateType(root.extendsType, combinedMapper) : extendsType;
                    if (!checkTypeDeferred && !isDeferredType(inferredExtendsType, checkTuples)) {
                        if (!(inferredExtendsType.flags & 3 /* AnyOrUnknown */) && (checkType.flags & 1 /* Any */ || !isTypeAssignableTo(getPermissiveInstantiation(checkType), getPermissiveInstantiation(inferredExtendsType)))) {
                            if (checkType.flags & 1 /* Any */) {
                                (extraTypes || (extraTypes = [])).push(instantiateType(getTypeFromTypeNode(root.node.trueType), combinedMapper || mapper));
                            }
                            const falseType2 = getTypeFromTypeNode(root.node.falseType);
                            if (falseType2.flags & 16777216 /* Conditional */) {
                                const newRoot = falseType2.root;
                                if (newRoot.node.parent === root.node && (!newRoot.isDistributive || newRoot.checkType === root.checkType)) {
                                    root = newRoot;
                                    continue;
                                }
                                if (canTailRecurse(falseType2, mapper)) {
                                    continue;
                                }
                            }
                            result = instantiateType(falseType2, mapper);
                            break;
                        }
                        if (inferredExtendsType.flags & 3 /* AnyOrUnknown */ || isTypeAssignableTo(getRestrictiveInstantiation(checkType), getRestrictiveInstantiation(inferredExtendsType))) {
                            const trueType2 = getTypeFromTypeNode(root.node.trueType);
                            const trueMapper = combinedMapper || mapper;
                            if (canTailRecurse(trueType2, trueMapper)) {
                                continue;
                            }
                            result = instantiateType(trueType2, trueMapper);
                            break;
                        }
                    }
                    result = createType(16777216 /* Conditional */);
                    result.root = root;
                    result.checkType = instantiateType(root.checkType, mapper);
                    result.extendsType = instantiateType(root.extendsType, mapper);
                    result.mapper = mapper;
                    result.combinedMapper = combinedMapper;
                    result.aliasSymbol = aliasSymbol || root.aliasSymbol;
                    result.aliasTypeArguments = aliasSymbol ? aliasTypeArguments : instantiateTypes(root.aliasTypeArguments, mapper);
                    break;
                }
                return extraTypes ? getUnionType(append(extraTypes, result)) : result;
                function canTailRecurse(newType, newMapper) {
                    if (newType.flags & 16777216 /* Conditional */ && newMapper) {
                        const newRoot = newType.root;
                        if (newRoot.outerTypeParameters) {
                            const typeParamMapper = combineTypeMappers(newType.mapper, newMapper);
                            const typeArguments = map(newRoot.outerTypeParameters, (t) => getMappedType(t, typeParamMapper));
                            const newRootMapper = createTypeMapper(newRoot.outerTypeParameters, typeArguments);
                            const newCheckType = newRoot.isDistributive ? getMappedType(newRoot.checkType, newRootMapper) : void 0;
                            if (!newCheckType || newCheckType === newRoot.checkType || !(newCheckType.flags & (1048576 /* Union */ | 131072 /* Never */))) {
                                root = newRoot;
                                mapper = newRootMapper;
                                aliasSymbol = void 0;
                                aliasTypeArguments = void 0;
                                if (newRoot.aliasSymbol) {
                                    tailCount++;
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }