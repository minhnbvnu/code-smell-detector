function transformGenerators(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, resumeLexicalEnvironment, endLexicalEnvironment, hoistFunctionDeclaration, hoistVariableDeclaration } = context;
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const resolver = context.getEmitResolver();
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onSubstituteNode = onSubstituteNode;
            let renamedCatchVariables;
            let renamedCatchVariableDeclarations;
            let inGeneratorFunctionBody;
            let inStatementContainingYield;
            let blocks;
            let blockOffsets;
            let blockActions;
            let blockStack;
            let labelOffsets;
            let labelExpressions;
            let nextLabelId = 1;
            let operations;
            let operationArguments;
            let operationLocations;
            let state;
            let blockIndex = 0;
            let labelNumber = 0;
            let labelNumbers;
            let lastOperationWasAbrupt;
            let lastOperationWasCompletion;
            let clauses;
            let statements;
            let exceptionBlockStack;
            let currentExceptionBlock;
            let withBlockStack;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile || (node.transformFlags & 2048 /* ContainsGenerator */) === 0) {
                    return node;
                }
                const visited = visitEachChild(node, visitor, context);
                addEmitHelpers(visited, context.readEmitHelpers());
                return visited;
            }
            function visitor(node) {
                const transformFlags = node.transformFlags;
                if (inStatementContainingYield) {
                    return visitJavaScriptInStatementContainingYield(node);
                }
                else if (inGeneratorFunctionBody) {
                    return visitJavaScriptInGeneratorFunctionBody(node);
                }
                else if (isFunctionLikeDeclaration(node) && node.asteriskToken) {
                    return visitGenerator(node);
                }
                else if (transformFlags & 2048 /* ContainsGenerator */) {
                    return visitEachChild(node, visitor, context);
                }
                else {
                    return node;
                }
            }
            function visitJavaScriptInStatementContainingYield(node) {
                switch (node.kind) {
                    case 243 /* DoStatement */:
                        return visitDoStatement(node);
                    case 244 /* WhileStatement */:
                        return visitWhileStatement(node);
                    case 252 /* SwitchStatement */:
                        return visitSwitchStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    default:
                        return visitJavaScriptInGeneratorFunctionBody(node);
                }
            }
            function visitJavaScriptInGeneratorFunctionBody(node) {
                switch (node.kind) {
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return visitAccessorDeclaration(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 245 /* ForStatement */:
                        return visitForStatement(node);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node);
                    case 249 /* BreakStatement */:
                        return visitBreakStatement(node);
                    case 248 /* ContinueStatement */:
                        return visitContinueStatement(node);
                    case 250 /* ReturnStatement */:
                        return visitReturnStatement(node);
                    default:
                        if (node.transformFlags & 1048576 /* ContainsYield */) {
                            return visitJavaScriptContainingYield(node);
                        }
                        else if (node.transformFlags & (2048 /* ContainsGenerator */ | 4194304 /* ContainsHoistedDeclarationOrCompletion */)) {
                            return visitEachChild(node, visitor, context);
                        }
                        else {
                            return node;
                        }
                }
            }
            function visitJavaScriptContainingYield(node) {
                switch (node.kind) {
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node);
                    case 224 /* ConditionalExpression */:
                        return visitConditionalExpression(node);
                    case 226 /* YieldExpression */:
                        return visitYieldExpression(node);
                    case 206 /* ArrayLiteralExpression */:
                        return visitArrayLiteralExpression(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 209 /* ElementAccessExpression */:
                        return visitElementAccessExpression(node);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 211 /* NewExpression */:
                        return visitNewExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitGenerator(node) {
                switch (node.kind) {
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }
            function visitFunctionDeclaration(node) {
                if (node.asteriskToken) {
                    node = setOriginalNode(setTextRange(factory2.createFunctionDeclaration(node.modifiers, 
                    /*asteriskToken*/
                    void 0, node.name, 
                    /*typeParameters*/
                    void 0, visitParameterList(node.parameters, visitor, context), 
                    /*type*/
                    void 0, transformGeneratorFunctionBody(node.body)), 
                    /*location*/
                    node), node);
                }
                else {
                    const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                    const savedInStatementContainingYield = inStatementContainingYield;
                    inGeneratorFunctionBody = false;
                    inStatementContainingYield = false;
                    node = visitEachChild(node, visitor, context);
                    inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                    inStatementContainingYield = savedInStatementContainingYield;
                }
                if (inGeneratorFunctionBody) {
                    hoistFunctionDeclaration(node);
                    return void 0;
                }
                else {
                    return node;
                }
            }
            function visitFunctionExpression(node) {
                if (node.asteriskToken) {
                    node = setOriginalNode(setTextRange(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, node.name, 
                    /*typeParameters*/
                    void 0, visitParameterList(node.parameters, visitor, context), 
                    /*type*/
                    void 0, transformGeneratorFunctionBody(node.body)), 
                    /*location*/
                    node), node);
                }
                else {
                    const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                    const savedInStatementContainingYield = inStatementContainingYield;
                    inGeneratorFunctionBody = false;
                    inStatementContainingYield = false;
                    node = visitEachChild(node, visitor, context);
                    inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                    inStatementContainingYield = savedInStatementContainingYield;
                }
                return node;
            }
            function visitAccessorDeclaration(node) {
                const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                const savedInStatementContainingYield = inStatementContainingYield;
                inGeneratorFunctionBody = false;
                inStatementContainingYield = false;
                node = visitEachChild(node, visitor, context);
                inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                inStatementContainingYield = savedInStatementContainingYield;
                return node;
            }
            function transformGeneratorFunctionBody(body) {
                const statements2 = [];
                const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                const savedInStatementContainingYield = inStatementContainingYield;
                const savedBlocks = blocks;
                const savedBlockOffsets = blockOffsets;
                const savedBlockActions = blockActions;
                const savedBlockStack = blockStack;
                const savedLabelOffsets = labelOffsets;
                const savedLabelExpressions = labelExpressions;
                const savedNextLabelId = nextLabelId;
                const savedOperations = operations;
                const savedOperationArguments = operationArguments;
                const savedOperationLocations = operationLocations;
                const savedState = state;
                inGeneratorFunctionBody = true;
                inStatementContainingYield = false;
                blocks = void 0;
                blockOffsets = void 0;
                blockActions = void 0;
                blockStack = void 0;
                labelOffsets = void 0;
                labelExpressions = void 0;
                nextLabelId = 1;
                operations = void 0;
                operationArguments = void 0;
                operationLocations = void 0;
                state = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                resumeLexicalEnvironment();
                const statementOffset = factory2.copyPrologue(body.statements, statements2, 
                /*ensureUseStrict*/
                false, visitor);
                transformAndEmitStatements(body.statements, statementOffset);
                const buildResult = build2();
                insertStatementsAfterStandardPrologue(statements2, endLexicalEnvironment());
                statements2.push(factory2.createReturnStatement(buildResult));
                inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                inStatementContainingYield = savedInStatementContainingYield;
                blocks = savedBlocks;
                blockOffsets = savedBlockOffsets;
                blockActions = savedBlockActions;
                blockStack = savedBlockStack;
                labelOffsets = savedLabelOffsets;
                labelExpressions = savedLabelExpressions;
                nextLabelId = savedNextLabelId;
                operations = savedOperations;
                operationArguments = savedOperationArguments;
                operationLocations = savedOperationLocations;
                state = savedState;
                return setTextRange(factory2.createBlock(statements2, body.multiLine), body);
            }
            function visitVariableStatement(node) {
                if (node.transformFlags & 1048576 /* ContainsYield */) {
                    transformAndEmitVariableDeclarationList(node.declarationList);
                    return void 0;
                }
                else {
                    if (getEmitFlags(node) & 2097152 /* CustomPrologue */) {
                        return node;
                    }
                    for (const variable of node.declarationList.declarations) {
                        hoistVariableDeclaration(variable.name);
                    }
                    const variables = getInitializedVariables(node.declarationList);
                    if (variables.length === 0) {
                        return void 0;
                    }
                    return setSourceMapRange(factory2.createExpressionStatement(factory2.inlineExpressions(map(variables, transformInitializedVariable))), node);
                }
            }
            function visitBinaryExpression(node) {
                const assoc = getExpressionAssociativity(node);
                switch (assoc) {
                    case 0 /* Left */:
                        return visitLeftAssociativeBinaryExpression(node);
                    case 1 /* Right */:
                        return visitRightAssociativeBinaryExpression(node);
                    default:
                        return Debug.assertNever(assoc);
                }
            }
            function visitRightAssociativeBinaryExpression(node) {
                const { left, right } = node;
                if (containsYield(right)) {
                    let target;
                    switch (left.kind) {
                        case 208 /* PropertyAccessExpression */:
                            target = factory2.updatePropertyAccessExpression(left, cacheExpression(Debug.checkDefined(visitNode(left.expression, visitor, isLeftHandSideExpression))), left.name);
                            break;
                        case 209 /* ElementAccessExpression */:
                            target = factory2.updateElementAccessExpression(left, cacheExpression(Debug.checkDefined(visitNode(left.expression, visitor, isLeftHandSideExpression))), cacheExpression(Debug.checkDefined(visitNode(left.argumentExpression, visitor, isExpression))));
                            break;
                        default:
                            target = Debug.checkDefined(visitNode(left, visitor, isExpression));
                            break;
                    }
                    const operator = node.operatorToken.kind;
                    if (isCompoundAssignment(operator)) {
                        return setTextRange(factory2.createAssignment(target, setTextRange(factory2.createBinaryExpression(cacheExpression(target), getNonAssignmentOperatorForCompoundAssignment(operator), Debug.checkDefined(visitNode(right, visitor, isExpression))), node)), node);
                    }
                    else {
                        return factory2.updateBinaryExpression(node, target, node.operatorToken, Debug.checkDefined(visitNode(right, visitor, isExpression)));
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitLeftAssociativeBinaryExpression(node) {
                if (containsYield(node.right)) {
                    if (isLogicalOperator(node.operatorToken.kind)) {
                        return visitLogicalBinaryExpression(node);
                    }
                    else if (node.operatorToken.kind === 27 /* CommaToken */) {
                        return visitCommaExpression(node);
                    }
                    return factory2.updateBinaryExpression(node, cacheExpression(Debug.checkDefined(visitNode(node.left, visitor, isExpression))), node.operatorToken, Debug.checkDefined(visitNode(node.right, visitor, isExpression)));
                }
                return visitEachChild(node, visitor, context);
            }
            function visitCommaExpression(node) {
                let pendingExpressions = [];
                visit(node.left);
                visit(node.right);
                return factory2.inlineExpressions(pendingExpressions);
                function visit(node2) {
                    if (isBinaryExpression(node2) && node2.operatorToken.kind === 27 /* CommaToken */) {
                        visit(node2.left);
                        visit(node2.right);
                    }
                    else {
                        if (containsYield(node2) && pendingExpressions.length > 0) {
                            emitWorker(1 /* Statement */, [factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions))]);
                            pendingExpressions = [];
                        }
                        pendingExpressions.push(Debug.checkDefined(visitNode(node2, visitor, isExpression)));
                    }
                }
            }
            function visitCommaListExpression(node) {
                let pendingExpressions = [];
                for (const elem of node.elements) {
                    if (isBinaryExpression(elem) && elem.operatorToken.kind === 27 /* CommaToken */) {
                        pendingExpressions.push(visitCommaExpression(elem));
                    }
                    else {
                        if (containsYield(elem) && pendingExpressions.length > 0) {
                            emitWorker(1 /* Statement */, [factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions))]);
                            pendingExpressions = [];
                        }
                        pendingExpressions.push(Debug.checkDefined(visitNode(elem, visitor, isExpression)));
                    }
                }
                return factory2.inlineExpressions(pendingExpressions);
            }
            function visitLogicalBinaryExpression(node) {
                const resultLabel = defineLabel();
                const resultLocal = declareLocal();
                emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.left, visitor, isExpression)), 
                /*location*/
                node.left);
                if (node.operatorToken.kind === 55 /* AmpersandAmpersandToken */) {
                    emitBreakWhenFalse(resultLabel, resultLocal, 
                    /*location*/
                    node.left);
                }
                else {
                    emitBreakWhenTrue(resultLabel, resultLocal, 
                    /*location*/
                    node.left);
                }
                emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.right, visitor, isExpression)), 
                /*location*/
                node.right);
                markLabel(resultLabel);
                return resultLocal;
            }
            function visitConditionalExpression(node) {
                if (containsYield(node.whenTrue) || containsYield(node.whenFalse)) {
                    const whenFalseLabel = defineLabel();
                    const resultLabel = defineLabel();
                    const resultLocal = declareLocal();
                    emitBreakWhenFalse(whenFalseLabel, Debug.checkDefined(visitNode(node.condition, visitor, isExpression)), 
                    /*location*/
                    node.condition);
                    emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.whenTrue, visitor, isExpression)), 
                    /*location*/
                    node.whenTrue);
                    emitBreak(resultLabel);
                    markLabel(whenFalseLabel);
                    emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.whenFalse, visitor, isExpression)), 
                    /*location*/
                    node.whenFalse);
                    markLabel(resultLabel);
                    return resultLocal;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitYieldExpression(node) {
                const resumeLabel = defineLabel();
                const expression = visitNode(node.expression, visitor, isExpression);
                if (node.asteriskToken) {
                    const iterator = (getEmitFlags(node.expression) & 16777216 /* Iterator */) === 0 ? setTextRange(emitHelpers().createValuesHelper(expression), node) : expression;
                    emitYieldStar(iterator, 
                    /*location*/
                    node);
                }
                else {
                    emitYield(expression, 
                    /*location*/
                    node);
                }
                markLabel(resumeLabel);
                return createGeneratorResume(
                /*location*/
                node);
            }
            function visitArrayLiteralExpression(node) {
                return visitElements(node.elements, 
                /*leadingElement*/
                void 0, 
                /*location*/
                void 0, node.multiLine);
            }
            function visitElements(elements, leadingElement, location, multiLine) {
                const numInitialElements = countInitialNodesWithoutYield(elements);
                let temp;
                if (numInitialElements > 0) {
                    temp = declareLocal();
                    const initialElements = visitNodes2(elements, visitor, isExpression, 0, numInitialElements);
                    emitAssignment(temp, factory2.createArrayLiteralExpression(leadingElement ? [leadingElement, ...initialElements] : initialElements));
                    leadingElement = void 0;
                }
                const expressions = reduceLeft(elements, reduceElement, [], numInitialElements);
                return temp ? factory2.createArrayConcatCall(temp, [factory2.createArrayLiteralExpression(expressions, multiLine)]) : setTextRange(factory2.createArrayLiteralExpression(leadingElement ? [leadingElement, ...expressions] : expressions, multiLine), location);
                function reduceElement(expressions2, element) {
                    if (containsYield(element) && expressions2.length > 0) {
                        const hasAssignedTemp = temp !== void 0;
                        if (!temp) {
                            temp = declareLocal();
                        }
                        emitAssignment(temp, hasAssignedTemp ? factory2.createArrayConcatCall(temp, [factory2.createArrayLiteralExpression(expressions2, multiLine)]) : factory2.createArrayLiteralExpression(leadingElement ? [leadingElement, ...expressions2] : expressions2, multiLine));
                        leadingElement = void 0;
                        expressions2 = [];
                    }
                    expressions2.push(Debug.checkDefined(visitNode(element, visitor, isExpression)));
                    return expressions2;
                }
            }
            function visitObjectLiteralExpression(node) {
                const properties = node.properties;
                const multiLine = node.multiLine;
                const numInitialProperties = countInitialNodesWithoutYield(properties);
                const temp = declareLocal();
                emitAssignment(temp, factory2.createObjectLiteralExpression(visitNodes2(properties, visitor, isObjectLiteralElementLike, 0, numInitialProperties), multiLine));
                const expressions = reduceLeft(properties, reduceProperty, [], numInitialProperties);
                expressions.push(multiLine ? startOnNewLine(setParent(setTextRange(factory2.cloneNode(temp), temp), temp.parent)) : temp);
                return factory2.inlineExpressions(expressions);
                function reduceProperty(expressions2, property) {
                    if (containsYield(property) && expressions2.length > 0) {
                        emitStatement(factory2.createExpressionStatement(factory2.inlineExpressions(expressions2)));
                        expressions2 = [];
                    }
                    const expression = createExpressionForObjectLiteralElementLike(factory2, node, property, temp);
                    const visited = visitNode(expression, visitor, isExpression);
                    if (visited) {
                        if (multiLine) {
                            startOnNewLine(visited);
                        }
                        expressions2.push(visited);
                    }
                    return expressions2;
                }
            }
            function visitElementAccessExpression(node) {
                if (containsYield(node.argumentExpression)) {
                    return factory2.updateElementAccessExpression(node, cacheExpression(Debug.checkDefined(visitNode(node.expression, visitor, isLeftHandSideExpression))), Debug.checkDefined(visitNode(node.argumentExpression, visitor, isExpression)));
                }
                return visitEachChild(node, visitor, context);
            }
            function visitCallExpression(node) {
                if (!isImportCall(node) && forEach(node.arguments, containsYield)) {
                    const { target, thisArg } = factory2.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion, 
                    /*cacheIdentifiers*/
                    true);
                    return setOriginalNode(setTextRange(factory2.createFunctionApplyCall(cacheExpression(Debug.checkDefined(visitNode(target, visitor, isLeftHandSideExpression))), thisArg, visitElements(node.arguments)), node), node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitNewExpression(node) {
                if (forEach(node.arguments, containsYield)) {
                    const { target, thisArg } = factory2.createCallBinding(factory2.createPropertyAccessExpression(node.expression, "bind"), hoistVariableDeclaration);
                    return setOriginalNode(setTextRange(factory2.createNewExpression(factory2.createFunctionApplyCall(cacheExpression(Debug.checkDefined(visitNode(target, visitor, isExpression))), thisArg, visitElements(node.arguments, 
                    /*leadingElement*/
                    factory2.createVoidZero())), 
                    /*typeArguments*/
                    void 0, []), node), node);
                }
                return visitEachChild(node, visitor, context);
            }
            function transformAndEmitStatements(statements2, start = 0) {
                const numStatements = statements2.length;
                for (let i = start; i < numStatements; i++) {
                    transformAndEmitStatement(statements2[i]);
                }
            }
            function transformAndEmitEmbeddedStatement(node) {
                if (isBlock(node)) {
                    transformAndEmitStatements(node.statements);
                }
                else {
                    transformAndEmitStatement(node);
                }
            }
            function transformAndEmitStatement(node) {
                const savedInStatementContainingYield = inStatementContainingYield;
                if (!inStatementContainingYield) {
                    inStatementContainingYield = containsYield(node);
                }
                transformAndEmitStatementWorker(node);
                inStatementContainingYield = savedInStatementContainingYield;
            }
            function transformAndEmitStatementWorker(node) {
                switch (node.kind) {
                    case 238 /* Block */:
                        return transformAndEmitBlock(node);
                    case 241 /* ExpressionStatement */:
                        return transformAndEmitExpressionStatement(node);
                    case 242 /* IfStatement */:
                        return transformAndEmitIfStatement(node);
                    case 243 /* DoStatement */:
                        return transformAndEmitDoStatement(node);
                    case 244 /* WhileStatement */:
                        return transformAndEmitWhileStatement(node);
                    case 245 /* ForStatement */:
                        return transformAndEmitForStatement(node);
                    case 246 /* ForInStatement */:
                        return transformAndEmitForInStatement(node);
                    case 248 /* ContinueStatement */:
                        return transformAndEmitContinueStatement(node);
                    case 249 /* BreakStatement */:
                        return transformAndEmitBreakStatement(node);
                    case 250 /* ReturnStatement */:
                        return transformAndEmitReturnStatement(node);
                    case 251 /* WithStatement */:
                        return transformAndEmitWithStatement(node);
                    case 252 /* SwitchStatement */:
                        return transformAndEmitSwitchStatement(node);
                    case 253 /* LabeledStatement */:
                        return transformAndEmitLabeledStatement(node);
                    case 254 /* ThrowStatement */:
                        return transformAndEmitThrowStatement(node);
                    case 255 /* TryStatement */:
                        return transformAndEmitTryStatement(node);
                    default:
                        return emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function transformAndEmitBlock(node) {
                if (containsYield(node)) {
                    transformAndEmitStatements(node.statements);
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function transformAndEmitExpressionStatement(node) {
                emitStatement(visitNode(node, visitor, isStatement));
            }
            function transformAndEmitVariableDeclarationList(node) {
                for (const variable of node.declarations) {
                    const name = factory2.cloneNode(variable.name);
                    setCommentRange(name, variable.name);
                    hoistVariableDeclaration(name);
                }
                const variables = getInitializedVariables(node);
                const numVariables = variables.length;
                let variablesWritten = 0;
                let pendingExpressions = [];
                while (variablesWritten < numVariables) {
                    for (let i = variablesWritten; i < numVariables; i++) {
                        const variable = variables[i];
                        if (containsYield(variable.initializer) && pendingExpressions.length > 0) {
                            break;
                        }
                        pendingExpressions.push(transformInitializedVariable(variable));
                    }
                    if (pendingExpressions.length) {
                        emitStatement(factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions)));
                        variablesWritten += pendingExpressions.length;
                        pendingExpressions = [];
                    }
                }
                return void 0;
            }
            function transformInitializedVariable(node) {
                return setSourceMapRange(factory2.createAssignment(setSourceMapRange(factory2.cloneNode(node.name), node.name), Debug.checkDefined(visitNode(node.initializer, visitor, isExpression))), node);
            }
            function transformAndEmitIfStatement(node) {
                if (containsYield(node)) {
                    if (containsYield(node.thenStatement) || containsYield(node.elseStatement)) {
                        const endLabel = defineLabel();
                        const elseLabel = node.elseStatement ? defineLabel() : void 0;
                        emitBreakWhenFalse(node.elseStatement ? elseLabel : endLabel, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), 
                        /*location*/
                        node.expression);
                        transformAndEmitEmbeddedStatement(node.thenStatement);
                        if (node.elseStatement) {
                            emitBreak(endLabel);
                            markLabel(elseLabel);
                            transformAndEmitEmbeddedStatement(node.elseStatement);
                        }
                        markLabel(endLabel);
                    }
                    else {
                        emitStatement(visitNode(node, visitor, isStatement));
                    }
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function transformAndEmitDoStatement(node) {
                if (containsYield(node)) {
                    const conditionLabel = defineLabel();
                    const loopLabel = defineLabel();
                    beginLoopBlock(
                    /*continueLabel*/
                    conditionLabel);
                    markLabel(loopLabel);
                    transformAndEmitEmbeddedStatement(node.statement);
                    markLabel(conditionLabel);
                    emitBreakWhenTrue(loopLabel, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function visitDoStatement(node) {
                if (inStatementContainingYield) {
                    beginScriptLoopBlock();
                    node = visitEachChild(node, visitor, context);
                    endLoopBlock();
                    return node;
                }
                else {
                    return visitEachChild(node, visitor, context);
                }
            }
            function transformAndEmitWhileStatement(node) {
                if (containsYield(node)) {
                    const loopLabel = defineLabel();
                    const endLabel = beginLoopBlock(loopLabel);
                    markLabel(loopLabel);
                    emitBreakWhenFalse(endLabel, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    transformAndEmitEmbeddedStatement(node.statement);
                    emitBreak(loopLabel);
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function visitWhileStatement(node) {
                if (inStatementContainingYield) {
                    beginScriptLoopBlock();
                    node = visitEachChild(node, visitor, context);
                    endLoopBlock();
                    return node;
                }
                else {
                    return visitEachChild(node, visitor, context);
                }
            }
            function transformAndEmitForStatement(node) {
                if (containsYield(node)) {
                    const conditionLabel = defineLabel();
                    const incrementLabel = defineLabel();
                    const endLabel = beginLoopBlock(incrementLabel);
                    if (node.initializer) {
                        const initializer = node.initializer;
                        if (isVariableDeclarationList(initializer)) {
                            transformAndEmitVariableDeclarationList(initializer);
                        }
                        else {
                            emitStatement(setTextRange(factory2.createExpressionStatement(Debug.checkDefined(visitNode(initializer, visitor, isExpression))), initializer));
                        }
                    }
                    markLabel(conditionLabel);
                    if (node.condition) {
                        emitBreakWhenFalse(endLabel, Debug.checkDefined(visitNode(node.condition, visitor, isExpression)));
                    }
                    transformAndEmitEmbeddedStatement(node.statement);
                    markLabel(incrementLabel);
                    if (node.incrementor) {
                        emitStatement(setTextRange(factory2.createExpressionStatement(Debug.checkDefined(visitNode(node.incrementor, visitor, isExpression))), node.incrementor));
                    }
                    emitBreak(conditionLabel);
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function visitForStatement(node) {
                if (inStatementContainingYield) {
                    beginScriptLoopBlock();
                }
                const initializer = node.initializer;
                if (initializer && isVariableDeclarationList(initializer)) {
                    for (const variable of initializer.declarations) {
                        hoistVariableDeclaration(variable.name);
                    }
                    const variables = getInitializedVariables(initializer);
                    node = factory2.updateForStatement(node, variables.length > 0 ? factory2.inlineExpressions(map(variables, transformInitializedVariable)) : void 0, visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, visitor, isExpression), visitIterationBody(node.statement, visitor, context));
                }
                else {
                    node = visitEachChild(node, visitor, context);
                }
                if (inStatementContainingYield) {
                    endLoopBlock();
                }
                return node;
            }
            function transformAndEmitForInStatement(node) {
                if (containsYield(node)) {
                    const obj = declareLocal();
                    const keysArray = declareLocal();
                    const key = declareLocal();
                    const keysIndex = factory2.createLoopVariable();
                    const initializer = node.initializer;
                    hoistVariableDeclaration(keysIndex);
                    emitAssignment(obj, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    emitAssignment(keysArray, factory2.createArrayLiteralExpression());
                    emitStatement(factory2.createForInStatement(key, obj, factory2.createExpressionStatement(factory2.createCallExpression(factory2.createPropertyAccessExpression(keysArray, "push"), 
                    /*typeArguments*/
                    void 0, [key]))));
                    emitAssignment(keysIndex, factory2.createNumericLiteral(0));
                    const conditionLabel = defineLabel();
                    const incrementLabel = defineLabel();
                    const endLoopLabel = beginLoopBlock(incrementLabel);
                    markLabel(conditionLabel);
                    emitBreakWhenFalse(endLoopLabel, factory2.createLessThan(keysIndex, factory2.createPropertyAccessExpression(keysArray, "length")));
                    emitAssignment(key, factory2.createElementAccessExpression(keysArray, keysIndex));
                    emitBreakWhenFalse(incrementLabel, factory2.createBinaryExpression(key, 101 /* InKeyword */, obj));
                    let variable;
                    if (isVariableDeclarationList(initializer)) {
                        for (const variable2 of initializer.declarations) {
                            hoistVariableDeclaration(variable2.name);
                        }
                        variable = factory2.cloneNode(initializer.declarations[0].name);
                    }
                    else {
                        variable = Debug.checkDefined(visitNode(initializer, visitor, isExpression));
                        Debug.assert(isLeftHandSideExpression(variable));
                    }
                    emitAssignment(variable, key);
                    transformAndEmitEmbeddedStatement(node.statement);
                    markLabel(incrementLabel);
                    emitStatement(factory2.createExpressionStatement(factory2.createPostfixIncrement(keysIndex)));
                    emitBreak(conditionLabel);
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function visitForInStatement(node) {
                if (inStatementContainingYield) {
                    beginScriptLoopBlock();
                }
                const initializer = node.initializer;
                if (isVariableDeclarationList(initializer)) {
                    for (const variable of initializer.declarations) {
                        hoistVariableDeclaration(variable.name);
                    }
                    node = factory2.updateForInStatement(node, initializer.declarations[0].name, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), Debug.checkDefined(visitNode(node.statement, visitor, isStatement, factory2.liftToBlock)));
                }
                else {
                    node = visitEachChild(node, visitor, context);
                }
                if (inStatementContainingYield) {
                    endLoopBlock();
                }
                return node;
            }
            function transformAndEmitContinueStatement(node) {
                const label = findContinueTarget(node.label ? idText(node.label) : void 0);
                if (label > 0) {
                    emitBreak(label, 
                    /*location*/
                    node);
                }
                else {
                    emitStatement(node);
                }
            }
            function visitContinueStatement(node) {
                if (inStatementContainingYield) {
                    const label = findContinueTarget(node.label && idText(node.label));
                    if (label > 0) {
                        return createInlineBreak(label, 
                        /*location*/
                        node);
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function transformAndEmitBreakStatement(node) {
                const label = findBreakTarget(node.label ? idText(node.label) : void 0);
                if (label > 0) {
                    emitBreak(label, 
                    /*location*/
                    node);
                }
                else {
                    emitStatement(node);
                }
            }
            function visitBreakStatement(node) {
                if (inStatementContainingYield) {
                    const label = findBreakTarget(node.label && idText(node.label));
                    if (label > 0) {
                        return createInlineBreak(label, 
                        /*location*/
                        node);
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function transformAndEmitReturnStatement(node) {
                emitReturn(visitNode(node.expression, visitor, isExpression), 
                /*location*/
                node);
            }
            function visitReturnStatement(node) {
                return createInlineReturn(visitNode(node.expression, visitor, isExpression), 
                /*location*/
                node);
            }
            function transformAndEmitWithStatement(node) {
                if (containsYield(node)) {
                    beginWithBlock(cacheExpression(Debug.checkDefined(visitNode(node.expression, visitor, isExpression))));
                    transformAndEmitEmbeddedStatement(node.statement);
                    endWithBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function transformAndEmitSwitchStatement(node) {
                if (containsYield(node.caseBlock)) {
                    const caseBlock = node.caseBlock;
                    const numClauses = caseBlock.clauses.length;
                    const endLabel = beginSwitchBlock();
                    const expression = cacheExpression(Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    const clauseLabels = [];
                    let defaultClauseIndex = -1;
                    for (let i = 0; i < numClauses; i++) {
                        const clause = caseBlock.clauses[i];
                        clauseLabels.push(defineLabel());
                        if (clause.kind === 293 /* DefaultClause */ && defaultClauseIndex === -1) {
                            defaultClauseIndex = i;
                        }
                    }
                    let clausesWritten = 0;
                    let pendingClauses = [];
                    while (clausesWritten < numClauses) {
                        let defaultClausesSkipped = 0;
                        for (let i = clausesWritten; i < numClauses; i++) {
                            const clause = caseBlock.clauses[i];
                            if (clause.kind === 292 /* CaseClause */) {
                                if (containsYield(clause.expression) && pendingClauses.length > 0) {
                                    break;
                                }
                                pendingClauses.push(factory2.createCaseClause(Debug.checkDefined(visitNode(clause.expression, visitor, isExpression)), [
                                    createInlineBreak(clauseLabels[i], 
                                    /*location*/
                                    clause.expression)
                                ]));
                            }
                            else {
                                defaultClausesSkipped++;
                            }
                        }
                        if (pendingClauses.length) {
                            emitStatement(factory2.createSwitchStatement(expression, factory2.createCaseBlock(pendingClauses)));
                            clausesWritten += pendingClauses.length;
                            pendingClauses = [];
                        }
                        if (defaultClausesSkipped > 0) {
                            clausesWritten += defaultClausesSkipped;
                            defaultClausesSkipped = 0;
                        }
                    }
                    if (defaultClauseIndex >= 0) {
                        emitBreak(clauseLabels[defaultClauseIndex]);
                    }
                    else {
                        emitBreak(endLabel);
                    }
                    for (let i = 0; i < numClauses; i++) {
                        markLabel(clauseLabels[i]);
                        transformAndEmitStatements(caseBlock.clauses[i].statements);
                    }
                    endSwitchBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function visitSwitchStatement(node) {
                if (inStatementContainingYield) {
                    beginScriptSwitchBlock();
                }
                node = visitEachChild(node, visitor, context);
                if (inStatementContainingYield) {
                    endSwitchBlock();
                }
                return node;
            }
            function transformAndEmitLabeledStatement(node) {
                if (containsYield(node)) {
                    beginLabeledBlock(idText(node.label));
                    transformAndEmitEmbeddedStatement(node.statement);
                    endLabeledBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            function visitLabeledStatement(node) {
                if (inStatementContainingYield) {
                    beginScriptLabeledBlock(idText(node.label));
                }
                node = visitEachChild(node, visitor, context);
                if (inStatementContainingYield) {
                    endLabeledBlock();
                }
                return node;
            }
            function transformAndEmitThrowStatement(node) {
                var _a2;
                emitThrow(Debug.checkDefined(visitNode((_a2 = node.expression) != null ? _a2 : factory2.createVoidZero(), visitor, isExpression)), 
                /*location*/
                node);
            }
            function transformAndEmitTryStatement(node) {
                if (containsYield(node)) {
                    beginExceptionBlock();
                    transformAndEmitEmbeddedStatement(node.tryBlock);
                    if (node.catchClause) {
                        beginCatchBlock(node.catchClause.variableDeclaration);
                        transformAndEmitEmbeddedStatement(node.catchClause.block);
                    }
                    if (node.finallyBlock) {
                        beginFinallyBlock();
                        transformAndEmitEmbeddedStatement(node.finallyBlock);
                    }
                    endExceptionBlock();
                }
                else {
                    emitStatement(visitEachChild(node, visitor, context));
                }
            }
            function containsYield(node) {
                return !!node && (node.transformFlags & 1048576 /* ContainsYield */) !== 0;
            }
            function countInitialNodesWithoutYield(nodes) {
                const numNodes = nodes.length;
                for (let i = 0; i < numNodes; i++) {
                    if (containsYield(nodes[i])) {
                        return i;
                    }
                }
                return -1;
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (hint === 1 /* Expression */) {
                    return substituteExpression(node);
                }
                return node;
            }
            function substituteExpression(node) {
                if (isIdentifier(node)) {
                    return substituteExpressionIdentifier(node);
                }
                return node;
            }
            function substituteExpressionIdentifier(node) {
                if (!isGeneratedIdentifier(node) && renamedCatchVariables && renamedCatchVariables.has(idText(node))) {
                    const original = getOriginalNode(node);
                    if (isIdentifier(original) && original.parent) {
                        const declaration = resolver.getReferencedValueDeclaration(original);
                        if (declaration) {
                            const name = renamedCatchVariableDeclarations[getOriginalNodeId(declaration)];
                            if (name) {
                                const clone2 = setParent(setTextRange(factory2.cloneNode(name), name), name.parent);
                                setSourceMapRange(clone2, node);
                                setCommentRange(clone2, node);
                                return clone2;
                            }
                        }
                    }
                }
                return node;
            }
            function cacheExpression(node) {
                if (isGeneratedIdentifier(node) || getEmitFlags(node) & 8192 /* HelperName */) {
                    return node;
                }
                const temp = factory2.createTempVariable(hoistVariableDeclaration);
                emitAssignment(temp, node, 
                /*location*/
                node);
                return temp;
            }
            function declareLocal(name) {
                const temp = name ? factory2.createUniqueName(name) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                hoistVariableDeclaration(temp);
                return temp;
            }
            function defineLabel() {
                if (!labelOffsets) {
                    labelOffsets = [];
                }
                const label = nextLabelId;
                nextLabelId++;
                labelOffsets[label] = -1;
                return label;
            }
            function markLabel(label) {
                Debug.assert(labelOffsets !== void 0, "No labels were defined.");
                labelOffsets[label] = operations ? operations.length : 0;
            }
            function beginBlock(block) {
                if (!blocks) {
                    blocks = [];
                    blockActions = [];
                    blockOffsets = [];
                    blockStack = [];
                }
                const index = blockActions.length;
                blockActions[index] = 0 /* Open */;
                blockOffsets[index] = operations ? operations.length : 0;
                blocks[index] = block;
                blockStack.push(block);
                return index;
            }
            function endBlock() {
                const block = peekBlock();
                if (block === void 0)
                    return Debug.fail("beginBlock was never called.");
                const index = blockActions.length;
                blockActions[index] = 1 /* Close */;
                blockOffsets[index] = operations ? operations.length : 0;
                blocks[index] = block;
                blockStack.pop();
                return block;
            }
            function peekBlock() {
                return lastOrUndefined(blockStack);
            }
            function peekBlockKind() {
                const block = peekBlock();
                return block && block.kind;
            }
            function beginWithBlock(expression) {
                const startLabel = defineLabel();
                const endLabel = defineLabel();
                markLabel(startLabel);
                beginBlock({
                    kind: 1 /* With */,
                    expression,
                    startLabel,
                    endLabel
                });
            }
            function endWithBlock() {
                Debug.assert(peekBlockKind() === 1 /* With */);
                const block = endBlock();
                markLabel(block.endLabel);
            }
            function beginExceptionBlock() {
                const startLabel = defineLabel();
                const endLabel = defineLabel();
                markLabel(startLabel);
                beginBlock({
                    kind: 0 /* Exception */,
                    state: 0 /* Try */,
                    startLabel,
                    endLabel
                });
                emitNop();
                return endLabel;
            }
            function beginCatchBlock(variable) {
                Debug.assert(peekBlockKind() === 0 /* Exception */);
                let name;
                if (isGeneratedIdentifier(variable.name)) {
                    name = variable.name;
                    hoistVariableDeclaration(variable.name);
                }
                else {
                    const text = idText(variable.name);
                    name = declareLocal(text);
                    if (!renamedCatchVariables) {
                        renamedCatchVariables = /* @__PURE__ */ new Map();
                        renamedCatchVariableDeclarations = [];
                        context.enableSubstitution(79 /* Identifier */);
                    }
                    renamedCatchVariables.set(text, true);
                    renamedCatchVariableDeclarations[getOriginalNodeId(variable)] = name;
                }
                const exception = peekBlock();
                Debug.assert(exception.state < 1 /* Catch */);
                const endLabel = exception.endLabel;
                emitBreak(endLabel);
                const catchLabel = defineLabel();
                markLabel(catchLabel);
                exception.state = 1 /* Catch */;
                exception.catchVariable = name;
                exception.catchLabel = catchLabel;
                emitAssignment(name, factory2.createCallExpression(factory2.createPropertyAccessExpression(state, "sent"), 
                /*typeArguments*/
                void 0, []));
                emitNop();
            }
            function beginFinallyBlock() {
                Debug.assert(peekBlockKind() === 0 /* Exception */);
                const exception = peekBlock();
                Debug.assert(exception.state < 2 /* Finally */);
                const endLabel = exception.endLabel;
                emitBreak(endLabel);
                const finallyLabel = defineLabel();
                markLabel(finallyLabel);
                exception.state = 2 /* Finally */;
                exception.finallyLabel = finallyLabel;
            }
            function endExceptionBlock() {
                Debug.assert(peekBlockKind() === 0 /* Exception */);
                const exception = endBlock();
                const state2 = exception.state;
                if (state2 < 2 /* Finally */) {
                    emitBreak(exception.endLabel);
                }
                else {
                    emitEndfinally();
                }
                markLabel(exception.endLabel);
                emitNop();
                exception.state = 3 /* Done */;
            }
            function beginScriptLoopBlock() {
                beginBlock({
                    kind: 3 /* Loop */,
                    isScript: true,
                    breakLabel: -1,
                    continueLabel: -1
                });
            }
            function beginLoopBlock(continueLabel) {
                const breakLabel = defineLabel();
                beginBlock({
                    kind: 3 /* Loop */,
                    isScript: false,
                    breakLabel,
                    continueLabel
                });
                return breakLabel;
            }
            function endLoopBlock() {
                Debug.assert(peekBlockKind() === 3 /* Loop */);
                const block = endBlock();
                const breakLabel = block.breakLabel;
                if (!block.isScript) {
                    markLabel(breakLabel);
                }
            }
            function beginScriptSwitchBlock() {
                beginBlock({
                    kind: 2 /* Switch */,
                    isScript: true,
                    breakLabel: -1
                });
            }
            function beginSwitchBlock() {
                const breakLabel = defineLabel();
                beginBlock({
                    kind: 2 /* Switch */,
                    isScript: false,
                    breakLabel
                });
                return breakLabel;
            }
            function endSwitchBlock() {
                Debug.assert(peekBlockKind() === 2 /* Switch */);
                const block = endBlock();
                const breakLabel = block.breakLabel;
                if (!block.isScript) {
                    markLabel(breakLabel);
                }
            }
            function beginScriptLabeledBlock(labelText) {
                beginBlock({
                    kind: 4 /* Labeled */,
                    isScript: true,
                    labelText,
                    breakLabel: -1
                });
            }
            function beginLabeledBlock(labelText) {
                const breakLabel = defineLabel();
                beginBlock({
                    kind: 4 /* Labeled */,
                    isScript: false,
                    labelText,
                    breakLabel
                });
            }
            function endLabeledBlock() {
                Debug.assert(peekBlockKind() === 4 /* Labeled */);
                const block = endBlock();
                if (!block.isScript) {
                    markLabel(block.breakLabel);
                }
            }
            function supportsUnlabeledBreak(block) {
                return block.kind === 2 /* Switch */ || block.kind === 3 /* Loop */;
            }
            function supportsLabeledBreakOrContinue(block) {
                return block.kind === 4 /* Labeled */;
            }
            function supportsUnlabeledContinue(block) {
                return block.kind === 3 /* Loop */;
            }
            function hasImmediateContainingLabeledBlock(labelText, start) {
                for (let j = start; j >= 0; j--) {
                    const containingBlock = blockStack[j];
                    if (supportsLabeledBreakOrContinue(containingBlock)) {
                        if (containingBlock.labelText === labelText) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }
                }
                return false;
            }
            function findBreakTarget(labelText) {
                if (blockStack) {
                    if (labelText) {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsLabeledBreakOrContinue(block) && block.labelText === labelText) {
                                return block.breakLabel;
                            }
                            else if (supportsUnlabeledBreak(block) && hasImmediateContainingLabeledBlock(labelText, i - 1)) {
                                return block.breakLabel;
                            }
                        }
                    }
                    else {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsUnlabeledBreak(block)) {
                                return block.breakLabel;
                            }
                        }
                    }
                }
                return 0;
            }
            function findContinueTarget(labelText) {
                if (blockStack) {
                    if (labelText) {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsUnlabeledContinue(block) && hasImmediateContainingLabeledBlock(labelText, i - 1)) {
                                return block.continueLabel;
                            }
                        }
                    }
                    else {
                        for (let i = blockStack.length - 1; i >= 0; i--) {
                            const block = blockStack[i];
                            if (supportsUnlabeledContinue(block)) {
                                return block.continueLabel;
                            }
                        }
                    }
                }
                return 0;
            }
            function createLabel(label) {
                if (label !== void 0 && label > 0) {
                    if (labelExpressions === void 0) {
                        labelExpressions = [];
                    }
                    const expression = factory2.createNumericLiteral(-1);
                    if (labelExpressions[label] === void 0) {
                        labelExpressions[label] = [expression];
                    }
                    else {
                        labelExpressions[label].push(expression);
                    }
                    return expression;
                }
                return factory2.createOmittedExpression();
            }
            function createInstruction(instruction) {
                const literal = factory2.createNumericLiteral(instruction);
                addSyntheticTrailingComment(literal, 3 /* MultiLineCommentTrivia */, getInstructionName(instruction));
                return literal;
            }
            function createInlineBreak(label, location) {
                Debug.assertLessThan(0, label, "Invalid label");
                return setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(3 /* Break */),
                    createLabel(label)
                ])), location);
            }
            function createInlineReturn(expression, location) {
                return setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression(expression ? [createInstruction(2 /* Return */), expression] : [createInstruction(2 /* Return */)])), location);
            }
            function createGeneratorResume(location) {
                return setTextRange(factory2.createCallExpression(factory2.createPropertyAccessExpression(state, "sent"), 
                /*typeArguments*/
                void 0, []), location);
            }
            function emitNop() {
                emitWorker(0 /* Nop */);
            }
            function emitStatement(node) {
                if (node) {
                    emitWorker(1 /* Statement */, [node]);
                }
                else {
                    emitNop();
                }
            }
            function emitAssignment(left, right, location) {
                emitWorker(2 /* Assign */, [left, right], location);
            }
            function emitBreak(label, location) {
                emitWorker(3 /* Break */, [label], location);
            }
            function emitBreakWhenTrue(label, condition, location) {
                emitWorker(4 /* BreakWhenTrue */, [label, condition], location);
            }
            function emitBreakWhenFalse(label, condition, location) {
                emitWorker(5 /* BreakWhenFalse */, [label, condition], location);
            }
            function emitYieldStar(expression, location) {
                emitWorker(7 /* YieldStar */, [expression], location);
            }
            function emitYield(expression, location) {
                emitWorker(6 /* Yield */, [expression], location);
            }
            function emitReturn(expression, location) {
                emitWorker(8 /* Return */, [expression], location);
            }
            function emitThrow(expression, location) {
                emitWorker(9 /* Throw */, [expression], location);
            }
            function emitEndfinally() {
                emitWorker(10 /* Endfinally */);
            }
            function emitWorker(code, args, location) {
                if (operations === void 0) {
                    operations = [];
                    operationArguments = [];
                    operationLocations = [];
                }
                if (labelOffsets === void 0) {
                    markLabel(defineLabel());
                }
                const operationIndex = operations.length;
                operations[operationIndex] = code;
                operationArguments[operationIndex] = args;
                operationLocations[operationIndex] = location;
            }
            function build2() {
                blockIndex = 0;
                labelNumber = 0;
                labelNumbers = void 0;
                lastOperationWasAbrupt = false;
                lastOperationWasCompletion = false;
                clauses = void 0;
                statements = void 0;
                exceptionBlockStack = void 0;
                currentExceptionBlock = void 0;
                withBlockStack = void 0;
                const buildResult = buildStatements();
                return emitHelpers().createGeneratorHelper(setEmitFlags(factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, state)], 
                /*type*/
                void 0, factory2.createBlock(buildResult, 
                /*multiLine*/
                buildResult.length > 0)), 1048576 /* ReuseTempVariableScope */));
            }
            function buildStatements() {
                if (operations) {
                    for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
                        writeOperation(operationIndex);
                    }
                    flushFinalLabel(operations.length);
                }
                else {
                    flushFinalLabel(0);
                }
                if (clauses) {
                    const labelExpression = factory2.createPropertyAccessExpression(state, "label");
                    const switchStatement = factory2.createSwitchStatement(labelExpression, factory2.createCaseBlock(clauses));
                    return [startOnNewLine(switchStatement)];
                }
                if (statements) {
                    return statements;
                }
                return [];
            }
            function flushLabel() {
                if (!statements) {
                    return;
                }
                appendLabel(
                /*markLabelEnd*/
                !lastOperationWasAbrupt);
                lastOperationWasAbrupt = false;
                lastOperationWasCompletion = false;
                labelNumber++;
            }
            function flushFinalLabel(operationIndex) {
                if (isFinalLabelReachable(operationIndex)) {
                    tryEnterLabel(operationIndex);
                    withBlockStack = void 0;
                    writeReturn(
                    /*expression*/
                    void 0, 
                    /*operationLocation*/
                    void 0);
                }
                if (statements && clauses) {
                    appendLabel(
                    /*markLabelEnd*/
                    false);
                }
                updateLabelExpressions();
            }
            function isFinalLabelReachable(operationIndex) {
                if (!lastOperationWasCompletion) {
                    return true;
                }
                if (!labelOffsets || !labelExpressions) {
                    return false;
                }
                for (let label = 0; label < labelOffsets.length; label++) {
                    if (labelOffsets[label] === operationIndex && labelExpressions[label]) {
                        return true;
                    }
                }
                return false;
            }
            function appendLabel(markLabelEnd) {
                if (!clauses) {
                    clauses = [];
                }
                if (statements) {
                    if (withBlockStack) {
                        for (let i = withBlockStack.length - 1; i >= 0; i--) {
                            const withBlock = withBlockStack[i];
                            statements = [factory2.createWithStatement(withBlock.expression, factory2.createBlock(statements))];
                        }
                    }
                    if (currentExceptionBlock) {
                        const { startLabel, catchLabel, finallyLabel, endLabel } = currentExceptionBlock;
                        statements.unshift(factory2.createExpressionStatement(factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createPropertyAccessExpression(state, "trys"), "push"), 
                        /*typeArguments*/
                        void 0, [
                            factory2.createArrayLiteralExpression([
                                createLabel(startLabel),
                                createLabel(catchLabel),
                                createLabel(finallyLabel),
                                createLabel(endLabel)
                            ])
                        ])));
                        currentExceptionBlock = void 0;
                    }
                    if (markLabelEnd) {
                        statements.push(factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(state, "label"), factory2.createNumericLiteral(labelNumber + 1))));
                    }
                }
                clauses.push(factory2.createCaseClause(factory2.createNumericLiteral(labelNumber), statements || []));
                statements = void 0;
            }
            function tryEnterLabel(operationIndex) {
                if (!labelOffsets) {
                    return;
                }
                for (let label = 0; label < labelOffsets.length; label++) {
                    if (labelOffsets[label] === operationIndex) {
                        flushLabel();
                        if (labelNumbers === void 0) {
                            labelNumbers = [];
                        }
                        if (labelNumbers[labelNumber] === void 0) {
                            labelNumbers[labelNumber] = [label];
                        }
                        else {
                            labelNumbers[labelNumber].push(label);
                        }
                    }
                }
            }
            function updateLabelExpressions() {
                if (labelExpressions !== void 0 && labelNumbers !== void 0) {
                    for (let labelNumber2 = 0; labelNumber2 < labelNumbers.length; labelNumber2++) {
                        const labels = labelNumbers[labelNumber2];
                        if (labels !== void 0) {
                            for (const label of labels) {
                                const expressions = labelExpressions[label];
                                if (expressions !== void 0) {
                                    for (const expression of expressions) {
                                        expression.text = String(labelNumber2);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            function tryEnterOrLeaveBlock(operationIndex) {
                if (blocks) {
                    for (; blockIndex < blockActions.length && blockOffsets[blockIndex] <= operationIndex; blockIndex++) {
                        const block = blocks[blockIndex];
                        const blockAction = blockActions[blockIndex];
                        switch (block.kind) {
                            case 0 /* Exception */:
                                if (blockAction === 0 /* Open */) {
                                    if (!exceptionBlockStack) {
                                        exceptionBlockStack = [];
                                    }
                                    if (!statements) {
                                        statements = [];
                                    }
                                    exceptionBlockStack.push(currentExceptionBlock);
                                    currentExceptionBlock = block;
                                }
                                else if (blockAction === 1 /* Close */) {
                                    currentExceptionBlock = exceptionBlockStack.pop();
                                }
                                break;
                            case 1 /* With */:
                                if (blockAction === 0 /* Open */) {
                                    if (!withBlockStack) {
                                        withBlockStack = [];
                                    }
                                    withBlockStack.push(block);
                                }
                                else if (blockAction === 1 /* Close */) {
                                    withBlockStack.pop();
                                }
                                break;
                        }
                    }
                }
            }
            function writeOperation(operationIndex) {
                tryEnterLabel(operationIndex);
                tryEnterOrLeaveBlock(operationIndex);
                if (lastOperationWasAbrupt) {
                    return;
                }
                lastOperationWasAbrupt = false;
                lastOperationWasCompletion = false;
                const opcode = operations[operationIndex];
                if (opcode === 0 /* Nop */) {
                    return;
                }
                else if (opcode === 10 /* Endfinally */) {
                    return writeEndfinally();
                }
                const args = operationArguments[operationIndex];
                if (opcode === 1 /* Statement */) {
                    return writeStatement(args[0]);
                }
                const location = operationLocations[operationIndex];
                switch (opcode) {
                    case 2 /* Assign */:
                        return writeAssign(args[0], args[1], location);
                    case 3 /* Break */:
                        return writeBreak(args[0], location);
                    case 4 /* BreakWhenTrue */:
                        return writeBreakWhenTrue(args[0], args[1], location);
                    case 5 /* BreakWhenFalse */:
                        return writeBreakWhenFalse(args[0], args[1], location);
                    case 6 /* Yield */:
                        return writeYield(args[0], location);
                    case 7 /* YieldStar */:
                        return writeYieldStar(args[0], location);
                    case 8 /* Return */:
                        return writeReturn(args[0], location);
                    case 9 /* Throw */:
                        return writeThrow(args[0], location);
                }
            }
            function writeStatement(statement) {
                if (statement) {
                    if (!statements) {
                        statements = [statement];
                    }
                    else {
                        statements.push(statement);
                    }
                }
            }
            function writeAssign(left, right, operationLocation) {
                writeStatement(setTextRange(factory2.createExpressionStatement(factory2.createAssignment(left, right)), operationLocation));
            }
            function writeThrow(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                lastOperationWasCompletion = true;
                writeStatement(setTextRange(factory2.createThrowStatement(expression), operationLocation));
            }
            function writeReturn(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                lastOperationWasCompletion = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression(expression ? [createInstruction(2 /* Return */), expression] : [createInstruction(2 /* Return */)])), operationLocation), 768 /* NoTokenSourceMaps */));
            }
            function writeBreak(label, operationLocation) {
                lastOperationWasAbrupt = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(3 /* Break */),
                    createLabel(label)
                ])), operationLocation), 768 /* NoTokenSourceMaps */));
            }
            function writeBreakWhenTrue(label, condition, operationLocation) {
                writeStatement(setEmitFlags(factory2.createIfStatement(condition, setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(3 /* Break */),
                    createLabel(label)
                ])), operationLocation), 768 /* NoTokenSourceMaps */)), 1 /* SingleLine */));
            }
            function writeBreakWhenFalse(label, condition, operationLocation) {
                writeStatement(setEmitFlags(factory2.createIfStatement(factory2.createLogicalNot(condition), setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(3 /* Break */),
                    createLabel(label)
                ])), operationLocation), 768 /* NoTokenSourceMaps */)), 1 /* SingleLine */));
            }
            function writeYield(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression(expression ? [createInstruction(4 /* Yield */), expression] : [createInstruction(4 /* Yield */)])), operationLocation), 768 /* NoTokenSourceMaps */));
            }
            function writeYieldStar(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(5 /* YieldStar */),
                    expression
                ])), operationLocation), 768 /* NoTokenSourceMaps */));
            }
            function writeEndfinally() {
                lastOperationWasAbrupt = true;
                writeStatement(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(7 /* Endfinally */)
                ])));
            }
        }