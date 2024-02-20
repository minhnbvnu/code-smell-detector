function transformES2018(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, resumeLexicalEnvironment, endLexicalEnvironment, hoistVariableDeclaration } = context;
            const resolver = context.getEmitResolver();
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const previousOnEmitNode = context.onEmitNode;
            context.onEmitNode = onEmitNode;
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onSubstituteNode = onSubstituteNode;
            let exportedVariableStatement = false;
            let enabledSubstitutions;
            let enclosingFunctionFlags;
            let parametersWithPrecedingObjectRestOrSpread;
            let enclosingSuperContainerFlags = 0;
            let hierarchyFacts = 0;
            let currentSourceFile;
            let taggedTemplateStringDeclarations;
            let capturedSuperProperties;
            let hasSuperElementAccess;
            const substitutedSuperAccessors = [];
            return chainBundle(context, transformSourceFile);
            function affectsSubtree(excludeFacts, includeFacts) {
                return hierarchyFacts !== (hierarchyFacts & ~excludeFacts | includeFacts);
            }
            function enterSubtree(excludeFacts, includeFacts) {
                const ancestorFacts = hierarchyFacts;
                hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & 3 /* AncestorFactsMask */;
                return ancestorFacts;
            }
            function exitSubtree(ancestorFacts) {
                hierarchyFacts = ancestorFacts;
            }
            function recordTaggedTemplateString(temp) {
                taggedTemplateStringDeclarations = append(taggedTemplateStringDeclarations, factory2.createVariableDeclaration(temp));
            }
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                currentSourceFile = node;
                const visited = visitSourceFile(node);
                addEmitHelpers(visited, context.readEmitHelpers());
                currentSourceFile = void 0;
                taggedTemplateStringDeclarations = void 0;
                return visited;
            }
            function visitor(node) {
                return visitorWorker(node, 
                /*expressionResultIsUnused*/
                false);
            }
            function visitorWithUnusedExpressionResult(node) {
                return visitorWorker(node, 
                /*expressionResultIsUnused*/
                true);
            }
            function visitorNoAsyncModifier(node) {
                if (node.kind === 132 /* AsyncKeyword */) {
                    return void 0;
                }
                return node;
            }
            function doWithHierarchyFacts(cb, value, excludeFacts, includeFacts) {
                if (affectsSubtree(excludeFacts, includeFacts)) {
                    const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
                    const result = cb(value);
                    exitSubtree(ancestorFacts);
                    return result;
                }
                return cb(value);
            }
            function visitDefault(node) {
                return visitEachChild(node, visitor, context);
            }
            function visitorWorker(node, expressionResultIsUnused2) {
                if ((node.transformFlags & 128 /* ContainsES2018 */) === 0) {
                    return node;
                }
                switch (node.kind) {
                    case 220 /* AwaitExpression */:
                        return visitAwaitExpression(node);
                    case 226 /* YieldExpression */:
                        return visitYieldExpression(node);
                    case 250 /* ReturnStatement */:
                        return visitReturnStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node, expressionResultIsUnused2);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node, expressionResultIsUnused2);
                    case 295 /* CatchClause */:
                        return visitCatchClause(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                    case 246 /* ForInStatement */:
                        return doWithHierarchyFacts(visitDefault, node, 0 /* IterationStatementExcludes */, 2 /* IterationStatementIncludes */);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 245 /* ForStatement */:
                        return doWithHierarchyFacts(visitForStatement, node, 0 /* IterationStatementExcludes */, 2 /* IterationStatementIncludes */);
                    case 219 /* VoidExpression */:
                        return visitVoidExpression(node);
                    case 173 /* Constructor */:
                        return doWithHierarchyFacts(visitConstructorDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 171 /* MethodDeclaration */:
                        return doWithHierarchyFacts(visitMethodDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 174 /* GetAccessor */:
                        return doWithHierarchyFacts(visitGetAccessorDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 175 /* SetAccessor */:
                        return doWithHierarchyFacts(visitSetAccessorDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 259 /* FunctionDeclaration */:
                        return doWithHierarchyFacts(visitFunctionDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 215 /* FunctionExpression */:
                        return doWithHierarchyFacts(visitFunctionExpression, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 216 /* ArrowFunction */:
                        return doWithHierarchyFacts(visitArrowFunction, node, 2 /* ArrowFunctionExcludes */, 0 /* ArrowFunctionIncludes */);
                    case 166 /* Parameter */:
                        return visitParameter(node);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, expressionResultIsUnused2);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
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
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return doWithHierarchyFacts(visitDefault, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitAwaitExpression(node) {
                if (enclosingFunctionFlags & 2 /* Async */ && enclosingFunctionFlags & 1 /* Generator */) {
                    return setOriginalNode(setTextRange(factory2.createYieldExpression(
                    /*asteriskToken*/
                    void 0, emitHelpers().createAwaitHelper(visitNode(node.expression, visitor, isExpression))), 
                    /*location*/
                    node), node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitYieldExpression(node) {
                if (enclosingFunctionFlags & 2 /* Async */ && enclosingFunctionFlags & 1 /* Generator */) {
                    if (node.asteriskToken) {
                        const expression = visitNode(Debug.checkDefined(node.expression), visitor, isExpression);
                        return setOriginalNode(setTextRange(factory2.createYieldExpression(
                        /*asteriskToken*/
                        void 0, emitHelpers().createAwaitHelper(factory2.updateYieldExpression(node, node.asteriskToken, setTextRange(emitHelpers().createAsyncDelegatorHelper(setTextRange(emitHelpers().createAsyncValuesHelper(expression), expression)), expression)))), node), node);
                    }
                    return setOriginalNode(setTextRange(factory2.createYieldExpression(
                    /*asteriskToken*/
                    void 0, createDownlevelAwait(node.expression ? visitNode(node.expression, visitor, isExpression) : factory2.createVoidZero())), node), node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitReturnStatement(node) {
                if (enclosingFunctionFlags & 2 /* Async */ && enclosingFunctionFlags & 1 /* Generator */) {
                    return factory2.updateReturnStatement(node, createDownlevelAwait(node.expression ? visitNode(node.expression, visitor, isExpression) : factory2.createVoidZero()));
                }
                return visitEachChild(node, visitor, context);
            }
            function visitLabeledStatement(node) {
                if (enclosingFunctionFlags & 2 /* Async */) {
                    const statement = unwrapInnermostStatementOfLabel(node);
                    if (statement.kind === 247 /* ForOfStatement */ && statement.awaitModifier) {
                        return visitForOfStatement(statement, node);
                    }
                    return factory2.restoreEnclosingLabel(visitNode(statement, visitor, isStatement, factory2.liftToBlock), node);
                }
                return visitEachChild(node, visitor, context);
            }
            function chunkObjectLiteralElements(elements) {
                let chunkObject;
                const objects = [];
                for (const e of elements) {
                    if (e.kind === 301 /* SpreadAssignment */) {
                        if (chunkObject) {
                            objects.push(factory2.createObjectLiteralExpression(chunkObject));
                            chunkObject = void 0;
                        }
                        const target = e.expression;
                        objects.push(visitNode(target, visitor, isExpression));
                    }
                    else {
                        chunkObject = append(chunkObject, e.kind === 299 /* PropertyAssignment */ ? factory2.createPropertyAssignment(e.name, visitNode(e.initializer, visitor, isExpression)) : visitNode(e, visitor, isObjectLiteralElementLike));
                    }
                }
                if (chunkObject) {
                    objects.push(factory2.createObjectLiteralExpression(chunkObject));
                }
                return objects;
            }
            function visitObjectLiteralExpression(node) {
                if (node.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                    const objects = chunkObjectLiteralElements(node.properties);
                    if (objects.length && objects[0].kind !== 207 /* ObjectLiteralExpression */) {
                        objects.unshift(factory2.createObjectLiteralExpression());
                    }
                    let expression = objects[0];
                    if (objects.length > 1) {
                        for (let i = 1; i < objects.length; i++) {
                            expression = emitHelpers().createAssignHelper([expression, objects[i]]);
                        }
                        return expression;
                    }
                    else {
                        return emitHelpers().createAssignHelper(objects);
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitExpressionStatement(node) {
                return visitEachChild(node, visitorWithUnusedExpressionResult, context);
            }
            function visitParenthesizedExpression(node, expressionResultIsUnused2) {
                return visitEachChild(node, expressionResultIsUnused2 ? visitorWithUnusedExpressionResult : visitor, context);
            }
            function visitSourceFile(node) {
                const ancestorFacts = enterSubtree(2 /* SourceFileExcludes */, isEffectiveStrictModeSourceFile(node, compilerOptions) ? 0 /* StrictModeSourceFileIncludes */ : 1 /* SourceFileIncludes */);
                exportedVariableStatement = false;
                const visited = visitEachChild(node, visitor, context);
                const statement = concatenate(visited.statements, taggedTemplateStringDeclarations && [
                    factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(taggedTemplateStringDeclarations))
                ]);
                const result = factory2.updateSourceFile(visited, setTextRange(factory2.createNodeArray(statement), node.statements));
                exitSubtree(ancestorFacts);
                return result;
            }
            function visitTaggedTemplateExpression(node) {
                return processTaggedTemplateExpression(context, node, visitor, currentSourceFile, recordTaggedTemplateString, 0 /* LiftRestriction */);
            }
            function visitBinaryExpression(node, expressionResultIsUnused2) {
                if (isDestructuringAssignment(node) && containsObjectRestOrSpread(node.left)) {
                    return flattenDestructuringAssignment(node, visitor, context, 1 /* ObjectRest */, !expressionResultIsUnused2);
                }
                if (node.operatorToken.kind === 27 /* CommaToken */) {
                    return factory2.updateBinaryExpression(node, visitNode(node.left, visitorWithUnusedExpressionResult, isExpression), node.operatorToken, visitNode(node.right, expressionResultIsUnused2 ? visitorWithUnusedExpressionResult : visitor, isExpression));
                }
                return visitEachChild(node, visitor, context);
            }
            function visitCommaListExpression(node, expressionResultIsUnused2) {
                if (expressionResultIsUnused2) {
                    return visitEachChild(node, visitorWithUnusedExpressionResult, context);
                }
                let result;
                for (let i = 0; i < node.elements.length; i++) {
                    const element = node.elements[i];
                    const visited = visitNode(element, i < node.elements.length - 1 ? visitorWithUnusedExpressionResult : visitor, isExpression);
                    if (result || visited !== element) {
                        result || (result = node.elements.slice(0, i));
                        result.push(visited);
                    }
                }
                const elements = result ? setTextRange(factory2.createNodeArray(result), node.elements) : node.elements;
                return factory2.updateCommaListExpression(node, elements);
            }
            function visitCatchClause(node) {
                if (node.variableDeclaration && isBindingPattern(node.variableDeclaration.name) && node.variableDeclaration.name.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                    const name = factory2.getGeneratedNameForNode(node.variableDeclaration.name);
                    const updatedDecl = factory2.updateVariableDeclaration(node.variableDeclaration, node.variableDeclaration.name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, name);
                    const visitedBindings = flattenDestructuringBinding(updatedDecl, visitor, context, 1 /* ObjectRest */);
                    let block = visitNode(node.block, visitor, isBlock);
                    if (some(visitedBindings)) {
                        block = factory2.updateBlock(block, [
                            factory2.createVariableStatement(
                            /*modifiers*/
                            void 0, visitedBindings),
                            ...block.statements
                        ]);
                    }
                    return factory2.updateCatchClause(node, factory2.updateVariableDeclaration(node.variableDeclaration, name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0), block);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitVariableStatement(node) {
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    const savedExportedVariableStatement = exportedVariableStatement;
                    exportedVariableStatement = true;
                    const visited = visitEachChild(node, visitor, context);
                    exportedVariableStatement = savedExportedVariableStatement;
                    return visited;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitVariableDeclaration(node) {
                if (exportedVariableStatement) {
                    const savedExportedVariableStatement = exportedVariableStatement;
                    exportedVariableStatement = false;
                    const visited = visitVariableDeclarationWorker(node, 
                    /*exportedVariableStatement*/
                    true);
                    exportedVariableStatement = savedExportedVariableStatement;
                    return visited;
                }
                return visitVariableDeclarationWorker(node, 
                /*exportedVariableStatement*/
                false);
            }
            function visitVariableDeclarationWorker(node, exportedVariableStatement2) {
                if (isBindingPattern(node.name) && node.name.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                    return flattenDestructuringBinding(node, visitor, context, 1 /* ObjectRest */, 
                    /*rval*/
                    void 0, exportedVariableStatement2);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitForStatement(node) {
                return factory2.updateForStatement(node, visitNode(node.initializer, visitorWithUnusedExpressionResult, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, visitorWithUnusedExpressionResult, isExpression), visitIterationBody(node.statement, visitor, context));
            }
            function visitVoidExpression(node) {
                return visitEachChild(node, visitorWithUnusedExpressionResult, context);
            }
            function visitForOfStatement(node, outermostLabeledStatement) {
                const ancestorFacts = enterSubtree(0 /* IterationStatementExcludes */, 2 /* IterationStatementIncludes */);
                if (node.initializer.transformFlags & 65536 /* ContainsObjectRestOrSpread */ || isAssignmentPattern(node.initializer) && containsObjectRestOrSpread(node.initializer)) {
                    node = transformForOfStatementWithObjectRest(node);
                }
                const result = node.awaitModifier ? transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts) : factory2.restoreEnclosingLabel(visitEachChild(node, visitor, context), outermostLabeledStatement);
                exitSubtree(ancestorFacts);
                return result;
            }
            function transformForOfStatementWithObjectRest(node) {
                const initializerWithoutParens = skipParentheses(node.initializer);
                if (isVariableDeclarationList(initializerWithoutParens) || isAssignmentPattern(initializerWithoutParens)) {
                    let bodyLocation;
                    let statementsLocation;
                    const temp = factory2.createTempVariable(
                    /*recordTempVariable*/
                    void 0);
                    const statements = [createForOfBindingStatement(factory2, initializerWithoutParens, temp)];
                    if (isBlock(node.statement)) {
                        addRange(statements, node.statement.statements);
                        bodyLocation = node.statement;
                        statementsLocation = node.statement.statements;
                    }
                    else if (node.statement) {
                        append(statements, node.statement);
                        bodyLocation = node.statement;
                        statementsLocation = node.statement;
                    }
                    return factory2.updateForOfStatement(node, node.awaitModifier, setTextRange(factory2.createVariableDeclarationList([
                        setTextRange(factory2.createVariableDeclaration(temp), node.initializer)
                    ], 1 /* Let */), node.initializer), node.expression, setTextRange(factory2.createBlock(setTextRange(factory2.createNodeArray(statements), statementsLocation), 
                    /*multiLine*/
                    true), bodyLocation));
                }
                return node;
            }
            function convertForOfStatementHead(node, boundValue, nonUserCode) {
                const value = factory2.createTempVariable(hoistVariableDeclaration);
                const iteratorValueExpression = factory2.createAssignment(value, boundValue);
                const iteratorValueStatement = factory2.createExpressionStatement(iteratorValueExpression);
                setSourceMapRange(iteratorValueStatement, node.expression);
                const exitNonUserCodeExpression = factory2.createAssignment(nonUserCode, factory2.createFalse());
                const exitNonUserCodeStatement = factory2.createExpressionStatement(exitNonUserCodeExpression);
                setSourceMapRange(exitNonUserCodeStatement, node.expression);
                const enterNonUserCodeExpression = factory2.createAssignment(nonUserCode, factory2.createTrue());
                const enterNonUserCodeStatement = factory2.createExpressionStatement(enterNonUserCodeExpression);
                setSourceMapRange(exitNonUserCodeStatement, node.expression);
                const statements = [];
                const binding = createForOfBindingStatement(factory2, node.initializer, value);
                statements.push(visitNode(binding, visitor, isStatement));
                let bodyLocation;
                let statementsLocation;
                const statement = visitIterationBody(node.statement, visitor, context);
                if (isBlock(statement)) {
                    addRange(statements, statement.statements);
                    bodyLocation = statement;
                    statementsLocation = statement.statements;
                }
                else {
                    statements.push(statement);
                }
                const body = setEmitFlags(setTextRange(factory2.createBlock(setTextRange(factory2.createNodeArray(statements), statementsLocation), 
                /*multiLine*/
                true), bodyLocation), 96 /* NoSourceMap */ | 768 /* NoTokenSourceMaps */);
                return factory2.createBlock([
                    iteratorValueStatement,
                    exitNonUserCodeStatement,
                    factory2.createTryStatement(body, 
                    /*catchClause*/
                    void 0, factory2.createBlock([
                        enterNonUserCodeStatement
                    ]))
                ]);
            }
            function createDownlevelAwait(expression) {
                return enclosingFunctionFlags & 1 /* Generator */ ? factory2.createYieldExpression(
                /*asteriskToken*/
                void 0, emitHelpers().createAwaitHelper(expression)) : factory2.createAwaitExpression(expression);
            }
            function transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts) {
                const expression = visitNode(node.expression, visitor, isExpression);
                const iterator = isIdentifier(expression) ? factory2.getGeneratedNameForNode(expression) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const result = isIdentifier(expression) ? factory2.getGeneratedNameForNode(iterator) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const nonUserCode = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const done = factory2.createTempVariable(hoistVariableDeclaration);
                const errorRecord = factory2.createUniqueName("e");
                const catchVariable = factory2.getGeneratedNameForNode(errorRecord);
                const returnMethod = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const callValues = setTextRange(emitHelpers().createAsyncValuesHelper(expression), node.expression);
                const callNext = factory2.createCallExpression(factory2.createPropertyAccessExpression(iterator, "next"), 
                /*typeArguments*/
                void 0, []);
                const getDone = factory2.createPropertyAccessExpression(result, "done");
                const getValue = factory2.createPropertyAccessExpression(result, "value");
                const callReturn = factory2.createFunctionCallCall(returnMethod, iterator, []);
                hoistVariableDeclaration(errorRecord);
                hoistVariableDeclaration(returnMethod);
                const initializer = ancestorFacts & 2 /* IterationContainer */ ? factory2.inlineExpressions([factory2.createAssignment(errorRecord, factory2.createVoidZero()), callValues]) : callValues;
                const forStatement = setEmitFlags(setTextRange(factory2.createForStatement(
                /*initializer*/
                setEmitFlags(setTextRange(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(nonUserCode, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createTrue()),
                    setTextRange(factory2.createVariableDeclaration(iterator, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer), node.expression),
                    factory2.createVariableDeclaration(result)
                ]), node.expression), 4194304 /* NoHoisting */), 
                /*condition*/
                factory2.inlineExpressions([
                    factory2.createAssignment(result, createDownlevelAwait(callNext)),
                    factory2.createAssignment(done, getDone),
                    factory2.createLogicalNot(done)
                ]), 
                /*incrementor*/
                void 0, 
                /*statement*/
                convertForOfStatementHead(node, getValue, nonUserCode)), 
                /*location*/
                node), 512 /* NoTokenTrailingSourceMaps */);
                setOriginalNode(forStatement, node);
                return factory2.createTryStatement(factory2.createBlock([
                    factory2.restoreEnclosingLabel(forStatement, outermostLabeledStatement)
                ]), factory2.createCatchClause(factory2.createVariableDeclaration(catchVariable), setEmitFlags(factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createAssignment(errorRecord, factory2.createObjectLiteralExpression([
                        factory2.createPropertyAssignment("error", catchVariable)
                    ])))
                ]), 1 /* SingleLine */)), factory2.createBlock([
                    factory2.createTryStatement(
                    /*tryBlock*/
                    factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(factory2.createLogicalAnd(factory2.createLogicalAnd(factory2.createLogicalNot(nonUserCode), factory2.createLogicalNot(done)), factory2.createAssignment(returnMethod, factory2.createPropertyAccessExpression(iterator, "return"))), factory2.createExpressionStatement(createDownlevelAwait(callReturn))), 1 /* SingleLine */)
                    ]), 
                    /*catchClause*/
                    void 0, 
                    /*finallyBlock*/
                    setEmitFlags(factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(errorRecord, factory2.createThrowStatement(factory2.createPropertyAccessExpression(errorRecord, "error"))), 1 /* SingleLine */)
                    ]), 1 /* SingleLine */))
                ]));
            }
            function parameterVisitor(node) {
                Debug.assertNode(node, isParameter);
                return visitParameter(node);
            }
            function visitParameter(node) {
                if (parametersWithPrecedingObjectRestOrSpread == null ? void 0 : parametersWithPrecedingObjectRestOrSpread.has(node)) {
                    return factory2.updateParameterDeclaration(node, 
                    /*modifiers*/
                    void 0, node.dotDotDotToken, isBindingPattern(node.name) ? factory2.getGeneratedNameForNode(node) : node.name, 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0);
                }
                if (node.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                    return factory2.updateParameterDeclaration(node, 
                    /*modifiers*/
                    void 0, node.dotDotDotToken, factory2.getGeneratedNameForNode(node), 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, visitNode(node.initializer, visitor, isExpression));
                }
                return visitEachChild(node, visitor, context);
            }
            function collectParametersWithPrecedingObjectRestOrSpread(node) {
                let parameters;
                for (const parameter of node.parameters) {
                    if (parameters) {
                        parameters.add(parameter);
                    }
                    else if (parameter.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                        parameters = /* @__PURE__ */ new Set();
                    }
                }
                return parameters;
            }
            function visitConstructorDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateConstructorDeclaration(node, node.modifiers, visitParameterList(node.parameters, parameterVisitor, context), transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }
            function visitGetAccessorDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateGetAccessorDeclaration(node, node.modifiers, visitNode(node.name, visitor, isPropertyName), visitParameterList(node.parameters, parameterVisitor, context), 
                /*type*/
                void 0, transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }
            function visitSetAccessorDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateSetAccessorDeclaration(node, node.modifiers, visitNode(node.name, visitor, isPropertyName), visitParameterList(node.parameters, parameterVisitor, context), transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }
            function visitMethodDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateMethodDeclaration(node, enclosingFunctionFlags & 1 /* Generator */ ? visitNodes2(node.modifiers, visitorNoAsyncModifier, isModifierLike) : node.modifiers, enclosingFunctionFlags & 2 /* Async */ ? void 0 : node.asteriskToken, visitNode(node.name, visitor, isPropertyName), visitNode(
                /*questionToken*/
                void 0, visitor, isQuestionToken), 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, parameterVisitor, context), 
                /*type*/
                void 0, enclosingFunctionFlags & 2 /* Async */ && enclosingFunctionFlags & 1 /* Generator */ ? transformAsyncGeneratorFunctionBody(node) : transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }
            function visitFunctionDeclaration(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateFunctionDeclaration(node, enclosingFunctionFlags & 1 /* Generator */ ? visitNodes2(node.modifiers, visitorNoAsyncModifier, isModifier) : node.modifiers, enclosingFunctionFlags & 2 /* Async */ ? void 0 : node.asteriskToken, node.name, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, parameterVisitor, context), 
                /*type*/
                void 0, enclosingFunctionFlags & 2 /* Async */ && enclosingFunctionFlags & 1 /* Generator */ ? transformAsyncGeneratorFunctionBody(node) : transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }
            function visitArrowFunction(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateArrowFunction(node, node.modifiers, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, parameterVisitor, context), 
                /*type*/
                void 0, node.equalsGreaterThanToken, transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }
            function visitFunctionExpression(node) {
                const savedEnclosingFunctionFlags = enclosingFunctionFlags;
                const savedParametersWithPrecedingObjectRestOrSpread = parametersWithPrecedingObjectRestOrSpread;
                enclosingFunctionFlags = getFunctionFlags(node);
                parametersWithPrecedingObjectRestOrSpread = collectParametersWithPrecedingObjectRestOrSpread(node);
                const updated = factory2.updateFunctionExpression(node, enclosingFunctionFlags & 1 /* Generator */ ? visitNodes2(node.modifiers, visitorNoAsyncModifier, isModifier) : node.modifiers, enclosingFunctionFlags & 2 /* Async */ ? void 0 : node.asteriskToken, node.name, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, parameterVisitor, context), 
                /*type*/
                void 0, enclosingFunctionFlags & 2 /* Async */ && enclosingFunctionFlags & 1 /* Generator */ ? transformAsyncGeneratorFunctionBody(node) : transformFunctionBody2(node));
                enclosingFunctionFlags = savedEnclosingFunctionFlags;
                parametersWithPrecedingObjectRestOrSpread = savedParametersWithPrecedingObjectRestOrSpread;
                return updated;
            }
            function transformAsyncGeneratorFunctionBody(node) {
                resumeLexicalEnvironment();
                const statements = [];
                const statementOffset = factory2.copyPrologue(node.body.statements, statements, 
                /*ensureUseStrict*/
                false, visitor);
                appendObjectRestAssignmentsIfNeeded(statements, node);
                const savedCapturedSuperProperties = capturedSuperProperties;
                const savedHasSuperElementAccess = hasSuperElementAccess;
                capturedSuperProperties = /* @__PURE__ */ new Set();
                hasSuperElementAccess = false;
                const returnStatement = factory2.createReturnStatement(emitHelpers().createAsyncGeneratorHelper(factory2.createFunctionExpression(
                /*modifiers*/
                void 0, factory2.createToken(41 /* AsteriskToken */), node.name && factory2.getGeneratedNameForNode(node.name), 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                [], 
                /*type*/
                void 0, factory2.updateBlock(node.body, visitLexicalEnvironment(node.body.statements, visitor, context, statementOffset))), !!(hierarchyFacts & 1 /* HasLexicalThis */)));
                const emitSuperHelpers = languageVersion >= 2 /* ES2015 */ && resolver.getNodeCheckFlags(node) & (256 /* MethodWithSuperPropertyAssignmentInAsync */ | 128 /* MethodWithSuperPropertyAccessInAsync */);
                if (emitSuperHelpers) {
                    enableSubstitutionForAsyncMethodsWithSuper();
                    const variableStatement = createSuperAccessVariableStatement(factory2, resolver, node, capturedSuperProperties);
                    substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                    insertStatementsAfterStandardPrologue(statements, [variableStatement]);
                }
                statements.push(returnStatement);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const block = factory2.updateBlock(node.body, statements);
                if (emitSuperHelpers && hasSuperElementAccess) {
                    if (resolver.getNodeCheckFlags(node) & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                        addEmitHelper(block, advancedAsyncSuperHelper);
                    }
                    else if (resolver.getNodeCheckFlags(node) & 128 /* MethodWithSuperPropertyAccessInAsync */) {
                        addEmitHelper(block, asyncSuperHelper);
                    }
                }
                capturedSuperProperties = savedCapturedSuperProperties;
                hasSuperElementAccess = savedHasSuperElementAccess;
                return block;
            }
            function transformFunctionBody2(node) {
                var _a2;
                resumeLexicalEnvironment();
                let statementOffset = 0;
                const statements = [];
                const body = (_a2 = visitNode(node.body, visitor, isConciseBody)) != null ? _a2 : factory2.createBlock([]);
                if (isBlock(body)) {
                    statementOffset = factory2.copyPrologue(body.statements, statements, 
                    /*ensureUseStrict*/
                    false, visitor);
                }
                addRange(statements, appendObjectRestAssignmentsIfNeeded(
                /*statements*/
                void 0, node));
                const leadingStatements = endLexicalEnvironment();
                if (statementOffset > 0 || some(statements) || some(leadingStatements)) {
                    const block = factory2.converters.convertToFunctionBlock(body, 
                    /*multiLine*/
                    true);
                    insertStatementsAfterStandardPrologue(statements, leadingStatements);
                    addRange(statements, block.statements.slice(statementOffset));
                    return factory2.updateBlock(block, setTextRange(factory2.createNodeArray(statements), block.statements));
                }
                return body;
            }
            function appendObjectRestAssignmentsIfNeeded(statements, node) {
                let containsPrecedingObjectRestOrSpread = false;
                for (const parameter of node.parameters) {
                    if (containsPrecedingObjectRestOrSpread) {
                        if (isBindingPattern(parameter.name)) {
                            if (parameter.name.elements.length > 0) {
                                const declarations = flattenDestructuringBinding(parameter, visitor, context, 0 /* All */, factory2.getGeneratedNameForNode(parameter));
                                if (some(declarations)) {
                                    const declarationList = factory2.createVariableDeclarationList(declarations);
                                    const statement = factory2.createVariableStatement(
                                    /*modifiers*/
                                    void 0, declarationList);
                                    setEmitFlags(statement, 2097152 /* CustomPrologue */);
                                    statements = append(statements, statement);
                                }
                            }
                            else if (parameter.initializer) {
                                const name = factory2.getGeneratedNameForNode(parameter);
                                const initializer = visitNode(parameter.initializer, visitor, isExpression);
                                const assignment = factory2.createAssignment(name, initializer);
                                const statement = factory2.createExpressionStatement(assignment);
                                setEmitFlags(statement, 2097152 /* CustomPrologue */);
                                statements = append(statements, statement);
                            }
                        }
                        else if (parameter.initializer) {
                            const name = factory2.cloneNode(parameter.name);
                            setTextRange(name, parameter.name);
                            setEmitFlags(name, 96 /* NoSourceMap */);
                            const initializer = visitNode(parameter.initializer, visitor, isExpression);
                            addEmitFlags(initializer, 96 /* NoSourceMap */ | 3072 /* NoComments */);
                            const assignment = factory2.createAssignment(name, initializer);
                            setTextRange(assignment, parameter);
                            setEmitFlags(assignment, 3072 /* NoComments */);
                            const block = factory2.createBlock([factory2.createExpressionStatement(assignment)]);
                            setTextRange(block, parameter);
                            setEmitFlags(block, 1 /* SingleLine */ | 64 /* NoTrailingSourceMap */ | 768 /* NoTokenSourceMaps */ | 3072 /* NoComments */);
                            const typeCheck = factory2.createTypeCheck(factory2.cloneNode(parameter.name), "undefined");
                            const statement = factory2.createIfStatement(typeCheck, block);
                            startOnNewLine(statement);
                            setTextRange(statement, parameter);
                            setEmitFlags(statement, 768 /* NoTokenSourceMaps */ | 64 /* NoTrailingSourceMap */ | 2097152 /* CustomPrologue */ | 3072 /* NoComments */);
                            statements = append(statements, statement);
                        }
                    }
                    else if (parameter.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                        containsPrecedingObjectRestOrSpread = true;
                        const declarations = flattenDestructuringBinding(parameter, visitor, context, 1 /* ObjectRest */, factory2.getGeneratedNameForNode(parameter), 
                        /*doNotRecordTempVariablesInLine*/
                        false, 
                        /*skipInitializer*/
                        true);
                        if (some(declarations)) {
                            const declarationList = factory2.createVariableDeclarationList(declarations);
                            const statement = factory2.createVariableStatement(
                            /*modifiers*/
                            void 0, declarationList);
                            setEmitFlags(statement, 2097152 /* CustomPrologue */);
                            statements = append(statements, statement);
                        }
                    }
                }
                return statements;
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
                    return setTextRange(factory2.createPropertyAccessExpression(factory2.createCallExpression(factory2.createIdentifier("_superIndex"), 
                    /*typeArguments*/
                    void 0, [argumentExpression]), "value"), location);
                }
                else {
                    return setTextRange(factory2.createCallExpression(factory2.createIdentifier("_superIndex"), 
                    /*typeArguments*/
                    void 0, [argumentExpression]), location);
                }
            }
        }