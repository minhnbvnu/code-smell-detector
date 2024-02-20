function inferTypeFromReferences(program, references, cancellationToken) {
            const checker = program.getTypeChecker();
            const builtinConstructors = {
                string: () => checker.getStringType(),
                number: () => checker.getNumberType(),
                Array: (t) => checker.createArrayType(t),
                Promise: (t) => checker.createPromiseType(t)
            };
            const builtins = [
                checker.getStringType(),
                checker.getNumberType(),
                checker.createArrayType(checker.getAnyType()),
                checker.createPromiseType(checker.getAnyType())
            ];
            return {
                single: single2,
                parameters,
                thisParameter
            };
            function createEmptyUsage() {
                return {
                    isNumber: void 0,
                    isString: void 0,
                    isNumberOrString: void 0,
                    candidateTypes: void 0,
                    properties: void 0,
                    calls: void 0,
                    constructs: void 0,
                    numberIndex: void 0,
                    stringIndex: void 0,
                    candidateThisTypes: void 0,
                    inferredTypes: void 0
                };
            }
            function combineUsages(usages) {
                const combinedProperties = /* @__PURE__ */ new Map();
                for (const u of usages) {
                    if (u.properties) {
                        u.properties.forEach((p, name) => {
                            if (!combinedProperties.has(name)) {
                                combinedProperties.set(name, []);
                            }
                            combinedProperties.get(name).push(p);
                        });
                    }
                }
                const properties = /* @__PURE__ */ new Map();
                combinedProperties.forEach((ps, name) => {
                    properties.set(name, combineUsages(ps));
                });
                return {
                    isNumber: usages.some((u) => u.isNumber),
                    isString: usages.some((u) => u.isString),
                    isNumberOrString: usages.some((u) => u.isNumberOrString),
                    candidateTypes: flatMap(usages, (u) => u.candidateTypes),
                    properties,
                    calls: flatMap(usages, (u) => u.calls),
                    constructs: flatMap(usages, (u) => u.constructs),
                    numberIndex: forEach(usages, (u) => u.numberIndex),
                    stringIndex: forEach(usages, (u) => u.stringIndex),
                    candidateThisTypes: flatMap(usages, (u) => u.candidateThisTypes),
                    inferredTypes: void 0
                    // clear type cache
                };
            }
            function single2() {
                return combineTypes(inferTypesFromReferencesSingle(references));
            }
            function parameters(declaration) {
                if (references.length === 0 || !declaration.parameters) {
                    return void 0;
                }
                const usage = createEmptyUsage();
                for (const reference of references) {
                    cancellationToken.throwIfCancellationRequested();
                    calculateUsageOfNode(reference, usage);
                }
                const calls = [...usage.constructs || [], ...usage.calls || []];
                return declaration.parameters.map((parameter, parameterIndex) => {
                    const types = [];
                    const isRest = isRestParameter(parameter);
                    let isOptional = false;
                    for (const call of calls) {
                        if (call.argumentTypes.length <= parameterIndex) {
                            isOptional = isInJSFile(declaration);
                            types.push(checker.getUndefinedType());
                        }
                        else if (isRest) {
                            for (let i = parameterIndex; i < call.argumentTypes.length; i++) {
                                types.push(checker.getBaseTypeOfLiteralType(call.argumentTypes[i]));
                            }
                        }
                        else {
                            types.push(checker.getBaseTypeOfLiteralType(call.argumentTypes[parameterIndex]));
                        }
                    }
                    if (isIdentifier(parameter.name)) {
                        const inferred = inferTypesFromReferencesSingle(getReferences(parameter.name, program, cancellationToken));
                        types.push(...isRest ? mapDefined(inferred, checker.getElementTypeOfArrayType) : inferred);
                    }
                    const type = combineTypes(types);
                    return {
                        type: isRest ? checker.createArrayType(type) : type,
                        isOptional: isOptional && !isRest,
                        declaration: parameter
                    };
                });
            }
            function thisParameter() {
                const usage = createEmptyUsage();
                for (const reference of references) {
                    cancellationToken.throwIfCancellationRequested();
                    calculateUsageOfNode(reference, usage);
                }
                return combineTypes(usage.candidateThisTypes || emptyArray);
            }
            function inferTypesFromReferencesSingle(references2) {
                const usage = createEmptyUsage();
                for (const reference of references2) {
                    cancellationToken.throwIfCancellationRequested();
                    calculateUsageOfNode(reference, usage);
                }
                return inferTypes(usage);
            }
            function calculateUsageOfNode(node, usage) {
                while (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
                    node = node.parent;
                }
                switch (node.parent.kind) {
                    case 241 /* ExpressionStatement */:
                        inferTypeFromExpressionStatement(node, usage);
                        break;
                    case 222 /* PostfixUnaryExpression */:
                        usage.isNumber = true;
                        break;
                    case 221 /* PrefixUnaryExpression */:
                        inferTypeFromPrefixUnaryExpression(node.parent, usage);
                        break;
                    case 223 /* BinaryExpression */:
                        inferTypeFromBinaryExpression(node, node.parent, usage);
                        break;
                    case 292 /* CaseClause */:
                    case 293 /* DefaultClause */:
                        inferTypeFromSwitchStatementLabel(node.parent, usage);
                        break;
                    case 210 /* CallExpression */:
                    case 211 /* NewExpression */:
                        if (node.parent.expression === node) {
                            inferTypeFromCallExpression(node.parent, usage);
                        }
                        else {
                            inferTypeFromContextualType(node, usage);
                        }
                        break;
                    case 208 /* PropertyAccessExpression */:
                        inferTypeFromPropertyAccessExpression(node.parent, usage);
                        break;
                    case 209 /* ElementAccessExpression */:
                        inferTypeFromPropertyElementExpression(node.parent, node, usage);
                        break;
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                        inferTypeFromPropertyAssignment(node.parent, usage);
                        break;
                    case 169 /* PropertyDeclaration */:
                        inferTypeFromPropertyDeclaration(node.parent, usage);
                        break;
                    case 257 /* VariableDeclaration */: {
                        const { name, initializer } = node.parent;
                        if (node === name) {
                            if (initializer) {
                                addCandidateType(usage, checker.getTypeAtLocation(initializer));
                            }
                            break;
                        }
                    }
                    default:
                        return inferTypeFromContextualType(node, usage);
                }
            }
            function inferTypeFromContextualType(node, usage) {
                if (isExpressionNode(node)) {
                    addCandidateType(usage, checker.getContextualType(node));
                }
            }
            function inferTypeFromExpressionStatement(node, usage) {
                addCandidateType(usage, isCallExpression(node) ? checker.getVoidType() : checker.getAnyType());
            }
            function inferTypeFromPrefixUnaryExpression(node, usage) {
                switch (node.operator) {
                    case 45 /* PlusPlusToken */:
                    case 46 /* MinusMinusToken */:
                    case 40 /* MinusToken */:
                    case 54 /* TildeToken */:
                        usage.isNumber = true;
                        break;
                    case 39 /* PlusToken */:
                        usage.isNumberOrString = true;
                        break;
                }
            }
            function inferTypeFromBinaryExpression(node, parent2, usage) {
                switch (parent2.operatorToken.kind) {
                    case 42 /* AsteriskAsteriskToken */:
                    case 41 /* AsteriskToken */:
                    case 43 /* SlashToken */:
                    case 44 /* PercentToken */:
                    case 47 /* LessThanLessThanToken */:
                    case 48 /* GreaterThanGreaterThanToken */:
                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                    case 50 /* AmpersandToken */:
                    case 51 /* BarToken */:
                    case 52 /* CaretToken */:
                    case 65 /* MinusEqualsToken */:
                    case 67 /* AsteriskAsteriskEqualsToken */:
                    case 66 /* AsteriskEqualsToken */:
                    case 68 /* SlashEqualsToken */:
                    case 69 /* PercentEqualsToken */:
                    case 73 /* AmpersandEqualsToken */:
                    case 74 /* BarEqualsToken */:
                    case 78 /* CaretEqualsToken */:
                    case 70 /* LessThanLessThanEqualsToken */:
                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    case 71 /* GreaterThanGreaterThanEqualsToken */:
                    case 40 /* MinusToken */:
                    case 29 /* LessThanToken */:
                    case 32 /* LessThanEqualsToken */:
                    case 31 /* GreaterThanToken */:
                    case 33 /* GreaterThanEqualsToken */:
                        const operandType = checker.getTypeAtLocation(parent2.left === node ? parent2.right : parent2.left);
                        if (operandType.flags & 1056 /* EnumLike */) {
                            addCandidateType(usage, operandType);
                        }
                        else {
                            usage.isNumber = true;
                        }
                        break;
                    case 64 /* PlusEqualsToken */:
                    case 39 /* PlusToken */:
                        const otherOperandType = checker.getTypeAtLocation(parent2.left === node ? parent2.right : parent2.left);
                        if (otherOperandType.flags & 1056 /* EnumLike */) {
                            addCandidateType(usage, otherOperandType);
                        }
                        else if (otherOperandType.flags & 296 /* NumberLike */) {
                            usage.isNumber = true;
                        }
                        else if (otherOperandType.flags & 402653316 /* StringLike */) {
                            usage.isString = true;
                        }
                        else if (otherOperandType.flags & 1 /* Any */) {
                        }
                        else {
                            usage.isNumberOrString = true;
                        }
                        break;
                    case 63 /* EqualsToken */:
                    case 34 /* EqualsEqualsToken */:
                    case 36 /* EqualsEqualsEqualsToken */:
                    case 37 /* ExclamationEqualsEqualsToken */:
                    case 35 /* ExclamationEqualsToken */:
                        addCandidateType(usage, checker.getTypeAtLocation(parent2.left === node ? parent2.right : parent2.left));
                        break;
                    case 101 /* InKeyword */:
                        if (node === parent2.left) {
                            usage.isString = true;
                        }
                        break;
                    case 56 /* BarBarToken */:
                    case 60 /* QuestionQuestionToken */:
                        if (node === parent2.left && (node.parent.parent.kind === 257 /* VariableDeclaration */ || isAssignmentExpression(node.parent.parent, 
                        /*excludeCompoundAssignment*/
                        true))) {
                            addCandidateType(usage, checker.getTypeAtLocation(parent2.right));
                        }
                        break;
                    case 55 /* AmpersandAmpersandToken */:
                    case 27 /* CommaToken */:
                    case 102 /* InstanceOfKeyword */:
                        break;
                }
            }
            function inferTypeFromSwitchStatementLabel(parent2, usage) {
                addCandidateType(usage, checker.getTypeAtLocation(parent2.parent.parent.expression));
            }
            function inferTypeFromCallExpression(parent2, usage) {
                const call = {
                    argumentTypes: [],
                    return_: createEmptyUsage()
                };
                if (parent2.arguments) {
                    for (const argument of parent2.arguments) {
                        call.argumentTypes.push(checker.getTypeAtLocation(argument));
                    }
                }
                calculateUsageOfNode(parent2, call.return_);
                if (parent2.kind === 210 /* CallExpression */) {
                    (usage.calls || (usage.calls = [])).push(call);
                }
                else {
                    (usage.constructs || (usage.constructs = [])).push(call);
                }
            }
            function inferTypeFromPropertyAccessExpression(parent2, usage) {
                const name = escapeLeadingUnderscores(parent2.name.text);
                if (!usage.properties) {
                    usage.properties = /* @__PURE__ */ new Map();
                }
                const propertyUsage = usage.properties.get(name) || createEmptyUsage();
                calculateUsageOfNode(parent2, propertyUsage);
                usage.properties.set(name, propertyUsage);
            }
            function inferTypeFromPropertyElementExpression(parent2, node, usage) {
                if (node === parent2.argumentExpression) {
                    usage.isNumberOrString = true;
                    return;
                }
                else {
                    const indexType = checker.getTypeAtLocation(parent2.argumentExpression);
                    const indexUsage = createEmptyUsage();
                    calculateUsageOfNode(parent2, indexUsage);
                    if (indexType.flags & 296 /* NumberLike */) {
                        usage.numberIndex = indexUsage;
                    }
                    else {
                        usage.stringIndex = indexUsage;
                    }
                }
            }
            function inferTypeFromPropertyAssignment(assignment, usage) {
                const nodeWithRealType = isVariableDeclaration(assignment.parent.parent) ? assignment.parent.parent : assignment.parent;
                addCandidateThisType(usage, checker.getTypeAtLocation(nodeWithRealType));
            }
            function inferTypeFromPropertyDeclaration(declaration, usage) {
                addCandidateThisType(usage, checker.getTypeAtLocation(declaration.parent));
            }
            function removeLowPriorityInferences(inferences, priorities) {
                const toRemove = [];
                for (const i of inferences) {
                    for (const { high, low } of priorities) {
                        if (high(i)) {
                            Debug.assert(!low(i), "Priority can't have both low and high");
                            toRemove.push(low);
                        }
                    }
                }
                return inferences.filter((i) => toRemove.every((f) => !f(i)));
            }
            function combineFromUsage(usage) {
                return combineTypes(inferTypes(usage));
            }
            function combineTypes(inferences) {
                if (!inferences.length)
                    return checker.getAnyType();
                const stringNumber = checker.getUnionType([checker.getStringType(), checker.getNumberType()]);
                const priorities = [
                    {
                        high: (t) => t === checker.getStringType() || t === checker.getNumberType(),
                        low: (t) => t === stringNumber
                    },
                    {
                        high: (t) => !(t.flags & (1 /* Any */ | 16384 /* Void */)),
                        low: (t) => !!(t.flags & (1 /* Any */ | 16384 /* Void */))
                    },
                    {
                        high: (t) => !(t.flags & (98304 /* Nullable */ | 1 /* Any */ | 16384 /* Void */)) && !(getObjectFlags(t) & 16 /* Anonymous */),
                        low: (t) => !!(getObjectFlags(t) & 16 /* Anonymous */)
                    }
                ];
                let good = removeLowPriorityInferences(inferences, priorities);
                const anons = good.filter((i) => getObjectFlags(i) & 16 /* Anonymous */);
                if (anons.length) {
                    good = good.filter((i) => !(getObjectFlags(i) & 16 /* Anonymous */));
                    good.push(combineAnonymousTypes(anons));
                }
                return checker.getWidenedType(checker.getUnionType(good.map(checker.getBaseTypeOfLiteralType), 2 /* Subtype */));
            }
            function combineAnonymousTypes(anons) {
                if (anons.length === 1) {
                    return anons[0];
                }
                const calls = [];
                const constructs = [];
                const stringIndices = [];
                const numberIndices = [];
                let stringIndexReadonly = false;
                let numberIndexReadonly = false;
                const props = createMultiMap();
                for (const anon2 of anons) {
                    for (const p of checker.getPropertiesOfType(anon2)) {
                        props.add(p.name, p.valueDeclaration ? checker.getTypeOfSymbolAtLocation(p, p.valueDeclaration) : checker.getAnyType());
                    }
                    calls.push(...checker.getSignaturesOfType(anon2, 0 /* Call */));
                    constructs.push(...checker.getSignaturesOfType(anon2, 1 /* Construct */));
                    const stringIndexInfo = checker.getIndexInfoOfType(anon2, 0 /* String */);
                    if (stringIndexInfo) {
                        stringIndices.push(stringIndexInfo.type);
                        stringIndexReadonly = stringIndexReadonly || stringIndexInfo.isReadonly;
                    }
                    const numberIndexInfo = checker.getIndexInfoOfType(anon2, 1 /* Number */);
                    if (numberIndexInfo) {
                        numberIndices.push(numberIndexInfo.type);
                        numberIndexReadonly = numberIndexReadonly || numberIndexInfo.isReadonly;
                    }
                }
                const members = mapEntries(props, (name, types) => {
                    const isOptional = types.length < anons.length ? 16777216 /* Optional */ : 0;
                    const s = checker.createSymbol(4 /* Property */ | isOptional, name);
                    s.links.type = checker.getUnionType(types);
                    return [name, s];
                });
                const indexInfos = [];
                if (stringIndices.length)
                    indexInfos.push(checker.createIndexInfo(checker.getStringType(), checker.getUnionType(stringIndices), stringIndexReadonly));
                if (numberIndices.length)
                    indexInfos.push(checker.createIndexInfo(checker.getNumberType(), checker.getUnionType(numberIndices), numberIndexReadonly));
                return checker.createAnonymousType(anons[0].symbol, members, calls, constructs, indexInfos);
            }
            function inferTypes(usage) {
                var _a2, _b, _c;
                const types = [];
                if (usage.isNumber) {
                    types.push(checker.getNumberType());
                }
                if (usage.isString) {
                    types.push(checker.getStringType());
                }
                if (usage.isNumberOrString) {
                    types.push(checker.getUnionType([checker.getStringType(), checker.getNumberType()]));
                }
                if (usage.numberIndex) {
                    types.push(checker.createArrayType(combineFromUsage(usage.numberIndex)));
                }
                if (((_a2 = usage.properties) == null ? void 0 : _a2.size) || ((_b = usage.constructs) == null ? void 0 : _b.length) || usage.stringIndex) {
                    types.push(inferStructuralType(usage));
                }
                const candidateTypes = (usage.candidateTypes || []).map((t) => checker.getBaseTypeOfLiteralType(t));
                const callsType = ((_c = usage.calls) == null ? void 0 : _c.length) ? inferStructuralType(usage) : void 0;
                if (callsType && candidateTypes) {
                    types.push(checker.getUnionType([callsType, ...candidateTypes], 2 /* Subtype */));
                }
                else {
                    if (callsType) {
                        types.push(callsType);
                    }
                    if (length(candidateTypes)) {
                        types.push(...candidateTypes);
                    }
                }
                types.push(...inferNamedTypesFromProperties(usage));
                return types;
            }
            function inferStructuralType(usage) {
                const members = /* @__PURE__ */ new Map();
                if (usage.properties) {
                    usage.properties.forEach((u, name) => {
                        const symbol = checker.createSymbol(4 /* Property */, name);
                        symbol.links.type = combineFromUsage(u);
                        members.set(name, symbol);
                    });
                }
                const callSignatures = usage.calls ? [getSignatureFromCalls(usage.calls)] : [];
                const constructSignatures = usage.constructs ? [getSignatureFromCalls(usage.constructs)] : [];
                const indexInfos = usage.stringIndex ? [checker.createIndexInfo(checker.getStringType(), combineFromUsage(usage.stringIndex), 
                    /*isReadonly*/
                    false)] : [];
                return checker.createAnonymousType(
                /*symbol*/
                void 0, members, callSignatures, constructSignatures, indexInfos);
            }
            function inferNamedTypesFromProperties(usage) {
                if (!usage.properties || !usage.properties.size)
                    return [];
                const types = builtins.filter((t) => allPropertiesAreAssignableToUsage(t, usage));
                if (0 < types.length && types.length < 3) {
                    return types.map((t) => inferInstantiationFromUsage(t, usage));
                }
                return [];
            }
            function allPropertiesAreAssignableToUsage(type, usage) {
                if (!usage.properties)
                    return false;
                return !forEachEntry(usage.properties, (propUsage, name) => {
                    const source = checker.getTypeOfPropertyOfType(type, name);
                    if (!source) {
                        return true;
                    }
                    if (propUsage.calls) {
                        const sigs = checker.getSignaturesOfType(source, 0 /* Call */);
                        return !sigs.length || !checker.isTypeAssignableTo(source, getFunctionFromCalls(propUsage.calls));
                    }
                    else {
                        return !checker.isTypeAssignableTo(source, combineFromUsage(propUsage));
                    }
                });
            }
            function inferInstantiationFromUsage(type, usage) {
                if (!(getObjectFlags(type) & 4 /* Reference */) || !usage.properties) {
                    return type;
                }
                const generic = type.target;
                const singleTypeParameter = singleOrUndefined(generic.typeParameters);
                if (!singleTypeParameter)
                    return type;
                const types = [];
                usage.properties.forEach((propUsage, name) => {
                    const genericPropertyType = checker.getTypeOfPropertyOfType(generic, name);
                    Debug.assert(!!genericPropertyType, "generic should have all the properties of its reference.");
                    types.push(...inferTypeParameters(genericPropertyType, combineFromUsage(propUsage), singleTypeParameter));
                });
                return builtinConstructors[type.symbol.escapedName](combineTypes(types));
            }
            function inferTypeParameters(genericType, usageType, typeParameter) {
                if (genericType === typeParameter) {
                    return [usageType];
                }
                else if (genericType.flags & 3145728 /* UnionOrIntersection */) {
                    return flatMap(genericType.types, (t) => inferTypeParameters(t, usageType, typeParameter));
                }
                else if (getObjectFlags(genericType) & 4 /* Reference */ && getObjectFlags(usageType) & 4 /* Reference */) {
                    const genericArgs = checker.getTypeArguments(genericType);
                    const usageArgs = checker.getTypeArguments(usageType);
                    const types = [];
                    if (genericArgs && usageArgs) {
                        for (let i = 0; i < genericArgs.length; i++) {
                            if (usageArgs[i]) {
                                types.push(...inferTypeParameters(genericArgs[i], usageArgs[i], typeParameter));
                            }
                        }
                    }
                    return types;
                }
                const genericSigs = checker.getSignaturesOfType(genericType, 0 /* Call */);
                const usageSigs = checker.getSignaturesOfType(usageType, 0 /* Call */);
                if (genericSigs.length === 1 && usageSigs.length === 1) {
                    return inferFromSignatures(genericSigs[0], usageSigs[0], typeParameter);
                }
                return [];
            }
            function inferFromSignatures(genericSig, usageSig, typeParameter) {
                var _a2;
                const types = [];
                for (let i = 0; i < genericSig.parameters.length; i++) {
                    const genericParam = genericSig.parameters[i];
                    const usageParam = usageSig.parameters[i];
                    const isRest = genericSig.declaration && isRestParameter(genericSig.declaration.parameters[i]);
                    if (!usageParam) {
                        break;
                    }
                    let genericParamType = genericParam.valueDeclaration ? checker.getTypeOfSymbolAtLocation(genericParam, genericParam.valueDeclaration) : checker.getAnyType();
                    const elementType = isRest && checker.getElementTypeOfArrayType(genericParamType);
                    if (elementType) {
                        genericParamType = elementType;
                    }
                    const targetType = ((_a2 = tryCast(usageParam, isTransientSymbol)) == null ? void 0 : _a2.links.type) || (usageParam.valueDeclaration ? checker.getTypeOfSymbolAtLocation(usageParam, usageParam.valueDeclaration) : checker.getAnyType());
                    types.push(...inferTypeParameters(genericParamType, targetType, typeParameter));
                }
                const genericReturn = checker.getReturnTypeOfSignature(genericSig);
                const usageReturn = checker.getReturnTypeOfSignature(usageSig);
                types.push(...inferTypeParameters(genericReturn, usageReturn, typeParameter));
                return types;
            }
            function getFunctionFromCalls(calls) {
                return checker.createAnonymousType(
                /*symbol*/
                void 0, createSymbolTable(), [getSignatureFromCalls(calls)], emptyArray, emptyArray);
            }
            function getSignatureFromCalls(calls) {
                const parameters2 = [];
                const length2 = Math.max(...calls.map((c) => c.argumentTypes.length));
                for (let i = 0; i < length2; i++) {
                    const symbol = checker.createSymbol(1 /* FunctionScopedVariable */, escapeLeadingUnderscores(`arg${i}`));
                    symbol.links.type = combineTypes(calls.map((call) => call.argumentTypes[i] || checker.getUndefinedType()));
                    if (calls.some((call) => call.argumentTypes[i] === void 0)) {
                        symbol.flags |= 16777216 /* Optional */;
                    }
                    parameters2.push(symbol);
                }
                const returnType = combineFromUsage(combineUsages(calls.map((call) => call.return_)));
                return checker.createSignature(
                /*declaration*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*thisParameter*/
                void 0, parameters2, returnType, 
                /*typePredicate*/
                void 0, length2, 0 /* None */);
            }
            function addCandidateType(usage, type) {
                if (type && !(type.flags & 1 /* Any */) && !(type.flags & 131072 /* Never */)) {
                    (usage.candidateTypes || (usage.candidateTypes = [])).push(type);
                }
            }
            function addCandidateThisType(usage, type) {
                if (type && !(type.flags & 1 /* Any */) && !(type.flags & 131072 /* Never */)) {
                    (usage.candidateThisTypes || (usage.candidateThisTypes = [])).push(type);
                }
            }
        }