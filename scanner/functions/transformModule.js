function transformModule(context) {
            function getTransformModuleDelegate(moduleKind2) {
                switch (moduleKind2) {
                    case 2 /* AMD */:
                        return transformAMDModule;
                    case 3 /* UMD */:
                        return transformUMDModule;
                    default:
                        return transformCommonJSModule;
                }
            }
            const { factory: factory2, getEmitHelperFactory: emitHelpers, startLexicalEnvironment, endLexicalEnvironment, hoistVariableDeclaration } = context;
            const compilerOptions = context.getCompilerOptions();
            const resolver = context.getEmitResolver();
            const host = context.getEmitHost();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const moduleKind = getEmitModuleKind(compilerOptions);
            const previousOnSubstituteNode = context.onSubstituteNode;
            const previousOnEmitNode = context.onEmitNode;
            context.onSubstituteNode = onSubstituteNode;
            context.onEmitNode = onEmitNode;
            context.enableSubstitution(210 /* CallExpression */);
            context.enableSubstitution(212 /* TaggedTemplateExpression */);
            context.enableSubstitution(79 /* Identifier */);
            context.enableSubstitution(223 /* BinaryExpression */);
            context.enableSubstitution(300 /* ShorthandPropertyAssignment */);
            context.enableEmitNotification(308 /* SourceFile */);
            const moduleInfoMap = [];
            const deferredExports = [];
            let currentSourceFile;
            let currentModuleInfo;
            const noSubstitution = [];
            let needUMDDynamicImportHelper;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile || !(isEffectiveExternalModule(node, compilerOptions) || node.transformFlags & 8388608 /* ContainsDynamicImport */ || isJsonSourceFile(node) && hasJsonModuleEmitEnabled(compilerOptions) && outFile(compilerOptions))) {
                    return node;
                }
                currentSourceFile = node;
                currentModuleInfo = collectExternalModuleInfo(context, node, resolver, compilerOptions);
                moduleInfoMap[getOriginalNodeId(node)] = currentModuleInfo;
                const transformModule2 = getTransformModuleDelegate(moduleKind);
                const updated = transformModule2(node);
                currentSourceFile = void 0;
                currentModuleInfo = void 0;
                needUMDDynamicImportHelper = false;
                return updated;
            }
            function shouldEmitUnderscoreUnderscoreESModule() {
                if (!currentModuleInfo.exportEquals && isExternalModule(currentSourceFile)) {
                    return true;
                }
                return false;
            }
            function transformCommonJSModule(node) {
                startLexicalEnvironment();
                const statements = [];
                const ensureUseStrict = getStrictOptionValue(compilerOptions, "alwaysStrict") || !compilerOptions.noImplicitUseStrict && isExternalModule(currentSourceFile);
                const statementOffset = factory2.copyPrologue(node.statements, statements, ensureUseStrict && !isJsonSourceFile(node), topLevelVisitor);
                if (shouldEmitUnderscoreUnderscoreESModule()) {
                    append(statements, createUnderscoreUnderscoreESModule());
                }
                if (length(currentModuleInfo.exportedNames)) {
                    const chunkSize = 50;
                    for (let i = 0; i < currentModuleInfo.exportedNames.length; i += chunkSize) {
                        append(statements, factory2.createExpressionStatement(reduceLeft(currentModuleInfo.exportedNames.slice(i, i + chunkSize), (prev, nextId) => factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), factory2.createIdentifier(idText(nextId))), prev), factory2.createVoidZero())));
                    }
                }
                append(statements, visitNode(currentModuleInfo.externalHelpersImportDeclaration, topLevelVisitor, isStatement));
                addRange(statements, visitNodes2(node.statements, topLevelVisitor, isStatement, statementOffset));
                addExportEqualsIfNeeded(statements, 
                /*emitAsReturn*/
                false);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const updated = factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray(statements), node.statements));
                addEmitHelpers(updated, context.readEmitHelpers());
                return updated;
            }
            function transformAMDModule(node) {
                const define = factory2.createIdentifier("define");
                const moduleName = tryGetModuleNameFromFile(factory2, node, host, compilerOptions);
                const jsonSourceFile = isJsonSourceFile(node) && node;
                const { aliasedModuleNames, unaliasedModuleNames, importAliasNames } = collectAsynchronousDependencies(node, 
                /*includeNonAmdDependencies*/
                true);
                const updated = factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray([
                    factory2.createExpressionStatement(factory2.createCallExpression(define, 
                    /*typeArguments*/
                    void 0, [
                        // Add the module name (if provided).
                        ...moduleName ? [moduleName] : [],
                        // Add the dependency array argument:
                        //
                        //     ["require", "exports", module1", "module2", ...]
                        factory2.createArrayLiteralExpression(jsonSourceFile ? emptyArray : [
                            factory2.createStringLiteral("require"),
                            factory2.createStringLiteral("exports"),
                            ...aliasedModuleNames,
                            ...unaliasedModuleNames
                        ]),
                        // Add the module body function argument:
                        //
                        //     function (require, exports, module1, module2) ...
                        jsonSourceFile ? jsonSourceFile.statements.length ? jsonSourceFile.statements[0].expression : factory2.createObjectLiteralExpression() : factory2.createFunctionExpression(
                        /*modifiers*/
                        void 0, 
                        /*asteriskToken*/
                        void 0, 
                        /*name*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [
                            factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, "require"),
                            factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, "exports"),
                            ...importAliasNames
                        ], 
                        /*type*/
                        void 0, transformAsynchronousModuleBody(node))
                    ]))
                ]), 
                /*location*/
                node.statements));
                addEmitHelpers(updated, context.readEmitHelpers());
                return updated;
            }
            function transformUMDModule(node) {
                const { aliasedModuleNames, unaliasedModuleNames, importAliasNames } = collectAsynchronousDependencies(node, 
                /*includeNonAmdDependencies*/
                false);
                const moduleName = tryGetModuleNameFromFile(factory2, node, host, compilerOptions);
                const umdHeader = factory2.createFunctionExpression(
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
                    void 0, "factory")], 
                /*type*/
                void 0, setTextRange(factory2.createBlock([
                    factory2.createIfStatement(factory2.createLogicalAnd(factory2.createTypeCheck(factory2.createIdentifier("module"), "object"), factory2.createTypeCheck(factory2.createPropertyAccessExpression(factory2.createIdentifier("module"), "exports"), "object")), factory2.createBlock([
                        factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, [
                            factory2.createVariableDeclaration("v", 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, factory2.createCallExpression(factory2.createIdentifier("factory"), 
                            /*typeArguments*/
                            void 0, [
                                factory2.createIdentifier("require"),
                                factory2.createIdentifier("exports")
                            ]))
                        ]),
                        setEmitFlags(factory2.createIfStatement(factory2.createStrictInequality(factory2.createIdentifier("v"), factory2.createIdentifier("undefined")), factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("module"), "exports"), factory2.createIdentifier("v")))), 1 /* SingleLine */)
                    ]), factory2.createIfStatement(factory2.createLogicalAnd(factory2.createTypeCheck(factory2.createIdentifier("define"), "function"), factory2.createPropertyAccessExpression(factory2.createIdentifier("define"), "amd")), factory2.createBlock([
                        factory2.createExpressionStatement(factory2.createCallExpression(factory2.createIdentifier("define"), 
                        /*typeArguments*/
                        void 0, [
                            // Add the module name (if provided).
                            ...moduleName ? [moduleName] : [],
                            factory2.createArrayLiteralExpression([
                                factory2.createStringLiteral("require"),
                                factory2.createStringLiteral("exports"),
                                ...aliasedModuleNames,
                                ...unaliasedModuleNames
                            ]),
                            factory2.createIdentifier("factory")
                        ]))
                    ])))
                ], 
                /*multiLine*/
                true), 
                /*location*/
                void 0));
                const updated = factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray([
                    factory2.createExpressionStatement(factory2.createCallExpression(umdHeader, 
                    /*typeArguments*/
                    void 0, [
                        // Add the module body function argument:
                        //
                        //     function (require, exports) ...
                        factory2.createFunctionExpression(
                        /*modifiers*/
                        void 0, 
                        /*asteriskToken*/
                        void 0, 
                        /*name*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [
                            factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, "require"),
                            factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, "exports"),
                            ...importAliasNames
                        ], 
                        /*type*/
                        void 0, transformAsynchronousModuleBody(node))
                    ]))
                ]), 
                /*location*/
                node.statements));
                addEmitHelpers(updated, context.readEmitHelpers());
                return updated;
            }
            function collectAsynchronousDependencies(node, includeNonAmdDependencies) {
                const aliasedModuleNames = [];
                const unaliasedModuleNames = [];
                const importAliasNames = [];
                for (const amdDependency of node.amdDependencies) {
                    if (amdDependency.name) {
                        aliasedModuleNames.push(factory2.createStringLiteral(amdDependency.path));
                        importAliasNames.push(factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, amdDependency.name));
                    }
                    else {
                        unaliasedModuleNames.push(factory2.createStringLiteral(amdDependency.path));
                    }
                }
                for (const importNode of currentModuleInfo.externalImports) {
                    const externalModuleName = getExternalModuleNameLiteral(factory2, importNode, currentSourceFile, host, resolver, compilerOptions);
                    const importAliasName = getLocalNameForExternalImport(factory2, importNode, currentSourceFile);
                    if (externalModuleName) {
                        if (includeNonAmdDependencies && importAliasName) {
                            setEmitFlags(importAliasName, 8 /* NoSubstitution */);
                            aliasedModuleNames.push(externalModuleName);
                            importAliasNames.push(factory2.createParameterDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*dotDotDotToken*/
                            void 0, importAliasName));
                        }
                        else {
                            unaliasedModuleNames.push(externalModuleName);
                        }
                    }
                }
                return { aliasedModuleNames, unaliasedModuleNames, importAliasNames };
            }
            function getAMDImportExpressionForImport(node) {
                if (isImportEqualsDeclaration(node) || isExportDeclaration(node) || !getExternalModuleNameLiteral(factory2, node, currentSourceFile, host, resolver, compilerOptions)) {
                    return void 0;
                }
                const name = getLocalNameForExternalImport(factory2, node, currentSourceFile);
                const expr = getHelperExpressionForImport(node, name);
                if (expr === name) {
                    return void 0;
                }
                return factory2.createExpressionStatement(factory2.createAssignment(name, expr));
            }
            function transformAsynchronousModuleBody(node) {
                startLexicalEnvironment();
                const statements = [];
                const statementOffset = factory2.copyPrologue(node.statements, statements, 
                /*ensureUseStrict*/
                !compilerOptions.noImplicitUseStrict, topLevelVisitor);
                if (shouldEmitUnderscoreUnderscoreESModule()) {
                    append(statements, createUnderscoreUnderscoreESModule());
                }
                if (length(currentModuleInfo.exportedNames)) {
                    append(statements, factory2.createExpressionStatement(reduceLeft(currentModuleInfo.exportedNames, (prev, nextId) => factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), factory2.createIdentifier(idText(nextId))), prev), factory2.createVoidZero())));
                }
                append(statements, visitNode(currentModuleInfo.externalHelpersImportDeclaration, topLevelVisitor, isStatement));
                if (moduleKind === 2 /* AMD */) {
                    addRange(statements, mapDefined(currentModuleInfo.externalImports, getAMDImportExpressionForImport));
                }
                addRange(statements, visitNodes2(node.statements, topLevelVisitor, isStatement, statementOffset));
                addExportEqualsIfNeeded(statements, 
                /*emitAsReturn*/
                true);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const body = factory2.createBlock(statements, 
                /*multiLine*/
                true);
                if (needUMDDynamicImportHelper) {
                    addEmitHelper(body, dynamicImportUMDHelper);
                }
                return body;
            }
            function addExportEqualsIfNeeded(statements, emitAsReturn) {
                if (currentModuleInfo.exportEquals) {
                    const expressionResult = visitNode(currentModuleInfo.exportEquals.expression, visitor, isExpression);
                    if (expressionResult) {
                        if (emitAsReturn) {
                            const statement = factory2.createReturnStatement(expressionResult);
                            setTextRange(statement, currentModuleInfo.exportEquals);
                            setEmitFlags(statement, 768 /* NoTokenSourceMaps */ | 3072 /* NoComments */);
                            statements.push(statement);
                        }
                        else {
                            const statement = factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("module"), "exports"), expressionResult));
                            setTextRange(statement, currentModuleInfo.exportEquals);
                            setEmitFlags(statement, 3072 /* NoComments */);
                            statements.push(statement);
                        }
                    }
                }
            }
            function topLevelVisitor(node) {
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                        return visitImportDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return visitImportEqualsDeclaration(node);
                    case 275 /* ExportDeclaration */:
                        return visitExportDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 358 /* MergeDeclarationMarker */:
                        return visitMergeDeclarationMarker(node);
                    case 359 /* EndOfDeclarationMarker */:
                        return visitEndOfDeclarationMarker(node);
                    default:
                        return visitor(node);
                }
            }
            function visitorWorker(node, valueIsDiscarded) {
                if (!(node.transformFlags & (8388608 /* ContainsDynamicImport */ | 4096 /* ContainsDestructuringAssignment */ | 268435456 /* ContainsUpdateExpressionForIdentifier */))) {
                    return node;
                }
                switch (node.kind) {
                    case 245 /* ForStatement */:
                        return visitForStatement(node);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, valueIsDiscarded);
                    case 356 /* PartiallyEmittedExpression */:
                        return visitPartiallyEmittedExpression(node, valueIsDiscarded);
                    case 210 /* CallExpression */:
                        if (isImportCall(node) && currentSourceFile.impliedNodeFormat === void 0) {
                            return visitImportCallExpression(node);
                        }
                        break;
                    case 223 /* BinaryExpression */:
                        if (isDestructuringAssignment(node)) {
                            return visitDestructuringAssignment(node, valueIsDiscarded);
                        }
                        break;
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        return visitPreOrPostfixUnaryExpression(node, valueIsDiscarded);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                return visitorWorker(node, 
                /*valueIsDiscarded*/
                false);
            }
            function discardedValueVisitor(node) {
                return visitorWorker(node, 
                /*valueIsDiscarded*/
                true);
            }
            function destructuringNeedsFlattening(node) {
                if (isObjectLiteralExpression(node)) {
                    for (const elem of node.properties) {
                        switch (elem.kind) {
                            case 299 /* PropertyAssignment */:
                                if (destructuringNeedsFlattening(elem.initializer)) {
                                    return true;
                                }
                                break;
                            case 300 /* ShorthandPropertyAssignment */:
                                if (destructuringNeedsFlattening(elem.name)) {
                                    return true;
                                }
                                break;
                            case 301 /* SpreadAssignment */:
                                if (destructuringNeedsFlattening(elem.expression)) {
                                    return true;
                                }
                                break;
                            case 171 /* MethodDeclaration */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                                return false;
                            default:
                                Debug.assertNever(elem, "Unhandled object member kind");
                        }
                    }
                }
                else if (isArrayLiteralExpression(node)) {
                    for (const elem of node.elements) {
                        if (isSpreadElement(elem)) {
                            if (destructuringNeedsFlattening(elem.expression)) {
                                return true;
                            }
                        }
                        else if (destructuringNeedsFlattening(elem)) {
                            return true;
                        }
                    }
                }
                else if (isIdentifier(node)) {
                    return length(getExports(node)) > (isExportName(node) ? 1 : 0);
                }
                return false;
            }
            function visitDestructuringAssignment(node, valueIsDiscarded) {
                if (destructuringNeedsFlattening(node.left)) {
                    return flattenDestructuringAssignment(node, visitor, context, 0 /* All */, !valueIsDiscarded, createAllExportExpressions);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitForStatement(node) {
                return factory2.updateForStatement(node, visitNode(node.initializer, discardedValueVisitor, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, discardedValueVisitor, isExpression), visitIterationBody(node.statement, visitor, context));
            }
            function visitExpressionStatement(node) {
                return factory2.updateExpressionStatement(node, visitNode(node.expression, discardedValueVisitor, isExpression));
            }
            function visitParenthesizedExpression(node, valueIsDiscarded) {
                return factory2.updateParenthesizedExpression(node, visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, isExpression));
            }
            function visitPartiallyEmittedExpression(node, valueIsDiscarded) {
                return factory2.updatePartiallyEmittedExpression(node, visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, isExpression));
            }
            function visitPreOrPostfixUnaryExpression(node, valueIsDiscarded) {
                if ((node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) && isIdentifier(node.operand) && !isGeneratedIdentifier(node.operand) && !isLocalName(node.operand) && !isDeclarationNameOfEnumOrNamespace(node.operand)) {
                    const exportedNames = getExports(node.operand);
                    if (exportedNames) {
                        let temp;
                        let expression = visitNode(node.operand, visitor, isExpression);
                        if (isPrefixUnaryExpression(node)) {
                            expression = factory2.updatePrefixUnaryExpression(node, expression);
                        }
                        else {
                            expression = factory2.updatePostfixUnaryExpression(node, expression);
                            if (!valueIsDiscarded) {
                                temp = factory2.createTempVariable(hoistVariableDeclaration);
                                expression = factory2.createAssignment(temp, expression);
                                setTextRange(expression, node);
                            }
                            expression = factory2.createComma(expression, factory2.cloneNode(node.operand));
                            setTextRange(expression, node);
                        }
                        for (const exportName of exportedNames) {
                            noSubstitution[getNodeId(expression)] = true;
                            expression = createExportExpression(exportName, expression);
                            setTextRange(expression, node);
                        }
                        if (temp) {
                            noSubstitution[getNodeId(expression)] = true;
                            expression = factory2.createComma(expression, temp);
                            setTextRange(expression, node);
                        }
                        return expression;
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitImportCallExpression(node) {
                if (moduleKind === 0 /* None */ && languageVersion >= 7 /* ES2020 */) {
                    return visitEachChild(node, visitor, context);
                }
                const externalModuleName = getExternalModuleNameLiteral(factory2, node, currentSourceFile, host, resolver, compilerOptions);
                const firstArgument = visitNode(firstOrUndefined(node.arguments), visitor, isExpression);
                const argument = externalModuleName && (!firstArgument || !isStringLiteral(firstArgument) || firstArgument.text !== externalModuleName.text) ? externalModuleName : firstArgument;
                const containsLexicalThis = !!(node.transformFlags & 16384 /* ContainsLexicalThis */);
                switch (compilerOptions.module) {
                    case 2 /* AMD */:
                        return createImportCallExpressionAMD(argument, containsLexicalThis);
                    case 3 /* UMD */:
                        return createImportCallExpressionUMD(argument != null ? argument : factory2.createVoidZero(), containsLexicalThis);
                    case 1 /* CommonJS */:
                    default:
                        return createImportCallExpressionCommonJS(argument);
                }
            }
            function createImportCallExpressionUMD(arg, containsLexicalThis) {
                needUMDDynamicImportHelper = true;
                if (isSimpleCopiableExpression(arg)) {
                    const argClone = isGeneratedIdentifier(arg) ? arg : isStringLiteral(arg) ? factory2.createStringLiteralFromNode(arg) : setEmitFlags(setTextRange(factory2.cloneNode(arg), arg), 3072 /* NoComments */);
                    return factory2.createConditionalExpression(
                    /*condition*/
                    factory2.createIdentifier("__syncRequire"), 
                    /*questionToken*/
                    void 0, 
                    /*whenTrue*/
                    createImportCallExpressionCommonJS(arg), 
                    /*colonToken*/
                    void 0, 
                    /*whenFalse*/
                    createImportCallExpressionAMD(argClone, containsLexicalThis));
                }
                else {
                    const temp = factory2.createTempVariable(hoistVariableDeclaration);
                    return factory2.createComma(factory2.createAssignment(temp, arg), factory2.createConditionalExpression(
                    /*condition*/
                    factory2.createIdentifier("__syncRequire"), 
                    /*questionToken*/
                    void 0, 
                    /*whenTrue*/
                    createImportCallExpressionCommonJS(temp, 
                    /* isInlineable */
                    true), 
                    /*colonToken*/
                    void 0, 
                    /*whenFalse*/
                    createImportCallExpressionAMD(temp, containsLexicalThis)));
                }
            }
            function createImportCallExpressionAMD(arg, containsLexicalThis) {
                const resolve = factory2.createUniqueName("resolve");
                const reject = factory2.createUniqueName("reject");
                const parameters = [
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, 
                    /*name*/
                    resolve),
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, 
                    /*name*/
                    reject)
                ];
                const body = factory2.createBlock([
                    factory2.createExpressionStatement(factory2.createCallExpression(factory2.createIdentifier("require"), 
                    /*typeArguments*/
                    void 0, [factory2.createArrayLiteralExpression([arg || factory2.createOmittedExpression()]), resolve, reject]))
                ]);
                let func;
                if (languageVersion >= 2 /* ES2015 */) {
                    func = factory2.createArrowFunction(
                    /*modifiers*/
                    void 0, 
                    /*typeParameters*/
                    void 0, parameters, 
                    /*type*/
                    void 0, 
                    /*equalsGreaterThanToken*/
                    void 0, body);
                }
                else {
                    func = factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, parameters, 
                    /*type*/
                    void 0, body);
                    if (containsLexicalThis) {
                        setEmitFlags(func, 16 /* CapturesThis */);
                    }
                }
                const promise = factory2.createNewExpression(factory2.createIdentifier("Promise"), 
                /*typeArguments*/
                void 0, [func]);
                if (getESModuleInterop(compilerOptions)) {
                    return factory2.createCallExpression(factory2.createPropertyAccessExpression(promise, factory2.createIdentifier("then")), 
                    /*typeArguments*/
                    void 0, [emitHelpers().createImportStarCallbackHelper()]);
                }
                return promise;
            }
            function createImportCallExpressionCommonJS(arg, isInlineable) {
                const needSyncEval = arg && !isSimpleInlineableExpression(arg) && !isInlineable;
                const promiseResolveCall = factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Promise"), "resolve"), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                needSyncEval ? languageVersion >= 2 /* ES2015 */ ? [
                    factory2.createTemplateExpression(factory2.createTemplateHead(""), [
                        factory2.createTemplateSpan(arg, factory2.createTemplateTail(""))
                    ])
                ] : [
                    factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createStringLiteral(""), "concat"), 
                    /*typeArguments*/
                    void 0, [arg])
                ] : []);
                let requireCall = factory2.createCallExpression(factory2.createIdentifier("require"), 
                /*typeArguments*/
                void 0, needSyncEval ? [factory2.createIdentifier("s")] : arg ? [arg] : []);
                if (getESModuleInterop(compilerOptions)) {
                    requireCall = emitHelpers().createImportStarHelper(requireCall);
                }
                const parameters = needSyncEval ? [
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, 
                    /*name*/
                    "s")
                ] : [];
                let func;
                if (languageVersion >= 2 /* ES2015 */) {
                    func = factory2.createArrowFunction(
                    /*modifiers*/
                    void 0, 
                    /*typeParameters*/
                    void 0, 
                    /*parameters*/
                    parameters, 
                    /*type*/
                    void 0, 
                    /*equalsGreaterThanToken*/
                    void 0, requireCall);
                }
                else {
                    func = factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, 
                    /*parameters*/
                    parameters, 
                    /*type*/
                    void 0, factory2.createBlock([factory2.createReturnStatement(requireCall)]));
                }
                const downleveledImport = factory2.createCallExpression(factory2.createPropertyAccessExpression(promiseResolveCall, "then"), 
                /*typeArguments*/
                void 0, [func]);
                return downleveledImport;
            }
            function getHelperExpressionForExport(node, innerExpr) {
                if (!getESModuleInterop(compilerOptions) || getInternalEmitFlags(node) & 2 /* NeverApplyImportHelper */) {
                    return innerExpr;
                }
                if (getExportNeedsImportStarHelper(node)) {
                    return emitHelpers().createImportStarHelper(innerExpr);
                }
                return innerExpr;
            }
            function getHelperExpressionForImport(node, innerExpr) {
                if (!getESModuleInterop(compilerOptions) || getInternalEmitFlags(node) & 2 /* NeverApplyImportHelper */) {
                    return innerExpr;
                }
                if (getImportNeedsImportStarHelper(node)) {
                    return emitHelpers().createImportStarHelper(innerExpr);
                }
                if (getImportNeedsImportDefaultHelper(node)) {
                    return emitHelpers().createImportDefaultHelper(innerExpr);
                }
                return innerExpr;
            }
            function visitImportDeclaration(node) {
                let statements;
                const namespaceDeclaration = getNamespaceDeclarationNode(node);
                if (moduleKind !== 2 /* AMD */) {
                    if (!node.importClause) {
                        return setOriginalNode(setTextRange(factory2.createExpressionStatement(createRequireCall2(node)), node), node);
                    }
                    else {
                        const variables = [];
                        if (namespaceDeclaration && !isDefaultImport(node)) {
                            variables.push(factory2.createVariableDeclaration(factory2.cloneNode(namespaceDeclaration.name), 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, getHelperExpressionForImport(node, createRequireCall2(node))));
                        }
                        else {
                            variables.push(factory2.createVariableDeclaration(factory2.getGeneratedNameForNode(node), 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, getHelperExpressionForImport(node, createRequireCall2(node))));
                            if (namespaceDeclaration && isDefaultImport(node)) {
                                variables.push(factory2.createVariableDeclaration(factory2.cloneNode(namespaceDeclaration.name), 
                                /*exclamationToken*/
                                void 0, 
                                /*type*/
                                void 0, factory2.getGeneratedNameForNode(node)));
                            }
                        }
                        statements = append(statements, setOriginalNode(setTextRange(factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, factory2.createVariableDeclarationList(variables, languageVersion >= 2 /* ES2015 */ ? 2 /* Const */ : 0 /* None */)), 
                        /*location*/
                        node), 
                        /*original*/
                        node));
                    }
                }
                else if (namespaceDeclaration && isDefaultImport(node)) {
                    statements = append(statements, factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([
                        setOriginalNode(setTextRange(factory2.createVariableDeclaration(factory2.cloneNode(namespaceDeclaration.name), 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.getGeneratedNameForNode(node)), 
                        /*location*/
                        node), 
                        /*original*/
                        node)
                    ], languageVersion >= 2 /* ES2015 */ ? 2 /* Const */ : 0 /* None */)));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfImportDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfImportDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
            function createRequireCall2(importNode) {
                const moduleName = getExternalModuleNameLiteral(factory2, importNode, currentSourceFile, host, resolver, compilerOptions);
                const args = [];
                if (moduleName) {
                    args.push(moduleName);
                }
                return factory2.createCallExpression(factory2.createIdentifier("require"), 
                /*typeArguments*/
                void 0, args);
            }
            function visitImportEqualsDeclaration(node) {
                Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");
                let statements;
                if (moduleKind !== 2 /* AMD */) {
                    if (hasSyntacticModifier(node, 1 /* Export */)) {
                        statements = append(statements, setOriginalNode(setTextRange(factory2.createExpressionStatement(createExportExpression(node.name, createRequireCall2(node))), node), node));
                    }
                    else {
                        statements = append(statements, setOriginalNode(setTextRange(factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, factory2.createVariableDeclarationList([
                            factory2.createVariableDeclaration(factory2.cloneNode(node.name), 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, createRequireCall2(node))
                        ], 
                        /*flags*/
                        languageVersion >= 2 /* ES2015 */ ? 2 /* Const */ : 0 /* None */)), node), node));
                    }
                }
                else {
                    if (hasSyntacticModifier(node, 1 /* Export */)) {
                        statements = append(statements, setOriginalNode(setTextRange(factory2.createExpressionStatement(createExportExpression(factory2.getExportName(node), factory2.getLocalName(node))), node), node));
                    }
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfImportEqualsDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfImportEqualsDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
            function visitExportDeclaration(node) {
                if (!node.moduleSpecifier) {
                    return void 0;
                }
                const generatedName = factory2.getGeneratedNameForNode(node);
                if (node.exportClause && isNamedExports(node.exportClause)) {
                    const statements = [];
                    if (moduleKind !== 2 /* AMD */) {
                        statements.push(setOriginalNode(setTextRange(factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, factory2.createVariableDeclarationList([
                            factory2.createVariableDeclaration(generatedName, 
                            /*exclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, createRequireCall2(node))
                        ])), 
                        /*location*/
                        node), 
                        /* original */
                        node));
                    }
                    for (const specifier of node.exportClause.elements) {
                        if (languageVersion === 0 /* ES3 */) {
                            statements.push(setOriginalNode(setTextRange(factory2.createExpressionStatement(emitHelpers().createCreateBindingHelper(generatedName, factory2.createStringLiteralFromNode(specifier.propertyName || specifier.name), specifier.propertyName ? factory2.createStringLiteralFromNode(specifier.name) : void 0)), specifier), specifier));
                        }
                        else {
                            const exportNeedsImportDefault = !!getESModuleInterop(compilerOptions) && !(getInternalEmitFlags(node) & 2 /* NeverApplyImportHelper */) && idText(specifier.propertyName || specifier.name) === "default";
                            const exportedValue = factory2.createPropertyAccessExpression(exportNeedsImportDefault ? emitHelpers().createImportDefaultHelper(generatedName) : generatedName, specifier.propertyName || specifier.name);
                            statements.push(setOriginalNode(setTextRange(factory2.createExpressionStatement(createExportExpression(factory2.getExportName(specifier), exportedValue, 
                            /* location */
                            void 0, 
                            /* liveBinding */
                            true)), specifier), specifier));
                        }
                    }
                    return singleOrMany(statements);
                }
                else if (node.exportClause) {
                    const statements = [];
                    statements.push(setOriginalNode(setTextRange(factory2.createExpressionStatement(createExportExpression(factory2.cloneNode(node.exportClause.name), getHelperExpressionForExport(node, moduleKind !== 2 /* AMD */ ? createRequireCall2(node) : isExportNamespaceAsDefaultDeclaration(node) ? generatedName : factory2.createIdentifier(idText(node.exportClause.name))))), node), node));
                    return singleOrMany(statements);
                }
                else {
                    return setOriginalNode(setTextRange(factory2.createExpressionStatement(emitHelpers().createExportStarHelper(moduleKind !== 2 /* AMD */ ? createRequireCall2(node) : generatedName)), node), node);
                }
            }
            function visitExportAssignment(node) {
                if (node.isExportEquals) {
                    return void 0;
                }
                let statements;
                const original = node.original;
                if (original && hasAssociatedEndOfDeclarationMarker(original)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportStatement(deferredExports[id], factory2.createIdentifier("default"), visitNode(node.expression, visitor, isExpression), 
                    /*location*/
                    node, 
                    /*allowComments*/
                    true);
                }
                else {
                    statements = appendExportStatement(statements, factory2.createIdentifier("default"), visitNode(node.expression, visitor, isExpression), 
                    /*location*/
                    node, 
                    /*allowComments*/
                    true);
                }
                return singleOrMany(statements);
            }
            function visitFunctionDeclaration(node) {
                let statements;
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    statements = append(statements, setOriginalNode(setTextRange(factory2.createFunctionDeclaration(visitNodes2(node.modifiers, modifierVisitor, isModifier), node.asteriskToken, factory2.getDeclarationName(node, 
                    /*allowComments*/
                    true, 
                    /*allowSourceMaps*/
                    true), 
                    /*typeParameters*/
                    void 0, visitNodes2(node.parameters, visitor, isParameter), 
                    /*type*/
                    void 0, visitEachChild(node.body, visitor, context)), 
                    /*location*/
                    node), 
                    /*original*/
                    node));
                }
                else {
                    statements = append(statements, visitEachChild(node, visitor, context));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfHoistedDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
            function visitClassDeclaration(node) {
                let statements;
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    statements = append(statements, setOriginalNode(setTextRange(factory2.createClassDeclaration(visitNodes2(node.modifiers, modifierVisitor, isModifierLike), factory2.getDeclarationName(node, 
                    /*allowComments*/
                    true, 
                    /*allowSourceMaps*/
                    true), 
                    /*typeParameters*/
                    void 0, visitNodes2(node.heritageClauses, visitor, isHeritageClause), visitNodes2(node.members, visitor, isClassElement)), node), node));
                }
                else {
                    statements = append(statements, visitEachChild(node, visitor, context));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfHoistedDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
            function visitVariableStatement(node) {
                let statements;
                let variables;
                let expressions;
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    let modifiers;
                    let removeCommentsOnExpressions = false;
                    for (const variable of node.declarationList.declarations) {
                        if (isIdentifier(variable.name) && isLocalName(variable.name)) {
                            if (!modifiers) {
                                modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                            }
                            if (variable.initializer) {
                                const updatedVariable = factory2.updateVariableDeclaration(variable, variable.name, 
                                /*exclamationToken*/
                                void 0, 
                                /*type*/
                                void 0, createExportExpression(variable.name, visitNode(variable.initializer, visitor, isExpression)));
                                variables = append(variables, updatedVariable);
                            }
                            else {
                                variables = append(variables, variable);
                            }
                        }
                        else if (variable.initializer) {
                            if (!isBindingPattern(variable.name) && (isArrowFunction(variable.initializer) || isFunctionExpression(variable.initializer) || isClassExpression(variable.initializer))) {
                                const expression = factory2.createAssignment(setTextRange(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), variable.name), 
                                /*location*/
                                variable.name), factory2.createIdentifier(getTextOfIdentifierOrLiteral(variable.name)));
                                const updatedVariable = factory2.createVariableDeclaration(variable.name, variable.exclamationToken, variable.type, visitNode(variable.initializer, visitor, isExpression));
                                variables = append(variables, updatedVariable);
                                expressions = append(expressions, expression);
                                removeCommentsOnExpressions = true;
                            }
                            else {
                                expressions = append(expressions, transformInitializedVariable(variable));
                            }
                        }
                    }
                    if (variables) {
                        statements = append(statements, factory2.updateVariableStatement(node, modifiers, factory2.updateVariableDeclarationList(node.declarationList, variables)));
                    }
                    if (expressions) {
                        const statement = setOriginalNode(setTextRange(factory2.createExpressionStatement(factory2.inlineExpressions(expressions)), node), node);
                        if (removeCommentsOnExpressions) {
                            removeAllComments(statement);
                        }
                        statements = append(statements, statement);
                    }
                }
                else {
                    statements = append(statements, visitEachChild(node, visitor, context));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfVariableStatement(statements, node);
                }
                return singleOrMany(statements);
            }
            function createAllExportExpressions(name, value, location) {
                const exportedNames = getExports(name);
                if (exportedNames) {
                    let expression = isExportName(name) ? value : factory2.createAssignment(name, value);
                    for (const exportName of exportedNames) {
                        setEmitFlags(expression, 8 /* NoSubstitution */);
                        expression = createExportExpression(exportName, expression, 
                        /*location*/
                        location);
                    }
                    return expression;
                }
                return factory2.createAssignment(name, value);
            }
            function transformInitializedVariable(node) {
                if (isBindingPattern(node.name)) {
                    return flattenDestructuringAssignment(visitNode(node, visitor, isInitializedVariable), visitor, context, 0 /* All */, 
                    /*needsValue*/
                    false, createAllExportExpressions);
                }
                else {
                    return factory2.createAssignment(setTextRange(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), node.name), 
                    /*location*/
                    node.name), node.initializer ? visitNode(node.initializer, visitor, isExpression) : factory2.createVoidZero());
                }
            }
            function visitMergeDeclarationMarker(node) {
                if (hasAssociatedEndOfDeclarationMarker(node) && node.original.kind === 240 /* VariableStatement */) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node.original);
                }
                return node;
            }
            function hasAssociatedEndOfDeclarationMarker(node) {
                return (getEmitFlags(node) & 8388608 /* HasEndOfDeclarationMarker */) !== 0;
            }
            function visitEndOfDeclarationMarker(node) {
                const id = getOriginalNodeId(node);
                const statements = deferredExports[id];
                if (statements) {
                    delete deferredExports[id];
                    return append(statements, node);
                }
                return node;
            }
            function appendExportsOfImportDeclaration(statements, decl) {
                if (currentModuleInfo.exportEquals) {
                    return statements;
                }
                const importClause = decl.importClause;
                if (!importClause) {
                    return statements;
                }
                if (importClause.name) {
                    statements = appendExportsOfDeclaration(statements, importClause);
                }
                const namedBindings = importClause.namedBindings;
                if (namedBindings) {
                    switch (namedBindings.kind) {
                        case 271 /* NamespaceImport */:
                            statements = appendExportsOfDeclaration(statements, namedBindings);
                            break;
                        case 272 /* NamedImports */:
                            for (const importBinding of namedBindings.elements) {
                                statements = appendExportsOfDeclaration(statements, importBinding, 
                                /* liveBinding */
                                true);
                            }
                            break;
                    }
                }
                return statements;
            }
            function appendExportsOfImportEqualsDeclaration(statements, decl) {
                if (currentModuleInfo.exportEquals) {
                    return statements;
                }
                return appendExportsOfDeclaration(statements, decl);
            }
            function appendExportsOfVariableStatement(statements, node) {
                if (currentModuleInfo.exportEquals) {
                    return statements;
                }
                for (const decl of node.declarationList.declarations) {
                    statements = appendExportsOfBindingElement(statements, decl);
                }
                return statements;
            }
            function appendExportsOfBindingElement(statements, decl) {
                if (currentModuleInfo.exportEquals) {
                    return statements;
                }
                if (isBindingPattern(decl.name)) {
                    for (const element of decl.name.elements) {
                        if (!isOmittedExpression(element)) {
                            statements = appendExportsOfBindingElement(statements, element);
                        }
                    }
                }
                else if (!isGeneratedIdentifier(decl.name)) {
                    statements = appendExportsOfDeclaration(statements, decl);
                }
                return statements;
            }
            function appendExportsOfHoistedDeclaration(statements, decl) {
                if (currentModuleInfo.exportEquals) {
                    return statements;
                }
                if (hasSyntacticModifier(decl, 1 /* Export */)) {
                    const exportName = hasSyntacticModifier(decl, 1024 /* Default */) ? factory2.createIdentifier("default") : factory2.getDeclarationName(decl);
                    statements = appendExportStatement(statements, exportName, factory2.getLocalName(decl), 
                    /*location*/
                    decl);
                }
                if (decl.name) {
                    statements = appendExportsOfDeclaration(statements, decl);
                }
                return statements;
            }
            function appendExportsOfDeclaration(statements, decl, liveBinding) {
                const name = factory2.getDeclarationName(decl);
                const exportSpecifiers = currentModuleInfo.exportSpecifiers.get(idText(name));
                if (exportSpecifiers) {
                    for (const exportSpecifier of exportSpecifiers) {
                        statements = appendExportStatement(statements, exportSpecifier.name, name, 
                        /*location*/
                        exportSpecifier.name, 
                        /* allowComments */
                        void 0, liveBinding);
                    }
                }
                return statements;
            }
            function appendExportStatement(statements, exportName, expression, location, allowComments, liveBinding) {
                statements = append(statements, createExportStatement(exportName, expression, location, allowComments, liveBinding));
                return statements;
            }
            function createUnderscoreUnderscoreESModule() {
                let statement;
                if (languageVersion === 0 /* ES3 */) {
                    statement = factory2.createExpressionStatement(createExportExpression(factory2.createIdentifier("__esModule"), factory2.createTrue()));
                }
                else {
                    statement = factory2.createExpressionStatement(factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "defineProperty"), 
                    /*typeArguments*/
                    void 0, [
                        factory2.createIdentifier("exports"),
                        factory2.createStringLiteral("__esModule"),
                        factory2.createObjectLiteralExpression([
                            factory2.createPropertyAssignment("value", factory2.createTrue())
                        ])
                    ]));
                }
                setEmitFlags(statement, 2097152 /* CustomPrologue */);
                return statement;
            }
            function createExportStatement(name, value, location, allowComments, liveBinding) {
                const statement = setTextRange(factory2.createExpressionStatement(createExportExpression(name, value, 
                /* location */
                void 0, liveBinding)), location);
                startOnNewLine(statement);
                if (!allowComments) {
                    setEmitFlags(statement, 3072 /* NoComments */);
                }
                return statement;
            }
            function createExportExpression(name, value, location, liveBinding) {
                return setTextRange(liveBinding && languageVersion !== 0 /* ES3 */ ? factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("Object"), "defineProperty"), 
                /*typeArguments*/
                void 0, [
                    factory2.createIdentifier("exports"),
                    factory2.createStringLiteralFromNode(name),
                    factory2.createObjectLiteralExpression([
                        factory2.createPropertyAssignment("enumerable", factory2.createTrue()),
                        factory2.createPropertyAssignment("get", factory2.createFunctionExpression(
                        /*modifiers*/
                        void 0, 
                        /*asteriskToken*/
                        void 0, 
                        /*name*/
                        void 0, 
                        /*typeParameters*/
                        void 0, 
                        /*parameters*/
                        [], 
                        /*type*/
                        void 0, factory2.createBlock([factory2.createReturnStatement(value)])))
                    ])
                ]) : factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), factory2.cloneNode(name)), value), location);
            }
            function modifierVisitor(node) {
                switch (node.kind) {
                    case 93 /* ExportKeyword */:
                    case 88 /* DefaultKeyword */:
                        return void 0;
                }
                return node;
            }
            function onEmitNode(hint, node, emitCallback) {
                if (node.kind === 308 /* SourceFile */) {
                    currentSourceFile = node;
                    currentModuleInfo = moduleInfoMap[getOriginalNodeId(currentSourceFile)];
                    previousOnEmitNode(hint, node, emitCallback);
                    currentSourceFile = void 0;
                    currentModuleInfo = void 0;
                }
                else {
                    previousOnEmitNode(hint, node, emitCallback);
                }
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (node.id && noSubstitution[node.id]) {
                    return node;
                }
                if (hint === 1 /* Expression */) {
                    return substituteExpression(node);
                }
                else if (isShorthandPropertyAssignment(node)) {
                    return substituteShorthandPropertyAssignment(node);
                }
                return node;
            }
            function substituteShorthandPropertyAssignment(node) {
                const name = node.name;
                const exportedOrImportedName = substituteExpressionIdentifier(name);
                if (exportedOrImportedName !== name) {
                    if (node.objectAssignmentInitializer) {
                        const initializer = factory2.createAssignment(exportedOrImportedName, node.objectAssignmentInitializer);
                        return setTextRange(factory2.createPropertyAssignment(name, initializer), node);
                    }
                    return setTextRange(factory2.createPropertyAssignment(name, exportedOrImportedName), node);
                }
                return node;
            }
            function substituteExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return substituteExpressionIdentifier(node);
                    case 210 /* CallExpression */:
                        return substituteCallExpression(node);
                    case 212 /* TaggedTemplateExpression */:
                        return substituteTaggedTemplateExpression(node);
                    case 223 /* BinaryExpression */:
                        return substituteBinaryExpression(node);
                }
                return node;
            }
            function substituteCallExpression(node) {
                if (isIdentifier(node.expression)) {
                    const expression = substituteExpressionIdentifier(node.expression);
                    noSubstitution[getNodeId(expression)] = true;
                    if (!isIdentifier(expression) && !(getEmitFlags(node.expression) & 8192 /* HelperName */)) {
                        return addInternalEmitFlags(factory2.updateCallExpression(node, expression, 
                        /*typeArguments*/
                        void 0, node.arguments), 16 /* IndirectCall */);
                    }
                }
                return node;
            }
            function substituteTaggedTemplateExpression(node) {
                if (isIdentifier(node.tag)) {
                    const tag = substituteExpressionIdentifier(node.tag);
                    noSubstitution[getNodeId(tag)] = true;
                    if (!isIdentifier(tag) && !(getEmitFlags(node.tag) & 8192 /* HelperName */)) {
                        return addInternalEmitFlags(factory2.updateTaggedTemplateExpression(node, tag, 
                        /*typeArguments*/
                        void 0, node.template), 16 /* IndirectCall */);
                    }
                }
                return node;
            }
            function substituteExpressionIdentifier(node) {
                var _a2, _b;
                if (getEmitFlags(node) & 8192 /* HelperName */) {
                    const externalHelpersModuleName = getExternalHelpersModuleName(currentSourceFile);
                    if (externalHelpersModuleName) {
                        return factory2.createPropertyAccessExpression(externalHelpersModuleName, node);
                    }
                    return node;
                }
                else if (!(isGeneratedIdentifier(node) && !(node.emitNode.autoGenerate.flags & 64 /* AllowNameSubstitution */)) && !isLocalName(node)) {
                    const exportContainer = resolver.getReferencedExportContainer(node, isExportName(node));
                    if (exportContainer && exportContainer.kind === 308 /* SourceFile */) {
                        return setTextRange(factory2.createPropertyAccessExpression(factory2.createIdentifier("exports"), factory2.cloneNode(node)), 
                        /*location*/
                        node);
                    }
                    const importDeclaration = resolver.getReferencedImportDeclaration(node);
                    if (importDeclaration) {
                        if (isImportClause(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(importDeclaration.parent), factory2.createIdentifier("default")), 
                            /*location*/
                            node);
                        }
                        else if (isImportSpecifier(importDeclaration)) {
                            const name = importDeclaration.propertyName || importDeclaration.name;
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(((_b = (_a2 = importDeclaration.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.parent) || importDeclaration), factory2.cloneNode(name)), 
                            /*location*/
                            node);
                        }
                    }
                }
                return node;
            }
            function substituteBinaryExpression(node) {
                if (isAssignmentOperator(node.operatorToken.kind) && isIdentifier(node.left) && !isGeneratedIdentifier(node.left) && !isLocalName(node.left) && !isDeclarationNameOfEnumOrNamespace(node.left)) {
                    const exportedNames = getExports(node.left);
                    if (exportedNames) {
                        let expression = node;
                        for (const exportName of exportedNames) {
                            noSubstitution[getNodeId(expression)] = true;
                            expression = createExportExpression(exportName, expression, 
                            /*location*/
                            node);
                        }
                        return expression;
                    }
                }
                return node;
            }
            function getExports(name) {
                if (!isGeneratedIdentifier(name)) {
                    const valueDeclaration = resolver.getReferencedImportDeclaration(name) || resolver.getReferencedValueDeclaration(name);
                    if (valueDeclaration) {
                        return currentModuleInfo && currentModuleInfo.exportedBindings[getOriginalNodeId(valueDeclaration)];
                    }
                }
            }
        }