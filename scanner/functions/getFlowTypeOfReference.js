function getFlowTypeOfReference(reference, declaredType, initialType = declaredType, flowContainer, flowNode = ((_a2) => (_a2 = tryCast(reference, canHaveFlowNode)) == null ? void 0 : _a2.flowNode)()) {
                let key;
                let isKeySet = false;
                let flowDepth = 0;
                if (flowAnalysisDisabled) {
                    return errorType;
                }
                if (!flowNode) {
                    return declaredType;
                }
                flowInvocationCount++;
                const sharedFlowStart = sharedFlowCount;
                const evolvedType = getTypeFromFlowType(getTypeAtFlowNode(flowNode));
                sharedFlowCount = sharedFlowStart;
                const resultType = getObjectFlags(evolvedType) & 256 /* EvolvingArray */ && isEvolvingArrayOperationTarget(reference) ? autoArrayType : finalizeEvolvingArrayType(evolvedType);
                if (resultType === unreachableNeverType || reference.parent && reference.parent.kind === 232 /* NonNullExpression */ && !(resultType.flags & 131072 /* Never */) && getTypeWithFacts(resultType, 2097152 /* NEUndefinedOrNull */).flags & 131072 /* Never */) {
                    return declaredType;
                }
                return resultType === nonNullUnknownType ? unknownType : resultType;
                function getOrSetCacheKey() {
                    if (isKeySet) {
                        return key;
                    }
                    isKeySet = true;
                    return key = getFlowCacheKey(reference, declaredType, initialType, flowContainer);
                }
                function getTypeAtFlowNode(flow) {
                    var _a3;
                    if (flowDepth === 2e3) {
                        (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "getTypeAtFlowNode_DepthLimit", { flowId: flow.id });
                        flowAnalysisDisabled = true;
                        reportFlowControlError(reference);
                        return errorType;
                    }
                    flowDepth++;
                    let sharedFlow;
                    while (true) {
                        const flags = flow.flags;
                        if (flags & 4096 /* Shared */) {
                            for (let i = sharedFlowStart; i < sharedFlowCount; i++) {
                                if (sharedFlowNodes[i] === flow) {
                                    flowDepth--;
                                    return sharedFlowTypes[i];
                                }
                            }
                            sharedFlow = flow;
                        }
                        let type;
                        if (flags & 16 /* Assignment */) {
                            type = getTypeAtFlowAssignment(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 512 /* Call */) {
                            type = getTypeAtFlowCall(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 96 /* Condition */) {
                            type = getTypeAtFlowCondition(flow);
                        }
                        else if (flags & 128 /* SwitchClause */) {
                            type = getTypeAtSwitchClause(flow);
                        }
                        else if (flags & 12 /* Label */) {
                            if (flow.antecedents.length === 1) {
                                flow = flow.antecedents[0];
                                continue;
                            }
                            type = flags & 4 /* BranchLabel */ ? getTypeAtFlowBranchLabel(flow) : getTypeAtFlowLoopLabel(flow);
                        }
                        else if (flags & 256 /* ArrayMutation */) {
                            type = getTypeAtFlowArrayMutation(flow);
                            if (!type) {
                                flow = flow.antecedent;
                                continue;
                            }
                        }
                        else if (flags & 1024 /* ReduceLabel */) {
                            const target = flow.target;
                            const saveAntecedents = target.antecedents;
                            target.antecedents = flow.antecedents;
                            type = getTypeAtFlowNode(flow.antecedent);
                            target.antecedents = saveAntecedents;
                        }
                        else if (flags & 2 /* Start */) {
                            const container = flow.node;
                            if (container && container !== flowContainer && reference.kind !== 208 /* PropertyAccessExpression */ && reference.kind !== 209 /* ElementAccessExpression */ && reference.kind !== 108 /* ThisKeyword */) {
                                flow = container.flowNode;
                                continue;
                            }
                            type = initialType;
                        }
                        else {
                            type = convertAutoToAny(declaredType);
                        }
                        if (sharedFlow) {
                            sharedFlowNodes[sharedFlowCount] = sharedFlow;
                            sharedFlowTypes[sharedFlowCount] = type;
                            sharedFlowCount++;
                        }
                        flowDepth--;
                        return type;
                    }
                }
                function getInitialOrAssignedType(flow) {
                    const node = flow.node;
                    return getNarrowableTypeForReference(node.kind === 257 /* VariableDeclaration */ || node.kind === 205 /* BindingElement */ ? getInitialType(node) : getAssignedType(node), reference);
                }
                function getTypeAtFlowAssignment(flow) {
                    const node = flow.node;
                    if (isMatchingReference(reference, node)) {
                        if (!isReachableFlowNode(flow)) {
                            return unreachableNeverType;
                        }
                        if (getAssignmentTargetKind(node) === 2 /* Compound */) {
                            const flowType = getTypeAtFlowNode(flow.antecedent);
                            return createFlowType(getBaseTypeOfLiteralType(getTypeFromFlowType(flowType)), isIncomplete(flowType));
                        }
                        if (declaredType === autoType || declaredType === autoArrayType) {
                            if (isEmptyArrayAssignment(node)) {
                                return getEvolvingArrayType(neverType);
                            }
                            const assignedType = getWidenedLiteralType(getInitialOrAssignedType(flow));
                            return isTypeAssignableTo(assignedType, declaredType) ? assignedType : anyArrayType;
                        }
                        if (declaredType.flags & 1048576 /* Union */) {
                            return getAssignmentReducedType(declaredType, getInitialOrAssignedType(flow));
                        }
                        return declaredType;
                    }
                    if (containsMatchingReference(reference, node)) {
                        if (!isReachableFlowNode(flow)) {
                            return unreachableNeverType;
                        }
                        if (isVariableDeclaration(node) && (isInJSFile(node) || isVarConst(node))) {
                            const init = getDeclaredExpandoInitializer(node);
                            if (init && (init.kind === 215 /* FunctionExpression */ || init.kind === 216 /* ArrowFunction */)) {
                                return getTypeAtFlowNode(flow.antecedent);
                            }
                        }
                        return declaredType;
                    }
                    if (isVariableDeclaration(node) && node.parent.parent.kind === 246 /* ForInStatement */ && (isMatchingReference(reference, node.parent.parent.expression) || optionalChainContainsReference(node.parent.parent.expression, reference))) {
                        return getNonNullableTypeIfNeeded(finalizeEvolvingArrayType(getTypeFromFlowType(getTypeAtFlowNode(flow.antecedent))));
                    }
                    return void 0;
                }
                function narrowTypeByAssertion(type, expr) {
                    const node = skipParentheses(expr, 
                    /*excludeJSDocTypeAssertions*/
                    true);
                    if (node.kind === 95 /* FalseKeyword */) {
                        return unreachableNeverType;
                    }
                    if (node.kind === 223 /* BinaryExpression */) {
                        if (node.operatorToken.kind === 55 /* AmpersandAmpersandToken */) {
                            return narrowTypeByAssertion(narrowTypeByAssertion(type, node.left), node.right);
                        }
                        if (node.operatorToken.kind === 56 /* BarBarToken */) {
                            return getUnionType([narrowTypeByAssertion(type, node.left), narrowTypeByAssertion(type, node.right)]);
                        }
                    }
                    return narrowType(type, node, 
                    /*assumeTrue*/
                    true);
                }
                function getTypeAtFlowCall(flow) {
                    const signature = getEffectsSignature(flow.node);
                    if (signature) {
                        const predicate = getTypePredicateOfSignature(signature);
                        if (predicate && (predicate.kind === 2 /* AssertsThis */ || predicate.kind === 3 /* AssertsIdentifier */)) {
                            const flowType = getTypeAtFlowNode(flow.antecedent);
                            const type = finalizeEvolvingArrayType(getTypeFromFlowType(flowType));
                            const narrowedType = predicate.type ? narrowTypeByTypePredicate(type, predicate, flow.node, 
                            /*assumeTrue*/
                            true) : predicate.kind === 3 /* AssertsIdentifier */ && predicate.parameterIndex >= 0 && predicate.parameterIndex < flow.node.arguments.length ? narrowTypeByAssertion(type, flow.node.arguments[predicate.parameterIndex]) : type;
                            return narrowedType === type ? flowType : createFlowType(narrowedType, isIncomplete(flowType));
                        }
                        if (getReturnTypeOfSignature(signature).flags & 131072 /* Never */) {
                            return unreachableNeverType;
                        }
                    }
                    return void 0;
                }
                function getTypeAtFlowArrayMutation(flow) {
                    if (declaredType === autoType || declaredType === autoArrayType) {
                        const node = flow.node;
                        const expr = node.kind === 210 /* CallExpression */ ? node.expression.expression : node.left.expression;
                        if (isMatchingReference(reference, getReferenceCandidate(expr))) {
                            const flowType = getTypeAtFlowNode(flow.antecedent);
                            const type = getTypeFromFlowType(flowType);
                            if (getObjectFlags(type) & 256 /* EvolvingArray */) {
                                let evolvedType2 = type;
                                if (node.kind === 210 /* CallExpression */) {
                                    for (const arg of node.arguments) {
                                        evolvedType2 = addEvolvingArrayElementType(evolvedType2, arg);
                                    }
                                }
                                else {
                                    const indexType = getContextFreeTypeOfExpression(node.left.argumentExpression);
                                    if (isTypeAssignableToKind(indexType, 296 /* NumberLike */)) {
                                        evolvedType2 = addEvolvingArrayElementType(evolvedType2, node.right);
                                    }
                                }
                                return evolvedType2 === type ? flowType : createFlowType(evolvedType2, isIncomplete(flowType));
                            }
                            return flowType;
                        }
                    }
                    return void 0;
                }
                function getTypeAtFlowCondition(flow) {
                    const flowType = getTypeAtFlowNode(flow.antecedent);
                    const type = getTypeFromFlowType(flowType);
                    if (type.flags & 131072 /* Never */) {
                        return flowType;
                    }
                    const assumeTrue = (flow.flags & 32 /* TrueCondition */) !== 0;
                    const nonEvolvingType = finalizeEvolvingArrayType(type);
                    const narrowedType = narrowType(nonEvolvingType, flow.node, assumeTrue);
                    if (narrowedType === nonEvolvingType) {
                        return flowType;
                    }
                    return createFlowType(narrowedType, isIncomplete(flowType));
                }
                function getTypeAtSwitchClause(flow) {
                    const expr = flow.switchStatement.expression;
                    const flowType = getTypeAtFlowNode(flow.antecedent);
                    let type = getTypeFromFlowType(flowType);
                    if (isMatchingReference(reference, expr)) {
                        type = narrowTypeBySwitchOnDiscriminant(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd);
                    }
                    else if (expr.kind === 218 /* TypeOfExpression */ && isMatchingReference(reference, expr.expression)) {
                        type = narrowTypeBySwitchOnTypeOf(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd);
                    }
                    else {
                        if (strictNullChecks) {
                            if (optionalChainContainsReference(expr, reference)) {
                                type = narrowTypeBySwitchOptionalChainContainment(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd, (t) => !(t.flags & (32768 /* Undefined */ | 131072 /* Never */)));
                            }
                            else if (expr.kind === 218 /* TypeOfExpression */ && optionalChainContainsReference(expr.expression, reference)) {
                                type = narrowTypeBySwitchOptionalChainContainment(type, flow.switchStatement, flow.clauseStart, flow.clauseEnd, (t) => !(t.flags & 131072 /* Never */ || t.flags & 128 /* StringLiteral */ && t.value === "undefined"));
                            }
                        }
                        const access = getDiscriminantPropertyAccess(expr, type);
                        if (access) {
                            type = narrowTypeBySwitchOnDiscriminantProperty(type, access, flow.switchStatement, flow.clauseStart, flow.clauseEnd);
                        }
                    }
                    return createFlowType(type, isIncomplete(flowType));
                }
                function getTypeAtFlowBranchLabel(flow) {
                    const antecedentTypes = [];
                    let subtypeReduction = false;
                    let seenIncomplete = false;
                    let bypassFlow;
                    for (const antecedent of flow.antecedents) {
                        if (!bypassFlow && antecedent.flags & 128 /* SwitchClause */ && antecedent.clauseStart === antecedent.clauseEnd) {
                            bypassFlow = antecedent;
                            continue;
                        }
                        const flowType = getTypeAtFlowNode(antecedent);
                        const type = getTypeFromFlowType(flowType);
                        if (type === declaredType && declaredType === initialType) {
                            return type;
                        }
                        pushIfUnique(antecedentTypes, type);
                        if (!isTypeSubsetOf(type, declaredType)) {
                            subtypeReduction = true;
                        }
                        if (isIncomplete(flowType)) {
                            seenIncomplete = true;
                        }
                    }
                    if (bypassFlow) {
                        const flowType = getTypeAtFlowNode(bypassFlow);
                        const type = getTypeFromFlowType(flowType);
                        if (!(type.flags & 131072 /* Never */) && !contains(antecedentTypes, type) && !isExhaustiveSwitchStatement(bypassFlow.switchStatement)) {
                            if (type === declaredType && declaredType === initialType) {
                                return type;
                            }
                            antecedentTypes.push(type);
                            if (!isTypeSubsetOf(type, declaredType)) {
                                subtypeReduction = true;
                            }
                            if (isIncomplete(flowType)) {
                                seenIncomplete = true;
                            }
                        }
                    }
                    return createFlowType(getUnionOrEvolvingArrayType(antecedentTypes, subtypeReduction ? 2 /* Subtype */ : 1 /* Literal */), seenIncomplete);
                }
                function getTypeAtFlowLoopLabel(flow) {
                    const id = getFlowNodeId(flow);
                    const cache = flowLoopCaches[id] || (flowLoopCaches[id] = /* @__PURE__ */ new Map());
                    const key2 = getOrSetCacheKey();
                    if (!key2) {
                        return declaredType;
                    }
                    const cached = cache.get(key2);
                    if (cached) {
                        return cached;
                    }
                    for (let i = flowLoopStart; i < flowLoopCount; i++) {
                        if (flowLoopNodes[i] === flow && flowLoopKeys[i] === key2 && flowLoopTypes[i].length) {
                            return createFlowType(getUnionOrEvolvingArrayType(flowLoopTypes[i], 1 /* Literal */), 
                            /*incomplete*/
                            true);
                        }
                    }
                    const antecedentTypes = [];
                    let subtypeReduction = false;
                    let firstAntecedentType;
                    for (const antecedent of flow.antecedents) {
                        let flowType;
                        if (!firstAntecedentType) {
                            flowType = firstAntecedentType = getTypeAtFlowNode(antecedent);
                        }
                        else {
                            flowLoopNodes[flowLoopCount] = flow;
                            flowLoopKeys[flowLoopCount] = key2;
                            flowLoopTypes[flowLoopCount] = antecedentTypes;
                            flowLoopCount++;
                            const saveFlowTypeCache = flowTypeCache;
                            flowTypeCache = void 0;
                            flowType = getTypeAtFlowNode(antecedent);
                            flowTypeCache = saveFlowTypeCache;
                            flowLoopCount--;
                            const cached2 = cache.get(key2);
                            if (cached2) {
                                return cached2;
                            }
                        }
                        const type = getTypeFromFlowType(flowType);
                        pushIfUnique(antecedentTypes, type);
                        if (!isTypeSubsetOf(type, declaredType)) {
                            subtypeReduction = true;
                        }
                        if (type === declaredType) {
                            break;
                        }
                    }
                    const result = getUnionOrEvolvingArrayType(antecedentTypes, subtypeReduction ? 2 /* Subtype */ : 1 /* Literal */);
                    if (isIncomplete(firstAntecedentType)) {
                        return createFlowType(result, 
                        /*incomplete*/
                        true);
                    }
                    cache.set(key2, result);
                    return result;
                }
                function getUnionOrEvolvingArrayType(types, subtypeReduction) {
                    if (isEvolvingArrayTypeList(types)) {
                        return getEvolvingArrayType(getUnionType(map(types, getElementTypeOfEvolvingArrayType)));
                    }
                    const result = recombineUnknownType(getUnionType(sameMap(types, finalizeEvolvingArrayType), subtypeReduction));
                    if (result !== declaredType && result.flags & declaredType.flags & 1048576 /* Union */ && arraysEqual(result.types, declaredType.types)) {
                        return declaredType;
                    }
                    return result;
                }
                function getCandidateDiscriminantPropertyAccess(expr) {
                    if (isBindingPattern(reference) || isFunctionExpressionOrArrowFunction(reference) || isObjectLiteralMethod(reference)) {
                        if (isIdentifier(expr)) {
                            const symbol = getResolvedSymbol(expr);
                            const declaration = symbol.valueDeclaration;
                            if (declaration && (isBindingElement(declaration) || isParameter(declaration)) && reference === declaration.parent && !declaration.initializer && !declaration.dotDotDotToken) {
                                return declaration;
                            }
                        }
                    }
                    else if (isAccessExpression(expr)) {
                        if (isMatchingReference(reference, expr.expression)) {
                            return expr;
                        }
                    }
                    else if (isIdentifier(expr)) {
                        const symbol = getResolvedSymbol(expr);
                        if (isConstVariable(symbol)) {
                            const declaration = symbol.valueDeclaration;
                            if (isVariableDeclaration(declaration) && !declaration.type && declaration.initializer && isAccessExpression(declaration.initializer) && isMatchingReference(reference, declaration.initializer.expression)) {
                                return declaration.initializer;
                            }
                            if (isBindingElement(declaration) && !declaration.initializer) {
                                const parent2 = declaration.parent.parent;
                                if (isVariableDeclaration(parent2) && !parent2.type && parent2.initializer && (isIdentifier(parent2.initializer) || isAccessExpression(parent2.initializer)) && isMatchingReference(reference, parent2.initializer)) {
                                    return declaration;
                                }
                            }
                        }
                    }
                    return void 0;
                }
                function getDiscriminantPropertyAccess(expr, computedType) {
                    const type = declaredType.flags & 1048576 /* Union */ ? declaredType : computedType;
                    if (type.flags & 1048576 /* Union */) {
                        const access = getCandidateDiscriminantPropertyAccess(expr);
                        if (access) {
                            const name = getAccessedPropertyName(access);
                            if (name && isDiscriminantProperty(type, name)) {
                                return access;
                            }
                        }
                    }
                    return void 0;
                }
                function narrowTypeByDiscriminant(type, access, narrowType2) {
                    const propName = getAccessedPropertyName(access);
                    if (propName === void 0) {
                        return type;
                    }
                    const optionalChain = isOptionalChain(access);
                    const removeNullable = strictNullChecks && (optionalChain || isNonNullAccess(access)) && maybeTypeOfKind(type, 98304 /* Nullable */);
                    let propType = getTypeOfPropertyOfType(removeNullable ? getTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */) : type, propName);
                    if (!propType) {
                        return type;
                    }
                    propType = removeNullable && optionalChain ? getOptionalType(propType) : propType;
                    const narrowedPropType = narrowType2(propType);
                    return filterType(type, (t) => {
                        const discriminantType = getTypeOfPropertyOrIndexSignature(t, propName);
                        return !(discriminantType.flags & 131072 /* Never */) && !(narrowedPropType.flags & 131072 /* Never */) && areTypesComparable(narrowedPropType, discriminantType);
                    });
                }
                function narrowTypeByDiscriminantProperty(type, access, operator, value, assumeTrue) {
                    if ((operator === 36 /* EqualsEqualsEqualsToken */ || operator === 37 /* ExclamationEqualsEqualsToken */) && type.flags & 1048576 /* Union */) {
                        const keyPropertyName = getKeyPropertyName(type);
                        if (keyPropertyName && keyPropertyName === getAccessedPropertyName(access)) {
                            const candidate = getConstituentTypeForKeyType(type, getTypeOfExpression(value));
                            if (candidate) {
                                return operator === (assumeTrue ? 36 /* EqualsEqualsEqualsToken */ : 37 /* ExclamationEqualsEqualsToken */) ? candidate : isUnitType(getTypeOfPropertyOfType(candidate, keyPropertyName) || unknownType) ? removeType(type, candidate) : type;
                            }
                        }
                    }
                    return narrowTypeByDiscriminant(type, access, (t) => narrowTypeByEquality(t, operator, value, assumeTrue));
                }
                function narrowTypeBySwitchOnDiscriminantProperty(type, access, switchStatement, clauseStart, clauseEnd) {
                    if (clauseStart < clauseEnd && type.flags & 1048576 /* Union */ && getKeyPropertyName(type) === getAccessedPropertyName(access)) {
                        const clauseTypes = getSwitchClauseTypes(switchStatement).slice(clauseStart, clauseEnd);
                        const candidate = getUnionType(map(clauseTypes, (t) => getConstituentTypeForKeyType(type, t) || unknownType));
                        if (candidate !== unknownType) {
                            return candidate;
                        }
                    }
                    return narrowTypeByDiscriminant(type, access, (t) => narrowTypeBySwitchOnDiscriminant(t, switchStatement, clauseStart, clauseEnd));
                }
                function narrowTypeByTruthiness(type, expr, assumeTrue) {
                    if (isMatchingReference(reference, expr)) {
                        return getAdjustedTypeWithFacts(type, assumeTrue ? 4194304 /* Truthy */ : 8388608 /* Falsy */);
                    }
                    if (strictNullChecks && assumeTrue && optionalChainContainsReference(expr, reference)) {
                        type = getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                    }
                    const access = getDiscriminantPropertyAccess(expr, type);
                    if (access) {
                        return narrowTypeByDiscriminant(type, access, (t) => getTypeWithFacts(t, assumeTrue ? 4194304 /* Truthy */ : 8388608 /* Falsy */));
                    }
                    return type;
                }
                function isTypePresencePossible(type, propName, assumeTrue) {
                    const prop = getPropertyOfType(type, propName);
                    return prop ? !!(prop.flags & 16777216 /* Optional */) || assumeTrue : !!getApplicableIndexInfoForName(type, propName) || !assumeTrue;
                }
                function narrowTypeByInKeyword(type, nameType, assumeTrue) {
                    const name = getPropertyNameFromType(nameType);
                    const isKnownProperty2 = someType(type, (t) => isTypePresencePossible(t, name, 
                    /*assumeTrue*/
                    true));
                    if (isKnownProperty2) {
                        return filterType(type, (t) => isTypePresencePossible(t, name, assumeTrue));
                    }
                    if (assumeTrue) {
                        const recordSymbol = getGlobalRecordSymbol();
                        if (recordSymbol) {
                            return getIntersectionType([type, getTypeAliasInstantiation(recordSymbol, [nameType, unknownType])]);
                        }
                    }
                    return type;
                }
                function narrowTypeByBinaryExpression(type, expr, assumeTrue) {
                    switch (expr.operatorToken.kind) {
                        case 63 /* EqualsToken */:
                        case 75 /* BarBarEqualsToken */:
                        case 76 /* AmpersandAmpersandEqualsToken */:
                        case 77 /* QuestionQuestionEqualsToken */:
                            return narrowTypeByTruthiness(narrowType(type, expr.right, assumeTrue), expr.left, assumeTrue);
                        case 34 /* EqualsEqualsToken */:
                        case 35 /* ExclamationEqualsToken */:
                        case 36 /* EqualsEqualsEqualsToken */:
                        case 37 /* ExclamationEqualsEqualsToken */:
                            const operator = expr.operatorToken.kind;
                            const left = getReferenceCandidate(expr.left);
                            const right = getReferenceCandidate(expr.right);
                            if (left.kind === 218 /* TypeOfExpression */ && isStringLiteralLike(right)) {
                                return narrowTypeByTypeof(type, left, operator, right, assumeTrue);
                            }
                            if (right.kind === 218 /* TypeOfExpression */ && isStringLiteralLike(left)) {
                                return narrowTypeByTypeof(type, right, operator, left, assumeTrue);
                            }
                            if (isMatchingReference(reference, left)) {
                                return narrowTypeByEquality(type, operator, right, assumeTrue);
                            }
                            if (isMatchingReference(reference, right)) {
                                return narrowTypeByEquality(type, operator, left, assumeTrue);
                            }
                            if (strictNullChecks) {
                                if (optionalChainContainsReference(left, reference)) {
                                    type = narrowTypeByOptionalChainContainment(type, operator, right, assumeTrue);
                                }
                                else if (optionalChainContainsReference(right, reference)) {
                                    type = narrowTypeByOptionalChainContainment(type, operator, left, assumeTrue);
                                }
                            }
                            const leftAccess = getDiscriminantPropertyAccess(left, type);
                            if (leftAccess) {
                                return narrowTypeByDiscriminantProperty(type, leftAccess, operator, right, assumeTrue);
                            }
                            const rightAccess = getDiscriminantPropertyAccess(right, type);
                            if (rightAccess) {
                                return narrowTypeByDiscriminantProperty(type, rightAccess, operator, left, assumeTrue);
                            }
                            if (isMatchingConstructorReference(left)) {
                                return narrowTypeByConstructor(type, operator, right, assumeTrue);
                            }
                            if (isMatchingConstructorReference(right)) {
                                return narrowTypeByConstructor(type, operator, left, assumeTrue);
                            }
                            break;
                        case 102 /* InstanceOfKeyword */:
                            return narrowTypeByInstanceof(type, expr, assumeTrue);
                        case 101 /* InKeyword */:
                            if (isPrivateIdentifier(expr.left)) {
                                return narrowTypeByPrivateIdentifierInInExpression(type, expr, assumeTrue);
                            }
                            const target = getReferenceCandidate(expr.right);
                            const leftType = getTypeOfExpression(expr.left);
                            if (leftType.flags & 8576 /* StringOrNumberLiteralOrUnique */) {
                                if (containsMissingType(type) && isAccessExpression(reference) && isMatchingReference(reference.expression, target) && getAccessedPropertyName(reference) === getPropertyNameFromType(leftType)) {
                                    return getTypeWithFacts(type, assumeTrue ? 524288 /* NEUndefined */ : 65536 /* EQUndefined */);
                                }
                                if (isMatchingReference(reference, target)) {
                                    return narrowTypeByInKeyword(type, leftType, assumeTrue);
                                }
                            }
                            break;
                        case 27 /* CommaToken */:
                            return narrowType(type, expr.right, assumeTrue);
                        case 55 /* AmpersandAmpersandToken */:
                            return assumeTrue ? narrowType(narrowType(type, expr.left, 
                            /*assumeTrue*/
                            true), expr.right, 
                            /*assumeTrue*/
                            true) : getUnionType([narrowType(type, expr.left, 
                                /*assumeTrue*/
                                false), narrowType(type, expr.right, 
                                /*assumeTrue*/
                                false)]);
                        case 56 /* BarBarToken */:
                            return assumeTrue ? getUnionType([narrowType(type, expr.left, 
                                /*assumeTrue*/
                                true), narrowType(type, expr.right, 
                                /*assumeTrue*/
                                true)]) : narrowType(narrowType(type, expr.left, 
                            /*assumeTrue*/
                            false), expr.right, 
                            /*assumeTrue*/
                            false);
                    }
                    return type;
                }
                function narrowTypeByPrivateIdentifierInInExpression(type, expr, assumeTrue) {
                    const target = getReferenceCandidate(expr.right);
                    if (!isMatchingReference(reference, target)) {
                        return type;
                    }
                    Debug.assertNode(expr.left, isPrivateIdentifier);
                    const symbol = getSymbolForPrivateIdentifierExpression(expr.left);
                    if (symbol === void 0) {
                        return type;
                    }
                    const classSymbol = symbol.parent;
                    const targetType = hasStaticModifier(Debug.checkDefined(symbol.valueDeclaration, "should always have a declaration")) ? getTypeOfSymbol(classSymbol) : getDeclaredTypeOfSymbol(classSymbol);
                    return getNarrowedType(type, targetType, assumeTrue, 
                    /*checkDerived*/
                    true);
                }
                function narrowTypeByOptionalChainContainment(type, operator, value, assumeTrue) {
                    const equalsOperator = operator === 34 /* EqualsEqualsToken */ || operator === 36 /* EqualsEqualsEqualsToken */;
                    const nullableFlags = operator === 34 /* EqualsEqualsToken */ || operator === 35 /* ExclamationEqualsToken */ ? 98304 /* Nullable */ : 32768 /* Undefined */;
                    const valueType = getTypeOfExpression(value);
                    const removeNullable = equalsOperator !== assumeTrue && everyType(valueType, (t) => !!(t.flags & nullableFlags)) || equalsOperator === assumeTrue && everyType(valueType, (t) => !(t.flags & (3 /* AnyOrUnknown */ | nullableFlags)));
                    return removeNullable ? getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */) : type;
                }
                function narrowTypeByEquality(type, operator, value, assumeTrue) {
                    if (type.flags & 1 /* Any */) {
                        return type;
                    }
                    if (operator === 35 /* ExclamationEqualsToken */ || operator === 37 /* ExclamationEqualsEqualsToken */) {
                        assumeTrue = !assumeTrue;
                    }
                    const valueType = getTypeOfExpression(value);
                    const doubleEquals = operator === 34 /* EqualsEqualsToken */ || operator === 35 /* ExclamationEqualsToken */;
                    if (valueType.flags & 98304 /* Nullable */) {
                        if (!strictNullChecks) {
                            return type;
                        }
                        const facts = doubleEquals ? assumeTrue ? 262144 /* EQUndefinedOrNull */ : 2097152 /* NEUndefinedOrNull */ : valueType.flags & 65536 /* Null */ ? assumeTrue ? 131072 /* EQNull */ : 1048576 /* NENull */ : assumeTrue ? 65536 /* EQUndefined */ : 524288 /* NEUndefined */;
                        return getAdjustedTypeWithFacts(type, facts);
                    }
                    if (assumeTrue) {
                        if (!doubleEquals && (type.flags & 2 /* Unknown */ || someType(type, isEmptyAnonymousObjectType))) {
                            if (valueType.flags & (134348796 /* Primitive */ | 67108864 /* NonPrimitive */) || isEmptyAnonymousObjectType(valueType)) {
                                return valueType;
                            }
                            if (valueType.flags & 524288 /* Object */) {
                                return nonPrimitiveType;
                            }
                        }
                        const filteredType = filterType(type, (t) => areTypesComparable(t, valueType) || doubleEquals && isCoercibleUnderDoubleEquals(t, valueType));
                        return replacePrimitivesWithLiterals(filteredType, valueType);
                    }
                    if (isUnitType(valueType)) {
                        return filterType(type, (t) => !(isUnitLikeType(t) && areTypesComparable(t, valueType)));
                    }
                    return type;
                }
                function narrowTypeByTypeof(type, typeOfExpr, operator, literal, assumeTrue) {
                    if (operator === 35 /* ExclamationEqualsToken */ || operator === 37 /* ExclamationEqualsEqualsToken */) {
                        assumeTrue = !assumeTrue;
                    }
                    const target = getReferenceCandidate(typeOfExpr.expression);
                    if (!isMatchingReference(reference, target)) {
                        if (strictNullChecks && optionalChainContainsReference(target, reference) && assumeTrue === (literal.text !== "undefined")) {
                            type = getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                        }
                        const propertyAccess = getDiscriminantPropertyAccess(target, type);
                        if (propertyAccess) {
                            return narrowTypeByDiscriminant(type, propertyAccess, (t) => narrowTypeByLiteralExpression(t, literal, assumeTrue));
                        }
                        return type;
                    }
                    return narrowTypeByLiteralExpression(type, literal, assumeTrue);
                }
                function narrowTypeByLiteralExpression(type, literal, assumeTrue) {
                    return assumeTrue ? narrowTypeByTypeName(type, literal.text) : getAdjustedTypeWithFacts(type, typeofNEFacts.get(literal.text) || 32768 /* TypeofNEHostObject */);
                }
                function narrowTypeBySwitchOptionalChainContainment(type, switchStatement, clauseStart, clauseEnd, clauseCheck) {
                    const everyClauseChecks = clauseStart !== clauseEnd && every(getSwitchClauseTypes(switchStatement).slice(clauseStart, clauseEnd), clauseCheck);
                    return everyClauseChecks ? getTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */) : type;
                }
                function narrowTypeBySwitchOnDiscriminant(type, switchStatement, clauseStart, clauseEnd) {
                    const switchTypes = getSwitchClauseTypes(switchStatement);
                    if (!switchTypes.length) {
                        return type;
                    }
                    const clauseTypes = switchTypes.slice(clauseStart, clauseEnd);
                    const hasDefaultClause = clauseStart === clauseEnd || contains(clauseTypes, neverType);
                    if (type.flags & 2 /* Unknown */ && !hasDefaultClause) {
                        let groundClauseTypes;
                        for (let i = 0; i < clauseTypes.length; i += 1) {
                            const t = clauseTypes[i];
                            if (t.flags & (134348796 /* Primitive */ | 67108864 /* NonPrimitive */)) {
                                if (groundClauseTypes !== void 0) {
                                    groundClauseTypes.push(t);
                                }
                            }
                            else if (t.flags & 524288 /* Object */) {
                                if (groundClauseTypes === void 0) {
                                    groundClauseTypes = clauseTypes.slice(0, i);
                                }
                                groundClauseTypes.push(nonPrimitiveType);
                            }
                            else {
                                return type;
                            }
                        }
                        return getUnionType(groundClauseTypes === void 0 ? clauseTypes : groundClauseTypes);
                    }
                    const discriminantType = getUnionType(clauseTypes);
                    const caseType = discriminantType.flags & 131072 /* Never */ ? neverType : replacePrimitivesWithLiterals(filterType(type, (t) => areTypesComparable(discriminantType, t)), discriminantType);
                    if (!hasDefaultClause) {
                        return caseType;
                    }
                    const defaultType = filterType(type, (t) => !(isUnitLikeType(t) && contains(switchTypes, getRegularTypeOfLiteralType(extractUnitType(t)))));
                    return caseType.flags & 131072 /* Never */ ? defaultType : getUnionType([caseType, defaultType]);
                }
                function narrowTypeByTypeName(type, typeName) {
                    switch (typeName) {
                        case "string":
                            return narrowTypeByTypeFacts(type, stringType, 1 /* TypeofEQString */);
                        case "number":
                            return narrowTypeByTypeFacts(type, numberType, 2 /* TypeofEQNumber */);
                        case "bigint":
                            return narrowTypeByTypeFacts(type, bigintType, 4 /* TypeofEQBigInt */);
                        case "boolean":
                            return narrowTypeByTypeFacts(type, booleanType, 8 /* TypeofEQBoolean */);
                        case "symbol":
                            return narrowTypeByTypeFacts(type, esSymbolType, 16 /* TypeofEQSymbol */);
                        case "object":
                            return type.flags & 1 /* Any */ ? type : getUnionType([narrowTypeByTypeFacts(type, nonPrimitiveType, 32 /* TypeofEQObject */), narrowTypeByTypeFacts(type, nullType, 131072 /* EQNull */)]);
                        case "function":
                            return type.flags & 1 /* Any */ ? type : narrowTypeByTypeFacts(type, globalFunctionType, 64 /* TypeofEQFunction */);
                        case "undefined":
                            return narrowTypeByTypeFacts(type, undefinedType, 65536 /* EQUndefined */);
                    }
                    return narrowTypeByTypeFacts(type, nonPrimitiveType, 128 /* TypeofEQHostObject */);
                }
                function narrowTypeByTypeFacts(type, impliedType, facts) {
                    return mapType(type, (t) => (
                    // We first check if a constituent is a subtype of the implied type. If so, we either keep or eliminate
                    // the constituent based on its type facts. We use the strict subtype relation because it treats `object`
                    // as a subtype of `{}`, and we need the type facts check because function types are subtypes of `object`,
                    // but are classified as "function" according to `typeof`.
                    isTypeRelatedTo(t, impliedType, strictSubtypeRelation) ? getTypeFacts(t) & facts ? t : neverType : (
                    // We next check if the consituent is a supertype of the implied type. If so, we substitute the implied
                    // type. This handles top types like `unknown` and `{}`, and supertypes like `{ toString(): string }`.
                    isTypeSubtypeOf(impliedType, t) ? impliedType : (
                    // Neither the constituent nor the implied type is a subtype of the other, however their domains may still
                    // overlap. For example, an unconstrained type parameter and type `string`. If the type facts indicate
                    // possible overlap, we form an intersection. Otherwise, we eliminate the constituent.
                    getTypeFacts(t) & facts ? getIntersectionType([t, impliedType]) : neverType))));
                }
                function narrowTypeBySwitchOnTypeOf(type, switchStatement, clauseStart, clauseEnd) {
                    const witnesses = getSwitchClauseTypeOfWitnesses(switchStatement);
                    if (!witnesses) {
                        return type;
                    }
                    const defaultIndex = findIndex(switchStatement.caseBlock.clauses, (clause) => clause.kind === 293 /* DefaultClause */);
                    const hasDefaultClause = clauseStart === clauseEnd || defaultIndex >= clauseStart && defaultIndex < clauseEnd;
                    if (hasDefaultClause) {
                        const notEqualFacts = getNotEqualFactsFromTypeofSwitch(clauseStart, clauseEnd, witnesses);
                        return filterType(type, (t) => (getTypeFacts(t) & notEqualFacts) === notEqualFacts);
                    }
                    const clauseWitnesses = witnesses.slice(clauseStart, clauseEnd);
                    return getUnionType(map(clauseWitnesses, (text) => text ? narrowTypeByTypeName(type, text) : neverType));
                }
                function isMatchingConstructorReference(expr) {
                    return (isPropertyAccessExpression(expr) && idText(expr.name) === "constructor" || isElementAccessExpression(expr) && isStringLiteralLike(expr.argumentExpression) && expr.argumentExpression.text === "constructor") && isMatchingReference(reference, expr.expression);
                }
                function narrowTypeByConstructor(type, operator, identifier, assumeTrue) {
                    if (assumeTrue ? operator !== 34 /* EqualsEqualsToken */ && operator !== 36 /* EqualsEqualsEqualsToken */ : operator !== 35 /* ExclamationEqualsToken */ && operator !== 37 /* ExclamationEqualsEqualsToken */) {
                        return type;
                    }
                    const identifierType = getTypeOfExpression(identifier);
                    if (!isFunctionType(identifierType) && !isConstructorType(identifierType)) {
                        return type;
                    }
                    const prototypeProperty = getPropertyOfType(identifierType, "prototype");
                    if (!prototypeProperty) {
                        return type;
                    }
                    const prototypeType = getTypeOfSymbol(prototypeProperty);
                    const candidate = !isTypeAny(prototypeType) ? prototypeType : void 0;
                    if (!candidate || candidate === globalObjectType || candidate === globalFunctionType) {
                        return type;
                    }
                    if (isTypeAny(type)) {
                        return candidate;
                    }
                    return filterType(type, (t) => isConstructedBy(t, candidate));
                    function isConstructedBy(source, target) {
                        if (source.flags & 524288 /* Object */ && getObjectFlags(source) & 1 /* Class */ || target.flags & 524288 /* Object */ && getObjectFlags(target) & 1 /* Class */) {
                            return source.symbol === target.symbol;
                        }
                        return isTypeSubtypeOf(source, target);
                    }
                }
                function narrowTypeByInstanceof(type, expr, assumeTrue) {
                    const left = getReferenceCandidate(expr.left);
                    if (!isMatchingReference(reference, left)) {
                        if (assumeTrue && strictNullChecks && optionalChainContainsReference(left, reference)) {
                            return getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                        }
                        return type;
                    }
                    const rightType = getTypeOfExpression(expr.right);
                    if (!isTypeDerivedFrom(rightType, globalFunctionType)) {
                        return type;
                    }
                    const instanceType = mapType(rightType, getInstanceType);
                    if (isTypeAny(type) && (instanceType === globalObjectType || instanceType === globalFunctionType) || !assumeTrue && !(instanceType.flags & 524288 /* Object */ && !isEmptyAnonymousObjectType(instanceType))) {
                        return type;
                    }
                    return getNarrowedType(type, instanceType, assumeTrue, 
                    /*checkDerived*/
                    true);
                }
                function getInstanceType(constructorType) {
                    const prototypePropertyType = getTypeOfPropertyOfType(constructorType, "prototype");
                    if (prototypePropertyType && !isTypeAny(prototypePropertyType)) {
                        return prototypePropertyType;
                    }
                    const constructSignatures = getSignaturesOfType(constructorType, 1 /* Construct */);
                    if (constructSignatures.length) {
                        return getUnionType(map(constructSignatures, (signature) => getReturnTypeOfSignature(getErasedSignature(signature))));
                    }
                    return emptyObjectType;
                }
                function getNarrowedType(type, candidate, assumeTrue, checkDerived) {
                    var _a3;
                    const key2 = type.flags & 1048576 /* Union */ ? `N${getTypeId(type)},${getTypeId(candidate)},${(assumeTrue ? 1 : 0) | (checkDerived ? 2 : 0)}` : void 0;
                    return (_a3 = getCachedType(key2)) != null ? _a3 : setCachedType(key2, getNarrowedTypeWorker(type, candidate, assumeTrue, checkDerived));
                }
                function getNarrowedTypeWorker(type, candidate, assumeTrue, checkDerived) {
                    if (!assumeTrue) {
                        if (checkDerived) {
                            return filterType(type, (t) => !isTypeDerivedFrom(t, candidate));
                        }
                        const trueType2 = getNarrowedType(type, candidate, 
                        /*assumeTrue*/
                        true, 
                        /*checkDerived*/
                        false);
                        return filterType(type, (t) => !isTypeSubsetOf(t, trueType2));
                    }
                    if (type.flags & 3 /* AnyOrUnknown */) {
                        return candidate;
                    }
                    const isRelated = checkDerived ? isTypeDerivedFrom : isTypeSubtypeOf;
                    const keyPropertyName = type.flags & 1048576 /* Union */ ? getKeyPropertyName(type) : void 0;
                    const narrowedType = mapType(candidate, (c) => {
                        const discriminant = keyPropertyName && getTypeOfPropertyOfType(c, keyPropertyName);
                        const matching = discriminant && getConstituentTypeForKeyType(type, discriminant);
                        const directlyRelated = mapType(matching || type, checkDerived ? (t) => isTypeDerivedFrom(t, c) ? t : isTypeDerivedFrom(c, t) ? c : neverType : (t) => isTypeStrictSubtypeOf(t, c) ? t : isTypeStrictSubtypeOf(c, t) ? c : isTypeSubtypeOf(t, c) ? t : isTypeSubtypeOf(c, t) ? c : neverType);
                        return directlyRelated.flags & 131072 /* Never */ ? mapType(type, (t) => maybeTypeOfKind(t, 465829888 /* Instantiable */) && isRelated(c, getBaseConstraintOfType(t) || unknownType) ? getIntersectionType([t, c]) : neverType) : directlyRelated;
                    });
                    return !(narrowedType.flags & 131072 /* Never */) ? narrowedType : isTypeSubtypeOf(candidate, type) ? candidate : isTypeAssignableTo(type, candidate) ? type : isTypeAssignableTo(candidate, type) ? candidate : getIntersectionType([type, candidate]);
                }
                function narrowTypeByCallExpression(type, callExpression, assumeTrue) {
                    if (hasMatchingArgument(callExpression, reference)) {
                        const signature = assumeTrue || !isCallChain(callExpression) ? getEffectsSignature(callExpression) : void 0;
                        const predicate = signature && getTypePredicateOfSignature(signature);
                        if (predicate && (predicate.kind === 0 /* This */ || predicate.kind === 1 /* Identifier */)) {
                            return narrowTypeByTypePredicate(type, predicate, callExpression, assumeTrue);
                        }
                    }
                    if (containsMissingType(type) && isAccessExpression(reference) && isPropertyAccessExpression(callExpression.expression)) {
                        const callAccess = callExpression.expression;
                        if (isMatchingReference(reference.expression, getReferenceCandidate(callAccess.expression)) && isIdentifier(callAccess.name) && callAccess.name.escapedText === "hasOwnProperty" && callExpression.arguments.length === 1) {
                            const argument = callExpression.arguments[0];
                            if (isStringLiteralLike(argument) && getAccessedPropertyName(reference) === escapeLeadingUnderscores(argument.text)) {
                                return getTypeWithFacts(type, assumeTrue ? 524288 /* NEUndefined */ : 65536 /* EQUndefined */);
                            }
                        }
                    }
                    return type;
                }
                function narrowTypeByTypePredicate(type, predicate, callExpression, assumeTrue) {
                    if (predicate.type && !(isTypeAny(type) && (predicate.type === globalObjectType || predicate.type === globalFunctionType))) {
                        const predicateArgument = getTypePredicateArgument(predicate, callExpression);
                        if (predicateArgument) {
                            if (isMatchingReference(reference, predicateArgument)) {
                                return getNarrowedType(type, predicate.type, assumeTrue, 
                                /*checkDerived*/
                                false);
                            }
                            if (strictNullChecks && assumeTrue && optionalChainContainsReference(predicateArgument, reference) && !(getTypeFacts(predicate.type) & 65536 /* EQUndefined */)) {
                                type = getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */);
                            }
                            const access = getDiscriminantPropertyAccess(predicateArgument, type);
                            if (access) {
                                return narrowTypeByDiscriminant(type, access, (t) => getNarrowedType(t, predicate.type, assumeTrue, 
                                /*checkDerived*/
                                false));
                            }
                        }
                    }
                    return type;
                }
                function narrowType(type, expr, assumeTrue) {
                    if (isExpressionOfOptionalChainRoot(expr) || isBinaryExpression(expr.parent) && (expr.parent.operatorToken.kind === 60 /* QuestionQuestionToken */ || expr.parent.operatorToken.kind === 77 /* QuestionQuestionEqualsToken */) && expr.parent.left === expr) {
                        return narrowTypeByOptionality(type, expr, assumeTrue);
                    }
                    switch (expr.kind) {
                        case 79 /* Identifier */:
                            if (!isMatchingReference(reference, expr) && inlineLevel < 5) {
                                const symbol = getResolvedSymbol(expr);
                                if (isConstVariable(symbol)) {
                                    const declaration = symbol.valueDeclaration;
                                    if (declaration && isVariableDeclaration(declaration) && !declaration.type && declaration.initializer && isConstantReference(reference)) {
                                        inlineLevel++;
                                        const result = narrowType(type, declaration.initializer, assumeTrue);
                                        inlineLevel--;
                                        return result;
                                    }
                                }
                            }
                        case 108 /* ThisKeyword */:
                        case 106 /* SuperKeyword */:
                        case 208 /* PropertyAccessExpression */:
                        case 209 /* ElementAccessExpression */:
                            return narrowTypeByTruthiness(type, expr, assumeTrue);
                        case 210 /* CallExpression */:
                            return narrowTypeByCallExpression(type, expr, assumeTrue);
                        case 214 /* ParenthesizedExpression */:
                        case 232 /* NonNullExpression */:
                            return narrowType(type, expr.expression, assumeTrue);
                        case 223 /* BinaryExpression */:
                            return narrowTypeByBinaryExpression(type, expr, assumeTrue);
                        case 221 /* PrefixUnaryExpression */:
                            if (expr.operator === 53 /* ExclamationToken */) {
                                return narrowType(type, expr.operand, !assumeTrue);
                            }
                            break;
                    }
                    return type;
                }
                function narrowTypeByOptionality(type, expr, assumePresent) {
                    if (isMatchingReference(reference, expr)) {
                        return getAdjustedTypeWithFacts(type, assumePresent ? 2097152 /* NEUndefinedOrNull */ : 262144 /* EQUndefinedOrNull */);
                    }
                    const access = getDiscriminantPropertyAccess(expr, type);
                    if (access) {
                        return narrowTypeByDiscriminant(type, access, (t) => getTypeWithFacts(t, assumePresent ? 2097152 /* NEUndefinedOrNull */ : 262144 /* EQUndefinedOrNull */));
                    }
                    return type;
                }
            }