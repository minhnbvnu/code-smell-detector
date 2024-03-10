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