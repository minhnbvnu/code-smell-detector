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