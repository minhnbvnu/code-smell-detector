function transformES2017(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, resumeLexicalEnvironment, endLexicalEnvironment, hoistVariableDeclaration } = context;
            const resolver = context.getEmitResolver();
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            let enabledSubstitutions;
            let enclosingSuperContainerFlags = 0;
            let enclosingFunctionParameterNames;
            let capturedSuperProperties;
            let hasSuperElementAccess;
            const substitutedSuperAccessors = [];
            let contextFlags = 0 /* None */;
            const previousOnEmitNode = context.onEmitNode;
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onEmitNode = onEmitNode;
            context.onSubstituteNode = onSubstituteNode;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                setContextFlag(1 /* NonTopLevel */, false);
                setContextFlag(2 /* HasLexicalThis */, !isEffectiveStrictModeSourceFile(node, compilerOptions));
                const visited = visitEachChild(node, visitor, context);
                addEmitHelpers(visited, context.readEmitHelpers());
                return visited;
            }
            function setContextFlag(flag, val) {
                contextFlags = val ? contextFlags | flag : contextFlags & ~flag;
            }
            function inContext(flags) {
                return (contextFlags & flags) !== 0;
            }
            function inTopLevelContext() {
                return !inContext(1 /* NonTopLevel */);
            }
            function inHasLexicalThisContext() {
                return inContext(2 /* HasLexicalThis */);
            }
            function doWithContext(flags, cb, value) {
                const contextFlagsToSet = flags & ~contextFlags;
                if (contextFlagsToSet) {
                    setContextFlag(contextFlagsToSet, 
                    /*val*/
                    true);
                    const result = cb(value);
                    setContextFlag(contextFlagsToSet, 
                    /*val*/
                    false);
                    return result;
                }
                return cb(value);
            }
            function visitDefault(node) {
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                if ((node.transformFlags & 256 /* ContainsES2017 */) === 0) {
                    return node;
                }
                switch (node.kind) {
                    case 132 /* AsyncKeyword */:
                        return void 0;
                    case 220 /* AwaitExpression */:
                        return visitAwaitExpression(node);
                    case 171 /* MethodDeclaration */:
                        return doWithContext(1 /* NonTopLevel */ | 2 /* HasLexicalThis */, visitMethodDeclaration, node);
                    case 259 /* FunctionDeclaration */:
                        return doWithContext(1 /* NonTopLevel */ | 2 /* HasLexicalThis */, visitFunctionDeclaration, node);
                    case 215 /* FunctionExpression */:
                        return doWithContext(1 /* NonTopLevel */ | 2 /* HasLexicalThis */, visitFunctionExpression, node);
                    case 216 /* ArrowFunction */:
                        return doWithContext(1 /* NonTopLevel */, visitArrowFunction, node);
                    case 208 /* PropertyAccessExpression */:
                        if (capturedSuperProperties && isPropertyAccessExpression(node) && node.expression.kind === 106 /* SuperKeyword */) {
                            capturedSuperProperties.add(node.name.escapedText);
                        }
                        return visitEachChild(node, visitor, context);
                    case 209 /* ElementAccessExpression */:
                        if (capturedSuperProperties && node.expression.kind === 106 /* SuperKeyword */) {
                            hasSuperElementAccess = true;
                        }
                        return visitEachChild(node, visitor, context);
                    case 174 /* GetAccessor */:
                        return doWithContext(1 /* NonTopLevel */ | 2 /* HasLexicalThis */, visitGetAccessorDeclaration, node);
                    case 175 /* SetAccessor */:
                        return doWithContext(1 /* NonTopLevel */ | 2 /* HasLexicalThis */, visitSetAccessorDeclaration, node);
                    case 173 /* Constructor */:
                        return doWithContext(1 /* NonTopLevel */ | 2 /* HasLexicalThis */, visitConstructorDeclaration, node);
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return doWithContext(1 /* NonTopLevel */ | 2 /* HasLexicalThis */, visitDefault, node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function asyncBodyVisitor(node) {
                if (isNodeWithPossibleHoistedDeclaration(node)) {
                    switch (node.kind) {
                        case 240 /* VariableStatement */:
                            return visitVariableStatementInAsyncBody(node);
                        case 245 /* ForStatement */:
                            return visitForStatementInAsyncBody(node);
                        case 246 /* ForInStatement */:
                            return visitForInStatementInAsyncBody(node);
                        case 247 /* ForOfStatement */:
                            return visitForOfStatementInAsyncBody(node);
                        case 295 /* CatchClause */:
                            return visitCatchClauseInAsyncBody(node);
                        case 238 /* Block */:
                        case 252 /* SwitchStatement */:
                        case 266 /* CaseBlock */:
                        case 292 /* CaseClause */:
                        case 293 /* DefaultClause */:
                        case 255 /* TryStatement */:
                        case 243 /* DoStatement */:
                        case 244 /* WhileStatement */:
                        case 242 /* IfStatement */:
                        case 251 /* WithStatement */:
                        case 253 /* LabeledStatement */:
                            return visitEachChild(node, asyncBodyVisitor, context);
                        default:
                            return Debug.assertNever(node, "Unhandled node.");
                    }
                }
                return visitor(node);
            }
            function visitCatchClauseInAsyncBody(node) {
                const catchClauseNames = /* @__PURE__ */ new Set();
                recordDeclarationName(node.variableDeclaration, catchClauseNames);
                let catchClauseUnshadowedNames;
                catchClauseNames.forEach((_, escapedName) => {
                    if (enclosingFunctionParameterNames.has(escapedName)) {
                        if (!catchClauseUnshadowedNames) {
                            catchClauseUnshadowedNames = new Set(enclosingFunctionParameterNames);
                        }
                        catchClauseUnshadowedNames.delete(escapedName);
                    }
                });
                if (catchClauseUnshadowedNames) {
                    const savedEnclosingFunctionParameterNames = enclosingFunctionParameterNames;
                    enclosingFunctionParameterNames = catchClauseUnshadowedNames;
                    const result = visitEachChild(node, asyncBodyVisitor, context);
                    enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
                    return result;
                }
                else {
                    return visitEachChild(node, asyncBodyVisitor, context);
                }
            }
            function visitVariableStatementInAsyncBody(node) {
                if (isVariableDeclarationListWithCollidingName(node.declarationList)) {
                    const expression = visitVariableDeclarationListWithCollidingNames(node.declarationList, 
                    /*hasReceiver*/
                    false);
                    return expression ? factory2.createExpressionStatement(expression) : void 0;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitForInStatementInAsyncBody(node) {
                return factory2.updateForInStatement(node, isVariableDeclarationListWithCollidingName(node.initializer) ? visitVariableDeclarationListWithCollidingNames(node.initializer, 
                /*hasReceiver*/
                true) : Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), visitIterationBody(node.statement, asyncBodyVisitor, context));
            }
            function visitForOfStatementInAsyncBody(node) {
                return factory2.updateForOfStatement(node, visitNode(node.awaitModifier, visitor, isAwaitKeyword), isVariableDeclarationListWithCollidingName(node.initializer) ? visitVariableDeclarationListWithCollidingNames(node.initializer, 
                /*hasReceiver*/
                true) : Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), visitIterationBody(node.statement, asyncBodyVisitor, context));
            }
            function visitForStatementInAsyncBody(node) {
                const initializer = node.initializer;
                return factory2.updateForStatement(node, isVariableDeclarationListWithCollidingName(initializer) ? visitVariableDeclarationListWithCollidingNames(initializer, 
                /*hasReceiver*/
                false) : visitNode(node.initializer, visitor, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, visitor, isExpression), visitIterationBody(node.statement, asyncBodyVisitor, context));
            }
            function visitAwaitExpression(node) {
                if (inTopLevelContext()) {
                    return visitEachChild(node, visitor, context);
                }
                return setOriginalNode(setTextRange(factory2.createYieldExpression(
                /*asteriskToken*/
                void 0, visitNode(node.expression, visitor, isExpression)), node), node);
            }
            function visitConstructorDeclaration(node) {
                return factory2.updateConstructorDeclaration(node, visitNodes2(node.modifiers, visitor, isModifier), visitParameterList(node.parameters, visitor, context), transformMethodBody(node));
            }
            function visitMethodDeclaration(node) {
                return factory2.updateMethodDeclaration(node, visitNodes2(node.modifiers, visitor, isModifierLike), node.asteriskToken, node.name, 
                /*questionToken*/
                void 0, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, getFunctionFlags(node) & 2 /* Async */ ? transformAsyncFunctionBody(node) : transformMethodBody(node));
            }
            function visitGetAccessorDeclaration(node) {
                return factory2.updateGetAccessorDeclaration(node, visitNodes2(node.modifiers, visitor, isModifierLike), node.name, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, transformMethodBody(node));
            }
            function visitSetAccessorDeclaration(node) {
                return factory2.updateSetAccessorDeclaration(node, visitNodes2(node.modifiers, visitor, isModifierLike), node.name, visitParameterList(node.parameters, visitor, context), transformMethodBody(node));
            }
            function visitFunctionDeclaration(node) {
                return factory2.updateFunctionDeclaration(node, visitNodes2(node.modifiers, visitor, isModifierLike), node.asteriskToken, node.name, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, getFunctionFlags(node) & 2 /* Async */ ? transformAsyncFunctionBody(node) : visitFunctionBody(node.body, visitor, context));
            }
            function visitFunctionExpression(node) {
                return factory2.updateFunctionExpression(node, visitNodes2(node.modifiers, visitor, isModifier), node.asteriskToken, node.name, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, getFunctionFlags(node) & 2 /* Async */ ? transformAsyncFunctionBody(node) : visitFunctionBody(node.body, visitor, context));
            }
            function visitArrowFunction(node) {
                return factory2.updateArrowFunction(node, visitNodes2(node.modifiers, visitor, isModifier), 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, node.equalsGreaterThanToken, getFunctionFlags(node) & 2 /* Async */ ? transformAsyncFunctionBody(node) : visitFunctionBody(node.body, visitor, context));
            }
            function recordDeclarationName({ name }, names) {
                if (isIdentifier(name)) {
                    names.add(name.escapedText);
                }
                else {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element)) {
                            recordDeclarationName(element, names);
                        }
                    }
                }
            }
            function isVariableDeclarationListWithCollidingName(node) {
                return !!node && isVariableDeclarationList(node) && !(node.flags & 3 /* BlockScoped */) && node.declarations.some(collidesWithParameterName);
            }
            function visitVariableDeclarationListWithCollidingNames(node, hasReceiver) {
                hoistVariableDeclarationList(node);
                const variables = getInitializedVariables(node);
                if (variables.length === 0) {
                    if (hasReceiver) {
                        return visitNode(factory2.converters.convertToAssignmentElementTarget(node.declarations[0].name), visitor, isExpression);
                    }
                    return void 0;
                }
                return factory2.inlineExpressions(map(variables, transformInitializedVariable));
            }
            function hoistVariableDeclarationList(node) {
                forEach(node.declarations, hoistVariable);
            }
            function hoistVariable({ name }) {
                if (isIdentifier(name)) {
                    hoistVariableDeclaration(name);
                }
                else {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element)) {
                            hoistVariable(element);
                        }
                    }
                }
            }
            function transformInitializedVariable(node) {
                const converted = setSourceMapRange(factory2.createAssignment(factory2.converters.convertToAssignmentElementTarget(node.name), node.initializer), node);
                return Debug.checkDefined(visitNode(converted, visitor, isExpression));
            }
            function collidesWithParameterName({ name }) {
                if (isIdentifier(name)) {
                    return enclosingFunctionParameterNames.has(name.escapedText);
                }
                else {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element) && collidesWithParameterName(element)) {
                            return true;
                        }
                    }
                }
                return false;
            }
            function transformMethodBody(node) {
                Debug.assertIsDefined(node.body);
                const savedCapturedSuperProperties = capturedSuperProperties;
                const savedHasSuperElementAccess = hasSuperElementAccess;
                capturedSuperProperties = /* @__PURE__ */ new Set();
                hasSuperElementAccess = false;
                let updated = visitFunctionBody(node.body, visitor, context);
                const originalMethod = getOriginalNode(node, isFunctionLikeDeclaration);
                const emitSuperHelpers = languageVersion >= 2 /* ES2015 */ && resolver.getNodeCheckFlags(node) & (256 /* MethodWithSuperPropertyAssignmentInAsync */ | 128 /* MethodWithSuperPropertyAccessInAsync */) && (getFunctionFlags(originalMethod) & 3 /* AsyncGenerator */) !== 3 /* AsyncGenerator */;
                if (emitSuperHelpers) {
                    enableSubstitutionForAsyncMethodsWithSuper();
                    if (capturedSuperProperties.size) {
                        const variableStatement = createSuperAccessVariableStatement(factory2, resolver, node, capturedSuperProperties);
                        substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                        const statements = updated.statements.slice();
                        insertStatementsAfterStandardPrologue(statements, [variableStatement]);
                        updated = factory2.updateBlock(updated, statements);
                    }
                    if (hasSuperElementAccess) {
                        if (resolver.getNodeCheckFlags(node) & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                            addEmitHelper(updated, advancedAsyncSuperHelper);
                        }
                        else if (resolver.getNodeCheckFlags(node) & 128 /* MethodWithSuperPropertyAccessInAsync */) {
                            addEmitHelper(updated, asyncSuperHelper);
                        }
                    }
                }
                capturedSuperProperties = savedCapturedSuperProperties;
                hasSuperElementAccess = savedHasSuperElementAccess;
                return updated;
            }
            function transformAsyncFunctionBody(node) {
                resumeLexicalEnvironment();
                const original = getOriginalNode(node, isFunctionLike);
                const nodeType = original.type;
                const promiseConstructor = languageVersion < 2 /* ES2015 */ ? getPromiseConstructor(nodeType) : void 0;
                const isArrowFunction2 = node.kind === 216 /* ArrowFunction */;
                const hasLexicalArguments = (resolver.getNodeCheckFlags(node) & 512 /* CaptureArguments */) !== 0;
                const savedEnclosingFunctionParameterNames = enclosingFunctionParameterNames;
                enclosingFunctionParameterNames = /* @__PURE__ */ new Set();
                for (const parameter of node.parameters) {
                    recordDeclarationName(parameter, enclosingFunctionParameterNames);
                }
                const savedCapturedSuperProperties = capturedSuperProperties;
                const savedHasSuperElementAccess = hasSuperElementAccess;
                if (!isArrowFunction2) {
                    capturedSuperProperties = /* @__PURE__ */ new Set();
                    hasSuperElementAccess = false;
                }
                let result;
                if (!isArrowFunction2) {
                    const statements = [];
                    const statementOffset = factory2.copyPrologue(node.body.statements, statements, 
                    /*ensureUseStrict*/
                    false, visitor);
                    statements.push(factory2.createReturnStatement(emitHelpers().createAwaiterHelper(inHasLexicalThisContext(), hasLexicalArguments, promiseConstructor, transformAsyncFunctionBodyWorker(node.body, statementOffset))));
                    insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                    const emitSuperHelpers = languageVersion >= 2 /* ES2015 */ && resolver.getNodeCheckFlags(node) & (256 /* MethodWithSuperPropertyAssignmentInAsync */ | 128 /* MethodWithSuperPropertyAccessInAsync */);
                    if (emitSuperHelpers) {
                        enableSubstitutionForAsyncMethodsWithSuper();
                        if (capturedSuperProperties.size) {
                            const variableStatement = createSuperAccessVariableStatement(factory2, resolver, node, capturedSuperProperties);
                            substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                            insertStatementsAfterStandardPrologue(statements, [variableStatement]);
                        }
                    }
                    const block = factory2.createBlock(statements, 
                    /*multiLine*/
                    true);
                    setTextRange(block, node.body);
                    if (emitSuperHelpers && hasSuperElementAccess) {
                        if (resolver.getNodeCheckFlags(node) & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                            addEmitHelper(block, advancedAsyncSuperHelper);
                        }
                        else if (resolver.getNodeCheckFlags(node) & 128 /* MethodWithSuperPropertyAccessInAsync */) {
                            addEmitHelper(block, asyncSuperHelper);
                        }
                    }
                    result = block;
                }
                else {
                    const expression = emitHelpers().createAwaiterHelper(inHasLexicalThisContext(), hasLexicalArguments, promiseConstructor, transformAsyncFunctionBodyWorker(node.body));
                    const declarations = endLexicalEnvironment();
                    if (some(declarations)) {
                        const block = factory2.converters.convertToFunctionBlock(expression);
                        result = factory2.updateBlock(block, setTextRange(factory2.createNodeArray(concatenate(declarations, block.statements)), block.statements));
                    }
                    else {
                        result = expression;
                    }
                }
                enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
                if (!isArrowFunction2) {
                    capturedSuperProperties = savedCapturedSuperProperties;
                    hasSuperElementAccess = savedHasSuperElementAccess;
                }
                return result;
            }
            function transformAsyncFunctionBodyWorker(body, start) {
                if (isBlock(body)) {
                    return factory2.updateBlock(body, visitNodes2(body.statements, asyncBodyVisitor, isStatement, start));
                }
                else {
                    return factory2.converters.convertToFunctionBlock(Debug.checkDefined(visitNode(body, asyncBodyVisitor, isConciseBody)));
                }
            }
            function getPromiseConstructor(type) {
                const typeName = type && getEntityNameFromTypeNode(type);
                if (typeName && isEntityName(typeName)) {
                    const serializationKind = resolver.getTypeReferenceSerializationKind(typeName);
                    if (serializationKind === 1 /* TypeWithConstructSignatureAndValue */ || serializationKind === 0 /* Unknown */) {
                        return typeName;
                    }
                }
                return void 0;
            }
            function enableSubstitutionForAsyncMethodsWithSuper() {
                if ((enabledSubstitutions & 1 /* AsyncMethodsWithSuper */) === 0) {
                    enabledSubstitutions |= 1 /* AsyncMethodsWithSuper */;
                    context.enableSubstitution(210 /* CallExpression */);
                    context.enableSubstitution(208 /* PropertyAccessExpression */);
                    context.enableSubstitution(209 /* ElementAccessExpression */);
                    context.enableEmitNotification(260 /* ClassDeclaration */);
                    context.enableEmitNotification(171 /* MethodDeclaration */);
                    context.enableEmitNotification(174 /* GetAccessor */);
                    context.enableEmitNotification(175 /* SetAccessor */);
                    context.enableEmitNotification(173 /* Constructor */);
                    context.enableEmitNotification(240 /* VariableStatement */);
                }
            }
            function onEmitNode(hint, node, emitCallback) {
                if (enabledSubstitutions & 1 /* AsyncMethodsWithSuper */ && isSuperContainer(node)) {
                    const superContainerFlags = resolver.getNodeCheckFlags(node) & (128 /* MethodWithSuperPropertyAccessInAsync */ | 256 /* MethodWithSuperPropertyAssignmentInAsync */);
                    if (superContainerFlags !== enclosingSuperContainerFlags) {
                        const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                        enclosingSuperContainerFlags = superContainerFlags;
                        previousOnEmitNode(hint, node, emitCallback);
                        enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                        return;
                    }
                }
                else if (enabledSubstitutions && substitutedSuperAccessors[getNodeId(node)]) {
                    const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                    enclosingSuperContainerFlags = 0;
                    previousOnEmitNode(hint, node, emitCallback);
                    enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                    return;
                }
                previousOnEmitNode(hint, node, emitCallback);
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (hint === 1 /* Expression */ && enclosingSuperContainerFlags) {
                    return substituteExpression(node);
                }
                return node;
            }
            function substituteExpression(node) {
                switch (node.kind) {
                    case 208 /* PropertyAccessExpression */:
                        return substitutePropertyAccessExpression(node);
                    case 209 /* ElementAccessExpression */:
                        return substituteElementAccessExpression(node);
                    case 210 /* CallExpression */:
                        return substituteCallExpression(node);
                }
                return node;
            }
            function substitutePropertyAccessExpression(node) {
                if (node.expression.kind === 106 /* SuperKeyword */) {
                    return setTextRange(factory2.createPropertyAccessExpression(factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */), node.name), node);
                }
                return node;
            }
            function substituteElementAccessExpression(node) {
                if (node.expression.kind === 106 /* SuperKeyword */) {
                    return createSuperElementAccessInAsyncMethod(node.argumentExpression, node);
                }
                return node;
            }
            function substituteCallExpression(node) {
                const expression = node.expression;
                if (isSuperProperty(expression)) {
                    const argumentExpression = isPropertyAccessExpression(expression) ? substitutePropertyAccessExpression(expression) : substituteElementAccessExpression(expression);
                    return factory2.createCallExpression(factory2.createPropertyAccessExpression(argumentExpression, "call"), 
                    /*typeArguments*/
                    void 0, [
                        factory2.createThis(),
                        ...node.arguments
                    ]);
                }
                return node;
            }
            function isSuperContainer(node) {
                const kind = node.kind;
                return kind === 260 /* ClassDeclaration */ || kind === 173 /* Constructor */ || kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */;
            }
            function createSuperElementAccessInAsyncMethod(argumentExpression, location) {
                if (enclosingSuperContainerFlags & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                    return setTextRange(factory2.createPropertyAccessExpression(factory2.createCallExpression(factory2.createUniqueName("_superIndex", 16 /* Optimistic */ | 32 /* FileLevel */), 
                    /*typeArguments*/
                    void 0, [argumentExpression]), "value"), location);
                }
                else {
                    return setTextRange(factory2.createCallExpression(factory2.createUniqueName("_superIndex", 16 /* Optimistic */ | 32 /* FileLevel */), 
                    /*typeArguments*/
                    void 0, [argumentExpression]), location);
                }
            }
        }