function transformES2015(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, startLexicalEnvironment, resumeLexicalEnvironment, endLexicalEnvironment, hoistVariableDeclaration } = context;
            const compilerOptions = context.getCompilerOptions();
            const resolver = context.getEmitResolver();
            const previousOnSubstituteNode = context.onSubstituteNode;
            const previousOnEmitNode = context.onEmitNode;
            context.onEmitNode = onEmitNode;
            context.onSubstituteNode = onSubstituteNode;
            let currentSourceFile;
            let currentText;
            let hierarchyFacts;
            let taggedTemplateStringDeclarations;
            function recordTaggedTemplateString(temp) {
                taggedTemplateStringDeclarations = append(taggedTemplateStringDeclarations, factory2.createVariableDeclaration(temp));
            }
            let convertedLoopState;
            let enabledSubstitutions;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                currentSourceFile = node;
                currentText = node.text;
                const visited = visitSourceFile(node);
                addEmitHelpers(visited, context.readEmitHelpers());
                currentSourceFile = void 0;
                currentText = void 0;
                taggedTemplateStringDeclarations = void 0;
                hierarchyFacts = 0 /* None */;
                return visited;
            }
            function enterSubtree(excludeFacts, includeFacts) {
                const ancestorFacts = hierarchyFacts;
                hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & 32767 /* AncestorFactsMask */;
                return ancestorFacts;
            }
            function exitSubtree(ancestorFacts, excludeFacts, includeFacts) {
                hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & -32768 /* SubtreeFactsMask */ | ancestorFacts;
            }
            function isReturnVoidStatementInConstructorWithCapturedSuper(node) {
                return (hierarchyFacts & 8192 /* ConstructorWithCapturedSuper */) !== 0 && node.kind === 250 /* ReturnStatement */ && !node.expression;
            }
            function isOrMayContainReturnCompletion(node) {
                return node.transformFlags & 4194304 /* ContainsHoistedDeclarationOrCompletion */ && (isReturnStatement(node) || isIfStatement(node) || isWithStatement(node) || isSwitchStatement(node) || isCaseBlock(node) || isCaseClause(node) || isDefaultClause(node) || isTryStatement(node) || isCatchClause(node) || isLabeledStatement(node) || isIterationStatement(node, 
                /*lookInLabeledStatements*/
                false) || isBlock(node));
            }
            function shouldVisitNode(node) {
                return (node.transformFlags & 1024 /* ContainsES2015 */) !== 0 || convertedLoopState !== void 0 || hierarchyFacts & 8192 /* ConstructorWithCapturedSuper */ && isOrMayContainReturnCompletion(node) || isIterationStatement(node, 
                /*lookInLabeledStatements*/
                false) && shouldConvertIterationStatement(node) || (getInternalEmitFlags(node) & 1 /* TypeScriptClassWrapper */) !== 0;
            }
            function visitor(node) {
                return shouldVisitNode(node) ? visitorWorker(node, 
                /*expressionResultIsUnused*/
                false) : node;
            }
            function visitorWithUnusedExpressionResult(node) {
                return shouldVisitNode(node) ? visitorWorker(node, 
                /*expressionResultIsUnused*/
                true) : node;
            }
            function classWrapperStatementVisitor(node) {
                if (shouldVisitNode(node)) {
                    const original = getOriginalNode(node);
                    if (isPropertyDeclaration(original) && hasStaticModifier(original)) {
                        const ancestorFacts = enterSubtree(32670 /* StaticInitializerExcludes */, 16449 /* StaticInitializerIncludes */);
                        const result = visitorWorker(node, 
                        /*expressionResultIsUnused*/
                        false);
                        exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                        return result;
                    }
                    return visitorWorker(node, 
                    /*expressionResultIsUnused*/
                    false);
                }
                return node;
            }
            function callExpressionVisitor(node) {
                if (node.kind === 106 /* SuperKeyword */) {
                    return visitSuperKeyword(
                    /*isExpressionOfCall*/
                    true);
                }
                return visitor(node);
            }
            function visitorWorker(node, expressionResultIsUnused2) {
                switch (node.kind) {
                    case 124 /* StaticKeyword */:
                        return void 0;
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node);
                    case 166 /* Parameter */:
                        return visitParameter(node);
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 216 /* ArrowFunction */:
                        return visitArrowFunction(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 79 /* Identifier */:
                        return visitIdentifier(node);
                    case 258 /* VariableDeclarationList */:
                        return visitVariableDeclarationList(node);
                    case 252 /* SwitchStatement */:
                        return visitSwitchStatement(node);
                    case 266 /* CaseBlock */:
                        return visitCaseBlock(node);
                    case 238 /* Block */:
                        return visitBlock(node, 
                        /*isFunctionBody*/
                        false);
                    case 249 /* BreakStatement */:
                    case 248 /* ContinueStatement */:
                        return visitBreakOrContinueStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                        return visitDoOrWhileStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 245 /* ForStatement */:
                        return visitForStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 295 /* CatchClause */:
                        return visitCatchClause(node);
                    case 300 /* ShorthandPropertyAssignment */:
                        return visitShorthandPropertyAssignment(node);
                    case 164 /* ComputedPropertyName */:
                        return visitComputedPropertyName(node);
                    case 206 /* ArrayLiteralExpression */:
                        return visitArrayLiteralExpression(node);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 211 /* NewExpression */:
                        return visitNewExpression(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, expressionResultIsUnused2);
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node, expressionResultIsUnused2);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node, expressionResultIsUnused2);
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 15 /* TemplateHead */:
                    case 16 /* TemplateMiddle */:
                    case 17 /* TemplateTail */:
                        return visitTemplateLiteral(node);
                    case 10 /* StringLiteral */:
                        return visitStringLiteral(node);
                    case 8 /* NumericLiteral */:
                        return visitNumericLiteral(node);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
                    case 225 /* TemplateExpression */:
                        return visitTemplateExpression(node);
                    case 226 /* YieldExpression */:
                        return visitYieldExpression(node);
                    case 227 /* SpreadElement */:
                        return visitSpreadElement(node);
                    case 106 /* SuperKeyword */:
                        return visitSuperKeyword(
                        /*isExpressionOfCall*/
                        false);
                    case 108 /* ThisKeyword */:
                        return visitThisKeyword(node);
                    case 233 /* MetaProperty */:
                        return visitMetaProperty(node);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return visitAccessorDeclaration(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 250 /* ReturnStatement */:
                        return visitReturnStatement(node);
                    case 219 /* VoidExpression */:
                        return visitVoidExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitSourceFile(node) {
                const ancestorFacts = enterSubtree(8064 /* SourceFileExcludes */, 64 /* SourceFileIncludes */);
                const prologue = [];
                const statements = [];
                startLexicalEnvironment();
                const statementOffset = factory2.copyPrologue(node.statements, prologue, 
                /*ensureUseStrict*/
                false, visitor);
                addRange(statements, visitNodes2(node.statements, visitor, isStatement, statementOffset));
                if (taggedTemplateStringDeclarations) {
                    statements.push(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(taggedTemplateStringDeclarations)));
                }
                factory2.mergeLexicalEnvironment(prologue, endLexicalEnvironment());
                insertCaptureThisForNodeIfNeeded(prologue, node);
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray(concatenate(prologue, statements)), node.statements));
            }
            function visitSwitchStatement(node) {
                if (convertedLoopState !== void 0) {
                    const savedAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                    convertedLoopState.allowedNonLabeledJumps |= 2 /* Break */;
                    const result = visitEachChild(node, visitor, context);
                    convertedLoopState.allowedNonLabeledJumps = savedAllowedNonLabeledJumps;
                    return result;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitCaseBlock(node) {
                const ancestorFacts = enterSubtree(7104 /* BlockScopeExcludes */, 0 /* BlockScopeIncludes */);
                const updated = visitEachChild(node, visitor, context);
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }
            function returnCapturedThis(node) {
                return setOriginalNode(factory2.createReturnStatement(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */)), node);
            }
            function visitReturnStatement(node) {
                if (convertedLoopState) {
                    convertedLoopState.nonLocalJumps |= 8 /* Return */;
                    if (isReturnVoidStatementInConstructorWithCapturedSuper(node)) {
                        node = returnCapturedThis(node);
                    }
                    return factory2.createReturnStatement(factory2.createObjectLiteralExpression([
                        factory2.createPropertyAssignment(factory2.createIdentifier("value"), node.expression ? Debug.checkDefined(visitNode(node.expression, visitor, isExpression)) : factory2.createVoidZero())
                    ]));
                }
                else if (isReturnVoidStatementInConstructorWithCapturedSuper(node)) {
                    return returnCapturedThis(node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitThisKeyword(node) {
                if (hierarchyFacts & 2 /* ArrowFunction */ && !(hierarchyFacts & 16384 /* StaticInitializer */)) {
                    hierarchyFacts |= 65536 /* CapturedLexicalThis */;
                }
                if (convertedLoopState) {
                    if (hierarchyFacts & 2 /* ArrowFunction */) {
                        convertedLoopState.containsLexicalThis = true;
                        return node;
                    }
                    return convertedLoopState.thisName || (convertedLoopState.thisName = factory2.createUniqueName("this"));
                }
                return node;
            }
            function visitVoidExpression(node) {
                return visitEachChild(node, visitorWithUnusedExpressionResult, context);
            }
            function visitIdentifier(node) {
                if (convertedLoopState) {
                    if (resolver.isArgumentsLocalBinding(node)) {
                        return convertedLoopState.argumentsName || (convertedLoopState.argumentsName = factory2.createUniqueName("arguments"));
                    }
                }
                if (node.flags & 128 /* IdentifierHasExtendedUnicodeEscape */) {
                    return setOriginalNode(setTextRange(factory2.createIdentifier(unescapeLeadingUnderscores(node.escapedText)), node), node);
                }
                return node;
            }
            function visitBreakOrContinueStatement(node) {
                if (convertedLoopState) {
                    const jump = node.kind === 249 /* BreakStatement */ ? 2 /* Break */ : 4 /* Continue */;
                    const canUseBreakOrContinue = node.label && convertedLoopState.labels && convertedLoopState.labels.get(idText(node.label)) || !node.label && convertedLoopState.allowedNonLabeledJumps & jump;
                    if (!canUseBreakOrContinue) {
                        let labelMarker;
                        const label = node.label;
                        if (!label) {
                            if (node.kind === 249 /* BreakStatement */) {
                                convertedLoopState.nonLocalJumps |= 2 /* Break */;
                                labelMarker = "break";
                            }
                            else {
                                convertedLoopState.nonLocalJumps |= 4 /* Continue */;
                                labelMarker = "continue";
                            }
                        }
                        else {
                            if (node.kind === 249 /* BreakStatement */) {
                                labelMarker = `break-${label.escapedText}`;
                                setLabeledJump(convertedLoopState, 
                                /*isBreak*/
                                true, idText(label), labelMarker);
                            }
                            else {
                                labelMarker = `continue-${label.escapedText}`;
                                setLabeledJump(convertedLoopState, 
                                /*isBreak*/
                                false, idText(label), labelMarker);
                            }
                        }
                        let returnExpression = factory2.createStringLiteral(labelMarker);
                        if (convertedLoopState.loopOutParameters.length) {
                            const outParams = convertedLoopState.loopOutParameters;
                            let expr;
                            for (let i = 0; i < outParams.length; i++) {
                                const copyExpr = copyOutParameter(outParams[i], 1 /* ToOutParameter */);
                                if (i === 0) {
                                    expr = copyExpr;
                                }
                                else {
                                    expr = factory2.createBinaryExpression(expr, 27 /* CommaToken */, copyExpr);
                                }
                            }
                            returnExpression = factory2.createBinaryExpression(expr, 27 /* CommaToken */, returnExpression);
                        }
                        return factory2.createReturnStatement(returnExpression);
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitClassDeclaration(node) {
                const variable = factory2.createVariableDeclaration(factory2.getLocalName(node, 
                /*allowComments*/
                true), 
                /*exclamationToken*/
                void 0, 
                /*type*/
                void 0, transformClassLikeDeclarationToExpression(node));
                setOriginalNode(variable, node);
                const statements = [];
                const statement = factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([variable]));
                setOriginalNode(statement, node);
                setTextRange(statement, node);
                startOnNewLine(statement);
                statements.push(statement);
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    const exportStatement = hasSyntacticModifier(node, 1024 /* Default */) ? factory2.createExportDefault(factory2.getLocalName(node)) : factory2.createExternalModuleExport(factory2.getLocalName(node));
                    setOriginalNode(exportStatement, statement);
                    statements.push(exportStatement);
                }
                const emitFlags = getEmitFlags(node);
                if ((emitFlags & 8388608 /* HasEndOfDeclarationMarker */) === 0) {
                    statements.push(factory2.createEndOfDeclarationMarker(node));
                    setEmitFlags(statement, emitFlags | 8388608 /* HasEndOfDeclarationMarker */);
                }
                return singleOrMany(statements);
            }
            function visitClassExpression(node) {
                return transformClassLikeDeclarationToExpression(node);
            }
            function transformClassLikeDeclarationToExpression(node) {
                if (node.name) {
                    enableSubstitutionsForBlockScopedBindings();
                }
                const extendsClauseElement = getClassExtendsHeritageElement(node);
                const classFunction = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, extendsClauseElement ? [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */))] : [], 
                /*type*/
                void 0, transformClassBody(node, extendsClauseElement));
                setEmitFlags(classFunction, getEmitFlags(node) & 131072 /* Indented */ | 1048576 /* ReuseTempVariableScope */);
                const inner = factory2.createPartiallyEmittedExpression(classFunction);
                setTextRangeEnd(inner, node.end);
                setEmitFlags(inner, 3072 /* NoComments */);
                const outer = factory2.createPartiallyEmittedExpression(inner);
                setTextRangeEnd(outer, skipTrivia(currentText, node.pos));
                setEmitFlags(outer, 3072 /* NoComments */);
                const result = factory2.createParenthesizedExpression(factory2.createCallExpression(outer, 
                /*typeArguments*/
                void 0, extendsClauseElement ? [Debug.checkDefined(visitNode(extendsClauseElement.expression, visitor, isExpression))] : []));
                addSyntheticLeadingComment(result, 3 /* MultiLineCommentTrivia */, "* @class ");
                return result;
            }
            function transformClassBody(node, extendsClauseElement) {
                const statements = [];
                const name = factory2.getInternalName(node);
                const constructorLikeName = isIdentifierANonContextualKeyword(name) ? factory2.getGeneratedNameForNode(name) : name;
                startLexicalEnvironment();
                addExtendsHelperIfNeeded(statements, node, extendsClauseElement);
                addConstructor(statements, node, constructorLikeName, extendsClauseElement);
                addClassMembers(statements, node);
                const closingBraceLocation = createTokenRange(skipTrivia(currentText, node.members.end), 19 /* CloseBraceToken */);
                const outer = factory2.createPartiallyEmittedExpression(constructorLikeName);
                setTextRangeEnd(outer, closingBraceLocation.end);
                setEmitFlags(outer, 3072 /* NoComments */);
                const statement = factory2.createReturnStatement(outer);
                setTextRangePos(statement, closingBraceLocation.pos);
                setEmitFlags(statement, 3072 /* NoComments */ | 768 /* NoTokenSourceMaps */);
                statements.push(statement);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const block = factory2.createBlock(setTextRange(factory2.createNodeArray(statements), 
                /*location*/
                node.members), 
                /*multiLine*/
                true);
                setEmitFlags(block, 3072 /* NoComments */);
                return block;
            }
            function addExtendsHelperIfNeeded(statements, node, extendsClauseElement) {
                if (extendsClauseElement) {
                    statements.push(setTextRange(factory2.createExpressionStatement(emitHelpers().createExtendsHelper(factory2.getInternalName(node))), 
                    /*location*/
                    extendsClauseElement));
                }
            }
            function addConstructor(statements, node, name, extendsClauseElement) {
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = enterSubtree(32662 /* ConstructorExcludes */, 73 /* ConstructorIncludes */);
                const constructor = getFirstConstructorWithBody(node);
                const hasSynthesizedSuper = hasSynthesizedDefaultSuperCall(constructor, extendsClauseElement !== void 0);
                const constructorFunction = factory2.createFunctionDeclaration(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, name, 
                /*typeParameters*/
                void 0, transformConstructorParameters(constructor, hasSynthesizedSuper), 
                /*type*/
                void 0, transformConstructorBody(constructor, node, extendsClauseElement, hasSynthesizedSuper));
                setTextRange(constructorFunction, constructor || node);
                if (extendsClauseElement) {
                    setEmitFlags(constructorFunction, 16 /* CapturesThis */);
                }
                statements.push(constructorFunction);
                exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
            }
            function transformConstructorParameters(constructor, hasSynthesizedSuper) {
                return visitParameterList(constructor && !hasSynthesizedSuper ? constructor.parameters : void 0, visitor, context) || [];
            }
            function createDefaultConstructorBody(node, isDerivedClass) {
                const statements = [];
                resumeLexicalEnvironment();
                factory2.mergeLexicalEnvironment(statements, endLexicalEnvironment());
                if (isDerivedClass) {
                    statements.push(factory2.createReturnStatement(createDefaultSuperCallOrThis()));
                }
                const statementsArray = factory2.createNodeArray(statements);
                setTextRange(statementsArray, node.members);
                const block = factory2.createBlock(statementsArray, 
                /*multiLine*/
                true);
                setTextRange(block, node);
                setEmitFlags(block, 3072 /* NoComments */);
                return block;
            }
            function transformConstructorBody(constructor, node, extendsClauseElement, hasSynthesizedSuper) {
                const isDerivedClass = !!extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== 104 /* NullKeyword */;
                if (!constructor)
                    return createDefaultConstructorBody(node, isDerivedClass);
                const prologue = [];
                const statements = [];
                resumeLexicalEnvironment();
                const existingPrologue = takeWhile(constructor.body.statements, isPrologueDirective);
                const { superCall, superStatementIndex } = findSuperCallAndStatementIndex(constructor.body.statements, existingPrologue);
                const postSuperStatementsStart = superStatementIndex === -1 ? existingPrologue.length : superStatementIndex + 1;
                let statementOffset = postSuperStatementsStart;
                if (!hasSynthesizedSuper)
                    statementOffset = factory2.copyStandardPrologue(constructor.body.statements, prologue, statementOffset, 
                    /*ensureUseStrict*/
                    false);
                if (!hasSynthesizedSuper)
                    statementOffset = factory2.copyCustomPrologue(constructor.body.statements, statements, statementOffset, visitor, 
                    /*filter*/
                    void 0);
                let superCallExpression;
                if (hasSynthesizedSuper) {
                    superCallExpression = createDefaultSuperCallOrThis();
                }
                else if (superCall) {
                    superCallExpression = visitSuperCallInBody(superCall);
                }
                if (superCallExpression) {
                    hierarchyFacts |= 8192 /* ConstructorWithCapturedSuper */;
                }
                addDefaultValueAssignmentsIfNeeded2(prologue, constructor);
                addRestParameterIfNeeded(prologue, constructor, hasSynthesizedSuper);
                addRange(statements, visitNodes2(constructor.body.statements, visitor, isStatement, 
                /*start*/
                statementOffset));
                factory2.mergeLexicalEnvironment(prologue, endLexicalEnvironment());
                insertCaptureNewTargetIfNeeded(prologue, constructor, 
                /*copyOnWrite*/
                false);
                if (isDerivedClass || superCallExpression) {
                    if (superCallExpression && postSuperStatementsStart === constructor.body.statements.length && !(constructor.body.transformFlags & 16384 /* ContainsLexicalThis */)) {
                        const superCall2 = cast(cast(superCallExpression, isBinaryExpression).left, isCallExpression);
                        const returnStatement = factory2.createReturnStatement(superCallExpression);
                        setCommentRange(returnStatement, getCommentRange(superCall2));
                        setEmitFlags(superCall2, 3072 /* NoComments */);
                        statements.push(returnStatement);
                    }
                    else {
                        if (superStatementIndex <= existingPrologue.length) {
                            insertCaptureThisForNode(statements, constructor, superCallExpression || createActualThis());
                        }
                        else {
                            insertCaptureThisForNode(prologue, constructor, createActualThis());
                            if (superCallExpression) {
                                insertSuperThisCaptureThisForNode(statements, superCallExpression);
                            }
                        }
                        if (!isSufficientlyCoveredByReturnStatements(constructor.body)) {
                            statements.push(factory2.createReturnStatement(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */)));
                        }
                    }
                }
                else {
                    insertCaptureThisForNodeIfNeeded(prologue, constructor);
                }
                const body = factory2.createBlock(setTextRange(factory2.createNodeArray([
                    ...existingPrologue,
                    ...prologue,
                    ...superStatementIndex <= existingPrologue.length ? emptyArray : visitNodes2(constructor.body.statements, visitor, isStatement, existingPrologue.length, superStatementIndex - existingPrologue.length),
                    ...statements
                ]), 
                /*location*/
                constructor.body.statements), 
                /*multiLine*/
                true);
                setTextRange(body, constructor.body);
                return body;
            }
            function findSuperCallAndStatementIndex(originalBodyStatements, existingPrologue) {
                for (let i = existingPrologue.length; i < originalBodyStatements.length; i += 1) {
                    const superCall = getSuperCallFromStatement(originalBodyStatements[i]);
                    if (superCall) {
                        return {
                            superCall,
                            superStatementIndex: i
                        };
                    }
                }
                return {
                    superStatementIndex: -1
                };
            }
            function isSufficientlyCoveredByReturnStatements(statement) {
                if (statement.kind === 250 /* ReturnStatement */) {
                    return true;
                }
                else if (statement.kind === 242 /* IfStatement */) {
                    const ifStatement = statement;
                    if (ifStatement.elseStatement) {
                        return isSufficientlyCoveredByReturnStatements(ifStatement.thenStatement) && isSufficientlyCoveredByReturnStatements(ifStatement.elseStatement);
                    }
                }
                else if (statement.kind === 238 /* Block */) {
                    const lastStatement = lastOrUndefined(statement.statements);
                    if (lastStatement && isSufficientlyCoveredByReturnStatements(lastStatement)) {
                        return true;
                    }
                }
                return false;
            }
            function createActualThis() {
                return setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */);
            }
            function createDefaultSuperCallOrThis() {
                return factory2.createLogicalOr(factory2.createLogicalAnd(factory2.createStrictInequality(factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */), factory2.createNull()), factory2.createFunctionApplyCall(factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */), createActualThis(), factory2.createIdentifier("arguments"))), createActualThis());
            }
            function visitParameter(node) {
                if (node.dotDotDotToken) {
                    return void 0;
                }
                else if (isBindingPattern(node.name)) {
                    return setOriginalNode(setTextRange(factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.getGeneratedNameForNode(node), 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0), 
                    /*location*/
                    node), 
                    /*original*/
                    node);
                }
                else if (node.initializer) {
                    return setOriginalNode(setTextRange(factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, node.name, 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0), 
                    /*location*/
                    node), 
                    /*original*/
                    node);
                }
                else {
                    return node;
                }
            }
            function hasDefaultValueOrBindingPattern(node) {
                return node.initializer !== void 0 || isBindingPattern(node.name);
            }
            function addDefaultValueAssignmentsIfNeeded2(statements, node) {
                if (!some(node.parameters, hasDefaultValueOrBindingPattern)) {
                    return false;
                }
                let added = false;
                for (const parameter of node.parameters) {
                    const { name, initializer, dotDotDotToken } = parameter;
                    if (dotDotDotToken) {
                        continue;
                    }
                    if (isBindingPattern(name)) {
                        added = insertDefaultValueAssignmentForBindingPattern(statements, parameter, name, initializer) || added;
                    }
                    else if (initializer) {
                        insertDefaultValueAssignmentForInitializer(statements, parameter, name, initializer);
                        added = true;
                    }
                }
                return added;
            }
            function insertDefaultValueAssignmentForBindingPattern(statements, parameter, name, initializer) {
                if (name.elements.length > 0) {
                    insertStatementAfterCustomPrologue(statements, setEmitFlags(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(flattenDestructuringBinding(parameter, visitor, context, 0 /* All */, factory2.getGeneratedNameForNode(parameter)))), 2097152 /* CustomPrologue */));
                    return true;
                }
                else if (initializer) {
                    insertStatementAfterCustomPrologue(statements, setEmitFlags(factory2.createExpressionStatement(factory2.createAssignment(factory2.getGeneratedNameForNode(parameter), Debug.checkDefined(visitNode(initializer, visitor, isExpression)))), 2097152 /* CustomPrologue */));
                    return true;
                }
                return false;
            }
            function insertDefaultValueAssignmentForInitializer(statements, parameter, name, initializer) {
                initializer = Debug.checkDefined(visitNode(initializer, visitor, isExpression));
                const statement = factory2.createIfStatement(factory2.createTypeCheck(factory2.cloneNode(name), "undefined"), setEmitFlags(setTextRange(factory2.createBlock([
                    factory2.createExpressionStatement(setEmitFlags(setTextRange(factory2.createAssignment(
                    // TODO(rbuckton): Does this need to be parented?
                    setEmitFlags(setParent(setTextRange(factory2.cloneNode(name), name), name.parent), 96 /* NoSourceMap */), setEmitFlags(initializer, 96 /* NoSourceMap */ | getEmitFlags(initializer) | 3072 /* NoComments */)), parameter), 3072 /* NoComments */))
                ]), parameter), 1 /* SingleLine */ | 64 /* NoTrailingSourceMap */ | 768 /* NoTokenSourceMaps */ | 3072 /* NoComments */));
                startOnNewLine(statement);
                setTextRange(statement, parameter);
                setEmitFlags(statement, 768 /* NoTokenSourceMaps */ | 64 /* NoTrailingSourceMap */ | 2097152 /* CustomPrologue */ | 3072 /* NoComments */);
                insertStatementAfterCustomPrologue(statements, statement);
            }
            function shouldAddRestParameter(node, inConstructorWithSynthesizedSuper) {
                return !!(node && node.dotDotDotToken && !inConstructorWithSynthesizedSuper);
            }
            function addRestParameterIfNeeded(statements, node, inConstructorWithSynthesizedSuper) {
                const prologueStatements = [];
                const parameter = lastOrUndefined(node.parameters);
                if (!shouldAddRestParameter(parameter, inConstructorWithSynthesizedSuper)) {
                    return false;
                }
                const declarationName = parameter.name.kind === 79 /* Identifier */ ? setParent(setTextRange(factory2.cloneNode(parameter.name), parameter.name), parameter.name.parent) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                setEmitFlags(declarationName, 96 /* NoSourceMap */);
                const expressionName = parameter.name.kind === 79 /* Identifier */ ? factory2.cloneNode(parameter.name) : declarationName;
                const restIndex = node.parameters.length - 1;
                const temp = factory2.createLoopVariable();
                prologueStatements.push(setEmitFlags(setTextRange(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(declarationName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createArrayLiteralExpression([]))
                ])), 
                /*location*/
                parameter), 2097152 /* CustomPrologue */));
                const forStatement = factory2.createForStatement(setTextRange(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(temp, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createNumericLiteral(restIndex))
                ]), parameter), setTextRange(factory2.createLessThan(temp, factory2.createPropertyAccessExpression(factory2.createIdentifier("arguments"), "length")), parameter), setTextRange(factory2.createPostfixIncrement(temp), parameter), factory2.createBlock([
                    startOnNewLine(setTextRange(factory2.createExpressionStatement(factory2.createAssignment(factory2.createElementAccessExpression(expressionName, restIndex === 0 ? temp : factory2.createSubtract(temp, factory2.createNumericLiteral(restIndex))), factory2.createElementAccessExpression(factory2.createIdentifier("arguments"), temp))), 
                    /*location*/
                    parameter))
                ]));
                setEmitFlags(forStatement, 2097152 /* CustomPrologue */);
                startOnNewLine(forStatement);
                prologueStatements.push(forStatement);
                if (parameter.name.kind !== 79 /* Identifier */) {
                    prologueStatements.push(setEmitFlags(setTextRange(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(flattenDestructuringBinding(parameter, visitor, context, 0 /* All */, expressionName))), parameter), 2097152 /* CustomPrologue */));
                }
                insertStatementsAfterCustomPrologue(statements, prologueStatements);
                return true;
            }
            function insertCaptureThisForNodeIfNeeded(statements, node) {
                if (hierarchyFacts & 65536 /* CapturedLexicalThis */ && node.kind !== 216 /* ArrowFunction */) {
                    insertCaptureThisForNode(statements, node, factory2.createThis());
                    return true;
                }
                return false;
            }
            function insertSuperThisCaptureThisForNode(statements, superExpression) {
                enableSubstitutionsForCapturedThis();
                const assignSuperExpression = factory2.createExpressionStatement(factory2.createBinaryExpression(factory2.createThis(), 63 /* EqualsToken */, superExpression));
                insertStatementAfterCustomPrologue(statements, assignSuperExpression);
                setCommentRange(assignSuperExpression, getOriginalNode(superExpression).parent);
            }
            function insertCaptureThisForNode(statements, node, initializer) {
                enableSubstitutionsForCapturedThis();
                const captureThisStatement = factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */), 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer)
                ]));
                setEmitFlags(captureThisStatement, 3072 /* NoComments */ | 2097152 /* CustomPrologue */);
                setSourceMapRange(captureThisStatement, node);
                insertStatementAfterCustomPrologue(statements, captureThisStatement);
            }
            function insertCaptureNewTargetIfNeeded(statements, node, copyOnWrite) {
                if (hierarchyFacts & 32768 /* NewTarget */) {
                    let newTarget;
                    switch (node.kind) {
                        case 216 /* ArrowFunction */:
                            return statements;
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            newTarget = factory2.createVoidZero();
                            break;
                        case 173 /* Constructor */:
                            newTarget = factory2.createPropertyAccessExpression(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), "constructor");
                            break;
                        case 259 /* FunctionDeclaration */:
                        case 215 /* FunctionExpression */:
                            newTarget = factory2.createConditionalExpression(factory2.createLogicalAnd(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), factory2.createBinaryExpression(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), 102 /* InstanceOfKeyword */, factory2.getLocalName(node))), 
                            /*questionToken*/
                            void 0, factory2.createPropertyAccessExpression(setEmitFlags(factory2.createThis(), 8 /* NoSubstitution */), "constructor"), 
                            /*colonToken*/
                            void 0, factory2.createVoidZero());
                            break;
                        default:
                            return Debug.failBadSyntaxKind(node);
                    }
                    const captureNewTargetStatement = factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(factory2.createUniqueName("_newTarget", 16 /* Optimistic */ | 32 /* FileLevel */), 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, newTarget)
                    ]));
                    setEmitFlags(captureNewTargetStatement, 3072 /* NoComments */ | 2097152 /* CustomPrologue */);
                    if (copyOnWrite) {
                        statements = statements.slice();
                    }
                    insertStatementAfterCustomPrologue(statements, captureNewTargetStatement);
                }
                return statements;
            }
            function addClassMembers(statements, node) {
                for (const member of node.members) {
                    switch (member.kind) {
                        case 237 /* SemicolonClassElement */:
                            statements.push(transformSemicolonClassElementToStatement(member));
                            break;
                        case 171 /* MethodDeclaration */:
                            statements.push(transformClassMethodDeclarationToStatement(getClassMemberPrefix(node, member), member, node));
                            break;
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            const accessors = getAllAccessorDeclarations(node.members, member);
                            if (member === accessors.firstAccessor) {
                                statements.push(transformAccessorsToStatement(getClassMemberPrefix(node, member), accessors, node));
                            }
                            break;
                        case 173 /* Constructor */:
                        case 172 /* ClassStaticBlockDeclaration */:
                            break;
                        default:
                            Debug.failBadSyntaxKind(member, currentSourceFile && currentSourceFile.fileName);
                            break;
                    }
                }
            }
            function transformSemicolonClassElementToStatement(member) {
                return setTextRange(factory2.createEmptyStatement(), member);
            }
            function transformClassMethodDeclarationToStatement(receiver, member, container) {
                const commentRange = getCommentRange(member);
                const sourceMapRange = getSourceMapRange(member);
                const memberFunction = transformFunctionLikeToExpression(member, 
                /*location*/
                member, 
                /*name*/
                void 0, container);
                const propertyName = visitNode(member.name, visitor, isPropertyName);
                Debug.assert(propertyName);
                let e;
                if (!isPrivateIdentifier(propertyName) && getUseDefineForClassFields(context.getCompilerOptions())) {
                    const name = isComputedPropertyName(propertyName) ? propertyName.expression : isIdentifier(propertyName) ? factory2.createStringLiteral(unescapeLeadingUnderscores(propertyName.escapedText)) : propertyName;
                    e = factory2.createObjectDefinePropertyCall(receiver, name, factory2.createPropertyDescriptor({ value: memberFunction, enumerable: false, writable: true, configurable: true }));
                }
                else {
                    const memberName = createMemberAccessForPropertyName(factory2, receiver, propertyName, 
                    /*location*/
                    member.name);
                    e = factory2.createAssignment(memberName, memberFunction);
                }
                setEmitFlags(memberFunction, 3072 /* NoComments */);
                setSourceMapRange(memberFunction, sourceMapRange);
                const statement = setTextRange(factory2.createExpressionStatement(e), 
                /*location*/
                member);
                setOriginalNode(statement, member);
                setCommentRange(statement, commentRange);
                setEmitFlags(statement, 96 /* NoSourceMap */);
                return statement;
            }
            function transformAccessorsToStatement(receiver, accessors, container) {
                const statement = factory2.createExpressionStatement(transformAccessorsToExpression(receiver, accessors, container, 
                /*startsOnNewLine*/
                false));
                setEmitFlags(statement, 3072 /* NoComments */);
                setSourceMapRange(statement, getSourceMapRange(accessors.firstAccessor));
                return statement;
            }
            function transformAccessorsToExpression(receiver, { firstAccessor, getAccessor, setAccessor }, container, startsOnNewLine) {
                const target = setParent(setTextRange(factory2.cloneNode(receiver), receiver), receiver.parent);
                setEmitFlags(target, 3072 /* NoComments */ | 64 /* NoTrailingSourceMap */);
                setSourceMapRange(target, firstAccessor.name);
                const visitedAccessorName = visitNode(firstAccessor.name, visitor, isPropertyName);
                Debug.assert(visitedAccessorName);
                if (isPrivateIdentifier(visitedAccessorName)) {
                    return Debug.failBadSyntaxKind(visitedAccessorName, "Encountered unhandled private identifier while transforming ES2015.");
                }
                const propertyName = createExpressionForPropertyName(factory2, visitedAccessorName);
                setEmitFlags(propertyName, 3072 /* NoComments */ | 32 /* NoLeadingSourceMap */);
                setSourceMapRange(propertyName, firstAccessor.name);
                const properties = [];
                if (getAccessor) {
                    const getterFunction = transformFunctionLikeToExpression(getAccessor, 
                    /*location*/
                    void 0, 
                    /*name*/
                    void 0, container);
                    setSourceMapRange(getterFunction, getSourceMapRange(getAccessor));
                    setEmitFlags(getterFunction, 1024 /* NoLeadingComments */);
                    const getter = factory2.createPropertyAssignment("get", getterFunction);
                    setCommentRange(getter, getCommentRange(getAccessor));
                    properties.push(getter);
                }
                if (setAccessor) {
                    const setterFunction = transformFunctionLikeToExpression(setAccessor, 
                    /*location*/
                    void 0, 
                    /*name*/
                    void 0, container);
                    setSourceMapRange(setterFunction, getSourceMapRange(setAccessor));
                    setEmitFlags(setterFunction, 1024 /* NoLeadingComments */);
                    const setter = factory2.createPropertyAssignment("set", setterFunction);
                    setCommentRange(setter, getCommentRange(setAccessor));
                    properties.push(setter);
                }
                properties.push(factory2.createPropertyAssignment("enumerable", getAccessor || setAccessor ? factory2.createFalse() : factory2.createTrue()), factory2.createPropertyAssignment("configurable", factory2.createTrue()));
                const call = factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "defineProperty"), 
                /*typeArguments*/
                void 0, [
                    target,
                    propertyName,
                    factory2.createObjectLiteralExpression(properties, 
                    /*multiLine*/
                    true)
                ]);
                if (startsOnNewLine) {
                    startOnNewLine(call);
                }
                return call;
            }
            function visitArrowFunction(node) {
                if (node.transformFlags & 16384 /* ContainsLexicalThis */ && !(hierarchyFacts & 16384 /* StaticInitializer */)) {
                    hierarchyFacts |= 65536 /* CapturedLexicalThis */;
                }
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = enterSubtree(15232 /* ArrowFunctionExcludes */, 66 /* ArrowFunctionIncludes */);
                const func = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, transformFunctionBody2(node));
                setTextRange(func, node);
                setOriginalNode(func, node);
                setEmitFlags(func, 16 /* CapturesThis */);
                exitSubtree(ancestorFacts, 0 /* ArrowFunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
                return func;
            }
            function visitFunctionExpression(node) {
                const ancestorFacts = getEmitFlags(node) & 524288 /* AsyncFunctionBody */ ? enterSubtree(32662 /* AsyncFunctionBodyExcludes */, 69 /* AsyncFunctionBodyIncludes */) : enterSubtree(32670 /* FunctionExcludes */, 65 /* FunctionIncludes */);
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const parameters = visitParameterList(node.parameters, visitor, context);
                const body = transformFunctionBody2(node);
                const name = hierarchyFacts & 32768 /* NewTarget */ ? factory2.getLocalName(node) : node.name;
                exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
                return factory2.updateFunctionExpression(node, 
                /*modifiers*/
                void 0, node.asteriskToken, name, 
                /*typeParameters*/
                void 0, parameters, 
                /*type*/
                void 0, body);
            }
            function visitFunctionDeclaration(node) {
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = enterSubtree(32670 /* FunctionExcludes */, 65 /* FunctionIncludes */);
                const parameters = visitParameterList(node.parameters, visitor, context);
                const body = transformFunctionBody2(node);
                const name = hierarchyFacts & 32768 /* NewTarget */ ? factory2.getLocalName(node) : node.name;
                exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
                return factory2.updateFunctionDeclaration(node, visitNodes2(node.modifiers, visitor, isModifier), node.asteriskToken, name, 
                /*typeParameters*/
                void 0, parameters, 
                /*type*/
                void 0, body);
            }
            function transformFunctionLikeToExpression(node, location, name, container) {
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = container && isClassLike(container) && !isStatic(node) ? enterSubtree(32670 /* FunctionExcludes */, 65 /* FunctionIncludes */ | 8 /* NonStaticClassElement */) : enterSubtree(32670 /* FunctionExcludes */, 65 /* FunctionIncludes */);
                const parameters = visitParameterList(node.parameters, visitor, context);
                const body = transformFunctionBody2(node);
                if (hierarchyFacts & 32768 /* NewTarget */ && !name && (node.kind === 259 /* FunctionDeclaration */ || node.kind === 215 /* FunctionExpression */)) {
                    name = factory2.getGeneratedNameForNode(node);
                }
                exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
                return setOriginalNode(setTextRange(factory2.createFunctionExpression(
                /*modifiers*/
                void 0, node.asteriskToken, name, 
                /*typeParameters*/
                void 0, parameters, 
                /*type*/
                void 0, body), location), 
                /*original*/
                node);
            }
            function transformFunctionBody2(node) {
                let multiLine = false;
                let singleLine = false;
                let statementsLocation;
                let closeBraceLocation;
                const prologue = [];
                const statements = [];
                const body = node.body;
                let statementOffset;
                resumeLexicalEnvironment();
                if (isBlock(body)) {
                    statementOffset = factory2.copyStandardPrologue(body.statements, prologue, 0, 
                    /*ensureUseStrict*/
                    false);
                    statementOffset = factory2.copyCustomPrologue(body.statements, statements, statementOffset, visitor, isHoistedFunction);
                    statementOffset = factory2.copyCustomPrologue(body.statements, statements, statementOffset, visitor, isHoistedVariableStatement);
                }
                multiLine = addDefaultValueAssignmentsIfNeeded2(statements, node) || multiLine;
                multiLine = addRestParameterIfNeeded(statements, node, 
                /*inConstructorWithSynthesizedSuper*/
                false) || multiLine;
                if (isBlock(body)) {
                    statementOffset = factory2.copyCustomPrologue(body.statements, statements, statementOffset, visitor);
                    statementsLocation = body.statements;
                    addRange(statements, visitNodes2(body.statements, visitor, isStatement, statementOffset));
                    if (!multiLine && body.multiLine) {
                        multiLine = true;
                    }
                }
                else {
                    Debug.assert(node.kind === 216 /* ArrowFunction */);
                    statementsLocation = moveRangeEnd(body, -1);
                    const equalsGreaterThanToken = node.equalsGreaterThanToken;
                    if (!nodeIsSynthesized(equalsGreaterThanToken) && !nodeIsSynthesized(body)) {
                        if (rangeEndIsOnSameLineAsRangeStart(equalsGreaterThanToken, body, currentSourceFile)) {
                            singleLine = true;
                        }
                        else {
                            multiLine = true;
                        }
                    }
                    const expression = visitNode(body, visitor, isExpression);
                    const returnStatement = factory2.createReturnStatement(expression);
                    setTextRange(returnStatement, body);
                    moveSyntheticComments(returnStatement, body);
                    setEmitFlags(returnStatement, 768 /* NoTokenSourceMaps */ | 64 /* NoTrailingSourceMap */ | 2048 /* NoTrailingComments */);
                    statements.push(returnStatement);
                    closeBraceLocation = body;
                }
                factory2.mergeLexicalEnvironment(prologue, endLexicalEnvironment());
                insertCaptureNewTargetIfNeeded(prologue, node, 
                /*copyOnWrite*/
                false);
                insertCaptureThisForNodeIfNeeded(prologue, node);
                if (some(prologue)) {
                    multiLine = true;
                }
                statements.unshift(...prologue);
                if (isBlock(body) && arrayIsEqualTo(statements, body.statements)) {
                    return body;
                }
                const block = factory2.createBlock(setTextRange(factory2.createNodeArray(statements), statementsLocation), multiLine);
                setTextRange(block, node.body);
                if (!multiLine && singleLine) {
                    setEmitFlags(block, 1 /* SingleLine */);
                }
                if (closeBraceLocation) {
                    setTokenSourceMapRange(block, 19 /* CloseBraceToken */, closeBraceLocation);
                }
                setOriginalNode(block, node.body);
                return block;
            }
            function visitBlock(node, isFunctionBody2) {
                if (isFunctionBody2) {
                    return visitEachChild(node, visitor, context);
                }
                const ancestorFacts = hierarchyFacts & 256 /* IterationStatement */ ? enterSubtree(7104 /* IterationStatementBlockExcludes */, 512 /* IterationStatementBlockIncludes */) : enterSubtree(6976 /* BlockExcludes */, 128 /* BlockIncludes */);
                const updated = visitEachChild(node, visitor, context);
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }
            function visitExpressionStatement(node) {
                return visitEachChild(node, visitorWithUnusedExpressionResult, context);
            }
            function visitParenthesizedExpression(node, expressionResultIsUnused2) {
                return visitEachChild(node, expressionResultIsUnused2 ? visitorWithUnusedExpressionResult : visitor, context);
            }
            function visitBinaryExpression(node, expressionResultIsUnused2) {
                if (isDestructuringAssignment(node)) {
                    return flattenDestructuringAssignment(node, visitor, context, 0 /* All */, !expressionResultIsUnused2);
                }
                if (node.operatorToken.kind === 27 /* CommaToken */) {
                    return factory2.updateBinaryExpression(node, Debug.checkDefined(visitNode(node.left, visitorWithUnusedExpressionResult, isExpression)), node.operatorToken, Debug.checkDefined(visitNode(node.right, expressionResultIsUnused2 ? visitorWithUnusedExpressionResult : visitor, isExpression)));
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
                        Debug.assert(visited);
                        result.push(visited);
                    }
                }
                const elements = result ? setTextRange(factory2.createNodeArray(result), node.elements) : node.elements;
                return factory2.updateCommaListExpression(node, elements);
            }
            function isVariableStatementOfTypeScriptClassWrapper(node) {
                return node.declarationList.declarations.length === 1 && !!node.declarationList.declarations[0].initializer && !!(getInternalEmitFlags(node.declarationList.declarations[0].initializer) & 1 /* TypeScriptClassWrapper */);
            }
            function visitVariableStatement(node) {
                const ancestorFacts = enterSubtree(0 /* None */, hasSyntacticModifier(node, 1 /* Export */) ? 32 /* ExportedVariableStatement */ : 0 /* None */);
                let updated;
                if (convertedLoopState && (node.declarationList.flags & 3 /* BlockScoped */) === 0 && !isVariableStatementOfTypeScriptClassWrapper(node)) {
                    let assignments;
                    for (const decl of node.declarationList.declarations) {
                        hoistVariableDeclarationDeclaredInConvertedLoop(convertedLoopState, decl);
                        if (decl.initializer) {
                            let assignment;
                            if (isBindingPattern(decl.name)) {
                                assignment = flattenDestructuringAssignment(decl, visitor, context, 0 /* All */);
                            }
                            else {
                                assignment = factory2.createBinaryExpression(decl.name, 63 /* EqualsToken */, Debug.checkDefined(visitNode(decl.initializer, visitor, isExpression)));
                                setTextRange(assignment, decl);
                            }
                            assignments = append(assignments, assignment);
                        }
                    }
                    if (assignments) {
                        updated = setTextRange(factory2.createExpressionStatement(factory2.inlineExpressions(assignments)), node);
                    }
                    else {
                        updated = void 0;
                    }
                }
                else {
                    updated = visitEachChild(node, visitor, context);
                }
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }
            function visitVariableDeclarationList(node) {
                if (node.flags & 3 /* BlockScoped */ || node.transformFlags & 524288 /* ContainsBindingPattern */) {
                    if (node.flags & 3 /* BlockScoped */) {
                        enableSubstitutionsForBlockScopedBindings();
                    }
                    const declarations = visitNodes2(node.declarations, node.flags & 1 /* Let */ ? visitVariableDeclarationInLetDeclarationList : visitVariableDeclaration, isVariableDeclaration);
                    const declarationList = factory2.createVariableDeclarationList(declarations);
                    setOriginalNode(declarationList, node);
                    setTextRange(declarationList, node);
                    setCommentRange(declarationList, node);
                    if (node.transformFlags & 524288 /* ContainsBindingPattern */ && (isBindingPattern(node.declarations[0].name) || isBindingPattern(last(node.declarations).name))) {
                        setSourceMapRange(declarationList, getRangeUnion(declarations));
                    }
                    return declarationList;
                }
                return visitEachChild(node, visitor, context);
            }
            function getRangeUnion(declarations) {
                let pos = -1, end = -1;
                for (const node of declarations) {
                    pos = pos === -1 ? node.pos : node.pos === -1 ? pos : Math.min(pos, node.pos);
                    end = Math.max(end, node.end);
                }
                return createRange(pos, end);
            }
            function shouldEmitExplicitInitializerForLetDeclaration(node) {
                const flags = resolver.getNodeCheckFlags(node);
                const isCapturedInFunction = flags & 16384 /* CapturedBlockScopedBinding */;
                const isDeclaredInLoop = flags & 32768 /* BlockScopedBindingInLoop */;
                const emittedAsTopLevel = (hierarchyFacts & 64 /* TopLevel */) !== 0 || isCapturedInFunction && isDeclaredInLoop && (hierarchyFacts & 512 /* IterationStatementBlock */) !== 0;
                const emitExplicitInitializer = !emittedAsTopLevel && (hierarchyFacts & 4096 /* ForInOrForOfStatement */) === 0 && (!resolver.isDeclarationWithCollidingName(node) || isDeclaredInLoop && !isCapturedInFunction && (hierarchyFacts & (2048 /* ForStatement */ | 4096 /* ForInOrForOfStatement */)) === 0);
                return emitExplicitInitializer;
            }
            function visitVariableDeclarationInLetDeclarationList(node) {
                const name = node.name;
                if (isBindingPattern(name)) {
                    return visitVariableDeclaration(node);
                }
                if (!node.initializer && shouldEmitExplicitInitializerForLetDeclaration(node)) {
                    return factory2.updateVariableDeclaration(node, node.name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createVoidZero());
                }
                return visitEachChild(node, visitor, context);
            }
            function visitVariableDeclaration(node) {
                const ancestorFacts = enterSubtree(32 /* ExportedVariableStatement */, 0 /* None */);
                let updated;
                if (isBindingPattern(node.name)) {
                    updated = flattenDestructuringBinding(node, visitor, context, 0 /* All */, 
                    /*value*/
                    void 0, (ancestorFacts & 32 /* ExportedVariableStatement */) !== 0);
                }
                else {
                    updated = visitEachChild(node, visitor, context);
                }
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }
            function recordLabel(node) {
                convertedLoopState.labels.set(idText(node.label), true);
            }
            function resetLabel(node) {
                convertedLoopState.labels.set(idText(node.label), false);
            }
            function visitLabeledStatement(node) {
                if (convertedLoopState && !convertedLoopState.labels) {
                    convertedLoopState.labels = /* @__PURE__ */ new Map();
                }
                const statement = unwrapInnermostStatementOfLabel(node, convertedLoopState && recordLabel);
                return isIterationStatement(statement, 
                /*lookInLabeledStatements*/
                false) ? visitIterationStatement(statement, 
                /*outermostLabeledStatement*/
                node) : factory2.restoreEnclosingLabel(Debug.checkDefined(visitNode(statement, visitor, isStatement, factory2.liftToBlock)), node, convertedLoopState && resetLabel);
            }
            function visitIterationStatement(node, outermostLabeledStatement) {
                switch (node.kind) {
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                        return visitDoOrWhileStatement(node, outermostLabeledStatement);
                    case 245 /* ForStatement */:
                        return visitForStatement(node, outermostLabeledStatement);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node, outermostLabeledStatement);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node, outermostLabeledStatement);
                }
            }
            function visitIterationStatementWithFacts(excludeFacts, includeFacts, node, outermostLabeledStatement, convert) {
                const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
                const updated = convertIterationStatementBodyIfNecessary(node, outermostLabeledStatement, ancestorFacts, convert);
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }
            function visitDoOrWhileStatement(node, outermostLabeledStatement) {
                return visitIterationStatementWithFacts(0 /* DoOrWhileStatementExcludes */, 1280 /* DoOrWhileStatementIncludes */, node, outermostLabeledStatement);
            }
            function visitForStatement(node, outermostLabeledStatement) {
                return visitIterationStatementWithFacts(5056 /* ForStatementExcludes */, 3328 /* ForStatementIncludes */, node, outermostLabeledStatement);
            }
            function visitEachChildOfForStatement2(node) {
                return factory2.updateForStatement(node, visitNode(node.initializer, visitorWithUnusedExpressionResult, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, visitorWithUnusedExpressionResult, isExpression), Debug.checkDefined(visitNode(node.statement, visitor, isStatement, factory2.liftToBlock)));
            }
            function visitForInStatement(node, outermostLabeledStatement) {
                return visitIterationStatementWithFacts(3008 /* ForInOrForOfStatementExcludes */, 5376 /* ForInOrForOfStatementIncludes */, node, outermostLabeledStatement);
            }
            function visitForOfStatement(node, outermostLabeledStatement) {
                return visitIterationStatementWithFacts(3008 /* ForInOrForOfStatementExcludes */, 5376 /* ForInOrForOfStatementIncludes */, node, outermostLabeledStatement, compilerOptions.downlevelIteration ? convertForOfStatementForIterable : convertForOfStatementForArray);
            }
            function convertForOfStatementHead(node, boundValue, convertedLoopBodyStatements) {
                const statements = [];
                const initializer = node.initializer;
                if (isVariableDeclarationList(initializer)) {
                    if (node.initializer.flags & 3 /* BlockScoped */) {
                        enableSubstitutionsForBlockScopedBindings();
                    }
                    const firstOriginalDeclaration = firstOrUndefined(initializer.declarations);
                    if (firstOriginalDeclaration && isBindingPattern(firstOriginalDeclaration.name)) {
                        const declarations = flattenDestructuringBinding(firstOriginalDeclaration, visitor, context, 0 /* All */, boundValue);
                        const declarationList = setTextRange(factory2.createVariableDeclarationList(declarations), node.initializer);
                        setOriginalNode(declarationList, node.initializer);
                        setSourceMapRange(declarationList, createRange(declarations[0].pos, last(declarations).end));
                        statements.push(factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, declarationList));
                    }
                    else {
                        statements.push(setTextRange(factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, setOriginalNode(setTextRange(factory2.createVariableDeclarationList([
                            factory2.createVariableDeclaration(firstOriginalDeclaration ? firstOriginalDeclaration.name : factory2.createTempVariable(
                            /*recordTempVariable*/
                            void 0), 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, boundValue)
                        ]), moveRangePos(initializer, -1)), initializer)), moveRangeEnd(initializer, -1)));
                    }
                }
                else {
                    const assignment = factory2.createAssignment(initializer, boundValue);
                    if (isDestructuringAssignment(assignment)) {
                        statements.push(factory2.createExpressionStatement(visitBinaryExpression(assignment, 
                        /*expressionResultIsUnused*/
                        true)));
                    }
                    else {
                        setTextRangeEnd(assignment, initializer.end);
                        statements.push(setTextRange(factory2.createExpressionStatement(Debug.checkDefined(visitNode(assignment, visitor, isExpression))), moveRangeEnd(initializer, -1)));
                    }
                }
                if (convertedLoopBodyStatements) {
                    return createSyntheticBlockForConvertedStatements(addRange(statements, convertedLoopBodyStatements));
                }
                else {
                    const statement = visitNode(node.statement, visitor, isStatement, factory2.liftToBlock);
                    Debug.assert(statement);
                    if (isBlock(statement)) {
                        return factory2.updateBlock(statement, setTextRange(factory2.createNodeArray(concatenate(statements, statement.statements)), statement.statements));
                    }
                    else {
                        statements.push(statement);
                        return createSyntheticBlockForConvertedStatements(statements);
                    }
                }
            }
            function createSyntheticBlockForConvertedStatements(statements) {
                return setEmitFlags(factory2.createBlock(factory2.createNodeArray(statements), 
                /*multiLine*/
                true), 96 /* NoSourceMap */ | 768 /* NoTokenSourceMaps */);
            }
            function convertForOfStatementForArray(node, outermostLabeledStatement, convertedLoopBodyStatements) {
                const expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                const counter = factory2.createLoopVariable();
                const rhsReference = isIdentifier(expression) ? factory2.getGeneratedNameForNode(expression) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                setEmitFlags(expression, 96 /* NoSourceMap */ | getEmitFlags(expression));
                const forStatement = setTextRange(factory2.createForStatement(
                /*initializer*/
                setEmitFlags(setTextRange(factory2.createVariableDeclarationList([
                    setTextRange(factory2.createVariableDeclaration(counter, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createNumericLiteral(0)), moveRangePos(node.expression, -1)),
                    setTextRange(factory2.createVariableDeclaration(rhsReference, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, expression), node.expression)
                ]), node.expression), 4194304 /* NoHoisting */), 
                /*condition*/
                setTextRange(factory2.createLessThan(counter, factory2.createPropertyAccessExpression(rhsReference, "length")), node.expression), 
                /*incrementor*/
                setTextRange(factory2.createPostfixIncrement(counter), node.expression), 
                /*statement*/
                convertForOfStatementHead(node, factory2.createElementAccessExpression(rhsReference, counter), convertedLoopBodyStatements)), 
                /*location*/
                node);
                setEmitFlags(forStatement, 512 /* NoTokenTrailingSourceMaps */);
                setTextRange(forStatement, node);
                return factory2.restoreEnclosingLabel(forStatement, outermostLabeledStatement, convertedLoopState && resetLabel);
            }
            function convertForOfStatementForIterable(node, outermostLabeledStatement, convertedLoopBodyStatements, ancestorFacts) {
                const expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                const iterator = isIdentifier(expression) ? factory2.getGeneratedNameForNode(expression) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const result = isIdentifier(expression) ? factory2.getGeneratedNameForNode(iterator) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const errorRecord = factory2.createUniqueName("e");
                const catchVariable = factory2.getGeneratedNameForNode(errorRecord);
                const returnMethod = factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                const values = setTextRange(emitHelpers().createValuesHelper(expression), node.expression);
                const next = factory2.createCallExpression(factory2.createPropertyAccessExpression(iterator, "next"), 
                /*typeArguments*/
                void 0, []);
                hoistVariableDeclaration(errorRecord);
                hoistVariableDeclaration(returnMethod);
                const initializer = ancestorFacts & 1024 /* IterationContainer */ ? factory2.inlineExpressions([factory2.createAssignment(errorRecord, factory2.createVoidZero()), values]) : values;
                const forStatement = setEmitFlags(setTextRange(factory2.createForStatement(
                /*initializer*/
                setEmitFlags(setTextRange(factory2.createVariableDeclarationList([
                    setTextRange(factory2.createVariableDeclaration(iterator, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer), node.expression),
                    factory2.createVariableDeclaration(result, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, next)
                ]), node.expression), 4194304 /* NoHoisting */), 
                /*condition*/
                factory2.createLogicalNot(factory2.createPropertyAccessExpression(result, "done")), 
                /*incrementor*/
                factory2.createAssignment(result, next), 
                /*statement*/
                convertForOfStatementHead(node, factory2.createPropertyAccessExpression(result, "value"), convertedLoopBodyStatements)), 
                /*location*/
                node), 512 /* NoTokenTrailingSourceMaps */);
                return factory2.createTryStatement(factory2.createBlock([
                    factory2.restoreEnclosingLabel(forStatement, outermostLabeledStatement, convertedLoopState && resetLabel)
                ]), factory2.createCatchClause(factory2.createVariableDeclaration(catchVariable), setEmitFlags(factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createAssignment(errorRecord, factory2.createObjectLiteralExpression([
                        factory2.createPropertyAssignment("error", catchVariable)
                    ])))
                ]), 1 /* SingleLine */)), factory2.createBlock([
                    factory2.createTryStatement(
                    /*tryBlock*/
                    factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(factory2.createLogicalAnd(factory2.createLogicalAnd(result, factory2.createLogicalNot(factory2.createPropertyAccessExpression(result, "done"))), factory2.createAssignment(returnMethod, factory2.createPropertyAccessExpression(iterator, "return"))), factory2.createExpressionStatement(factory2.createFunctionCallCall(returnMethod, iterator, []))), 1 /* SingleLine */)
                    ]), 
                    /*catchClause*/
                    void 0, 
                    /*finallyBlock*/
                    setEmitFlags(factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(errorRecord, factory2.createThrowStatement(factory2.createPropertyAccessExpression(errorRecord, "error"))), 1 /* SingleLine */)
                    ]), 1 /* SingleLine */))
                ]));
            }
            function visitObjectLiteralExpression(node) {
                const properties = node.properties;
                let numInitialProperties = -1, hasComputed = false;
                for (let i = 0; i < properties.length; i++) {
                    const property = properties[i];
                    if (property.transformFlags & 1048576 /* ContainsYield */ && hierarchyFacts & 4 /* AsyncFunctionBody */ || (hasComputed = Debug.checkDefined(property.name).kind === 164 /* ComputedPropertyName */)) {
                        numInitialProperties = i;
                        break;
                    }
                }
                if (numInitialProperties < 0) {
                    return visitEachChild(node, visitor, context);
                }
                const temp = factory2.createTempVariable(hoistVariableDeclaration);
                const expressions = [];
                const assignment = factory2.createAssignment(temp, setEmitFlags(factory2.createObjectLiteralExpression(visitNodes2(properties, visitor, isObjectLiteralElementLike, 0, numInitialProperties), node.multiLine), hasComputed ? 131072 /* Indented */ : 0));
                if (node.multiLine) {
                    startOnNewLine(assignment);
                }
                expressions.push(assignment);
                addObjectLiteralMembers(expressions, node, temp, numInitialProperties);
                expressions.push(node.multiLine ? startOnNewLine(setParent(setTextRange(factory2.cloneNode(temp), temp), temp.parent)) : temp);
                return factory2.inlineExpressions(expressions);
            }
            function shouldConvertPartOfIterationStatement(node) {
                return (resolver.getNodeCheckFlags(node) & 8192 /* ContainsCapturedBlockScopeBinding */) !== 0;
            }
            function shouldConvertInitializerOfForStatement(node) {
                return isForStatement(node) && !!node.initializer && shouldConvertPartOfIterationStatement(node.initializer);
            }
            function shouldConvertConditionOfForStatement(node) {
                return isForStatement(node) && !!node.condition && shouldConvertPartOfIterationStatement(node.condition);
            }
            function shouldConvertIncrementorOfForStatement(node) {
                return isForStatement(node) && !!node.incrementor && shouldConvertPartOfIterationStatement(node.incrementor);
            }
            function shouldConvertIterationStatement(node) {
                return shouldConvertBodyOfIterationStatement(node) || shouldConvertInitializerOfForStatement(node);
            }
            function shouldConvertBodyOfIterationStatement(node) {
                return (resolver.getNodeCheckFlags(node) & 4096 /* LoopWithCapturedBlockScopedBinding */) !== 0;
            }
            function hoistVariableDeclarationDeclaredInConvertedLoop(state, node) {
                if (!state.hoistedLocalVariables) {
                    state.hoistedLocalVariables = [];
                }
                visit(node.name);
                function visit(node2) {
                    if (node2.kind === 79 /* Identifier */) {
                        state.hoistedLocalVariables.push(node2);
                    }
                    else {
                        for (const element of node2.elements) {
                            if (!isOmittedExpression(element)) {
                                visit(element.name);
                            }
                        }
                    }
                }
            }
            function convertIterationStatementBodyIfNecessary(node, outermostLabeledStatement, ancestorFacts, convert) {
                if (!shouldConvertIterationStatement(node)) {
                    let saveAllowedNonLabeledJumps;
                    if (convertedLoopState) {
                        saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                        convertedLoopState.allowedNonLabeledJumps = 2 /* Break */ | 4 /* Continue */;
                    }
                    const result = convert ? convert(node, outermostLabeledStatement, 
                    /*convertedLoopBodyStatements*/
                    void 0, ancestorFacts) : factory2.restoreEnclosingLabel(isForStatement(node) ? visitEachChildOfForStatement2(node) : visitEachChild(node, visitor, context), outermostLabeledStatement, convertedLoopState && resetLabel);
                    if (convertedLoopState) {
                        convertedLoopState.allowedNonLabeledJumps = saveAllowedNonLabeledJumps;
                    }
                    return result;
                }
                const currentState = createConvertedLoopState(node);
                const statements = [];
                const outerConvertedLoopState = convertedLoopState;
                convertedLoopState = currentState;
                const initializerFunction = shouldConvertInitializerOfForStatement(node) ? createFunctionForInitializerOfForStatement(node, currentState) : void 0;
                const bodyFunction = shouldConvertBodyOfIterationStatement(node) ? createFunctionForBodyOfIterationStatement(node, currentState, outerConvertedLoopState) : void 0;
                convertedLoopState = outerConvertedLoopState;
                if (initializerFunction)
                    statements.push(initializerFunction.functionDeclaration);
                if (bodyFunction)
                    statements.push(bodyFunction.functionDeclaration);
                addExtraDeclarationsForConvertedLoop(statements, currentState, outerConvertedLoopState);
                if (initializerFunction) {
                    statements.push(generateCallToConvertedLoopInitializer(initializerFunction.functionName, initializerFunction.containsYield));
                }
                let loop;
                if (bodyFunction) {
                    if (convert) {
                        loop = convert(node, outermostLabeledStatement, bodyFunction.part, ancestorFacts);
                    }
                    else {
                        const clone2 = convertIterationStatementCore(node, initializerFunction, factory2.createBlock(bodyFunction.part, 
                        /*multiLine*/
                        true));
                        loop = factory2.restoreEnclosingLabel(clone2, outermostLabeledStatement, convertedLoopState && resetLabel);
                    }
                }
                else {
                    const clone2 = convertIterationStatementCore(node, initializerFunction, Debug.checkDefined(visitNode(node.statement, visitor, isStatement, factory2.liftToBlock)));
                    loop = factory2.restoreEnclosingLabel(clone2, outermostLabeledStatement, convertedLoopState && resetLabel);
                }
                statements.push(loop);
                return statements;
            }
            function convertIterationStatementCore(node, initializerFunction, convertedLoopBody) {
                switch (node.kind) {
                    case 245 /* ForStatement */:
                        return convertForStatement(node, initializerFunction, convertedLoopBody);
                    case 246 /* ForInStatement */:
                        return convertForInStatement(node, convertedLoopBody);
                    case 247 /* ForOfStatement */:
                        return convertForOfStatement(node, convertedLoopBody);
                    case 243 /* DoStatement */:
                        return convertDoStatement(node, convertedLoopBody);
                    case 244 /* WhileStatement */:
                        return convertWhileStatement(node, convertedLoopBody);
                    default:
                        return Debug.failBadSyntaxKind(node, "IterationStatement expected");
                }
            }
            function convertForStatement(node, initializerFunction, convertedLoopBody) {
                const shouldConvertCondition = node.condition && shouldConvertPartOfIterationStatement(node.condition);
                const shouldConvertIncrementor = shouldConvertCondition || node.incrementor && shouldConvertPartOfIterationStatement(node.incrementor);
                return factory2.updateForStatement(node, visitNode(initializerFunction ? initializerFunction.part : node.initializer, visitorWithUnusedExpressionResult, isForInitializer), visitNode(shouldConvertCondition ? void 0 : node.condition, visitor, isExpression), visitNode(shouldConvertIncrementor ? void 0 : node.incrementor, visitorWithUnusedExpressionResult, isExpression), convertedLoopBody);
            }
            function convertForOfStatement(node, convertedLoopBody) {
                return factory2.updateForOfStatement(node, 
                /*awaitModifier*/
                void 0, Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), convertedLoopBody);
            }
            function convertForInStatement(node, convertedLoopBody) {
                return factory2.updateForInStatement(node, Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), convertedLoopBody);
            }
            function convertDoStatement(node, convertedLoopBody) {
                return factory2.updateDoStatement(node, convertedLoopBody, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
            }
            function convertWhileStatement(node, convertedLoopBody) {
                return factory2.updateWhileStatement(node, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), convertedLoopBody);
            }
            function createConvertedLoopState(node) {
                let loopInitializer;
                switch (node.kind) {
                    case 245 /* ForStatement */:
                    case 246 /* ForInStatement */:
                    case 247 /* ForOfStatement */:
                        const initializer = node.initializer;
                        if (initializer && initializer.kind === 258 /* VariableDeclarationList */) {
                            loopInitializer = initializer;
                        }
                        break;
                }
                const loopParameters = [];
                const loopOutParameters = [];
                if (loopInitializer && getCombinedNodeFlags(loopInitializer) & 3 /* BlockScoped */) {
                    const hasCapturedBindingsInForHead = shouldConvertInitializerOfForStatement(node) || shouldConvertConditionOfForStatement(node) || shouldConvertIncrementorOfForStatement(node);
                    for (const decl of loopInitializer.declarations) {
                        processLoopVariableDeclaration(node, decl, loopParameters, loopOutParameters, hasCapturedBindingsInForHead);
                    }
                }
                const currentState = { loopParameters, loopOutParameters };
                if (convertedLoopState) {
                    if (convertedLoopState.argumentsName) {
                        currentState.argumentsName = convertedLoopState.argumentsName;
                    }
                    if (convertedLoopState.thisName) {
                        currentState.thisName = convertedLoopState.thisName;
                    }
                    if (convertedLoopState.hoistedLocalVariables) {
                        currentState.hoistedLocalVariables = convertedLoopState.hoistedLocalVariables;
                    }
                }
                return currentState;
            }
            function addExtraDeclarationsForConvertedLoop(statements, state, outerState) {
                let extraVariableDeclarations;
                if (state.argumentsName) {
                    if (outerState) {
                        outerState.argumentsName = state.argumentsName;
                    }
                    else {
                        (extraVariableDeclarations || (extraVariableDeclarations = [])).push(factory2.createVariableDeclaration(state.argumentsName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createIdentifier("arguments")));
                    }
                }
                if (state.thisName) {
                    if (outerState) {
                        outerState.thisName = state.thisName;
                    }
                    else {
                        (extraVariableDeclarations || (extraVariableDeclarations = [])).push(factory2.createVariableDeclaration(state.thisName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createIdentifier("this")));
                    }
                }
                if (state.hoistedLocalVariables) {
                    if (outerState) {
                        outerState.hoistedLocalVariables = state.hoistedLocalVariables;
                    }
                    else {
                        if (!extraVariableDeclarations) {
                            extraVariableDeclarations = [];
                        }
                        for (const identifier of state.hoistedLocalVariables) {
                            extraVariableDeclarations.push(factory2.createVariableDeclaration(identifier));
                        }
                    }
                }
                if (state.loopOutParameters.length) {
                    if (!extraVariableDeclarations) {
                        extraVariableDeclarations = [];
                    }
                    for (const outParam of state.loopOutParameters) {
                        extraVariableDeclarations.push(factory2.createVariableDeclaration(outParam.outParamName));
                    }
                }
                if (state.conditionVariable) {
                    if (!extraVariableDeclarations) {
                        extraVariableDeclarations = [];
                    }
                    extraVariableDeclarations.push(factory2.createVariableDeclaration(state.conditionVariable, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createFalse()));
                }
                if (extraVariableDeclarations) {
                    statements.push(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(extraVariableDeclarations)));
                }
            }
            function createOutVariable(p) {
                return factory2.createVariableDeclaration(p.originalName, 
                /*exclamationToken*/
                void 0, 
                /*type*/
                void 0, p.outParamName);
            }
            function createFunctionForInitializerOfForStatement(node, currentState) {
                const functionName = factory2.createUniqueName("_loop_init");
                const containsYield = (node.initializer.transformFlags & 1048576 /* ContainsYield */) !== 0;
                let emitFlags = 0 /* None */;
                if (currentState.containsLexicalThis)
                    emitFlags |= 16 /* CapturesThis */;
                if (containsYield && hierarchyFacts & 4 /* AsyncFunctionBody */)
                    emitFlags |= 524288 /* AsyncFunctionBody */;
                const statements = [];
                statements.push(factory2.createVariableStatement(
                /*modifiers*/
                void 0, node.initializer));
                copyOutParameters(currentState.loopOutParameters, 2 /* Initializer */, 1 /* ToOutParameter */, statements);
                const functionDeclaration = factory2.createVariableStatement(
                /*modifiers*/
                void 0, setEmitFlags(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(functionName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, setEmitFlags(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, containsYield ? factory2.createToken(41 /* AsteriskToken */) : void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, 
                    /*parameters*/
                    void 0, 
                    /*type*/
                    void 0, Debug.checkDefined(visitNode(factory2.createBlock(statements, 
                    /*multiLine*/
                    true), visitor, isBlock))), emitFlags))
                ]), 4194304 /* NoHoisting */));
                const part = factory2.createVariableDeclarationList(map(currentState.loopOutParameters, createOutVariable));
                return { functionName, containsYield, functionDeclaration, part };
            }
            function createFunctionForBodyOfIterationStatement(node, currentState, outerState) {
                const functionName = factory2.createUniqueName("_loop");
                startLexicalEnvironment();
                const statement = visitNode(node.statement, visitor, isStatement, factory2.liftToBlock);
                const lexicalEnvironment = endLexicalEnvironment();
                const statements = [];
                if (shouldConvertConditionOfForStatement(node) || shouldConvertIncrementorOfForStatement(node)) {
                    currentState.conditionVariable = factory2.createUniqueName("inc");
                    if (node.incrementor) {
                        statements.push(factory2.createIfStatement(currentState.conditionVariable, factory2.createExpressionStatement(Debug.checkDefined(visitNode(node.incrementor, visitor, isExpression))), factory2.createExpressionStatement(factory2.createAssignment(currentState.conditionVariable, factory2.createTrue()))));
                    }
                    else {
                        statements.push(factory2.createIfStatement(factory2.createLogicalNot(currentState.conditionVariable), factory2.createExpressionStatement(factory2.createAssignment(currentState.conditionVariable, factory2.createTrue()))));
                    }
                    if (shouldConvertConditionOfForStatement(node)) {
                        statements.push(factory2.createIfStatement(factory2.createPrefixUnaryExpression(53 /* ExclamationToken */, Debug.checkDefined(visitNode(node.condition, visitor, isExpression))), Debug.checkDefined(visitNode(factory2.createBreakStatement(), visitor, isStatement))));
                    }
                }
                Debug.assert(statement);
                if (isBlock(statement)) {
                    addRange(statements, statement.statements);
                }
                else {
                    statements.push(statement);
                }
                copyOutParameters(currentState.loopOutParameters, 1 /* Body */, 1 /* ToOutParameter */, statements);
                insertStatementsAfterStandardPrologue(statements, lexicalEnvironment);
                const loopBody = factory2.createBlock(statements, 
                /*multiLine*/
                true);
                if (isBlock(statement))
                    setOriginalNode(loopBody, statement);
                const containsYield = (node.statement.transformFlags & 1048576 /* ContainsYield */) !== 0;
                let emitFlags = 1048576 /* ReuseTempVariableScope */;
                if (currentState.containsLexicalThis)
                    emitFlags |= 16 /* CapturesThis */;
                if (containsYield && (hierarchyFacts & 4 /* AsyncFunctionBody */) !== 0)
                    emitFlags |= 524288 /* AsyncFunctionBody */;
                const functionDeclaration = factory2.createVariableStatement(
                /*modifiers*/
                void 0, setEmitFlags(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(functionName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, setEmitFlags(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, containsYield ? factory2.createToken(41 /* AsteriskToken */) : void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, currentState.loopParameters, 
                    /*type*/
                    void 0, loopBody), emitFlags))
                ]), 4194304 /* NoHoisting */));
                const part = generateCallToConvertedLoop(functionName, currentState, outerState, containsYield);
                return { functionName, containsYield, functionDeclaration, part };
            }
            function copyOutParameter(outParam, copyDirection) {
                const source = copyDirection === 0 /* ToOriginal */ ? outParam.outParamName : outParam.originalName;
                const target = copyDirection === 0 /* ToOriginal */ ? outParam.originalName : outParam.outParamName;
                return factory2.createBinaryExpression(target, 63 /* EqualsToken */, source);
            }
            function copyOutParameters(outParams, partFlags, copyDirection, statements) {
                for (const outParam of outParams) {
                    if (outParam.flags & partFlags) {
                        statements.push(factory2.createExpressionStatement(copyOutParameter(outParam, copyDirection)));
                    }
                }
            }
            function generateCallToConvertedLoopInitializer(initFunctionExpressionName, containsYield) {
                const call = factory2.createCallExpression(initFunctionExpressionName, 
                /*typeArguments*/
                void 0, []);
                const callResult = containsYield ? factory2.createYieldExpression(factory2.createToken(41 /* AsteriskToken */), setEmitFlags(call, 16777216 /* Iterator */)) : call;
                return factory2.createExpressionStatement(callResult);
            }
            function generateCallToConvertedLoop(loopFunctionExpressionName, state, outerState, containsYield) {
                const statements = [];
                const isSimpleLoop = !(state.nonLocalJumps & ~4 /* Continue */) && !state.labeledNonLocalBreaks && !state.labeledNonLocalContinues;
                const call = factory2.createCallExpression(loopFunctionExpressionName, 
                /*typeArguments*/
                void 0, map(state.loopParameters, (p) => p.name));
                const callResult = containsYield ? factory2.createYieldExpression(factory2.createToken(41 /* AsteriskToken */), setEmitFlags(call, 16777216 /* Iterator */)) : call;
                if (isSimpleLoop) {
                    statements.push(factory2.createExpressionStatement(callResult));
                    copyOutParameters(state.loopOutParameters, 1 /* Body */, 0 /* ToOriginal */, statements);
                }
                else {
                    const loopResultName = factory2.createUniqueName("state");
                    const stateVariable = factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([factory2.createVariableDeclaration(loopResultName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, callResult)]));
                    statements.push(stateVariable);
                    copyOutParameters(state.loopOutParameters, 1 /* Body */, 0 /* ToOriginal */, statements);
                    if (state.nonLocalJumps & 8 /* Return */) {
                        let returnStatement;
                        if (outerState) {
                            outerState.nonLocalJumps |= 8 /* Return */;
                            returnStatement = factory2.createReturnStatement(loopResultName);
                        }
                        else {
                            returnStatement = factory2.createReturnStatement(factory2.createPropertyAccessExpression(loopResultName, "value"));
                        }
                        statements.push(factory2.createIfStatement(factory2.createTypeCheck(loopResultName, "object"), returnStatement));
                    }
                    if (state.nonLocalJumps & 2 /* Break */) {
                        statements.push(factory2.createIfStatement(factory2.createStrictEquality(loopResultName, factory2.createStringLiteral("break")), factory2.createBreakStatement()));
                    }
                    if (state.labeledNonLocalBreaks || state.labeledNonLocalContinues) {
                        const caseClauses = [];
                        processLabeledJumps(state.labeledNonLocalBreaks, 
                        /*isBreak*/
                        true, loopResultName, outerState, caseClauses);
                        processLabeledJumps(state.labeledNonLocalContinues, 
                        /*isBreak*/
                        false, loopResultName, outerState, caseClauses);
                        statements.push(factory2.createSwitchStatement(loopResultName, factory2.createCaseBlock(caseClauses)));
                    }
                }
                return statements;
            }
            function setLabeledJump(state, isBreak, labelText, labelMarker) {
                if (isBreak) {
                    if (!state.labeledNonLocalBreaks) {
                        state.labeledNonLocalBreaks = /* @__PURE__ */ new Map();
                    }
                    state.labeledNonLocalBreaks.set(labelText, labelMarker);
                }
                else {
                    if (!state.labeledNonLocalContinues) {
                        state.labeledNonLocalContinues = /* @__PURE__ */ new Map();
                    }
                    state.labeledNonLocalContinues.set(labelText, labelMarker);
                }
            }
            function processLabeledJumps(table, isBreak, loopResultName, outerLoop, caseClauses) {
                if (!table) {
                    return;
                }
                table.forEach((labelMarker, labelText) => {
                    const statements = [];
                    if (!outerLoop || outerLoop.labels && outerLoop.labels.get(labelText)) {
                        const label = factory2.createIdentifier(labelText);
                        statements.push(isBreak ? factory2.createBreakStatement(label) : factory2.createContinueStatement(label));
                    }
                    else {
                        setLabeledJump(outerLoop, isBreak, labelText, labelMarker);
                        statements.push(factory2.createReturnStatement(loopResultName));
                    }
                    caseClauses.push(factory2.createCaseClause(factory2.createStringLiteral(labelMarker), statements));
                });
            }
            function processLoopVariableDeclaration(container, decl, loopParameters, loopOutParameters, hasCapturedBindingsInForHead) {
                const name = decl.name;
                if (isBindingPattern(name)) {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element)) {
                            processLoopVariableDeclaration(container, element, loopParameters, loopOutParameters, hasCapturedBindingsInForHead);
                        }
                    }
                }
                else {
                    loopParameters.push(factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, name));
                    const checkFlags = resolver.getNodeCheckFlags(decl);
                    if (checkFlags & 262144 /* NeedsLoopOutParameter */ || hasCapturedBindingsInForHead) {
                        const outParamName = factory2.createUniqueName("out_" + idText(name));
                        let flags = 0 /* None */;
                        if (checkFlags & 262144 /* NeedsLoopOutParameter */) {
                            flags |= 1 /* Body */;
                        }
                        if (isForStatement(container)) {
                            if (container.initializer && resolver.isBindingCapturedByNode(container.initializer, decl)) {
                                flags |= 2 /* Initializer */;
                            }
                            if (container.condition && resolver.isBindingCapturedByNode(container.condition, decl) || container.incrementor && resolver.isBindingCapturedByNode(container.incrementor, decl)) {
                                flags |= 1 /* Body */;
                            }
                        }
                        loopOutParameters.push({ flags, originalName: name, outParamName });
                    }
                }
            }
            function addObjectLiteralMembers(expressions, node, receiver, start) {
                const properties = node.properties;
                const numProperties = properties.length;
                for (let i = start; i < numProperties; i++) {
                    const property = properties[i];
                    switch (property.kind) {
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            const accessors = getAllAccessorDeclarations(node.properties, property);
                            if (property === accessors.firstAccessor) {
                                expressions.push(transformAccessorsToExpression(receiver, accessors, node, !!node.multiLine));
                            }
                            break;
                        case 171 /* MethodDeclaration */:
                            expressions.push(transformObjectLiteralMethodDeclarationToExpression(property, receiver, node, node.multiLine));
                            break;
                        case 299 /* PropertyAssignment */:
                            expressions.push(transformPropertyAssignmentToExpression(property, receiver, node.multiLine));
                            break;
                        case 300 /* ShorthandPropertyAssignment */:
                            expressions.push(transformShorthandPropertyAssignmentToExpression(property, receiver, node.multiLine));
                            break;
                        default:
                            Debug.failBadSyntaxKind(node);
                            break;
                    }
                }
            }
            function transformPropertyAssignmentToExpression(property, receiver, startsOnNewLine) {
                const expression = factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, Debug.checkDefined(visitNode(property.name, visitor, isPropertyName))), Debug.checkDefined(visitNode(property.initializer, visitor, isExpression)));
                setTextRange(expression, property);
                if (startsOnNewLine) {
                    startOnNewLine(expression);
                }
                return expression;
            }
            function transformShorthandPropertyAssignmentToExpression(property, receiver, startsOnNewLine) {
                const expression = factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, Debug.checkDefined(visitNode(property.name, visitor, isPropertyName))), factory2.cloneNode(property.name));
                setTextRange(expression, property);
                if (startsOnNewLine) {
                    startOnNewLine(expression);
                }
                return expression;
            }
            function transformObjectLiteralMethodDeclarationToExpression(method, receiver, container, startsOnNewLine) {
                const expression = factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, Debug.checkDefined(visitNode(method.name, visitor, isPropertyName))), transformFunctionLikeToExpression(method, 
                /*location*/
                method, 
                /*name*/
                void 0, container));
                setTextRange(expression, method);
                if (startsOnNewLine) {
                    startOnNewLine(expression);
                }
                return expression;
            }
            function visitCatchClause(node) {
                const ancestorFacts = enterSubtree(7104 /* BlockScopeExcludes */, 0 /* BlockScopeIncludes */);
                let updated;
                Debug.assert(!!node.variableDeclaration, "Catch clause variable should always be present when downleveling ES2015.");
                if (isBindingPattern(node.variableDeclaration.name)) {
                    const temp = factory2.createTempVariable(
                    /*recordTempVariable*/
                    void 0);
                    const newVariableDeclaration = factory2.createVariableDeclaration(temp);
                    setTextRange(newVariableDeclaration, node.variableDeclaration);
                    const vars = flattenDestructuringBinding(node.variableDeclaration, visitor, context, 0 /* All */, temp);
                    const list = factory2.createVariableDeclarationList(vars);
                    setTextRange(list, node.variableDeclaration);
                    const destructure = factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, list);
                    updated = factory2.updateCatchClause(node, newVariableDeclaration, addStatementToStartOfBlock(node.block, destructure));
                }
                else {
                    updated = visitEachChild(node, visitor, context);
                }
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }
            function addStatementToStartOfBlock(block, statement) {
                const transformedStatements = visitNodes2(block.statements, visitor, isStatement);
                return factory2.updateBlock(block, [statement, ...transformedStatements]);
            }
            function visitMethodDeclaration(node) {
                Debug.assert(!isComputedPropertyName(node.name));
                const functionExpression = transformFunctionLikeToExpression(node, 
                /*location*/
                moveRangePos(node, -1), 
                /*name*/
                void 0, 
                /*container*/
                void 0);
                setEmitFlags(functionExpression, 1024 /* NoLeadingComments */ | getEmitFlags(functionExpression));
                return setTextRange(factory2.createPropertyAssignment(node.name, functionExpression), 
                /*location*/
                node);
            }
            function visitAccessorDeclaration(node) {
                Debug.assert(!isComputedPropertyName(node.name));
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const ancestorFacts = enterSubtree(32670 /* FunctionExcludes */, 65 /* FunctionIncludes */);
                let updated;
                const parameters = visitParameterList(node.parameters, visitor, context);
                const body = transformFunctionBody2(node);
                if (node.kind === 174 /* GetAccessor */) {
                    updated = factory2.updateGetAccessorDeclaration(node, node.modifiers, node.name, parameters, node.type, body);
                }
                else {
                    updated = factory2.updateSetAccessorDeclaration(node, node.modifiers, node.name, parameters, body);
                }
                exitSubtree(ancestorFacts, 98304 /* FunctionSubtreeExcludes */, 0 /* None */);
                convertedLoopState = savedConvertedLoopState;
                return updated;
            }
            function visitShorthandPropertyAssignment(node) {
                return setTextRange(factory2.createPropertyAssignment(node.name, visitIdentifier(factory2.cloneNode(node.name))), 
                /*location*/
                node);
            }
            function visitComputedPropertyName(node) {
                return visitEachChild(node, visitor, context);
            }
            function visitYieldExpression(node) {
                return visitEachChild(node, visitor, context);
            }
            function visitArrayLiteralExpression(node) {
                if (some(node.elements, isSpreadElement)) {
                    return transformAndSpreadElements(node.elements, 
                    /*isArgumentList*/
                    false, !!node.multiLine, 
                    /*hasTrailingComma*/
                    !!node.elements.hasTrailingComma);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitCallExpression(node) {
                if (getInternalEmitFlags(node) & 1 /* TypeScriptClassWrapper */) {
                    return visitTypeScriptClassWrapper(node);
                }
                const expression = skipOuterExpressions(node.expression);
                if (expression.kind === 106 /* SuperKeyword */ || isSuperProperty(expression) || some(node.arguments, isSpreadElement)) {
                    return visitCallExpressionWithPotentialCapturedThisAssignment(node, 
                    /*assignToCapturedThis*/
                    true);
                }
                return factory2.updateCallExpression(node, Debug.checkDefined(visitNode(node.expression, callExpressionVisitor, isExpression)), 
                /*typeArguments*/
                void 0, visitNodes2(node.arguments, visitor, isExpression));
            }
            function visitTypeScriptClassWrapper(node) {
                const body = cast(cast(skipOuterExpressions(node.expression), isArrowFunction).body, isBlock);
                const isVariableStatementWithInitializer = (stmt) => isVariableStatement(stmt) && !!first(stmt.declarationList.declarations).initializer;
                const savedConvertedLoopState = convertedLoopState;
                convertedLoopState = void 0;
                const bodyStatements = visitNodes2(body.statements, classWrapperStatementVisitor, isStatement);
                convertedLoopState = savedConvertedLoopState;
                const classStatements = filter(bodyStatements, isVariableStatementWithInitializer);
                const remainingStatements = filter(bodyStatements, (stmt) => !isVariableStatementWithInitializer(stmt));
                const varStatement = cast(first(classStatements), isVariableStatement);
                const variable = varStatement.declarationList.declarations[0];
                const initializer = skipOuterExpressions(variable.initializer);
                let aliasAssignment = tryCast(initializer, isAssignmentExpression);
                if (!aliasAssignment && isBinaryExpression(initializer) && initializer.operatorToken.kind === 27 /* CommaToken */) {
                    aliasAssignment = tryCast(initializer.left, isAssignmentExpression);
                }
                const call = cast(aliasAssignment ? skipOuterExpressions(aliasAssignment.right) : initializer, isCallExpression);
                const func = cast(skipOuterExpressions(call.expression), isFunctionExpression);
                const funcStatements = func.body.statements;
                let classBodyStart = 0;
                let classBodyEnd = -1;
                const statements = [];
                if (aliasAssignment) {
                    const extendsCall = tryCast(funcStatements[classBodyStart], isExpressionStatement);
                    if (extendsCall) {
                        statements.push(extendsCall);
                        classBodyStart++;
                    }
                    statements.push(funcStatements[classBodyStart]);
                    classBodyStart++;
                    statements.push(factory2.createExpressionStatement(factory2.createAssignment(aliasAssignment.left, cast(variable.name, isIdentifier))));
                }
                while (!isReturnStatement(elementAt(funcStatements, classBodyEnd))) {
                    classBodyEnd--;
                }
                addRange(statements, funcStatements, classBodyStart, classBodyEnd);
                if (classBodyEnd < -1) {
                    addRange(statements, funcStatements, classBodyEnd + 1);
                }
                const returnStatement = tryCast(elementAt(funcStatements, classBodyEnd), isReturnStatement);
                for (const statement of remainingStatements) {
                    if (isReturnStatement(statement) && (returnStatement == null ? void 0 : returnStatement.expression) && !isIdentifier(returnStatement.expression)) {
                        statements.push(returnStatement);
                    }
                    else {
                        statements.push(statement);
                    }
                }
                addRange(statements, classStatements, 
                /*start*/
                1);
                return factory2.restoreOuterExpressions(node.expression, factory2.restoreOuterExpressions(variable.initializer, factory2.restoreOuterExpressions(aliasAssignment && aliasAssignment.right, factory2.updateCallExpression(call, factory2.restoreOuterExpressions(call.expression, factory2.updateFunctionExpression(func, 
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, func.parameters, 
                /*type*/
                void 0, factory2.updateBlock(func.body, statements))), 
                /*typeArguments*/
                void 0, call.arguments))));
            }
            function visitSuperCallInBody(node) {
                return visitCallExpressionWithPotentialCapturedThisAssignment(node, 
                /*assignToCapturedThis*/
                false);
            }
            function visitCallExpressionWithPotentialCapturedThisAssignment(node, assignToCapturedThis) {
                if (node.transformFlags & 32768 /* ContainsRestOrSpread */ || node.expression.kind === 106 /* SuperKeyword */ || isSuperProperty(skipOuterExpressions(node.expression))) {
                    const { target, thisArg } = factory2.createCallBinding(node.expression, hoistVariableDeclaration);
                    if (node.expression.kind === 106 /* SuperKeyword */) {
                        setEmitFlags(thisArg, 8 /* NoSubstitution */);
                    }
                    let resultingCall;
                    if (node.transformFlags & 32768 /* ContainsRestOrSpread */) {
                        resultingCall = factory2.createFunctionApplyCall(Debug.checkDefined(visitNode(target, callExpressionVisitor, isExpression)), node.expression.kind === 106 /* SuperKeyword */ ? thisArg : Debug.checkDefined(visitNode(thisArg, visitor, isExpression)), transformAndSpreadElements(node.arguments, 
                        /*isArgumentList*/
                        true, 
                        /*multiLine*/
                        false, 
                        /*hasTrailingComma*/
                        false));
                    }
                    else {
                        resultingCall = setTextRange(factory2.createFunctionCallCall(Debug.checkDefined(visitNode(target, callExpressionVisitor, isExpression)), node.expression.kind === 106 /* SuperKeyword */ ? thisArg : Debug.checkDefined(visitNode(thisArg, visitor, isExpression)), visitNodes2(node.arguments, visitor, isExpression)), node);
                    }
                    if (node.expression.kind === 106 /* SuperKeyword */) {
                        const initializer = factory2.createLogicalOr(resultingCall, createActualThis());
                        resultingCall = assignToCapturedThis ? factory2.createAssignment(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */), initializer) : initializer;
                    }
                    return setOriginalNode(resultingCall, node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitNewExpression(node) {
                if (some(node.arguments, isSpreadElement)) {
                    const { target, thisArg } = factory2.createCallBinding(factory2.createPropertyAccessExpression(node.expression, "bind"), hoistVariableDeclaration);
                    return factory2.createNewExpression(factory2.createFunctionApplyCall(Debug.checkDefined(visitNode(target, visitor, isExpression)), thisArg, transformAndSpreadElements(factory2.createNodeArray([factory2.createVoidZero(), ...node.arguments]), 
                    /*isArgumentList*/
                    true, 
                    /*multiLine*/
                    false, 
                    /*hasTrailingComma*/
                    false)), 
                    /*typeArguments*/
                    void 0, []);
                }
                return visitEachChild(node, visitor, context);
            }
            function transformAndSpreadElements(elements, isArgumentList, multiLine, hasTrailingComma) {
                const numElements = elements.length;
                const segments = flatten(
                // As we visit each element, we return one of two functions to use as the "key":
                // - `visitSpanOfSpreads` for one or more contiguous `...` spread expressions, i.e. `...a, ...b` in `[1, 2, ...a, ...b]`
                // - `visitSpanOfNonSpreads` for one or more contiguous non-spread elements, i.e. `1, 2`, in `[1, 2, ...a, ...b]`
                spanMap(elements, partitionSpread, (partition, visitPartition, _start, end) => visitPartition(partition, multiLine, hasTrailingComma && end === numElements)));
                if (segments.length === 1) {
                    const firstSegment = segments[0];
                    if (isArgumentList && !compilerOptions.downlevelIteration || isPackedArrayLiteral(firstSegment.expression) || isCallToHelper(firstSegment.expression, "___spreadArray")) {
                        return firstSegment.expression;
                    }
                }
                const helpers = emitHelpers();
                const startsWithSpread = segments[0].kind !== 0 /* None */;
                let expression = startsWithSpread ? factory2.createArrayLiteralExpression() : segments[0].expression;
                for (let i = startsWithSpread ? 0 : 1; i < segments.length; i++) {
                    const segment = segments[i];
                    expression = helpers.createSpreadArrayHelper(expression, segment.expression, segment.kind === 1 /* UnpackedSpread */ && !isArgumentList);
                }
                return expression;
            }
            function partitionSpread(node) {
                return isSpreadElement(node) ? visitSpanOfSpreads : visitSpanOfNonSpreads;
            }
            function visitSpanOfSpreads(chunk) {
                return map(chunk, visitExpressionOfSpread);
            }
            function visitExpressionOfSpread(node) {
                Debug.assertNode(node, isSpreadElement);
                let expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                const isCallToReadHelper = isCallToHelper(expression, "___read");
                let kind = isCallToReadHelper || isPackedArrayLiteral(expression) ? 2 /* PackedSpread */ : 1 /* UnpackedSpread */;
                if (compilerOptions.downlevelIteration && kind === 1 /* UnpackedSpread */ && !isArrayLiteralExpression(expression) && !isCallToReadHelper) {
                    expression = emitHelpers().createReadHelper(expression, 
                    /*count*/
                    void 0);
                    kind = 2 /* PackedSpread */;
                }
                return createSpreadSegment(kind, expression);
            }
            function visitSpanOfNonSpreads(chunk, multiLine, hasTrailingComma) {
                const expression = factory2.createArrayLiteralExpression(visitNodes2(factory2.createNodeArray(chunk, hasTrailingComma), visitor, isExpression), multiLine);
                return createSpreadSegment(0 /* None */, expression);
            }
            function visitSpreadElement(node) {
                return visitNode(node.expression, visitor, isExpression);
            }
            function visitTemplateLiteral(node) {
                return setTextRange(factory2.createStringLiteral(node.text), node);
            }
            function visitStringLiteral(node) {
                if (node.hasExtendedUnicodeEscape) {
                    return setTextRange(factory2.createStringLiteral(node.text), node);
                }
                return node;
            }
            function visitNumericLiteral(node) {
                if (node.numericLiteralFlags & 384 /* BinaryOrOctalSpecifier */) {
                    return setTextRange(factory2.createNumericLiteral(node.text), node);
                }
                return node;
            }
            function visitTaggedTemplateExpression(node) {
                return processTaggedTemplateExpression(context, node, visitor, currentSourceFile, recordTaggedTemplateString, 1 /* All */);
            }
            function visitTemplateExpression(node) {
                let expression = factory2.createStringLiteral(node.head.text);
                for (const span of node.templateSpans) {
                    const args = [Debug.checkDefined(visitNode(span.expression, visitor, isExpression))];
                    if (span.literal.text.length > 0) {
                        args.push(factory2.createStringLiteral(span.literal.text));
                    }
                    expression = factory2.createCallExpression(factory2.createPropertyAccessExpression(expression, "concat"), 
                    /*typeArguments*/
                    void 0, args);
                }
                return setTextRange(expression, node);
            }
            function visitSuperKeyword(isExpressionOfCall) {
                return hierarchyFacts & 8 /* NonStaticClassElement */ && !isExpressionOfCall ? factory2.createPropertyAccessExpression(factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */), "prototype") : factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */);
            }
            function visitMetaProperty(node) {
                if (node.keywordToken === 103 /* NewKeyword */ && node.name.escapedText === "target") {
                    hierarchyFacts |= 32768 /* NewTarget */;
                    return factory2.createUniqueName("_newTarget", 16 /* Optimistic */ | 32 /* FileLevel */);
                }
                return node;
            }
            function onEmitNode(hint, node, emitCallback) {
                if (enabledSubstitutions & 1 /* CapturedThis */ && isFunctionLike(node)) {
                    const ancestorFacts = enterSubtree(32670 /* FunctionExcludes */, getEmitFlags(node) & 16 /* CapturesThis */ ? 65 /* FunctionIncludes */ | 16 /* CapturesThis */ : 65 /* FunctionIncludes */);
                    previousOnEmitNode(hint, node, emitCallback);
                    exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                    return;
                }
                previousOnEmitNode(hint, node, emitCallback);
            }
            function enableSubstitutionsForBlockScopedBindings() {
                if ((enabledSubstitutions & 2 /* BlockScopedBindings */) === 0) {
                    enabledSubstitutions |= 2 /* BlockScopedBindings */;
                    context.enableSubstitution(79 /* Identifier */);
                }
            }
            function enableSubstitutionsForCapturedThis() {
                if ((enabledSubstitutions & 1 /* CapturedThis */) === 0) {
                    enabledSubstitutions |= 1 /* CapturedThis */;
                    context.enableSubstitution(108 /* ThisKeyword */);
                    context.enableEmitNotification(173 /* Constructor */);
                    context.enableEmitNotification(171 /* MethodDeclaration */);
                    context.enableEmitNotification(174 /* GetAccessor */);
                    context.enableEmitNotification(175 /* SetAccessor */);
                    context.enableEmitNotification(216 /* ArrowFunction */);
                    context.enableEmitNotification(215 /* FunctionExpression */);
                    context.enableEmitNotification(259 /* FunctionDeclaration */);
                }
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (hint === 1 /* Expression */) {
                    return substituteExpression(node);
                }
                if (isIdentifier(node)) {
                    return substituteIdentifier(node);
                }
                return node;
            }
            function substituteIdentifier(node) {
                if (enabledSubstitutions & 2 /* BlockScopedBindings */ && !isInternalName(node)) {
                    const original = getParseTreeNode(node, isIdentifier);
                    if (original && isNameOfDeclarationWithCollidingName(original)) {
                        return setTextRange(factory2.getGeneratedNameForNode(original), node);
                    }
                }
                return node;
            }
            function isNameOfDeclarationWithCollidingName(node) {
                switch (node.parent.kind) {
                    case 205 /* BindingElement */:
                    case 260 /* ClassDeclaration */:
                    case 263 /* EnumDeclaration */:
                    case 257 /* VariableDeclaration */:
                        return node.parent.name === node && resolver.isDeclarationWithCollidingName(node.parent);
                }
                return false;
            }
            function substituteExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return substituteExpressionIdentifier(node);
                    case 108 /* ThisKeyword */:
                        return substituteThisKeyword(node);
                }
                return node;
            }
            function substituteExpressionIdentifier(node) {
                if (enabledSubstitutions & 2 /* BlockScopedBindings */ && !isInternalName(node)) {
                    const declaration = resolver.getReferencedDeclarationWithCollidingName(node);
                    if (declaration && !(isClassLike(declaration) && isPartOfClassBody(declaration, node))) {
                        return setTextRange(factory2.getGeneratedNameForNode(getNameOfDeclaration(declaration)), node);
                    }
                }
                return node;
            }
            function isPartOfClassBody(declaration, node) {
                let currentNode = getParseTreeNode(node);
                if (!currentNode || currentNode === declaration || currentNode.end <= declaration.pos || currentNode.pos >= declaration.end) {
                    return false;
                }
                const blockScope = getEnclosingBlockScopeContainer(declaration);
                while (currentNode) {
                    if (currentNode === blockScope || currentNode === declaration) {
                        return false;
                    }
                    if (isClassElement(currentNode) && currentNode.parent === declaration) {
                        return true;
                    }
                    currentNode = currentNode.parent;
                }
                return false;
            }
            function substituteThisKeyword(node) {
                if (enabledSubstitutions & 1 /* CapturedThis */ && hierarchyFacts & 16 /* CapturesThis */) {
                    return setTextRange(factory2.createUniqueName("_this", 16 /* Optimistic */ | 32 /* FileLevel */), node);
                }
                return node;
            }
            function getClassMemberPrefix(node, member) {
                return isStatic(member) ? factory2.getInternalName(node) : factory2.createPropertyAccessExpression(factory2.getInternalName(node), "prototype");
            }
            function hasSynthesizedDefaultSuperCall(constructor, hasExtendsClause) {
                if (!constructor || !hasExtendsClause) {
                    return false;
                }
                if (some(constructor.parameters)) {
                    return false;
                }
                const statement = firstOrUndefined(constructor.body.statements);
                if (!statement || !nodeIsSynthesized(statement) || statement.kind !== 241 /* ExpressionStatement */) {
                    return false;
                }
                const statementExpression = statement.expression;
                if (!nodeIsSynthesized(statementExpression) || statementExpression.kind !== 210 /* CallExpression */) {
                    return false;
                }
                const callTarget = statementExpression.expression;
                if (!nodeIsSynthesized(callTarget) || callTarget.kind !== 106 /* SuperKeyword */) {
                    return false;
                }
                const callArgument = singleOrUndefined(statementExpression.arguments);
                if (!callArgument || !nodeIsSynthesized(callArgument) || callArgument.kind !== 227 /* SpreadElement */) {
                    return false;
                }
                const expression = callArgument.expression;
                return isIdentifier(expression) && expression.escapedText === "arguments";
            }
        }