function collectReadsAndWrites(targetRange, scopes, enclosingTextRange, sourceFile, checker, cancellationToken) {
            const allTypeParameterUsages = /* @__PURE__ */ new Map();
            const usagesPerScope = [];
            const substitutionsPerScope = [];
            const functionErrorsPerScope = [];
            const constantErrorsPerScope = [];
            const visibleDeclarationsInExtractedRange = [];
            const exposedVariableSymbolSet = /* @__PURE__ */ new Map();
            const exposedVariableDeclarations = [];
            let firstExposedNonVariableDeclaration;
            const expression = !isReadonlyArray(targetRange.range) ? targetRange.range : targetRange.range.length === 1 && isExpressionStatement(targetRange.range[0]) ? targetRange.range[0].expression : void 0;
            let expressionDiagnostic;
            if (expression === void 0) {
                const statements = targetRange.range;
                const start = first(statements).getStart();
                const end = last(statements).end;
                expressionDiagnostic = createFileDiagnostic(sourceFile, start, end - start, Messages.expressionExpected);
            }
            else if (checker.getTypeAtLocation(expression).flags & (16384 /* Void */ | 131072 /* Never */)) {
                expressionDiagnostic = createDiagnosticForNode(expression, Messages.uselessConstantType);
            }
            for (const scope of scopes) {
                usagesPerScope.push({ usages: /* @__PURE__ */ new Map(), typeParameterUsages: /* @__PURE__ */ new Map(), substitutions: /* @__PURE__ */ new Map() });
                substitutionsPerScope.push(/* @__PURE__ */ new Map());
                functionErrorsPerScope.push([]);
                const constantErrors = [];
                if (expressionDiagnostic) {
                    constantErrors.push(expressionDiagnostic);
                }
                if (isClassLike(scope) && isInJSFile(scope)) {
                    constantErrors.push(createDiagnosticForNode(scope, Messages.cannotExtractToJSClass));
                }
                if (isArrowFunction(scope) && !isBlock(scope.body)) {
                    constantErrors.push(createDiagnosticForNode(scope, Messages.cannotExtractToExpressionArrowFunction));
                }
                constantErrorsPerScope.push(constantErrors);
            }
            const seenUsages = /* @__PURE__ */ new Map();
            const target = isReadonlyArray(targetRange.range) ? factory.createBlock(targetRange.range) : targetRange.range;
            const unmodifiedNode = isReadonlyArray(targetRange.range) ? first(targetRange.range) : targetRange.range;
            const inGenericContext = isInGenericContext(unmodifiedNode);
            collectUsages(target);
            if (inGenericContext && !isReadonlyArray(targetRange.range) && !isJsxAttribute(targetRange.range)) {
                const contextualType = checker.getContextualType(targetRange.range);
                recordTypeParameterUsages(contextualType);
            }
            if (allTypeParameterUsages.size > 0) {
                const seenTypeParameterUsages = /* @__PURE__ */ new Map();
                let i = 0;
                for (let curr = unmodifiedNode; curr !== void 0 && i < scopes.length; curr = curr.parent) {
                    if (curr === scopes[i]) {
                        seenTypeParameterUsages.forEach((typeParameter, id) => {
                            usagesPerScope[i].typeParameterUsages.set(id, typeParameter);
                        });
                        i++;
                    }
                    if (isDeclarationWithTypeParameters(curr)) {
                        for (const typeParameterDecl of getEffectiveTypeParameterDeclarations(curr)) {
                            const typeParameter = checker.getTypeAtLocation(typeParameterDecl);
                            if (allTypeParameterUsages.has(typeParameter.id.toString())) {
                                seenTypeParameterUsages.set(typeParameter.id.toString(), typeParameter);
                            }
                        }
                    }
                }
                Debug.assert(i === scopes.length, "Should have iterated all scopes");
            }
            if (visibleDeclarationsInExtractedRange.length) {
                const containingLexicalScopeOfExtraction = isBlockScope(scopes[0], scopes[0].parent) ? scopes[0] : getEnclosingBlockScopeContainer(scopes[0]);
                forEachChild(containingLexicalScopeOfExtraction, checkForUsedDeclarations);
            }
            for (let i = 0; i < scopes.length; i++) {
                const scopeUsages = usagesPerScope[i];
                if (i > 0 && (scopeUsages.usages.size > 0 || scopeUsages.typeParameterUsages.size > 0)) {
                    const errorNode = isReadonlyArray(targetRange.range) ? targetRange.range[0] : targetRange.range;
                    constantErrorsPerScope[i].push(createDiagnosticForNode(errorNode, Messages.cannotAccessVariablesFromNestedScopes));
                }
                if (targetRange.facts & 16 /* UsesThisInFunction */ && isClassLike(scopes[i])) {
                    functionErrorsPerScope[i].push(createDiagnosticForNode(targetRange.thisNode, Messages.cannotExtractFunctionsContainingThisToMethod));
                }
                let hasWrite = false;
                let readonlyClassPropertyWrite;
                usagesPerScope[i].usages.forEach((value) => {
                    if (value.usage === 2 /* Write */) {
                        hasWrite = true;
                        if (value.symbol.flags & 106500 /* ClassMember */ && value.symbol.valueDeclaration && hasEffectiveModifier(value.symbol.valueDeclaration, 64 /* Readonly */)) {
                            readonlyClassPropertyWrite = value.symbol.valueDeclaration;
                        }
                    }
                });
                Debug.assert(isReadonlyArray(targetRange.range) || exposedVariableDeclarations.length === 0, "No variable declarations expected if something was extracted");
                if (hasWrite && !isReadonlyArray(targetRange.range)) {
                    const diag2 = createDiagnosticForNode(targetRange.range, Messages.cannotWriteInExpression);
                    functionErrorsPerScope[i].push(diag2);
                    constantErrorsPerScope[i].push(diag2);
                }
                else if (readonlyClassPropertyWrite && i > 0) {
                    const diag2 = createDiagnosticForNode(readonlyClassPropertyWrite, Messages.cannotExtractReadonlyPropertyInitializerOutsideConstructor);
                    functionErrorsPerScope[i].push(diag2);
                    constantErrorsPerScope[i].push(diag2);
                }
                else if (firstExposedNonVariableDeclaration) {
                    const diag2 = createDiagnosticForNode(firstExposedNonVariableDeclaration, Messages.cannotExtractExportedEntity);
                    functionErrorsPerScope[i].push(diag2);
                    constantErrorsPerScope[i].push(diag2);
                }
            }
            return { target, usagesPerScope, functionErrorsPerScope, constantErrorsPerScope, exposedVariableDeclarations };
            function isInGenericContext(node) {
                return !!findAncestor(node, (n) => isDeclarationWithTypeParameters(n) && getEffectiveTypeParameterDeclarations(n).length !== 0);
            }
            function recordTypeParameterUsages(type) {
                const symbolWalker = checker.getSymbolWalker(() => (cancellationToken.throwIfCancellationRequested(), true));
                const { visitedTypes } = symbolWalker.walkType(type);
                for (const visitedType of visitedTypes) {
                    if (visitedType.isTypeParameter()) {
                        allTypeParameterUsages.set(visitedType.id.toString(), visitedType);
                    }
                }
            }
            function collectUsages(node, valueUsage = 1 /* Read */) {
                if (inGenericContext) {
                    const type = checker.getTypeAtLocation(node);
                    recordTypeParameterUsages(type);
                }
                if (isDeclaration(node) && node.symbol) {
                    visibleDeclarationsInExtractedRange.push(node);
                }
                if (isAssignmentExpression(node)) {
                    collectUsages(node.left, 2 /* Write */);
                    collectUsages(node.right);
                }
                else if (isUnaryExpressionWithWrite(node)) {
                    collectUsages(node.operand, 2 /* Write */);
                }
                else if (isPropertyAccessExpression(node) || isElementAccessExpression(node)) {
                    forEachChild(node, collectUsages);
                }
                else if (isIdentifier(node)) {
                    if (!node.parent) {
                        return;
                    }
                    if (isQualifiedName(node.parent) && node !== node.parent.left) {
                        return;
                    }
                    if (isPropertyAccessExpression(node.parent) && node !== node.parent.expression) {
                        return;
                    }
                    recordUsage(node, valueUsage, 
                    /*isTypeNode*/
                    isPartOfTypeNode(node));
                }
                else {
                    forEachChild(node, collectUsages);
                }
            }
            function recordUsage(n, usage, isTypeNode2) {
                const symbolId = recordUsagebySymbol(n, usage, isTypeNode2);
                if (symbolId) {
                    for (let i = 0; i < scopes.length; i++) {
                        const substitution = substitutionsPerScope[i].get(symbolId);
                        if (substitution) {
                            usagesPerScope[i].substitutions.set(getNodeId(n).toString(), substitution);
                        }
                    }
                }
            }
            function recordUsagebySymbol(identifier, usage, isTypeName) {
                const symbol = getSymbolReferencedByIdentifier(identifier);
                if (!symbol) {
                    return void 0;
                }
                const symbolId = getSymbolId(symbol).toString();
                const lastUsage = seenUsages.get(symbolId);
                if (lastUsage && lastUsage >= usage) {
                    return symbolId;
                }
                seenUsages.set(symbolId, usage);
                if (lastUsage) {
                    for (const perScope of usagesPerScope) {
                        const prevEntry = perScope.usages.get(identifier.text);
                        if (prevEntry) {
                            perScope.usages.set(identifier.text, { usage, symbol, node: identifier });
                        }
                    }
                    return symbolId;
                }
                const decls = symbol.getDeclarations();
                const declInFile = decls && find(decls, (d) => d.getSourceFile() === sourceFile);
                if (!declInFile) {
                    return void 0;
                }
                if (rangeContainsStartEnd(enclosingTextRange, declInFile.getStart(), declInFile.end)) {
                    return void 0;
                }
                if (targetRange.facts & 2 /* IsGenerator */ && usage === 2 /* Write */) {
                    const diag2 = createDiagnosticForNode(identifier, Messages.cannotExtractRangeThatContainsWritesToReferencesLocatedOutsideOfTheTargetRangeInGenerators);
                    for (const errors of functionErrorsPerScope) {
                        errors.push(diag2);
                    }
                    for (const errors of constantErrorsPerScope) {
                        errors.push(diag2);
                    }
                }
                for (let i = 0; i < scopes.length; i++) {
                    const scope = scopes[i];
                    const resolvedSymbol = checker.resolveName(symbol.name, scope, symbol.flags, 
                    /*excludeGlobals*/
                    false);
                    if (resolvedSymbol === symbol) {
                        continue;
                    }
                    if (!substitutionsPerScope[i].has(symbolId)) {
                        const substitution = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.exportSymbol || symbol, scope, isTypeName);
                        if (substitution) {
                            substitutionsPerScope[i].set(symbolId, substitution);
                        }
                        else if (isTypeName) {
                            if (!(symbol.flags & 262144 /* TypeParameter */)) {
                                const diag2 = createDiagnosticForNode(identifier, Messages.typeWillNotBeVisibleInTheNewScope);
                                functionErrorsPerScope[i].push(diag2);
                                constantErrorsPerScope[i].push(diag2);
                            }
                        }
                        else {
                            usagesPerScope[i].usages.set(identifier.text, { usage, symbol, node: identifier });
                        }
                    }
                }
                return symbolId;
            }
            function checkForUsedDeclarations(node) {
                if (node === targetRange.range || isReadonlyArray(targetRange.range) && targetRange.range.indexOf(node) >= 0) {
                    return;
                }
                const sym = isIdentifier(node) ? getSymbolReferencedByIdentifier(node) : checker.getSymbolAtLocation(node);
                if (sym) {
                    const decl = find(visibleDeclarationsInExtractedRange, (d) => d.symbol === sym);
                    if (decl) {
                        if (isVariableDeclaration(decl)) {
                            const idString = decl.symbol.id.toString();
                            if (!exposedVariableSymbolSet.has(idString)) {
                                exposedVariableDeclarations.push(decl);
                                exposedVariableSymbolSet.set(idString, true);
                            }
                        }
                        else {
                            firstExposedNonVariableDeclaration = firstExposedNonVariableDeclaration || decl;
                        }
                    }
                }
                forEachChild(node, checkForUsedDeclarations);
            }
            function getSymbolReferencedByIdentifier(identifier) {
                return identifier.parent && isShorthandPropertyAssignment(identifier.parent) && identifier.parent.name === identifier ? checker.getShorthandAssignmentValueSymbol(identifier.parent) : checker.getSymbolAtLocation(identifier);
            }
            function tryReplaceWithQualifiedNameOrPropertyAccess(symbol, scopeDecl, isTypeNode2) {
                if (!symbol) {
                    return void 0;
                }
                const decls = symbol.getDeclarations();
                if (decls && decls.some((d) => d.parent === scopeDecl)) {
                    return factory.createIdentifier(symbol.name);
                }
                const prefix = tryReplaceWithQualifiedNameOrPropertyAccess(symbol.parent, scopeDecl, isTypeNode2);
                if (prefix === void 0) {
                    return void 0;
                }
                return isTypeNode2 ? factory.createQualifiedName(prefix, factory.createIdentifier(symbol.name)) : factory.createPropertyAccessExpression(prefix, symbol.name);
            }
        }