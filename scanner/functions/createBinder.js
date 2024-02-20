function createBinder() {
            var file;
            var options;
            var languageVersion;
            var parent2;
            var container;
            var thisParentContainer;
            var blockScopeContainer;
            var lastContainer;
            var delayedTypeAliases;
            var seenThisKeyword;
            var currentFlow;
            var currentBreakTarget;
            var currentContinueTarget;
            var currentReturnTarget;
            var currentTrueTarget;
            var currentFalseTarget;
            var currentExceptionTarget;
            var preSwitchCaseFlow;
            var activeLabelList;
            var hasExplicitReturn;
            var emitFlags;
            var inStrictMode;
            var inAssignmentPattern = false;
            var symbolCount = 0;
            var Symbol46;
            var classifiableNames;
            var unreachableFlow = { flags: 1 /* Unreachable */ };
            var reportedUnreachableFlow = { flags: 1 /* Unreachable */ };
            var bindBinaryExpressionFlow = createBindBinaryExpressionFlow();
            return bindSourceFile2;
            function createDiagnosticForNode2(node, message, arg0, arg1, arg2) {
                return createDiagnosticForNodeInSourceFile(getSourceFileOfNode(node) || file, node, message, arg0, arg1, arg2);
            }
            function bindSourceFile2(f, opts) {
                var _a2, _b;
                file = f;
                options = opts;
                languageVersion = getEmitScriptTarget(options);
                inStrictMode = bindInStrictMode(file, opts);
                classifiableNames = /* @__PURE__ */ new Set();
                symbolCount = 0;
                Symbol46 = objectAllocator.getSymbolConstructor();
                Debug.attachFlowNodeDebugInfo(unreachableFlow);
                Debug.attachFlowNodeDebugInfo(reportedUnreachableFlow);
                if (!file.locals) {
                    (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Bind, "bindSourceFile", { path: file.path }, 
                    /*separateBeginAndEnd*/
                    true);
                    bind(file);
                    (_b = tracing) == null ? void 0 : _b.pop();
                    file.symbolCount = symbolCount;
                    file.classifiableNames = classifiableNames;
                    delayedBindJSDocTypedefTag();
                }
                file = void 0;
                options = void 0;
                languageVersion = void 0;
                parent2 = void 0;
                container = void 0;
                thisParentContainer = void 0;
                blockScopeContainer = void 0;
                lastContainer = void 0;
                delayedTypeAliases = void 0;
                seenThisKeyword = false;
                currentFlow = void 0;
                currentBreakTarget = void 0;
                currentContinueTarget = void 0;
                currentReturnTarget = void 0;
                currentTrueTarget = void 0;
                currentFalseTarget = void 0;
                currentExceptionTarget = void 0;
                activeLabelList = void 0;
                hasExplicitReturn = false;
                inAssignmentPattern = false;
                emitFlags = 0 /* None */;
            }
            function bindInStrictMode(file2, opts) {
                if (getStrictOptionValue(opts, "alwaysStrict") && !file2.isDeclarationFile) {
                    return true;
                }
                else {
                    return !!file2.externalModuleIndicator;
                }
            }
            function createSymbol(flags, name) {
                symbolCount++;
                return new Symbol46(flags, name);
            }
            function addDeclarationToSymbol(symbol, node, symbolFlags) {
                symbol.flags |= symbolFlags;
                node.symbol = symbol;
                symbol.declarations = appendIfUnique(symbol.declarations, node);
                if (symbolFlags & (32 /* Class */ | 384 /* Enum */ | 1536 /* Module */ | 3 /* Variable */) && !symbol.exports) {
                    symbol.exports = createSymbolTable();
                }
                if (symbolFlags & (32 /* Class */ | 64 /* Interface */ | 2048 /* TypeLiteral */ | 4096 /* ObjectLiteral */) && !symbol.members) {
                    symbol.members = createSymbolTable();
                }
                if (symbol.constEnumOnlyModule && symbol.flags & (16 /* Function */ | 32 /* Class */ | 256 /* RegularEnum */)) {
                    symbol.constEnumOnlyModule = false;
                }
                if (symbolFlags & 111551 /* Value */) {
                    setValueDeclaration(symbol, node);
                }
            }
            function getDeclarationName(node) {
                if (node.kind === 274 /* ExportAssignment */) {
                    return node.isExportEquals ? "export=" /* ExportEquals */ : "default" /* Default */;
                }
                const name = getNameOfDeclaration(node);
                if (name) {
                    if (isAmbientModule(node)) {
                        const moduleName = getTextOfIdentifierOrLiteral(name);
                        return isGlobalScopeAugmentation(node) ? "__global" : `"${moduleName}"`;
                    }
                    if (name.kind === 164 /* ComputedPropertyName */) {
                        const nameExpression = name.expression;
                        if (isStringOrNumericLiteralLike(nameExpression)) {
                            return escapeLeadingUnderscores(nameExpression.text);
                        }
                        if (isSignedNumericLiteral(nameExpression)) {
                            return tokenToString(nameExpression.operator) + nameExpression.operand.text;
                        }
                        else {
                            Debug.fail("Only computed properties with literal names have declaration names");
                        }
                    }
                    if (isPrivateIdentifier(name)) {
                        const containingClass = getContainingClass(node);
                        if (!containingClass) {
                            return void 0;
                        }
                        const containingClassSymbol = containingClass.symbol;
                        return getSymbolNameForPrivateIdentifier(containingClassSymbol, name.escapedText);
                    }
                    return isPropertyNameLiteral(name) ? getEscapedTextOfIdentifierOrLiteral(name) : void 0;
                }
                switch (node.kind) {
                    case 173 /* Constructor */:
                        return "__constructor" /* Constructor */;
                    case 181 /* FunctionType */:
                    case 176 /* CallSignature */:
                    case 326 /* JSDocSignature */:
                        return "__call" /* Call */;
                    case 182 /* ConstructorType */:
                    case 177 /* ConstructSignature */:
                        return "__new" /* New */;
                    case 178 /* IndexSignature */:
                        return "__index" /* Index */;
                    case 275 /* ExportDeclaration */:
                        return "__export" /* ExportStar */;
                    case 308 /* SourceFile */:
                        return "export=" /* ExportEquals */;
                    case 223 /* BinaryExpression */:
                        if (getAssignmentDeclarationKind(node) === 2 /* ModuleExports */) {
                            return "export=" /* ExportEquals */;
                        }
                        Debug.fail("Unknown binary declaration kind");
                        break;
                    case 320 /* JSDocFunctionType */:
                        return isJSDocConstructSignature(node) ? "__new" /* New */ : "__call" /* Call */;
                    case 166 /* Parameter */:
                        Debug.assert(node.parent.kind === 320 /* JSDocFunctionType */, "Impossible parameter parent kind", () => `parent is: ${Debug.formatSyntaxKind(node.parent.kind)}, expected JSDocFunctionType`);
                        const functionType = node.parent;
                        const index = functionType.parameters.indexOf(node);
                        return "arg" + index;
                }
            }
            function getDisplayName(node) {
                return isNamedDeclaration(node) ? declarationNameToString(node.name) : unescapeLeadingUnderscores(Debug.checkDefined(getDeclarationName(node)));
            }
            function declareSymbol(symbolTable, parent3, node, includes, excludes, isReplaceableByMethod, isComputedName) {
                Debug.assert(isComputedName || !hasDynamicName(node));
                const isDefaultExport = hasSyntacticModifier(node, 1024 /* Default */) || isExportSpecifier(node) && node.name.escapedText === "default";
                const name = isComputedName ? "__computed" /* Computed */ : isDefaultExport && parent3 ? "default" /* Default */ : getDeclarationName(node);
                let symbol;
                if (name === void 0) {
                    symbol = createSymbol(0 /* None */, "__missing" /* Missing */);
                }
                else {
                    symbol = symbolTable.get(name);
                    if (includes & 2885600 /* Classifiable */) {
                        classifiableNames.add(name);
                    }
                    if (!symbol) {
                        symbolTable.set(name, symbol = createSymbol(0 /* None */, name));
                        if (isReplaceableByMethod)
                            symbol.isReplaceableByMethod = true;
                    }
                    else if (isReplaceableByMethod && !symbol.isReplaceableByMethod) {
                        return symbol;
                    }
                    else if (symbol.flags & excludes) {
                        if (symbol.isReplaceableByMethod) {
                            symbolTable.set(name, symbol = createSymbol(0 /* None */, name));
                        }
                        else if (!(includes & 3 /* Variable */ && symbol.flags & 67108864 /* Assignment */)) {
                            if (isNamedDeclaration(node)) {
                                setParent(node.name, node);
                            }
                            let message = symbol.flags & 2 /* BlockScopedVariable */ ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 : Diagnostics.Duplicate_identifier_0;
                            let messageNeedsName = true;
                            if (symbol.flags & 384 /* Enum */ || includes & 384 /* Enum */) {
                                message = Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations;
                                messageNeedsName = false;
                            }
                            let multipleDefaultExports = false;
                            if (length(symbol.declarations)) {
                                if (isDefaultExport) {
                                    message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                                    messageNeedsName = false;
                                    multipleDefaultExports = true;
                                }
                                else {
                                    if (symbol.declarations && symbol.declarations.length && (node.kind === 274 /* ExportAssignment */ && !node.isExportEquals)) {
                                        message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                                        messageNeedsName = false;
                                        multipleDefaultExports = true;
                                    }
                                }
                            }
                            const relatedInformation = [];
                            if (isTypeAliasDeclaration(node) && nodeIsMissing(node.type) && hasSyntacticModifier(node, 1 /* Export */) && symbol.flags & (2097152 /* Alias */ | 788968 /* Type */ | 1920 /* Namespace */)) {
                                relatedInformation.push(createDiagnosticForNode2(node, Diagnostics.Did_you_mean_0, `export type { ${unescapeLeadingUnderscores(node.name.escapedText)} }`));
                            }
                            const declarationName = getNameOfDeclaration(node) || node;
                            forEach(symbol.declarations, (declaration, index) => {
                                const decl = getNameOfDeclaration(declaration) || declaration;
                                const diag3 = createDiagnosticForNode2(decl, message, messageNeedsName ? getDisplayName(declaration) : void 0);
                                file.bindDiagnostics.push(multipleDefaultExports ? addRelatedInfo(diag3, createDiagnosticForNode2(declarationName, index === 0 ? Diagnostics.Another_export_default_is_here : Diagnostics.and_here)) : diag3);
                                if (multipleDefaultExports) {
                                    relatedInformation.push(createDiagnosticForNode2(decl, Diagnostics.The_first_export_default_is_here));
                                }
                            });
                            const diag2 = createDiagnosticForNode2(declarationName, message, messageNeedsName ? getDisplayName(node) : void 0);
                            file.bindDiagnostics.push(addRelatedInfo(diag2, ...relatedInformation));
                            symbol = createSymbol(0 /* None */, name);
                        }
                    }
                }
                addDeclarationToSymbol(symbol, node, includes);
                if (symbol.parent) {
                    Debug.assert(symbol.parent === parent3, "Existing symbol parent should match new one");
                }
                else {
                    symbol.parent = parent3;
                }
                return symbol;
            }
            function declareModuleMember(node, symbolFlags, symbolExcludes) {
                const hasExportModifier = !!(getCombinedModifierFlags(node) & 1 /* Export */) || jsdocTreatAsExported(node);
                if (symbolFlags & 2097152 /* Alias */) {
                    if (node.kind === 278 /* ExportSpecifier */ || node.kind === 268 /* ImportEqualsDeclaration */ && hasExportModifier) {
                        return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                    }
                    else {
                        Debug.assertNode(container, canHaveLocals);
                        return declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                    }
                }
                else {
                    if (isJSDocTypeAlias(node))
                        Debug.assert(isInJSFile(node));
                    if (!isAmbientModule(node) && (hasExportModifier || container.flags & 64 /* ExportContext */)) {
                        if (!canHaveLocals(container) || !container.locals || hasSyntacticModifier(node, 1024 /* Default */) && !getDeclarationName(node)) {
                            return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                        }
                        const exportKind = symbolFlags & 111551 /* Value */ ? 1048576 /* ExportValue */ : 0;
                        const local = declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, exportKind, symbolExcludes);
                        local.exportSymbol = declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                        node.localSymbol = local;
                        return local;
                    }
                    else {
                        Debug.assertNode(container, canHaveLocals);
                        return declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                    }
                }
            }
            function jsdocTreatAsExported(node) {
                if (node.parent && isModuleDeclaration(node)) {
                    node = node.parent;
                }
                if (!isJSDocTypeAlias(node))
                    return false;
                if (!isJSDocEnumTag(node) && !!node.fullName)
                    return true;
                const declName = getNameOfDeclaration(node);
                if (!declName)
                    return false;
                if (isPropertyAccessEntityNameExpression(declName.parent) && isTopLevelNamespaceAssignment(declName.parent))
                    return true;
                if (isDeclaration(declName.parent) && getCombinedModifierFlags(declName.parent) & 1 /* Export */)
                    return true;
                return false;
            }
            function bindContainer(node, containerFlags) {
                const saveContainer = container;
                const saveThisParentContainer = thisParentContainer;
                const savedBlockScopeContainer = blockScopeContainer;
                if (containerFlags & 1 /* IsContainer */) {
                    if (node.kind !== 216 /* ArrowFunction */) {
                        thisParentContainer = container;
                    }
                    container = blockScopeContainer = node;
                    if (containerFlags & 32 /* HasLocals */) {
                        container.locals = createSymbolTable();
                        addToContainerChain(container);
                    }
                }
                else if (containerFlags & 2 /* IsBlockScopedContainer */) {
                    blockScopeContainer = node;
                    if (containerFlags & 32 /* HasLocals */) {
                        blockScopeContainer.locals = void 0;
                    }
                }
                if (containerFlags & 4 /* IsControlFlowContainer */) {
                    const saveCurrentFlow = currentFlow;
                    const saveBreakTarget = currentBreakTarget;
                    const saveContinueTarget = currentContinueTarget;
                    const saveReturnTarget = currentReturnTarget;
                    const saveExceptionTarget = currentExceptionTarget;
                    const saveActiveLabelList = activeLabelList;
                    const saveHasExplicitReturn = hasExplicitReturn;
                    const isImmediatelyInvoked = containerFlags & 16 /* IsFunctionExpression */ && !hasSyntacticModifier(node, 512 /* Async */) && !node.asteriskToken && !!getImmediatelyInvokedFunctionExpression(node) || node.kind === 172 /* ClassStaticBlockDeclaration */;
                    if (!isImmediatelyInvoked) {
                        currentFlow = initFlowNode({ flags: 2 /* Start */ });
                        if (containerFlags & (16 /* IsFunctionExpression */ | 128 /* IsObjectLiteralOrClassExpressionMethodOrAccessor */)) {
                            currentFlow.node = node;
                        }
                    }
                    currentReturnTarget = isImmediatelyInvoked || node.kind === 173 /* Constructor */ || isInJSFile(node) && (node.kind === 259 /* FunctionDeclaration */ || node.kind === 215 /* FunctionExpression */) ? createBranchLabel() : void 0;
                    currentExceptionTarget = void 0;
                    currentBreakTarget = void 0;
                    currentContinueTarget = void 0;
                    activeLabelList = void 0;
                    hasExplicitReturn = false;
                    bindChildren(node);
                    node.flags &= ~2816 /* ReachabilityAndEmitFlags */;
                    if (!(currentFlow.flags & 1 /* Unreachable */) && containerFlags & 8 /* IsFunctionLike */ && nodeIsPresent(node.body)) {
                        node.flags |= 256 /* HasImplicitReturn */;
                        if (hasExplicitReturn)
                            node.flags |= 512 /* HasExplicitReturn */;
                        node.endFlowNode = currentFlow;
                    }
                    if (node.kind === 308 /* SourceFile */) {
                        node.flags |= emitFlags;
                        node.endFlowNode = currentFlow;
                    }
                    if (currentReturnTarget) {
                        addAntecedent(currentReturnTarget, currentFlow);
                        currentFlow = finishFlowLabel(currentReturnTarget);
                        if (node.kind === 173 /* Constructor */ || node.kind === 172 /* ClassStaticBlockDeclaration */ || isInJSFile(node) && (node.kind === 259 /* FunctionDeclaration */ || node.kind === 215 /* FunctionExpression */)) {
                            node.returnFlowNode = currentFlow;
                        }
                    }
                    if (!isImmediatelyInvoked) {
                        currentFlow = saveCurrentFlow;
                    }
                    currentBreakTarget = saveBreakTarget;
                    currentContinueTarget = saveContinueTarget;
                    currentReturnTarget = saveReturnTarget;
                    currentExceptionTarget = saveExceptionTarget;
                    activeLabelList = saveActiveLabelList;
                    hasExplicitReturn = saveHasExplicitReturn;
                }
                else if (containerFlags & 64 /* IsInterface */) {
                    seenThisKeyword = false;
                    bindChildren(node);
                    Debug.assertNotNode(node, isIdentifier);
                    node.flags = seenThisKeyword ? node.flags | 128 /* ContainsThis */ : node.flags & ~128 /* ContainsThis */;
                }
                else {
                    bindChildren(node);
                }
                container = saveContainer;
                thisParentContainer = saveThisParentContainer;
                blockScopeContainer = savedBlockScopeContainer;
            }
            function bindEachFunctionsFirst(nodes) {
                bindEach(nodes, (n) => n.kind === 259 /* FunctionDeclaration */ ? bind(n) : void 0);
                bindEach(nodes, (n) => n.kind !== 259 /* FunctionDeclaration */ ? bind(n) : void 0);
            }
            function bindEach(nodes, bindFunction = bind) {
                if (nodes === void 0) {
                    return;
                }
                forEach(nodes, bindFunction);
            }
            function bindEachChild(node) {
                forEachChild(node, bind, bindEach);
            }
            function bindChildren(node) {
                const saveInAssignmentPattern = inAssignmentPattern;
                inAssignmentPattern = false;
                if (checkUnreachable(node)) {
                    bindEachChild(node);
                    bindJSDoc(node);
                    inAssignmentPattern = saveInAssignmentPattern;
                    return;
                }
                if (node.kind >= 240 /* FirstStatement */ && node.kind <= 256 /* LastStatement */ && !options.allowUnreachableCode) {
                    node.flowNode = currentFlow;
                }
                switch (node.kind) {
                    case 244 /* WhileStatement */:
                        bindWhileStatement(node);
                        break;
                    case 243 /* DoStatement */:
                        bindDoStatement(node);
                        break;
                    case 245 /* ForStatement */:
                        bindForStatement(node);
                        break;
                    case 246 /* ForInStatement */:
                    case 247 /* ForOfStatement */:
                        bindForInOrForOfStatement(node);
                        break;
                    case 242 /* IfStatement */:
                        bindIfStatement(node);
                        break;
                    case 250 /* ReturnStatement */:
                    case 254 /* ThrowStatement */:
                        bindReturnOrThrow(node);
                        break;
                    case 249 /* BreakStatement */:
                    case 248 /* ContinueStatement */:
                        bindBreakOrContinueStatement(node);
                        break;
                    case 255 /* TryStatement */:
                        bindTryStatement(node);
                        break;
                    case 252 /* SwitchStatement */:
                        bindSwitchStatement(node);
                        break;
                    case 266 /* CaseBlock */:
                        bindCaseBlock(node);
                        break;
                    case 292 /* CaseClause */:
                        bindCaseClause(node);
                        break;
                    case 241 /* ExpressionStatement */:
                        bindExpressionStatement(node);
                        break;
                    case 253 /* LabeledStatement */:
                        bindLabeledStatement(node);
                        break;
                    case 221 /* PrefixUnaryExpression */:
                        bindPrefixUnaryExpressionFlow(node);
                        break;
                    case 222 /* PostfixUnaryExpression */:
                        bindPostfixUnaryExpressionFlow(node);
                        break;
                    case 223 /* BinaryExpression */:
                        if (isDestructuringAssignment(node)) {
                            inAssignmentPattern = saveInAssignmentPattern;
                            bindDestructuringAssignmentFlow(node);
                            return;
                        }
                        bindBinaryExpressionFlow(node);
                        break;
                    case 217 /* DeleteExpression */:
                        bindDeleteExpressionFlow(node);
                        break;
                    case 224 /* ConditionalExpression */:
                        bindConditionalExpressionFlow(node);
                        break;
                    case 257 /* VariableDeclaration */:
                        bindVariableDeclarationFlow(node);
                        break;
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        bindAccessExpressionFlow(node);
                        break;
                    case 210 /* CallExpression */:
                        bindCallExpressionFlow(node);
                        break;
                    case 232 /* NonNullExpression */:
                        bindNonNullExpressionFlow(node);
                        break;
                    case 349 /* JSDocTypedefTag */:
                    case 341 /* JSDocCallbackTag */:
                    case 343 /* JSDocEnumTag */:
                        bindJSDocTypeAlias(node);
                        break;
                    case 308 /* SourceFile */: {
                        bindEachFunctionsFirst(node.statements);
                        bind(node.endOfFileToken);
                        break;
                    }
                    case 238 /* Block */:
                    case 265 /* ModuleBlock */:
                        bindEachFunctionsFirst(node.statements);
                        break;
                    case 205 /* BindingElement */:
                        bindBindingElementFlow(node);
                        break;
                    case 166 /* Parameter */:
                        bindParameterFlow(node);
                        break;
                    case 207 /* ObjectLiteralExpression */:
                    case 206 /* ArrayLiteralExpression */:
                    case 299 /* PropertyAssignment */:
                    case 227 /* SpreadElement */:
                        inAssignmentPattern = saveInAssignmentPattern;
                    default:
                        bindEachChild(node);
                        break;
                }
                bindJSDoc(node);
                inAssignmentPattern = saveInAssignmentPattern;
            }
            function isNarrowingExpression(expr) {
                switch (expr.kind) {
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                    case 108 /* ThisKeyword */:
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        return containsNarrowableReference(expr);
                    case 210 /* CallExpression */:
                        return hasNarrowableArgument(expr);
                    case 214 /* ParenthesizedExpression */:
                    case 232 /* NonNullExpression */:
                        return isNarrowingExpression(expr.expression);
                    case 223 /* BinaryExpression */:
                        return isNarrowingBinaryExpression(expr);
                    case 221 /* PrefixUnaryExpression */:
                        return expr.operator === 53 /* ExclamationToken */ && isNarrowingExpression(expr.operand);
                    case 218 /* TypeOfExpression */:
                        return isNarrowingExpression(expr.expression);
                }
                return false;
            }
            function isNarrowableReference(expr) {
                return isDottedName(expr) || (isPropertyAccessExpression(expr) || isNonNullExpression(expr) || isParenthesizedExpression(expr)) && isNarrowableReference(expr.expression) || isBinaryExpression(expr) && expr.operatorToken.kind === 27 /* CommaToken */ && isNarrowableReference(expr.right) || isElementAccessExpression(expr) && (isStringOrNumericLiteralLike(expr.argumentExpression) || isEntityNameExpression(expr.argumentExpression)) && isNarrowableReference(expr.expression) || isAssignmentExpression(expr) && isNarrowableReference(expr.left);
            }
            function containsNarrowableReference(expr) {
                return isNarrowableReference(expr) || isOptionalChain(expr) && containsNarrowableReference(expr.expression);
            }
            function hasNarrowableArgument(expr) {
                if (expr.arguments) {
                    for (const argument of expr.arguments) {
                        if (containsNarrowableReference(argument)) {
                            return true;
                        }
                    }
                }
                if (expr.expression.kind === 208 /* PropertyAccessExpression */ && containsNarrowableReference(expr.expression.expression)) {
                    return true;
                }
                return false;
            }
            function isNarrowingTypeofOperands(expr1, expr2) {
                return isTypeOfExpression(expr1) && isNarrowableOperand(expr1.expression) && isStringLiteralLike(expr2);
            }
            function isNarrowingBinaryExpression(expr) {
                switch (expr.operatorToken.kind) {
                    case 63 /* EqualsToken */:
                    case 75 /* BarBarEqualsToken */:
                    case 76 /* AmpersandAmpersandEqualsToken */:
                    case 77 /* QuestionQuestionEqualsToken */:
                        return containsNarrowableReference(expr.left);
                    case 34 /* EqualsEqualsToken */:
                    case 35 /* ExclamationEqualsToken */:
                    case 36 /* EqualsEqualsEqualsToken */:
                    case 37 /* ExclamationEqualsEqualsToken */:
                        return isNarrowableOperand(expr.left) || isNarrowableOperand(expr.right) || isNarrowingTypeofOperands(expr.right, expr.left) || isNarrowingTypeofOperands(expr.left, expr.right);
                    case 102 /* InstanceOfKeyword */:
                        return isNarrowableOperand(expr.left);
                    case 101 /* InKeyword */:
                        return isNarrowingExpression(expr.right);
                    case 27 /* CommaToken */:
                        return isNarrowingExpression(expr.right);
                }
                return false;
            }
            function isNarrowableOperand(expr) {
                switch (expr.kind) {
                    case 214 /* ParenthesizedExpression */:
                        return isNarrowableOperand(expr.expression);
                    case 223 /* BinaryExpression */:
                        switch (expr.operatorToken.kind) {
                            case 63 /* EqualsToken */:
                                return isNarrowableOperand(expr.left);
                            case 27 /* CommaToken */:
                                return isNarrowableOperand(expr.right);
                        }
                }
                return containsNarrowableReference(expr);
            }
            function createBranchLabel() {
                return initFlowNode({ flags: 4 /* BranchLabel */, antecedents: void 0 });
            }
            function createLoopLabel() {
                return initFlowNode({ flags: 8 /* LoopLabel */, antecedents: void 0 });
            }
            function createReduceLabel(target, antecedents, antecedent) {
                return initFlowNode({ flags: 1024 /* ReduceLabel */, target, antecedents, antecedent });
            }
            function setFlowNodeReferenced(flow) {
                flow.flags |= flow.flags & 2048 /* Referenced */ ? 4096 /* Shared */ : 2048 /* Referenced */;
            }
            function addAntecedent(label, antecedent) {
                if (!(antecedent.flags & 1 /* Unreachable */) && !contains(label.antecedents, antecedent)) {
                    (label.antecedents || (label.antecedents = [])).push(antecedent);
                    setFlowNodeReferenced(antecedent);
                }
            }
            function createFlowCondition(flags, antecedent, expression) {
                if (antecedent.flags & 1 /* Unreachable */) {
                    return antecedent;
                }
                if (!expression) {
                    return flags & 32 /* TrueCondition */ ? antecedent : unreachableFlow;
                }
                if ((expression.kind === 110 /* TrueKeyword */ && flags & 64 /* FalseCondition */ || expression.kind === 95 /* FalseKeyword */ && flags & 32 /* TrueCondition */) && !isExpressionOfOptionalChainRoot(expression) && !isNullishCoalesce(expression.parent)) {
                    return unreachableFlow;
                }
                if (!isNarrowingExpression(expression)) {
                    return antecedent;
                }
                setFlowNodeReferenced(antecedent);
                return initFlowNode({ flags, antecedent, node: expression });
            }
            function createFlowSwitchClause(antecedent, switchStatement, clauseStart, clauseEnd) {
                setFlowNodeReferenced(antecedent);
                return initFlowNode({ flags: 128 /* SwitchClause */, antecedent, switchStatement, clauseStart, clauseEnd });
            }
            function createFlowMutation(flags, antecedent, node) {
                setFlowNodeReferenced(antecedent);
                const result = initFlowNode({ flags, antecedent, node });
                if (currentExceptionTarget) {
                    addAntecedent(currentExceptionTarget, result);
                }
                return result;
            }
            function createFlowCall(antecedent, node) {
                setFlowNodeReferenced(antecedent);
                return initFlowNode({ flags: 512 /* Call */, antecedent, node });
            }
            function finishFlowLabel(flow) {
                const antecedents = flow.antecedents;
                if (!antecedents) {
                    return unreachableFlow;
                }
                if (antecedents.length === 1) {
                    return antecedents[0];
                }
                return flow;
            }
            function isStatementCondition(node) {
                const parent3 = node.parent;
                switch (parent3.kind) {
                    case 242 /* IfStatement */:
                    case 244 /* WhileStatement */:
                    case 243 /* DoStatement */:
                        return parent3.expression === node;
                    case 245 /* ForStatement */:
                    case 224 /* ConditionalExpression */:
                        return parent3.condition === node;
                }
                return false;
            }
            function isLogicalExpression(node) {
                while (true) {
                    if (node.kind === 214 /* ParenthesizedExpression */) {
                        node = node.expression;
                    }
                    else if (node.kind === 221 /* PrefixUnaryExpression */ && node.operator === 53 /* ExclamationToken */) {
                        node = node.operand;
                    }
                    else {
                        return isLogicalOrCoalescingBinaryExpression(node);
                    }
                }
            }
            function isLogicalAssignmentExpression(node) {
                return isLogicalOrCoalescingAssignmentExpression(skipParentheses(node));
            }
            function isTopLevelLogicalExpression(node) {
                while (isParenthesizedExpression(node.parent) || isPrefixUnaryExpression(node.parent) && node.parent.operator === 53 /* ExclamationToken */) {
                    node = node.parent;
                }
                return !isStatementCondition(node) && !isLogicalExpression(node.parent) && !(isOptionalChain(node.parent) && node.parent.expression === node);
            }
            function doWithConditionalBranches(action, value, trueTarget, falseTarget) {
                const savedTrueTarget = currentTrueTarget;
                const savedFalseTarget = currentFalseTarget;
                currentTrueTarget = trueTarget;
                currentFalseTarget = falseTarget;
                action(value);
                currentTrueTarget = savedTrueTarget;
                currentFalseTarget = savedFalseTarget;
            }
            function bindCondition(node, trueTarget, falseTarget) {
                doWithConditionalBranches(bind, node, trueTarget, falseTarget);
                if (!node || !isLogicalAssignmentExpression(node) && !isLogicalExpression(node) && !(isOptionalChain(node) && isOutermostOptionalChain(node))) {
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
            }
            function bindIterativeStatement(node, breakTarget, continueTarget) {
                const saveBreakTarget = currentBreakTarget;
                const saveContinueTarget = currentContinueTarget;
                currentBreakTarget = breakTarget;
                currentContinueTarget = continueTarget;
                bind(node);
                currentBreakTarget = saveBreakTarget;
                currentContinueTarget = saveContinueTarget;
            }
            function setContinueTarget(node, target) {
                let label = activeLabelList;
                while (label && node.parent.kind === 253 /* LabeledStatement */) {
                    label.continueTarget = target;
                    label = label.next;
                    node = node.parent;
                }
                return target;
            }
            function bindWhileStatement(node) {
                const preWhileLabel = setContinueTarget(node, createLoopLabel());
                const preBodyLabel = createBranchLabel();
                const postWhileLabel = createBranchLabel();
                addAntecedent(preWhileLabel, currentFlow);
                currentFlow = preWhileLabel;
                bindCondition(node.expression, preBodyLabel, postWhileLabel);
                currentFlow = finishFlowLabel(preBodyLabel);
                bindIterativeStatement(node.statement, postWhileLabel, preWhileLabel);
                addAntecedent(preWhileLabel, currentFlow);
                currentFlow = finishFlowLabel(postWhileLabel);
            }
            function bindDoStatement(node) {
                const preDoLabel = createLoopLabel();
                const preConditionLabel = setContinueTarget(node, createBranchLabel());
                const postDoLabel = createBranchLabel();
                addAntecedent(preDoLabel, currentFlow);
                currentFlow = preDoLabel;
                bindIterativeStatement(node.statement, postDoLabel, preConditionLabel);
                addAntecedent(preConditionLabel, currentFlow);
                currentFlow = finishFlowLabel(preConditionLabel);
                bindCondition(node.expression, preDoLabel, postDoLabel);
                currentFlow = finishFlowLabel(postDoLabel);
            }
            function bindForStatement(node) {
                const preLoopLabel = setContinueTarget(node, createLoopLabel());
                const preBodyLabel = createBranchLabel();
                const postLoopLabel = createBranchLabel();
                bind(node.initializer);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = preLoopLabel;
                bindCondition(node.condition, preBodyLabel, postLoopLabel);
                currentFlow = finishFlowLabel(preBodyLabel);
                bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
                bind(node.incrementor);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = finishFlowLabel(postLoopLabel);
            }
            function bindForInOrForOfStatement(node) {
                const preLoopLabel = setContinueTarget(node, createLoopLabel());
                const postLoopLabel = createBranchLabel();
                bind(node.expression);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = preLoopLabel;
                if (node.kind === 247 /* ForOfStatement */) {
                    bind(node.awaitModifier);
                }
                addAntecedent(postLoopLabel, currentFlow);
                bind(node.initializer);
                if (node.initializer.kind !== 258 /* VariableDeclarationList */) {
                    bindAssignmentTargetFlow(node.initializer);
                }
                bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
                addAntecedent(preLoopLabel, currentFlow);
                currentFlow = finishFlowLabel(postLoopLabel);
            }
            function bindIfStatement(node) {
                const thenLabel = createBranchLabel();
                const elseLabel = createBranchLabel();
                const postIfLabel = createBranchLabel();
                bindCondition(node.expression, thenLabel, elseLabel);
                currentFlow = finishFlowLabel(thenLabel);
                bind(node.thenStatement);
                addAntecedent(postIfLabel, currentFlow);
                currentFlow = finishFlowLabel(elseLabel);
                bind(node.elseStatement);
                addAntecedent(postIfLabel, currentFlow);
                currentFlow = finishFlowLabel(postIfLabel);
            }
            function bindReturnOrThrow(node) {
                bind(node.expression);
                if (node.kind === 250 /* ReturnStatement */) {
                    hasExplicitReturn = true;
                    if (currentReturnTarget) {
                        addAntecedent(currentReturnTarget, currentFlow);
                    }
                }
                currentFlow = unreachableFlow;
            }
            function findActiveLabel(name) {
                for (let label = activeLabelList; label; label = label.next) {
                    if (label.name === name) {
                        return label;
                    }
                }
                return void 0;
            }
            function bindBreakOrContinueFlow(node, breakTarget, continueTarget) {
                const flowLabel = node.kind === 249 /* BreakStatement */ ? breakTarget : continueTarget;
                if (flowLabel) {
                    addAntecedent(flowLabel, currentFlow);
                    currentFlow = unreachableFlow;
                }
            }
            function bindBreakOrContinueStatement(node) {
                bind(node.label);
                if (node.label) {
                    const activeLabel = findActiveLabel(node.label.escapedText);
                    if (activeLabel) {
                        activeLabel.referenced = true;
                        bindBreakOrContinueFlow(node, activeLabel.breakTarget, activeLabel.continueTarget);
                    }
                }
                else {
                    bindBreakOrContinueFlow(node, currentBreakTarget, currentContinueTarget);
                }
            }
            function bindTryStatement(node) {
                const saveReturnTarget = currentReturnTarget;
                const saveExceptionTarget = currentExceptionTarget;
                const normalExitLabel = createBranchLabel();
                const returnLabel = createBranchLabel();
                let exceptionLabel = createBranchLabel();
                if (node.finallyBlock) {
                    currentReturnTarget = returnLabel;
                }
                addAntecedent(exceptionLabel, currentFlow);
                currentExceptionTarget = exceptionLabel;
                bind(node.tryBlock);
                addAntecedent(normalExitLabel, currentFlow);
                if (node.catchClause) {
                    currentFlow = finishFlowLabel(exceptionLabel);
                    exceptionLabel = createBranchLabel();
                    addAntecedent(exceptionLabel, currentFlow);
                    currentExceptionTarget = exceptionLabel;
                    bind(node.catchClause);
                    addAntecedent(normalExitLabel, currentFlow);
                }
                currentReturnTarget = saveReturnTarget;
                currentExceptionTarget = saveExceptionTarget;
                if (node.finallyBlock) {
                    const finallyLabel = createBranchLabel();
                    finallyLabel.antecedents = concatenate(concatenate(normalExitLabel.antecedents, exceptionLabel.antecedents), returnLabel.antecedents);
                    currentFlow = finallyLabel;
                    bind(node.finallyBlock);
                    if (currentFlow.flags & 1 /* Unreachable */) {
                        currentFlow = unreachableFlow;
                    }
                    else {
                        if (currentReturnTarget && returnLabel.antecedents) {
                            addAntecedent(currentReturnTarget, createReduceLabel(finallyLabel, returnLabel.antecedents, currentFlow));
                        }
                        if (currentExceptionTarget && exceptionLabel.antecedents) {
                            addAntecedent(currentExceptionTarget, createReduceLabel(finallyLabel, exceptionLabel.antecedents, currentFlow));
                        }
                        currentFlow = normalExitLabel.antecedents ? createReduceLabel(finallyLabel, normalExitLabel.antecedents, currentFlow) : unreachableFlow;
                    }
                }
                else {
                    currentFlow = finishFlowLabel(normalExitLabel);
                }
            }
            function bindSwitchStatement(node) {
                const postSwitchLabel = createBranchLabel();
                bind(node.expression);
                const saveBreakTarget = currentBreakTarget;
                const savePreSwitchCaseFlow = preSwitchCaseFlow;
                currentBreakTarget = postSwitchLabel;
                preSwitchCaseFlow = currentFlow;
                bind(node.caseBlock);
                addAntecedent(postSwitchLabel, currentFlow);
                const hasDefault = forEach(node.caseBlock.clauses, (c) => c.kind === 293 /* DefaultClause */);
                node.possiblyExhaustive = !hasDefault && !postSwitchLabel.antecedents;
                if (!hasDefault) {
                    addAntecedent(postSwitchLabel, createFlowSwitchClause(preSwitchCaseFlow, node, 0, 0));
                }
                currentBreakTarget = saveBreakTarget;
                preSwitchCaseFlow = savePreSwitchCaseFlow;
                currentFlow = finishFlowLabel(postSwitchLabel);
            }
            function bindCaseBlock(node) {
                const clauses = node.clauses;
                const isNarrowingSwitch = isNarrowingExpression(node.parent.expression);
                let fallthroughFlow = unreachableFlow;
                for (let i = 0; i < clauses.length; i++) {
                    const clauseStart = i;
                    while (!clauses[i].statements.length && i + 1 < clauses.length) {
                        bind(clauses[i]);
                        i++;
                    }
                    const preCaseLabel = createBranchLabel();
                    addAntecedent(preCaseLabel, isNarrowingSwitch ? createFlowSwitchClause(preSwitchCaseFlow, node.parent, clauseStart, i + 1) : preSwitchCaseFlow);
                    addAntecedent(preCaseLabel, fallthroughFlow);
                    currentFlow = finishFlowLabel(preCaseLabel);
                    const clause = clauses[i];
                    bind(clause);
                    fallthroughFlow = currentFlow;
                    if (!(currentFlow.flags & 1 /* Unreachable */) && i !== clauses.length - 1 && options.noFallthroughCasesInSwitch) {
                        clause.fallthroughFlowNode = currentFlow;
                    }
                }
            }
            function bindCaseClause(node) {
                const saveCurrentFlow = currentFlow;
                currentFlow = preSwitchCaseFlow;
                bind(node.expression);
                currentFlow = saveCurrentFlow;
                bindEach(node.statements);
            }
            function bindExpressionStatement(node) {
                bind(node.expression);
                maybeBindExpressionFlowIfCall(node.expression);
            }
            function maybeBindExpressionFlowIfCall(node) {
                if (node.kind === 210 /* CallExpression */) {
                    const call = node;
                    if (call.expression.kind !== 106 /* SuperKeyword */ && isDottedName(call.expression)) {
                        currentFlow = createFlowCall(currentFlow, call);
                    }
                }
            }
            function bindLabeledStatement(node) {
                const postStatementLabel = createBranchLabel();
                activeLabelList = {
                    next: activeLabelList,
                    name: node.label.escapedText,
                    breakTarget: postStatementLabel,
                    continueTarget: void 0,
                    referenced: false
                };
                bind(node.label);
                bind(node.statement);
                if (!activeLabelList.referenced && !options.allowUnusedLabels) {
                    errorOrSuggestionOnNode(unusedLabelIsError(options), node.label, Diagnostics.Unused_label);
                }
                activeLabelList = activeLabelList.next;
                addAntecedent(postStatementLabel, currentFlow);
                currentFlow = finishFlowLabel(postStatementLabel);
            }
            function bindDestructuringTargetFlow(node) {
                if (node.kind === 223 /* BinaryExpression */ && node.operatorToken.kind === 63 /* EqualsToken */) {
                    bindAssignmentTargetFlow(node.left);
                }
                else {
                    bindAssignmentTargetFlow(node);
                }
            }
            function bindAssignmentTargetFlow(node) {
                if (isNarrowableReference(node)) {
                    currentFlow = createFlowMutation(16 /* Assignment */, currentFlow, node);
                }
                else if (node.kind === 206 /* ArrayLiteralExpression */) {
                    for (const e of node.elements) {
                        if (e.kind === 227 /* SpreadElement */) {
                            bindAssignmentTargetFlow(e.expression);
                        }
                        else {
                            bindDestructuringTargetFlow(e);
                        }
                    }
                }
                else if (node.kind === 207 /* ObjectLiteralExpression */) {
                    for (const p of node.properties) {
                        if (p.kind === 299 /* PropertyAssignment */) {
                            bindDestructuringTargetFlow(p.initializer);
                        }
                        else if (p.kind === 300 /* ShorthandPropertyAssignment */) {
                            bindAssignmentTargetFlow(p.name);
                        }
                        else if (p.kind === 301 /* SpreadAssignment */) {
                            bindAssignmentTargetFlow(p.expression);
                        }
                    }
                }
            }
            function bindLogicalLikeExpression(node, trueTarget, falseTarget) {
                const preRightLabel = createBranchLabel();
                if (node.operatorToken.kind === 55 /* AmpersandAmpersandToken */ || node.operatorToken.kind === 76 /* AmpersandAmpersandEqualsToken */) {
                    bindCondition(node.left, preRightLabel, falseTarget);
                }
                else {
                    bindCondition(node.left, trueTarget, preRightLabel);
                }
                currentFlow = finishFlowLabel(preRightLabel);
                bind(node.operatorToken);
                if (isLogicalOrCoalescingAssignmentOperator(node.operatorToken.kind)) {
                    doWithConditionalBranches(bind, node.right, trueTarget, falseTarget);
                    bindAssignmentTargetFlow(node.left);
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
                else {
                    bindCondition(node.right, trueTarget, falseTarget);
                }
            }
            function bindPrefixUnaryExpressionFlow(node) {
                if (node.operator === 53 /* ExclamationToken */) {
                    const saveTrueTarget = currentTrueTarget;
                    currentTrueTarget = currentFalseTarget;
                    currentFalseTarget = saveTrueTarget;
                    bindEachChild(node);
                    currentFalseTarget = currentTrueTarget;
                    currentTrueTarget = saveTrueTarget;
                }
                else {
                    bindEachChild(node);
                    if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                        bindAssignmentTargetFlow(node.operand);
                    }
                }
            }
            function bindPostfixUnaryExpressionFlow(node) {
                bindEachChild(node);
                if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                    bindAssignmentTargetFlow(node.operand);
                }
            }
            function bindDestructuringAssignmentFlow(node) {
                if (inAssignmentPattern) {
                    inAssignmentPattern = false;
                    bind(node.operatorToken);
                    bind(node.right);
                    inAssignmentPattern = true;
                    bind(node.left);
                }
                else {
                    inAssignmentPattern = true;
                    bind(node.left);
                    inAssignmentPattern = false;
                    bind(node.operatorToken);
                    bind(node.right);
                }
                bindAssignmentTargetFlow(node.left);
            }
            function createBindBinaryExpressionFlow() {
                return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, 
                /*foldState*/
                void 0);
                function onEnter(node, state) {
                    if (state) {
                        state.stackIndex++;
                        setParent(node, parent2);
                        const saveInStrictMode = inStrictMode;
                        bindWorker(node);
                        const saveParent = parent2;
                        parent2 = node;
                        state.skip = false;
                        state.inStrictModeStack[state.stackIndex] = saveInStrictMode;
                        state.parentStack[state.stackIndex] = saveParent;
                    }
                    else {
                        state = {
                            stackIndex: 0,
                            skip: false,
                            inStrictModeStack: [void 0],
                            parentStack: [void 0]
                        };
                    }
                    const operator = node.operatorToken.kind;
                    if (isLogicalOrCoalescingBinaryOperator(operator) || isLogicalOrCoalescingAssignmentOperator(operator)) {
                        if (isTopLevelLogicalExpression(node)) {
                            const postExpressionLabel = createBranchLabel();
                            bindLogicalLikeExpression(node, postExpressionLabel, postExpressionLabel);
                            currentFlow = finishFlowLabel(postExpressionLabel);
                        }
                        else {
                            bindLogicalLikeExpression(node, currentTrueTarget, currentFalseTarget);
                        }
                        state.skip = true;
                    }
                    return state;
                }
                function onLeft(left, state, node) {
                    if (!state.skip) {
                        const maybeBound = maybeBind2(left);
                        if (node.operatorToken.kind === 27 /* CommaToken */) {
                            maybeBindExpressionFlowIfCall(left);
                        }
                        return maybeBound;
                    }
                }
                function onOperator(operatorToken, state, _node) {
                    if (!state.skip) {
                        bind(operatorToken);
                    }
                }
                function onRight(right, state, node) {
                    if (!state.skip) {
                        const maybeBound = maybeBind2(right);
                        if (node.operatorToken.kind === 27 /* CommaToken */) {
                            maybeBindExpressionFlowIfCall(right);
                        }
                        return maybeBound;
                    }
                }
                function onExit(node, state) {
                    if (!state.skip) {
                        const operator = node.operatorToken.kind;
                        if (isAssignmentOperator(operator) && !isAssignmentTarget(node)) {
                            bindAssignmentTargetFlow(node.left);
                            if (operator === 63 /* EqualsToken */ && node.left.kind === 209 /* ElementAccessExpression */) {
                                const elementAccess = node.left;
                                if (isNarrowableOperand(elementAccess.expression)) {
                                    currentFlow = createFlowMutation(256 /* ArrayMutation */, currentFlow, node);
                                }
                            }
                        }
                    }
                    const savedInStrictMode = state.inStrictModeStack[state.stackIndex];
                    const savedParent = state.parentStack[state.stackIndex];
                    if (savedInStrictMode !== void 0) {
                        inStrictMode = savedInStrictMode;
                    }
                    if (savedParent !== void 0) {
                        parent2 = savedParent;
                    }
                    state.skip = false;
                    state.stackIndex--;
                }
                function maybeBind2(node) {
                    if (node && isBinaryExpression(node) && !isDestructuringAssignment(node)) {
                        return node;
                    }
                    bind(node);
                }
            }
            function bindDeleteExpressionFlow(node) {
                bindEachChild(node);
                if (node.expression.kind === 208 /* PropertyAccessExpression */) {
                    bindAssignmentTargetFlow(node.expression);
                }
            }
            function bindConditionalExpressionFlow(node) {
                const trueLabel = createBranchLabel();
                const falseLabel = createBranchLabel();
                const postExpressionLabel = createBranchLabel();
                bindCondition(node.condition, trueLabel, falseLabel);
                currentFlow = finishFlowLabel(trueLabel);
                bind(node.questionToken);
                bind(node.whenTrue);
                addAntecedent(postExpressionLabel, currentFlow);
                currentFlow = finishFlowLabel(falseLabel);
                bind(node.colonToken);
                bind(node.whenFalse);
                addAntecedent(postExpressionLabel, currentFlow);
                currentFlow = finishFlowLabel(postExpressionLabel);
            }
            function bindInitializedVariableFlow(node) {
                const name = !isOmittedExpression(node) ? node.name : void 0;
                if (isBindingPattern(name)) {
                    for (const child of name.elements) {
                        bindInitializedVariableFlow(child);
                    }
                }
                else {
                    currentFlow = createFlowMutation(16 /* Assignment */, currentFlow, node);
                }
            }
            function bindVariableDeclarationFlow(node) {
                bindEachChild(node);
                if (node.initializer || isForInOrOfStatement(node.parent.parent)) {
                    bindInitializedVariableFlow(node);
                }
            }
            function bindBindingElementFlow(node) {
                bind(node.dotDotDotToken);
                bind(node.propertyName);
                bindInitializer(node.initializer);
                bind(node.name);
            }
            function bindParameterFlow(node) {
                bindEach(node.modifiers);
                bind(node.dotDotDotToken);
                bind(node.questionToken);
                bind(node.type);
                bindInitializer(node.initializer);
                bind(node.name);
            }
            function bindInitializer(node) {
                if (!node) {
                    return;
                }
                const entryFlow = currentFlow;
                bind(node);
                if (entryFlow === unreachableFlow || entryFlow === currentFlow) {
                    return;
                }
                const exitFlow = createBranchLabel();
                addAntecedent(exitFlow, entryFlow);
                addAntecedent(exitFlow, currentFlow);
                currentFlow = finishFlowLabel(exitFlow);
            }
            function bindJSDocTypeAlias(node) {
                bind(node.tagName);
                if (node.kind !== 343 /* JSDocEnumTag */ && node.fullName) {
                    setParent(node.fullName, node);
                    setParentRecursive(node.fullName, 
                    /*incremental*/
                    false);
                }
                if (typeof node.comment !== "string") {
                    bindEach(node.comment);
                }
            }
            function bindJSDocClassTag(node) {
                bindEachChild(node);
                const host = getHostSignatureFromJSDoc(node);
                if (host && host.kind !== 171 /* MethodDeclaration */) {
                    addDeclarationToSymbol(host.symbol, host, 32 /* Class */);
                }
            }
            function bindOptionalExpression(node, trueTarget, falseTarget) {
                doWithConditionalBranches(bind, node, trueTarget, falseTarget);
                if (!isOptionalChain(node) || isOutermostOptionalChain(node)) {
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
            }
            function bindOptionalChainRest(node) {
                switch (node.kind) {
                    case 208 /* PropertyAccessExpression */:
                        bind(node.questionDotToken);
                        bind(node.name);
                        break;
                    case 209 /* ElementAccessExpression */:
                        bind(node.questionDotToken);
                        bind(node.argumentExpression);
                        break;
                    case 210 /* CallExpression */:
                        bind(node.questionDotToken);
                        bindEach(node.typeArguments);
                        bindEach(node.arguments);
                        break;
                }
            }
            function bindOptionalChain(node, trueTarget, falseTarget) {
                const preChainLabel = isOptionalChainRoot(node) ? createBranchLabel() : void 0;
                bindOptionalExpression(node.expression, preChainLabel || trueTarget, falseTarget);
                if (preChainLabel) {
                    currentFlow = finishFlowLabel(preChainLabel);
                }
                doWithConditionalBranches(bindOptionalChainRest, node, trueTarget, falseTarget);
                if (isOutermostOptionalChain(node)) {
                    addAntecedent(trueTarget, createFlowCondition(32 /* TrueCondition */, currentFlow, node));
                    addAntecedent(falseTarget, createFlowCondition(64 /* FalseCondition */, currentFlow, node));
                }
            }
            function bindOptionalChainFlow(node) {
                if (isTopLevelLogicalExpression(node)) {
                    const postExpressionLabel = createBranchLabel();
                    bindOptionalChain(node, postExpressionLabel, postExpressionLabel);
                    currentFlow = finishFlowLabel(postExpressionLabel);
                }
                else {
                    bindOptionalChain(node, currentTrueTarget, currentFalseTarget);
                }
            }
            function bindNonNullExpressionFlow(node) {
                if (isOptionalChain(node)) {
                    bindOptionalChainFlow(node);
                }
                else {
                    bindEachChild(node);
                }
            }
            function bindAccessExpressionFlow(node) {
                if (isOptionalChain(node)) {
                    bindOptionalChainFlow(node);
                }
                else {
                    bindEachChild(node);
                }
            }
            function bindCallExpressionFlow(node) {
                if (isOptionalChain(node)) {
                    bindOptionalChainFlow(node);
                }
                else {
                    const expr = skipParentheses(node.expression);
                    if (expr.kind === 215 /* FunctionExpression */ || expr.kind === 216 /* ArrowFunction */) {
                        bindEach(node.typeArguments);
                        bindEach(node.arguments);
                        bind(node.expression);
                    }
                    else {
                        bindEachChild(node);
                        if (node.expression.kind === 106 /* SuperKeyword */) {
                            currentFlow = createFlowCall(currentFlow, node);
                        }
                    }
                }
                if (node.expression.kind === 208 /* PropertyAccessExpression */) {
                    const propertyAccess = node.expression;
                    if (isIdentifier(propertyAccess.name) && isNarrowableOperand(propertyAccess.expression) && isPushOrUnshiftIdentifier(propertyAccess.name)) {
                        currentFlow = createFlowMutation(256 /* ArrayMutation */, currentFlow, node);
                    }
                }
            }
            function addToContainerChain(next) {
                if (lastContainer) {
                    lastContainer.nextContainer = next;
                }
                lastContainer = next;
            }
            function declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes) {
                switch (container.kind) {
                    case 264 /* ModuleDeclaration */:
                        return declareModuleMember(node, symbolFlags, symbolExcludes);
                    case 308 /* SourceFile */:
                        return declareSourceFileMember(node, symbolFlags, symbolExcludes);
                    case 228 /* ClassExpression */:
                    case 260 /* ClassDeclaration */:
                        return declareClassMember(node, symbolFlags, symbolExcludes);
                    case 263 /* EnumDeclaration */:
                        return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                    case 184 /* TypeLiteral */:
                    case 325 /* JSDocTypeLiteral */:
                    case 207 /* ObjectLiteralExpression */:
                    case 261 /* InterfaceDeclaration */:
                    case 289 /* JsxAttributes */:
                        return declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                    case 176 /* CallSignature */:
                    case 177 /* ConstructSignature */:
                    case 326 /* JSDocSignature */:
                    case 178 /* IndexSignature */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 173 /* Constructor */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 320 /* JSDocFunctionType */:
                    case 172 /* ClassStaticBlockDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                    case 197 /* MappedType */:
                        if (container.locals)
                            Debug.assertNode(container, canHaveLocals);
                        return declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                }
            }
            function declareClassMember(node, symbolFlags, symbolExcludes) {
                return isStatic(node) ? declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes) : declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
            }
            function declareSourceFileMember(node, symbolFlags, symbolExcludes) {
                return isExternalModule(file) ? declareModuleMember(node, symbolFlags, symbolExcludes) : declareSymbol(file.locals, 
                /*parent*/
                void 0, node, symbolFlags, symbolExcludes);
            }
            function hasExportDeclarations(node) {
                const body = isSourceFile(node) ? node : tryCast(node.body, isModuleBlock);
                return !!body && body.statements.some((s) => isExportDeclaration(s) || isExportAssignment(s));
            }
            function setExportContextFlag(node) {
                if (node.flags & 16777216 /* Ambient */ && !hasExportDeclarations(node)) {
                    node.flags |= 64 /* ExportContext */;
                }
                else {
                    node.flags &= ~64 /* ExportContext */;
                }
            }
            function bindModuleDeclaration(node) {
                setExportContextFlag(node);
                if (isAmbientModule(node)) {
                    if (hasSyntacticModifier(node, 1 /* Export */)) {
                        errorOnFirstToken(node, Diagnostics.export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible);
                    }
                    if (isModuleAugmentationExternal(node)) {
                        declareModuleSymbol(node);
                    }
                    else {
                        let pattern;
                        if (node.name.kind === 10 /* StringLiteral */) {
                            const { text } = node.name;
                            pattern = tryParsePattern(text);
                            if (pattern === void 0) {
                                errorOnFirstToken(node.name, Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, text);
                            }
                        }
                        const symbol = declareSymbolAndAddToSymbolTable(node, 512 /* ValueModule */, 110735 /* ValueModuleExcludes */);
                        file.patternAmbientModules = append(file.patternAmbientModules, pattern && !isString(pattern) ? { pattern, symbol } : void 0);
                    }
                }
                else {
                    const state = declareModuleSymbol(node);
                    if (state !== 0 /* NonInstantiated */) {
                        const { symbol } = node;
                        symbol.constEnumOnlyModule = !(symbol.flags & (16 /* Function */ | 32 /* Class */ | 256 /* RegularEnum */)) && state === 2 /* ConstEnumOnly */ && symbol.constEnumOnlyModule !== false;
                    }
                }
            }
            function declareModuleSymbol(node) {
                const state = getModuleInstanceState(node);
                const instantiated = state !== 0 /* NonInstantiated */;
                declareSymbolAndAddToSymbolTable(node, instantiated ? 512 /* ValueModule */ : 1024 /* NamespaceModule */, instantiated ? 110735 /* ValueModuleExcludes */ : 0 /* NamespaceModuleExcludes */);
                return state;
            }
            function bindFunctionOrConstructorType(node) {
                const symbol = createSymbol(131072 /* Signature */, getDeclarationName(node));
                addDeclarationToSymbol(symbol, node, 131072 /* Signature */);
                const typeLiteralSymbol = createSymbol(2048 /* TypeLiteral */, "__type" /* Type */);
                addDeclarationToSymbol(typeLiteralSymbol, node, 2048 /* TypeLiteral */);
                typeLiteralSymbol.members = createSymbolTable();
                typeLiteralSymbol.members.set(symbol.escapedName, symbol);
            }
            function bindObjectLiteralExpression(node) {
                return bindAnonymousDeclaration(node, 4096 /* ObjectLiteral */, "__object" /* Object */);
            }
            function bindJsxAttributes(node) {
                return bindAnonymousDeclaration(node, 4096 /* ObjectLiteral */, "__jsxAttributes" /* JSXAttributes */);
            }
            function bindJsxAttribute(node, symbolFlags, symbolExcludes) {
                return declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
            }
            function bindAnonymousDeclaration(node, symbolFlags, name) {
                const symbol = createSymbol(symbolFlags, name);
                if (symbolFlags & (8 /* EnumMember */ | 106500 /* ClassMember */)) {
                    symbol.parent = container.symbol;
                }
                addDeclarationToSymbol(symbol, node, symbolFlags);
                return symbol;
            }
            function bindBlockScopedDeclaration(node, symbolFlags, symbolExcludes) {
                switch (blockScopeContainer.kind) {
                    case 264 /* ModuleDeclaration */:
                        declareModuleMember(node, symbolFlags, symbolExcludes);
                        break;
                    case 308 /* SourceFile */:
                        if (isExternalOrCommonJsModule(container)) {
                            declareModuleMember(node, symbolFlags, symbolExcludes);
                            break;
                        }
                    default:
                        Debug.assertNode(blockScopeContainer, canHaveLocals);
                        if (!blockScopeContainer.locals) {
                            blockScopeContainer.locals = createSymbolTable();
                            addToContainerChain(blockScopeContainer);
                        }
                        declareSymbol(blockScopeContainer.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                }
            }
            function delayedBindJSDocTypedefTag() {
                if (!delayedTypeAliases) {
                    return;
                }
                const saveContainer = container;
                const saveLastContainer = lastContainer;
                const saveBlockScopeContainer = blockScopeContainer;
                const saveParent = parent2;
                const saveCurrentFlow = currentFlow;
                for (const typeAlias of delayedTypeAliases) {
                    const host = typeAlias.parent.parent;
                    container = findAncestor(host.parent, (n) => !!(getContainerFlags(n) & 1 /* IsContainer */)) || file;
                    blockScopeContainer = getEnclosingBlockScopeContainer(host) || file;
                    currentFlow = initFlowNode({ flags: 2 /* Start */ });
                    parent2 = typeAlias;
                    bind(typeAlias.typeExpression);
                    const declName = getNameOfDeclaration(typeAlias);
                    if ((isJSDocEnumTag(typeAlias) || !typeAlias.fullName) && declName && isPropertyAccessEntityNameExpression(declName.parent)) {
                        const isTopLevel = isTopLevelNamespaceAssignment(declName.parent);
                        if (isTopLevel) {
                            bindPotentiallyMissingNamespaces(file.symbol, declName.parent, isTopLevel, !!findAncestor(declName, (d) => isPropertyAccessExpression(d) && d.name.escapedText === "prototype"), 
                            /*containerIsClass*/
                            false);
                            const oldContainer = container;
                            switch (getAssignmentDeclarationPropertyAccessKind(declName.parent)) {
                                case 1 /* ExportsProperty */:
                                case 2 /* ModuleExports */:
                                    if (!isExternalOrCommonJsModule(file)) {
                                        container = void 0;
                                    }
                                    else {
                                        container = file;
                                    }
                                    break;
                                case 4 /* ThisProperty */:
                                    container = declName.parent.expression;
                                    break;
                                case 3 /* PrototypeProperty */:
                                    container = declName.parent.expression.name;
                                    break;
                                case 5 /* Property */:
                                    container = isExportsOrModuleExportsOrAlias(file, declName.parent.expression) ? file : isPropertyAccessExpression(declName.parent.expression) ? declName.parent.expression.name : declName.parent.expression;
                                    break;
                                case 0 /* None */:
                                    return Debug.fail("Shouldn't have detected typedef or enum on non-assignment declaration");
                            }
                            if (container) {
                                declareModuleMember(typeAlias, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                            }
                            container = oldContainer;
                        }
                    }
                    else if (isJSDocEnumTag(typeAlias) || !typeAlias.fullName || typeAlias.fullName.kind === 79 /* Identifier */) {
                        parent2 = typeAlias.parent;
                        bindBlockScopedDeclaration(typeAlias, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                    }
                    else {
                        bind(typeAlias.fullName);
                    }
                }
                container = saveContainer;
                lastContainer = saveLastContainer;
                blockScopeContainer = saveBlockScopeContainer;
                parent2 = saveParent;
                currentFlow = saveCurrentFlow;
            }
            function checkContextualIdentifier(node) {
                if (!file.parseDiagnostics.length && !(node.flags & 16777216 /* Ambient */) && !(node.flags & 8388608 /* JSDoc */) && !isIdentifierName(node)) {
                    const originalKeywordKind = identifierToKeywordKind(node);
                    if (originalKeywordKind === void 0) {
                        return;
                    }
                    if (inStrictMode && originalKeywordKind >= 117 /* FirstFutureReservedWord */ && originalKeywordKind <= 125 /* LastFutureReservedWord */) {
                        file.bindDiagnostics.push(createDiagnosticForNode2(node, getStrictModeIdentifierMessage(node), declarationNameToString(node)));
                    }
                    else if (originalKeywordKind === 133 /* AwaitKeyword */) {
                        if (isExternalModule(file) && isInTopLevelContext(node)) {
                            file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module, declarationNameToString(node)));
                        }
                        else if (node.flags & 32768 /* AwaitContext */) {
                            file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node)));
                        }
                    }
                    else if (originalKeywordKind === 125 /* YieldKeyword */ && node.flags & 8192 /* YieldContext */) {
                        file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node)));
                    }
                }
            }
            function getStrictModeIdentifierMessage(node) {
                if (getContainingClass(node)) {
                    return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode;
                }
                if (file.externalModuleIndicator) {
                    return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode;
                }
                return Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode;
            }
            function checkPrivateIdentifier(node) {
                if (node.escapedText === "#constructor") {
                    if (!file.parseDiagnostics.length) {
                        file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.constructor_is_a_reserved_word, declarationNameToString(node)));
                    }
                }
            }
            function checkStrictModeBinaryExpression(node) {
                if (inStrictMode && isLeftHandSideExpression(node.left) && isAssignmentOperator(node.operatorToken.kind)) {
                    checkStrictModeEvalOrArguments(node, node.left);
                }
            }
            function checkStrictModeCatchClause(node) {
                if (inStrictMode && node.variableDeclaration) {
                    checkStrictModeEvalOrArguments(node, node.variableDeclaration.name);
                }
            }
            function checkStrictModeDeleteExpression(node) {
                if (inStrictMode && node.expression.kind === 79 /* Identifier */) {
                    const span = getErrorSpanForNode(file, node.expression);
                    file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode));
                }
            }
            function isEvalOrArgumentsIdentifier(node) {
                return isIdentifier(node) && (node.escapedText === "eval" || node.escapedText === "arguments");
            }
            function checkStrictModeEvalOrArguments(contextNode, name) {
                if (name && name.kind === 79 /* Identifier */) {
                    const identifier = name;
                    if (isEvalOrArgumentsIdentifier(identifier)) {
                        const span = getErrorSpanForNode(file, name);
                        file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, getStrictModeEvalOrArgumentsMessage(contextNode), idText(identifier)));
                    }
                }
            }
            function getStrictModeEvalOrArgumentsMessage(node) {
                if (getContainingClass(node)) {
                    return Diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode;
                }
                if (file.externalModuleIndicator) {
                    return Diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode;
                }
                return Diagnostics.Invalid_use_of_0_in_strict_mode;
            }
            function checkStrictModeFunctionName(node) {
                if (inStrictMode) {
                    checkStrictModeEvalOrArguments(node, node.name);
                }
            }
            function getStrictModeBlockScopeFunctionDeclarationMessage(node) {
                if (getContainingClass(node)) {
                    return Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_definitions_are_automatically_in_strict_mode;
                }
                if (file.externalModuleIndicator) {
                    return Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_are_automatically_in_strict_mode;
                }
                return Diagnostics.Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5;
            }
            function checkStrictModeFunctionDeclaration(node) {
                if (languageVersion < 2 /* ES2015 */) {
                    if (blockScopeContainer.kind !== 308 /* SourceFile */ && blockScopeContainer.kind !== 264 /* ModuleDeclaration */ && !isFunctionLikeOrClassStaticBlockDeclaration(blockScopeContainer)) {
                        const errorSpan = getErrorSpanForNode(file, node);
                        file.bindDiagnostics.push(createFileDiagnostic(file, errorSpan.start, errorSpan.length, getStrictModeBlockScopeFunctionDeclarationMessage(node)));
                    }
                }
            }
            function checkStrictModeNumericLiteral(node) {
                if (languageVersion < 1 /* ES5 */ && inStrictMode && node.numericLiteralFlags & 32 /* Octal */) {
                    file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Octal_literals_are_not_allowed_in_strict_mode));
                }
            }
            function checkStrictModePostfixUnaryExpression(node) {
                if (inStrictMode) {
                    checkStrictModeEvalOrArguments(node, node.operand);
                }
            }
            function checkStrictModePrefixUnaryExpression(node) {
                if (inStrictMode) {
                    if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                        checkStrictModeEvalOrArguments(node, node.operand);
                    }
                }
            }
            function checkStrictModeWithStatement(node) {
                if (inStrictMode) {
                    errorOnFirstToken(node, Diagnostics.with_statements_are_not_allowed_in_strict_mode);
                }
            }
            function checkStrictModeLabeledStatement(node) {
                if (inStrictMode && getEmitScriptTarget(options) >= 2 /* ES2015 */) {
                    if (isDeclarationStatement(node.statement) || isVariableStatement(node.statement)) {
                        errorOnFirstToken(node.label, Diagnostics.A_label_is_not_allowed_here);
                    }
                }
            }
            function errorOnFirstToken(node, message, arg0, arg1, arg2) {
                const span = getSpanOfTokenAtPosition(file, node.pos);
                file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, message, arg0, arg1, arg2));
            }
            function errorOrSuggestionOnNode(isError, node, message) {
                errorOrSuggestionOnRange(isError, node, node, message);
            }
            function errorOrSuggestionOnRange(isError, startNode2, endNode2, message) {
                addErrorOrSuggestionDiagnostic(isError, { pos: getTokenPosOfNode(startNode2, file), end: endNode2.end }, message);
            }
            function addErrorOrSuggestionDiagnostic(isError, range, message) {
                const diag2 = createFileDiagnostic(file, range.pos, range.end - range.pos, message);
                if (isError) {
                    file.bindDiagnostics.push(diag2);
                }
                else {
                    file.bindSuggestionDiagnostics = append(file.bindSuggestionDiagnostics, { ...diag2, category: 2 /* Suggestion */ });
                }
            }
            function bind(node) {
                if (!node) {
                    return;
                }
                setParent(node, parent2);
                if (tracing)
                    node.tracingPath = file.path;
                const saveInStrictMode = inStrictMode;
                bindWorker(node);
                if (node.kind > 162 /* LastToken */) {
                    const saveParent = parent2;
                    parent2 = node;
                    const containerFlags = getContainerFlags(node);
                    if (containerFlags === 0 /* None */) {
                        bindChildren(node);
                    }
                    else {
                        bindContainer(node, containerFlags);
                    }
                    parent2 = saveParent;
                }
                else {
                    const saveParent = parent2;
                    if (node.kind === 1 /* EndOfFileToken */)
                        parent2 = node;
                    bindJSDoc(node);
                    parent2 = saveParent;
                }
                inStrictMode = saveInStrictMode;
            }
            function bindJSDoc(node) {
                if (hasJSDocNodes(node)) {
                    if (isInJSFile(node)) {
                        for (const j of node.jsDoc) {
                            bind(j);
                        }
                    }
                    else {
                        for (const j of node.jsDoc) {
                            setParent(j, node);
                            setParentRecursive(j, 
                            /*incremental*/
                            false);
                        }
                    }
                }
            }
            function updateStrictModeStatementList(statements) {
                if (!inStrictMode) {
                    for (const statement of statements) {
                        if (!isPrologueDirective(statement)) {
                            return;
                        }
                        if (isUseStrictPrologueDirective(statement)) {
                            inStrictMode = true;
                            return;
                        }
                    }
                }
            }
            function isUseStrictPrologueDirective(node) {
                const nodeText2 = getSourceTextOfNodeFromSourceFile(file, node.expression);
                return nodeText2 === '"use strict"' || nodeText2 === "'use strict'";
            }
            function bindWorker(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        if (node.flags & 2048 /* IdentifierIsInJSDocNamespace */) {
                            let parentNode = node.parent;
                            while (parentNode && !isJSDocTypeAlias(parentNode)) {
                                parentNode = parentNode.parent;
                            }
                            bindBlockScopedDeclaration(parentNode, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                            break;
                        }
                    case 108 /* ThisKeyword */:
                        if (currentFlow && (isExpression(node) || parent2.kind === 300 /* ShorthandPropertyAssignment */)) {
                            node.flowNode = currentFlow;
                        }
                        return checkContextualIdentifier(node);
                    case 163 /* QualifiedName */:
                        if (currentFlow && isPartOfTypeQuery(node)) {
                            node.flowNode = currentFlow;
                        }
                        break;
                    case 233 /* MetaProperty */:
                    case 106 /* SuperKeyword */:
                        node.flowNode = currentFlow;
                        break;
                    case 80 /* PrivateIdentifier */:
                        return checkPrivateIdentifier(node);
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        const expr = node;
                        if (currentFlow && isNarrowableReference(expr)) {
                            expr.flowNode = currentFlow;
                        }
                        if (isSpecialPropertyDeclaration(expr)) {
                            bindSpecialPropertyDeclaration(expr);
                        }
                        if (isInJSFile(expr) && file.commonJsModuleIndicator && isModuleExportsAccessExpression(expr) && !lookupSymbolForName(blockScopeContainer, "module")) {
                            declareSymbol(file.locals, 
                            /*parent*/
                            void 0, expr.expression, 1 /* FunctionScopedVariable */ | 134217728 /* ModuleExports */, 111550 /* FunctionScopedVariableExcludes */);
                        }
                        break;
                    case 223 /* BinaryExpression */:
                        const specialKind = getAssignmentDeclarationKind(node);
                        switch (specialKind) {
                            case 1 /* ExportsProperty */:
                                bindExportsPropertyAssignment(node);
                                break;
                            case 2 /* ModuleExports */:
                                bindModuleExportsAssignment(node);
                                break;
                            case 3 /* PrototypeProperty */:
                                bindPrototypePropertyAssignment(node.left, node);
                                break;
                            case 6 /* Prototype */:
                                bindPrototypeAssignment(node);
                                break;
                            case 4 /* ThisProperty */:
                                bindThisPropertyAssignment(node);
                                break;
                            case 5 /* Property */:
                                const expression = node.left.expression;
                                if (isInJSFile(node) && isIdentifier(expression)) {
                                    const symbol = lookupSymbolForName(blockScopeContainer, expression.escapedText);
                                    if (isThisInitializedDeclaration(symbol == null ? void 0 : symbol.valueDeclaration)) {
                                        bindThisPropertyAssignment(node);
                                        break;
                                    }
                                }
                                bindSpecialPropertyAssignment(node);
                                break;
                            case 0 /* None */:
                                break;
                            default:
                                Debug.fail("Unknown binary expression special property assignment kind");
                        }
                        return checkStrictModeBinaryExpression(node);
                    case 295 /* CatchClause */:
                        return checkStrictModeCatchClause(node);
                    case 217 /* DeleteExpression */:
                        return checkStrictModeDeleteExpression(node);
                    case 8 /* NumericLiteral */:
                        return checkStrictModeNumericLiteral(node);
                    case 222 /* PostfixUnaryExpression */:
                        return checkStrictModePostfixUnaryExpression(node);
                    case 221 /* PrefixUnaryExpression */:
                        return checkStrictModePrefixUnaryExpression(node);
                    case 251 /* WithStatement */:
                        return checkStrictModeWithStatement(node);
                    case 253 /* LabeledStatement */:
                        return checkStrictModeLabeledStatement(node);
                    case 194 /* ThisType */:
                        seenThisKeyword = true;
                        return;
                    case 179 /* TypePredicate */:
                        break;
                    case 165 /* TypeParameter */:
                        return bindTypeParameter(node);
                    case 166 /* Parameter */:
                        return bindParameter(node);
                    case 257 /* VariableDeclaration */:
                        return bindVariableDeclarationOrBindingElement(node);
                    case 205 /* BindingElement */:
                        node.flowNode = currentFlow;
                        return bindVariableDeclarationOrBindingElement(node);
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                        return bindPropertyWorker(node);
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                        return bindPropertyOrMethodOrAccessor(node, 4 /* Property */, 0 /* PropertyExcludes */);
                    case 302 /* EnumMember */:
                        return bindPropertyOrMethodOrAccessor(node, 8 /* EnumMember */, 900095 /* EnumMemberExcludes */);
                    case 176 /* CallSignature */:
                    case 177 /* ConstructSignature */:
                    case 178 /* IndexSignature */:
                        return declareSymbolAndAddToSymbolTable(node, 131072 /* Signature */, 0 /* None */);
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        return bindPropertyOrMethodOrAccessor(node, 8192 /* Method */ | (node.questionToken ? 16777216 /* Optional */ : 0 /* None */), isObjectLiteralMethod(node) ? 0 /* PropertyExcludes */ : 103359 /* MethodExcludes */);
                    case 259 /* FunctionDeclaration */:
                        return bindFunctionDeclaration(node);
                    case 173 /* Constructor */:
                        return declareSymbolAndAddToSymbolTable(node, 16384 /* Constructor */, 
                        /*symbolExcludes:*/
                        0 /* None */);
                    case 174 /* GetAccessor */:
                        return bindPropertyOrMethodOrAccessor(node, 32768 /* GetAccessor */, 46015 /* GetAccessorExcludes */);
                    case 175 /* SetAccessor */:
                        return bindPropertyOrMethodOrAccessor(node, 65536 /* SetAccessor */, 78783 /* SetAccessorExcludes */);
                    case 181 /* FunctionType */:
                    case 320 /* JSDocFunctionType */:
                    case 326 /* JSDocSignature */:
                    case 182 /* ConstructorType */:
                        return bindFunctionOrConstructorType(node);
                    case 184 /* TypeLiteral */:
                    case 325 /* JSDocTypeLiteral */:
                    case 197 /* MappedType */:
                        return bindAnonymousTypeWorker(node);
                    case 335 /* JSDocClassTag */:
                        return bindJSDocClassTag(node);
                    case 207 /* ObjectLiteralExpression */:
                        return bindObjectLiteralExpression(node);
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        return bindFunctionExpression(node);
                    case 210 /* CallExpression */:
                        const assignmentKind = getAssignmentDeclarationKind(node);
                        switch (assignmentKind) {
                            case 7 /* ObjectDefinePropertyValue */:
                                return bindObjectDefinePropertyAssignment(node);
                            case 8 /* ObjectDefinePropertyExports */:
                                return bindObjectDefinePropertyExport(node);
                            case 9 /* ObjectDefinePrototypeProperty */:
                                return bindObjectDefinePrototypeProperty(node);
                            case 0 /* None */:
                                break;
                            default:
                                return Debug.fail("Unknown call expression assignment declaration kind");
                        }
                        if (isInJSFile(node)) {
                            bindCallExpression(node);
                        }
                        break;
                    case 228 /* ClassExpression */:
                    case 260 /* ClassDeclaration */:
                        inStrictMode = true;
                        return bindClassLikeDeclaration(node);
                    case 261 /* InterfaceDeclaration */:
                        return bindBlockScopedDeclaration(node, 64 /* Interface */, 788872 /* InterfaceExcludes */);
                    case 262 /* TypeAliasDeclaration */:
                        return bindBlockScopedDeclaration(node, 524288 /* TypeAlias */, 788968 /* TypeAliasExcludes */);
                    case 263 /* EnumDeclaration */:
                        return bindEnumDeclaration(node);
                    case 264 /* ModuleDeclaration */:
                        return bindModuleDeclaration(node);
                    case 289 /* JsxAttributes */:
                        return bindJsxAttributes(node);
                    case 288 /* JsxAttribute */:
                        return bindJsxAttribute(node, 4 /* Property */, 0 /* PropertyExcludes */);
                    case 268 /* ImportEqualsDeclaration */:
                    case 271 /* NamespaceImport */:
                    case 273 /* ImportSpecifier */:
                    case 278 /* ExportSpecifier */:
                        return declareSymbolAndAddToSymbolTable(node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                    case 267 /* NamespaceExportDeclaration */:
                        return bindNamespaceExportDeclaration(node);
                    case 270 /* ImportClause */:
                        return bindImportClause(node);
                    case 275 /* ExportDeclaration */:
                        return bindExportDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return bindExportAssignment(node);
                    case 308 /* SourceFile */:
                        updateStrictModeStatementList(node.statements);
                        return bindSourceFileIfExternalModule();
                    case 238 /* Block */:
                        if (!isFunctionLikeOrClassStaticBlockDeclaration(node.parent)) {
                            return;
                        }
                    case 265 /* ModuleBlock */:
                        return updateStrictModeStatementList(node.statements);
                    case 344 /* JSDocParameterTag */:
                        if (node.parent.kind === 326 /* JSDocSignature */) {
                            return bindParameter(node);
                        }
                        if (node.parent.kind !== 325 /* JSDocTypeLiteral */) {
                            break;
                        }
                    case 351 /* JSDocPropertyTag */:
                        const propTag = node;
                        const flags = propTag.isBracketed || propTag.typeExpression && propTag.typeExpression.type.kind === 319 /* JSDocOptionalType */ ? 4 /* Property */ | 16777216 /* Optional */ : 4 /* Property */;
                        return declareSymbolAndAddToSymbolTable(propTag, flags, 0 /* PropertyExcludes */);
                    case 349 /* JSDocTypedefTag */:
                    case 341 /* JSDocCallbackTag */:
                    case 343 /* JSDocEnumTag */:
                        return (delayedTypeAliases || (delayedTypeAliases = [])).push(node);
                    case 342 /* JSDocOverloadTag */:
                        return bind(node.typeExpression);
                }
            }
            function bindPropertyWorker(node) {
                const isAutoAccessor = isAutoAccessorPropertyDeclaration(node);
                const includes = isAutoAccessor ? 98304 /* Accessor */ : 4 /* Property */;
                const excludes = isAutoAccessor ? 13247 /* AccessorExcludes */ : 0 /* PropertyExcludes */;
                return bindPropertyOrMethodOrAccessor(node, includes | (node.questionToken ? 16777216 /* Optional */ : 0 /* None */), excludes);
            }
            function bindAnonymousTypeWorker(node) {
                return bindAnonymousDeclaration(node, 2048 /* TypeLiteral */, "__type" /* Type */);
            }
            function bindSourceFileIfExternalModule() {
                setExportContextFlag(file);
                if (isExternalModule(file)) {
                    bindSourceFileAsExternalModule();
                }
                else if (isJsonSourceFile(file)) {
                    bindSourceFileAsExternalModule();
                    const originalSymbol = file.symbol;
                    declareSymbol(file.symbol.exports, file.symbol, file, 4 /* Property */, 67108863 /* All */);
                    file.symbol = originalSymbol;
                }
            }
            function bindSourceFileAsExternalModule() {
                bindAnonymousDeclaration(file, 512 /* ValueModule */, `"${removeFileExtension(file.fileName)}"`);
            }
            function bindExportAssignment(node) {
                if (!container.symbol || !container.symbol.exports) {
                    bindAnonymousDeclaration(node, 111551 /* Value */, getDeclarationName(node));
                }
                else {
                    const flags = exportAssignmentIsAlias(node) ? 2097152 /* Alias */ : 4 /* Property */;
                    const symbol = declareSymbol(container.symbol.exports, container.symbol, node, flags, 67108863 /* All */);
                    if (node.isExportEquals) {
                        setValueDeclaration(symbol, node);
                    }
                }
            }
            function bindNamespaceExportDeclaration(node) {
                if (some(node.modifiers)) {
                    file.bindDiagnostics.push(createDiagnosticForNode2(node, Diagnostics.Modifiers_cannot_appear_here));
                }
                const diag2 = !isSourceFile(node.parent) ? Diagnostics.Global_module_exports_may_only_appear_at_top_level : !isExternalModule(node.parent) ? Diagnostics.Global_module_exports_may_only_appear_in_module_files : !node.parent.isDeclarationFile ? Diagnostics.Global_module_exports_may_only_appear_in_declaration_files : void 0;
                if (diag2) {
                    file.bindDiagnostics.push(createDiagnosticForNode2(node, diag2));
                }
                else {
                    file.symbol.globalExports = file.symbol.globalExports || createSymbolTable();
                    declareSymbol(file.symbol.globalExports, file.symbol, node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                }
            }
            function bindExportDeclaration(node) {
                if (!container.symbol || !container.symbol.exports) {
                    bindAnonymousDeclaration(node, 8388608 /* ExportStar */, getDeclarationName(node));
                }
                else if (!node.exportClause) {
                    declareSymbol(container.symbol.exports, container.symbol, node, 8388608 /* ExportStar */, 0 /* None */);
                }
                else if (isNamespaceExport(node.exportClause)) {
                    setParent(node.exportClause, node);
                    declareSymbol(container.symbol.exports, container.symbol, node.exportClause, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                }
            }
            function bindImportClause(node) {
                if (node.name) {
                    declareSymbolAndAddToSymbolTable(node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                }
            }
            function setCommonJsModuleIndicator(node) {
                if (file.externalModuleIndicator && file.externalModuleIndicator !== true) {
                    return false;
                }
                if (!file.commonJsModuleIndicator) {
                    file.commonJsModuleIndicator = node;
                    if (!file.externalModuleIndicator) {
                        bindSourceFileAsExternalModule();
                    }
                }
                return true;
            }
            function bindObjectDefinePropertyExport(node) {
                if (!setCommonJsModuleIndicator(node)) {
                    return;
                }
                const symbol = forEachIdentifierInEntityName(node.arguments[0], 
                /*parent*/
                void 0, (id, symbol2) => {
                    if (symbol2) {
                        addDeclarationToSymbol(symbol2, id, 1536 /* Module */ | 67108864 /* Assignment */);
                    }
                    return symbol2;
                });
                if (symbol) {
                    const flags = 4 /* Property */ | 1048576 /* ExportValue */;
                    declareSymbol(symbol.exports, symbol, node, flags, 0 /* None */);
                }
            }
            function bindExportsPropertyAssignment(node) {
                if (!setCommonJsModuleIndicator(node)) {
                    return;
                }
                const symbol = forEachIdentifierInEntityName(node.left.expression, 
                /*parent*/
                void 0, (id, symbol2) => {
                    if (symbol2) {
                        addDeclarationToSymbol(symbol2, id, 1536 /* Module */ | 67108864 /* Assignment */);
                    }
                    return symbol2;
                });
                if (symbol) {
                    const isAlias = isAliasableExpression(node.right) && (isExportsIdentifier(node.left.expression) || isModuleExportsAccessExpression(node.left.expression));
                    const flags = isAlias ? 2097152 /* Alias */ : 4 /* Property */ | 1048576 /* ExportValue */;
                    setParent(node.left, node);
                    declareSymbol(symbol.exports, symbol, node.left, flags, 0 /* None */);
                }
            }
            function bindModuleExportsAssignment(node) {
                if (!setCommonJsModuleIndicator(node)) {
                    return;
                }
                const assignedExpression = getRightMostAssignedExpression(node.right);
                if (isEmptyObjectLiteral(assignedExpression) || container === file && isExportsOrModuleExportsOrAlias(file, assignedExpression)) {
                    return;
                }
                if (isObjectLiteralExpression(assignedExpression) && every(assignedExpression.properties, isShorthandPropertyAssignment)) {
                    forEach(assignedExpression.properties, bindExportAssignedObjectMemberAlias);
                    return;
                }
                const flags = exportAssignmentIsAlias(node) ? 2097152 /* Alias */ : 4 /* Property */ | 1048576 /* ExportValue */ | 512 /* ValueModule */;
                const symbol = declareSymbol(file.symbol.exports, file.symbol, node, flags | 67108864 /* Assignment */, 0 /* None */);
                setValueDeclaration(symbol, node);
            }
            function bindExportAssignedObjectMemberAlias(node) {
                declareSymbol(file.symbol.exports, file.symbol, node, 2097152 /* Alias */ | 67108864 /* Assignment */, 0 /* None */);
            }
            function bindThisPropertyAssignment(node) {
                Debug.assert(isInJSFile(node));
                const hasPrivateIdentifier = isBinaryExpression(node) && isPropertyAccessExpression(node.left) && isPrivateIdentifier(node.left.name) || isPropertyAccessExpression(node) && isPrivateIdentifier(node.name);
                if (hasPrivateIdentifier) {
                    return;
                }
                const thisContainer = getThisContainer(node, 
                /*includeArrowFunctions*/
                false, 
                /*includeClassComputedPropertyName*/
                false);
                switch (thisContainer.kind) {
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                        let constructorSymbol = thisContainer.symbol;
                        if (isBinaryExpression(thisContainer.parent) && thisContainer.parent.operatorToken.kind === 63 /* EqualsToken */) {
                            const l = thisContainer.parent.left;
                            if (isBindableStaticAccessExpression(l) && isPrototypeAccess(l.expression)) {
                                constructorSymbol = lookupSymbolForPropertyAccess(l.expression.expression, thisParentContainer);
                            }
                        }
                        if (constructorSymbol && constructorSymbol.valueDeclaration) {
                            constructorSymbol.members = constructorSymbol.members || createSymbolTable();
                            if (hasDynamicName(node)) {
                                bindDynamicallyNamedThisPropertyAssignment(node, constructorSymbol, constructorSymbol.members);
                            }
                            else {
                                declareSymbol(constructorSymbol.members, constructorSymbol, node, 4 /* Property */ | 67108864 /* Assignment */, 0 /* PropertyExcludes */ & ~4 /* Property */);
                            }
                            addDeclarationToSymbol(constructorSymbol, constructorSymbol.valueDeclaration, 32 /* Class */);
                        }
                        break;
                    case 173 /* Constructor */:
                    case 169 /* PropertyDeclaration */:
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 172 /* ClassStaticBlockDeclaration */:
                        const containingClass = thisContainer.parent;
                        const symbolTable = isStatic(thisContainer) ? containingClass.symbol.exports : containingClass.symbol.members;
                        if (hasDynamicName(node)) {
                            bindDynamicallyNamedThisPropertyAssignment(node, containingClass.symbol, symbolTable);
                        }
                        else {
                            declareSymbol(symbolTable, containingClass.symbol, node, 4 /* Property */ | 67108864 /* Assignment */, 0 /* None */, 
                            /*isReplaceableByMethod*/
                            true);
                        }
                        break;
                    case 308 /* SourceFile */:
                        if (hasDynamicName(node)) {
                            break;
                        }
                        else if (thisContainer.commonJsModuleIndicator) {
                            declareSymbol(thisContainer.symbol.exports, thisContainer.symbol, node, 4 /* Property */ | 1048576 /* ExportValue */, 0 /* None */);
                        }
                        else {
                            declareSymbolAndAddToSymbolTable(node, 1 /* FunctionScopedVariable */, 111550 /* FunctionScopedVariableExcludes */);
                        }
                        break;
                    default:
                        Debug.failBadSyntaxKind(thisContainer);
                }
            }
            function bindDynamicallyNamedThisPropertyAssignment(node, symbol, symbolTable) {
                declareSymbol(symbolTable, symbol, node, 4 /* Property */, 0 /* None */, 
                /*isReplaceableByMethod*/
                true, 
                /*isComputedName*/
                true);
                addLateBoundAssignmentDeclarationToSymbol(node, symbol);
            }
            function addLateBoundAssignmentDeclarationToSymbol(node, symbol) {
                if (symbol) {
                    (symbol.assignmentDeclarationMembers || (symbol.assignmentDeclarationMembers = /* @__PURE__ */ new Map())).set(getNodeId(node), node);
                }
            }
            function bindSpecialPropertyDeclaration(node) {
                if (node.expression.kind === 108 /* ThisKeyword */) {
                    bindThisPropertyAssignment(node);
                }
                else if (isBindableStaticAccessExpression(node) && node.parent.parent.kind === 308 /* SourceFile */) {
                    if (isPrototypeAccess(node.expression)) {
                        bindPrototypePropertyAssignment(node, node.parent);
                    }
                    else {
                        bindStaticPropertyAssignment(node);
                    }
                }
            }
            function bindPrototypeAssignment(node) {
                setParent(node.left, node);
                setParent(node.right, node);
                bindPropertyAssignment(node.left.expression, node.left, 
                /*isPrototypeProperty*/
                false, 
                /*containerIsClass*/
                true);
            }
            function bindObjectDefinePrototypeProperty(node) {
                const namespaceSymbol = lookupSymbolForPropertyAccess(node.arguments[0].expression);
                if (namespaceSymbol && namespaceSymbol.valueDeclaration) {
                    addDeclarationToSymbol(namespaceSymbol, namespaceSymbol.valueDeclaration, 32 /* Class */);
                }
                bindPotentiallyNewExpandoMemberToNamespace(node, namespaceSymbol, 
                /*isPrototypeProperty*/
                true);
            }
            function bindPrototypePropertyAssignment(lhs, parent3) {
                const classPrototype = lhs.expression;
                const constructorFunction = classPrototype.expression;
                setParent(constructorFunction, classPrototype);
                setParent(classPrototype, lhs);
                setParent(lhs, parent3);
                bindPropertyAssignment(constructorFunction, lhs, 
                /*isPrototypeProperty*/
                true, 
                /*containerIsClass*/
                true);
            }
            function bindObjectDefinePropertyAssignment(node) {
                let namespaceSymbol = lookupSymbolForPropertyAccess(node.arguments[0]);
                const isToplevel = node.parent.parent.kind === 308 /* SourceFile */;
                namespaceSymbol = bindPotentiallyMissingNamespaces(namespaceSymbol, node.arguments[0], isToplevel, 
                /*isPrototypeProperty*/
                false, 
                /*containerIsClass*/
                false);
                bindPotentiallyNewExpandoMemberToNamespace(node, namespaceSymbol, 
                /*isPrototypeProperty*/
                false);
            }
            function bindSpecialPropertyAssignment(node) {
                var _a2;
                const parentSymbol = lookupSymbolForPropertyAccess(node.left.expression, container) || lookupSymbolForPropertyAccess(node.left.expression, blockScopeContainer);
                if (!isInJSFile(node) && !isFunctionSymbol(parentSymbol)) {
                    return;
                }
                const rootExpr = getLeftmostAccessExpression(node.left);
                if (isIdentifier(rootExpr) && ((_a2 = lookupSymbolForName(container, rootExpr.escapedText)) == null ? void 0 : _a2.flags) & 2097152 /* Alias */) {
                    return;
                }
                setParent(node.left, node);
                setParent(node.right, node);
                if (isIdentifier(node.left.expression) && container === file && isExportsOrModuleExportsOrAlias(file, node.left.expression)) {
                    bindExportsPropertyAssignment(node);
                }
                else if (hasDynamicName(node)) {
                    bindAnonymousDeclaration(node, 4 /* Property */ | 67108864 /* Assignment */, "__computed" /* Computed */);
                    const sym = bindPotentiallyMissingNamespaces(parentSymbol, node.left.expression, isTopLevelNamespaceAssignment(node.left), 
                    /*isPrototype*/
                    false, 
                    /*containerIsClass*/
                    false);
                    addLateBoundAssignmentDeclarationToSymbol(node, sym);
                }
                else {
                    bindStaticPropertyAssignment(cast(node.left, isBindableStaticNameExpression));
                }
            }
            function bindStaticPropertyAssignment(node) {
                Debug.assert(!isIdentifier(node));
                setParent(node.expression, node);
                bindPropertyAssignment(node.expression, node, 
                /*isPrototypeProperty*/
                false, 
                /*containerIsClass*/
                false);
            }
            function bindPotentiallyMissingNamespaces(namespaceSymbol, entityName, isToplevel, isPrototypeProperty, containerIsClass) {
                if ((namespaceSymbol == null ? void 0 : namespaceSymbol.flags) & 2097152 /* Alias */) {
                    return namespaceSymbol;
                }
                if (isToplevel && !isPrototypeProperty) {
                    const flags = 1536 /* Module */ | 67108864 /* Assignment */;
                    const excludeFlags = 110735 /* ValueModuleExcludes */ & ~67108864 /* Assignment */;
                    namespaceSymbol = forEachIdentifierInEntityName(entityName, namespaceSymbol, (id, symbol, parent3) => {
                        if (symbol) {
                            addDeclarationToSymbol(symbol, id, flags);
                            return symbol;
                        }
                        else {
                            const table = parent3 ? parent3.exports : file.jsGlobalAugmentations || (file.jsGlobalAugmentations = createSymbolTable());
                            return declareSymbol(table, parent3, id, flags, excludeFlags);
                        }
                    });
                }
                if (containerIsClass && namespaceSymbol && namespaceSymbol.valueDeclaration) {
                    addDeclarationToSymbol(namespaceSymbol, namespaceSymbol.valueDeclaration, 32 /* Class */);
                }
                return namespaceSymbol;
            }
            function bindPotentiallyNewExpandoMemberToNamespace(declaration, namespaceSymbol, isPrototypeProperty) {
                if (!namespaceSymbol || !isExpandoSymbol(namespaceSymbol)) {
                    return;
                }
                const symbolTable = isPrototypeProperty ? namespaceSymbol.members || (namespaceSymbol.members = createSymbolTable()) : namespaceSymbol.exports || (namespaceSymbol.exports = createSymbolTable());
                let includes = 0 /* None */;
                let excludes = 0 /* None */;
                if (isFunctionLikeDeclaration(getAssignedExpandoInitializer(declaration))) {
                    includes = 8192 /* Method */;
                    excludes = 103359 /* MethodExcludes */;
                }
                else if (isCallExpression(declaration) && isBindableObjectDefinePropertyCall(declaration)) {
                    if (some(declaration.arguments[2].properties, (p) => {
                        const id = getNameOfDeclaration(p);
                        return !!id && isIdentifier(id) && idText(id) === "set";
                    })) {
                        includes |= 65536 /* SetAccessor */ | 4 /* Property */;
                        excludes |= 78783 /* SetAccessorExcludes */;
                    }
                    if (some(declaration.arguments[2].properties, (p) => {
                        const id = getNameOfDeclaration(p);
                        return !!id && isIdentifier(id) && idText(id) === "get";
                    })) {
                        includes |= 32768 /* GetAccessor */ | 4 /* Property */;
                        excludes |= 46015 /* GetAccessorExcludes */;
                    }
                }
                if (includes === 0 /* None */) {
                    includes = 4 /* Property */;
                    excludes = 0 /* PropertyExcludes */;
                }
                declareSymbol(symbolTable, namespaceSymbol, declaration, includes | 67108864 /* Assignment */, excludes & ~67108864 /* Assignment */);
            }
            function isTopLevelNamespaceAssignment(propertyAccess) {
                return isBinaryExpression(propertyAccess.parent) ? getParentOfBinaryExpression(propertyAccess.parent).parent.kind === 308 /* SourceFile */ : propertyAccess.parent.parent.kind === 308 /* SourceFile */;
            }
            function bindPropertyAssignment(name, propertyAccess, isPrototypeProperty, containerIsClass) {
                let namespaceSymbol = lookupSymbolForPropertyAccess(name, container) || lookupSymbolForPropertyAccess(name, blockScopeContainer);
                const isToplevel = isTopLevelNamespaceAssignment(propertyAccess);
                namespaceSymbol = bindPotentiallyMissingNamespaces(namespaceSymbol, propertyAccess.expression, isToplevel, isPrototypeProperty, containerIsClass);
                bindPotentiallyNewExpandoMemberToNamespace(propertyAccess, namespaceSymbol, isPrototypeProperty);
            }
            function isExpandoSymbol(symbol) {
                if (symbol.flags & (16 /* Function */ | 32 /* Class */ | 1024 /* NamespaceModule */)) {
                    return true;
                }
                const node = symbol.valueDeclaration;
                if (node && isCallExpression(node)) {
                    return !!getAssignedExpandoInitializer(node);
                }
                let init = !node ? void 0 : isVariableDeclaration(node) ? node.initializer : isBinaryExpression(node) ? node.right : isPropertyAccessExpression(node) && isBinaryExpression(node.parent) ? node.parent.right : void 0;
                init = init && getRightMostAssignedExpression(init);
                if (init) {
                    const isPrototypeAssignment = isPrototypeAccess(isVariableDeclaration(node) ? node.name : isBinaryExpression(node) ? node.left : node);
                    return !!getExpandoInitializer(isBinaryExpression(init) && (init.operatorToken.kind === 56 /* BarBarToken */ || init.operatorToken.kind === 60 /* QuestionQuestionToken */) ? init.right : init, isPrototypeAssignment);
                }
                return false;
            }
            function getParentOfBinaryExpression(expr) {
                while (isBinaryExpression(expr.parent)) {
                    expr = expr.parent;
                }
                return expr.parent;
            }
            function lookupSymbolForPropertyAccess(node, lookupContainer = container) {
                if (isIdentifier(node)) {
                    return lookupSymbolForName(lookupContainer, node.escapedText);
                }
                else {
                    const symbol = lookupSymbolForPropertyAccess(node.expression);
                    return symbol && symbol.exports && symbol.exports.get(getElementOrPropertyAccessName(node));
                }
            }
            function forEachIdentifierInEntityName(e, parent3, action) {
                if (isExportsOrModuleExportsOrAlias(file, e)) {
                    return file.symbol;
                }
                else if (isIdentifier(e)) {
                    return action(e, lookupSymbolForPropertyAccess(e), parent3);
                }
                else {
                    const s = forEachIdentifierInEntityName(e.expression, parent3, action);
                    const name = getNameOrArgument(e);
                    if (isPrivateIdentifier(name)) {
                        Debug.fail("unexpected PrivateIdentifier");
                    }
                    return action(name, s && s.exports && s.exports.get(getElementOrPropertyAccessName(e)), s);
                }
            }
            function bindCallExpression(node) {
                if (!file.commonJsModuleIndicator && isRequireCall(node, 
                /*checkArgumentIsStringLiteralLike*/
                false)) {
                    setCommonJsModuleIndicator(node);
                }
            }
            function bindClassLikeDeclaration(node) {
                if (node.kind === 260 /* ClassDeclaration */) {
                    bindBlockScopedDeclaration(node, 32 /* Class */, 899503 /* ClassExcludes */);
                }
                else {
                    const bindingName = node.name ? node.name.escapedText : "__class" /* Class */;
                    bindAnonymousDeclaration(node, 32 /* Class */, bindingName);
                    if (node.name) {
                        classifiableNames.add(node.name.escapedText);
                    }
                }
                const { symbol } = node;
                const prototypeSymbol = createSymbol(4 /* Property */ | 4194304 /* Prototype */, "prototype");
                const symbolExport = symbol.exports.get(prototypeSymbol.escapedName);
                if (symbolExport) {
                    if (node.name) {
                        setParent(node.name, node);
                    }
                    file.bindDiagnostics.push(createDiagnosticForNode2(symbolExport.declarations[0], Diagnostics.Duplicate_identifier_0, symbolName(prototypeSymbol)));
                }
                symbol.exports.set(prototypeSymbol.escapedName, prototypeSymbol);
                prototypeSymbol.parent = symbol;
            }
            function bindEnumDeclaration(node) {
                return isEnumConst(node) ? bindBlockScopedDeclaration(node, 128 /* ConstEnum */, 899967 /* ConstEnumExcludes */) : bindBlockScopedDeclaration(node, 256 /* RegularEnum */, 899327 /* RegularEnumExcludes */);
            }
            function bindVariableDeclarationOrBindingElement(node) {
                if (inStrictMode) {
                    checkStrictModeEvalOrArguments(node, node.name);
                }
                if (!isBindingPattern(node.name)) {
                    const possibleVariableDecl = node.kind === 257 /* VariableDeclaration */ ? node : node.parent.parent;
                    if (isInJSFile(node) && shouldResolveJsRequire(options) && isVariableDeclarationInitializedToBareOrAccessedRequire(possibleVariableDecl) && !getJSDocTypeTag(node) && !(getCombinedModifierFlags(node) & 1 /* Export */)) {
                        declareSymbolAndAddToSymbolTable(node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                    }
                    else if (isBlockOrCatchScoped(node)) {
                        bindBlockScopedDeclaration(node, 2 /* BlockScopedVariable */, 111551 /* BlockScopedVariableExcludes */);
                    }
                    else if (isParameterDeclaration(node)) {
                        declareSymbolAndAddToSymbolTable(node, 1 /* FunctionScopedVariable */, 111551 /* ParameterExcludes */);
                    }
                    else {
                        declareSymbolAndAddToSymbolTable(node, 1 /* FunctionScopedVariable */, 111550 /* FunctionScopedVariableExcludes */);
                    }
                }
            }
            function bindParameter(node) {
                if (node.kind === 344 /* JSDocParameterTag */ && container.kind !== 326 /* JSDocSignature */) {
                    return;
                }
                if (inStrictMode && !(node.flags & 16777216 /* Ambient */)) {
                    checkStrictModeEvalOrArguments(node, node.name);
                }
                if (isBindingPattern(node.name)) {
                    bindAnonymousDeclaration(node, 1 /* FunctionScopedVariable */, "__" + node.parent.parameters.indexOf(node));
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, 1 /* FunctionScopedVariable */, 111551 /* ParameterExcludes */);
                }
                if (isParameterPropertyDeclaration(node, node.parent)) {
                    const classDeclaration = node.parent.parent;
                    declareSymbol(classDeclaration.symbol.members, classDeclaration.symbol, node, 4 /* Property */ | (node.questionToken ? 16777216 /* Optional */ : 0 /* None */), 0 /* PropertyExcludes */);
                }
            }
            function bindFunctionDeclaration(node) {
                if (!file.isDeclarationFile && !(node.flags & 16777216 /* Ambient */)) {
                    if (isAsyncFunction(node)) {
                        emitFlags |= 2048 /* HasAsyncFunctions */;
                    }
                }
                checkStrictModeFunctionName(node);
                if (inStrictMode) {
                    checkStrictModeFunctionDeclaration(node);
                    bindBlockScopedDeclaration(node, 16 /* Function */, 110991 /* FunctionExcludes */);
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, 16 /* Function */, 110991 /* FunctionExcludes */);
                }
            }
            function bindFunctionExpression(node) {
                if (!file.isDeclarationFile && !(node.flags & 16777216 /* Ambient */)) {
                    if (isAsyncFunction(node)) {
                        emitFlags |= 2048 /* HasAsyncFunctions */;
                    }
                }
                if (currentFlow) {
                    node.flowNode = currentFlow;
                }
                checkStrictModeFunctionName(node);
                const bindingName = node.name ? node.name.escapedText : "__function" /* Function */;
                return bindAnonymousDeclaration(node, 16 /* Function */, bindingName);
            }
            function bindPropertyOrMethodOrAccessor(node, symbolFlags, symbolExcludes) {
                if (!file.isDeclarationFile && !(node.flags & 16777216 /* Ambient */) && isAsyncFunction(node)) {
                    emitFlags |= 2048 /* HasAsyncFunctions */;
                }
                if (currentFlow && isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
                    node.flowNode = currentFlow;
                }
                return hasDynamicName(node) ? bindAnonymousDeclaration(node, symbolFlags, "__computed" /* Computed */) : declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
            }
            function getInferTypeContainer(node) {
                const extendsType = findAncestor(node, (n) => n.parent && isConditionalTypeNode(n.parent) && n.parent.extendsType === n);
                return extendsType && extendsType.parent;
            }
            function bindTypeParameter(node) {
                var _a2, _b;
                if (isJSDocTemplateTag(node.parent)) {
                    const container2 = getEffectiveContainerForJSDocTemplateTag(node.parent);
                    if (container2) {
                        Debug.assertNode(container2, canHaveLocals);
                        (_a2 = container2.locals) != null ? _a2 : container2.locals = createSymbolTable();
                        declareSymbol(container2.locals, 
                        /*parent*/
                        void 0, node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                    }
                    else {
                        declareSymbolAndAddToSymbolTable(node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                    }
                }
                else if (node.parent.kind === 192 /* InferType */) {
                    const container2 = getInferTypeContainer(node.parent);
                    if (container2) {
                        Debug.assertNode(container2, canHaveLocals);
                        (_b = container2.locals) != null ? _b : container2.locals = createSymbolTable();
                        declareSymbol(container2.locals, 
                        /*parent*/
                        void 0, node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                    }
                    else {
                        bindAnonymousDeclaration(node, 262144 /* TypeParameter */, getDeclarationName(node));
                    }
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, 262144 /* TypeParameter */, 526824 /* TypeParameterExcludes */);
                }
            }
            function shouldReportErrorOnModuleDeclaration(node) {
                const instanceState = getModuleInstanceState(node);
                return instanceState === 1 /* Instantiated */ || instanceState === 2 /* ConstEnumOnly */ && shouldPreserveConstEnums(options);
            }
            function checkUnreachable(node) {
                if (!(currentFlow.flags & 1 /* Unreachable */)) {
                    return false;
                }
                if (currentFlow === unreachableFlow) {
                    const reportError = (
                    // report error on all statements except empty ones
                    isStatementButNotDeclaration(node) && node.kind !== 239 /* EmptyStatement */ || // report error on class declarations
                        node.kind === 260 /* ClassDeclaration */ || // report error on instantiated modules or const-enums only modules if preserveConstEnums is set
                        node.kind === 264 /* ModuleDeclaration */ && shouldReportErrorOnModuleDeclaration(node));
                    if (reportError) {
                        currentFlow = reportedUnreachableFlow;
                        if (!options.allowUnreachableCode) {
                            const isError = unreachableCodeIsError(options) && !(node.flags & 16777216 /* Ambient */) && (!isVariableStatement(node) || !!(getCombinedNodeFlags(node.declarationList) & 3 /* BlockScoped */) || node.declarationList.declarations.some((d) => !!d.initializer));
                            eachUnreachableRange(node, (start, end) => errorOrSuggestionOnRange(isError, start, end, Diagnostics.Unreachable_code_detected));
                        }
                    }
                }
                return true;
            }
        }