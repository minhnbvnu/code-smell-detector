function symbolTableToDeclarationStatements(symbolTable, context, bundled) {
                    const serializePropertySymbolForClass = makeSerializePropertySymbol(factory.createPropertyDeclaration, 171 /* MethodDeclaration */, 
                    /*useAcessors*/
                    true);
                    const serializePropertySymbolForInterfaceWorker = makeSerializePropertySymbol((mods, name, question, type) => factory.createPropertySignature(mods, name, question, type), 170 /* MethodSignature */, 
                    /*useAcessors*/
                    false);
                    const enclosingDeclaration = context.enclosingDeclaration;
                    let results = [];
                    const visitedSymbols = /* @__PURE__ */ new Set();
                    const deferredPrivatesStack = [];
                    const oldcontext = context;
                    context = {
                        ...oldcontext,
                        usedSymbolNames: new Set(oldcontext.usedSymbolNames),
                        remappedSymbolNames: /* @__PURE__ */ new Map(),
                        tracker: void 0
                    };
                    const tracker = {
                        ...oldcontext.tracker.inner,
                        trackSymbol: (sym, decl, meaning) => {
                            var _a2;
                            const accessibleResult = isSymbolAccessible(sym, decl, meaning, 
                            /*computeAliases*/
                            false);
                            if (accessibleResult.accessibility === 0 /* Accessible */) {
                                const chain = lookupSymbolChainWorker(sym, context, meaning);
                                if (!(sym.flags & 4 /* Property */)) {
                                    includePrivateSymbol(chain[0]);
                                }
                            }
                            else if ((_a2 = oldcontext.tracker.inner) == null ? void 0 : _a2.trackSymbol) {
                                return oldcontext.tracker.inner.trackSymbol(sym, decl, meaning);
                            }
                            return false;
                        }
                    };
                    context.tracker = new SymbolTrackerImpl(context, tracker, oldcontext.tracker.moduleResolverHost);
                    forEachEntry(symbolTable, (symbol, name) => {
                        const baseName = unescapeLeadingUnderscores(name);
                        void getInternalSymbolName(symbol, baseName);
                    });
                    let addingDeclare = !bundled;
                    const exportEquals = symbolTable.get("export=" /* ExportEquals */);
                    if (exportEquals && symbolTable.size > 1 && exportEquals.flags & 2097152 /* Alias */) {
                        symbolTable = createSymbolTable();
                        symbolTable.set("export=" /* ExportEquals */, exportEquals);
                    }
                    visitSymbolTable(symbolTable);
                    return mergeRedundantStatements(results);
                    function isIdentifierAndNotUndefined(node) {
                        return !!node && node.kind === 79 /* Identifier */;
                    }
                    function getNamesOfDeclaration(statement) {
                        if (isVariableStatement(statement)) {
                            return filter(map(statement.declarationList.declarations, getNameOfDeclaration), isIdentifierAndNotUndefined);
                        }
                        return filter([getNameOfDeclaration(statement)], isIdentifierAndNotUndefined);
                    }
                    function flattenExportAssignedNamespace(statements) {
                        const exportAssignment = find(statements, isExportAssignment);
                        const nsIndex = findIndex(statements, isModuleDeclaration);
                        let ns = nsIndex !== -1 ? statements[nsIndex] : void 0;
                        if (ns && exportAssignment && exportAssignment.isExportEquals && isIdentifier(exportAssignment.expression) && isIdentifier(ns.name) && idText(ns.name) === idText(exportAssignment.expression) && ns.body && isModuleBlock(ns.body)) {
                            const excessExports = filter(statements, (s) => !!(getEffectiveModifierFlags(s) & 1 /* Export */));
                            const name = ns.name;
                            let body = ns.body;
                            if (length(excessExports)) {
                                ns = factory.updateModuleDeclaration(ns, ns.modifiers, ns.name, body = factory.updateModuleBlock(body, factory.createNodeArray([...ns.body.statements, factory.createExportDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createNamedExports(map(flatMap(excessExports, (e) => getNamesOfDeclaration(e)), (id) => factory.createExportSpecifier(
                                    /*isTypeOnly*/
                                    false, 
                                    /*alias*/
                                    void 0, id))), 
                                    /*moduleSpecifier*/
                                    void 0)])));
                                statements = [...statements.slice(0, nsIndex), ns, ...statements.slice(nsIndex + 1)];
                            }
                            if (!find(statements, (s) => s !== ns && nodeHasName(s, name))) {
                                results = [];
                                const mixinExportFlag = !some(body.statements, (s) => hasSyntacticModifier(s, 1 /* Export */) || isExportAssignment(s) || isExportDeclaration(s));
                                forEach(body.statements, (s) => {
                                    addResult(s, mixinExportFlag ? 1 /* Export */ : 0 /* None */);
                                });
                                statements = [...filter(statements, (s) => s !== ns && s !== exportAssignment), ...results];
                            }
                        }
                        return statements;
                    }
                    function mergeExportDeclarations(statements) {
                        const exports = filter(statements, (d) => isExportDeclaration(d) && !d.moduleSpecifier && !!d.exportClause && isNamedExports(d.exportClause));
                        if (length(exports) > 1) {
                            const nonExports = filter(statements, (d) => !isExportDeclaration(d) || !!d.moduleSpecifier || !d.exportClause);
                            statements = [...nonExports, factory.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createNamedExports(flatMap(exports, (e) => cast(e.exportClause, isNamedExports).elements)), 
                                /*moduleSpecifier*/
                                void 0)];
                        }
                        const reexports = filter(statements, (d) => isExportDeclaration(d) && !!d.moduleSpecifier && !!d.exportClause && isNamedExports(d.exportClause));
                        if (length(reexports) > 1) {
                            const groups = group(reexports, (decl) => isStringLiteral(decl.moduleSpecifier) ? ">" + decl.moduleSpecifier.text : ">");
                            if (groups.length !== reexports.length) {
                                for (const group2 of groups) {
                                    if (group2.length > 1) {
                                        statements = [
                                            ...filter(statements, (s) => group2.indexOf(s) === -1),
                                            factory.createExportDeclaration(
                                            /*modifiers*/
                                            void 0, 
                                            /*isTypeOnly*/
                                            false, factory.createNamedExports(flatMap(group2, (e) => cast(e.exportClause, isNamedExports).elements)), group2[0].moduleSpecifier)
                                        ];
                                    }
                                }
                            }
                        }
                        return statements;
                    }
                    function inlineExportModifiers(statements) {
                        const index = findIndex(statements, (d) => isExportDeclaration(d) && !d.moduleSpecifier && !d.assertClause && !!d.exportClause && isNamedExports(d.exportClause));
                        if (index >= 0) {
                            const exportDecl = statements[index];
                            const replacements = mapDefined(exportDecl.exportClause.elements, (e) => {
                                if (!e.propertyName) {
                                    const indices = indicesOf(statements);
                                    const associatedIndices = filter(indices, (i) => nodeHasName(statements[i], e.name));
                                    if (length(associatedIndices) && every(associatedIndices, (i) => canHaveExportModifier(statements[i]))) {
                                        for (const index2 of associatedIndices) {
                                            statements[index2] = addExportModifier(statements[index2]);
                                        }
                                        return void 0;
                                    }
                                }
                                return e;
                            });
                            if (!length(replacements)) {
                                orderedRemoveItemAt(statements, index);
                            }
                            else {
                                statements[index] = factory.updateExportDeclaration(exportDecl, exportDecl.modifiers, exportDecl.isTypeOnly, factory.updateNamedExports(exportDecl.exportClause, replacements), exportDecl.moduleSpecifier, exportDecl.assertClause);
                            }
                        }
                        return statements;
                    }
                    function mergeRedundantStatements(statements) {
                        statements = flattenExportAssignedNamespace(statements);
                        statements = mergeExportDeclarations(statements);
                        statements = inlineExportModifiers(statements);
                        if (enclosingDeclaration && (isSourceFile(enclosingDeclaration) && isExternalOrCommonJsModule(enclosingDeclaration) || isModuleDeclaration(enclosingDeclaration)) && (!some(statements, isExternalModuleIndicator) || !hasScopeMarker(statements) && some(statements, needsScopeMarker))) {
                            statements.push(createEmptyExports(factory));
                        }
                        return statements;
                    }
                    function addExportModifier(node) {
                        const flags = (getEffectiveModifierFlags(node) | 1 /* Export */) & ~2 /* Ambient */;
                        return factory.updateModifiers(node, flags);
                    }
                    function removeExportModifier(node) {
                        const flags = getEffectiveModifierFlags(node) & ~1 /* Export */;
                        return factory.updateModifiers(node, flags);
                    }
                    function visitSymbolTable(symbolTable2, suppressNewPrivateContext, propertyAsAlias) {
                        if (!suppressNewPrivateContext) {
                            deferredPrivatesStack.push(/* @__PURE__ */ new Map());
                        }
                        symbolTable2.forEach((symbol) => {
                            serializeSymbol(symbol, 
                            /*isPrivate*/
                            false, !!propertyAsAlias);
                        });
                        if (!suppressNewPrivateContext) {
                            deferredPrivatesStack[deferredPrivatesStack.length - 1].forEach((symbol) => {
                                serializeSymbol(symbol, 
                                /*isPrivate*/
                                true, !!propertyAsAlias);
                            });
                            deferredPrivatesStack.pop();
                        }
                    }
                    function serializeSymbol(symbol, isPrivate, propertyAsAlias) {
                        const visitedSym = getMergedSymbol(symbol);
                        if (visitedSymbols.has(getSymbolId(visitedSym))) {
                            return;
                        }
                        visitedSymbols.add(getSymbolId(visitedSym));
                        const skipMembershipCheck = !isPrivate;
                        if (skipMembershipCheck || !!length(symbol.declarations) && some(symbol.declarations, (d) => !!findAncestor(d, (n) => n === enclosingDeclaration))) {
                            const oldContext = context;
                            context = cloneNodeBuilderContext(context);
                            serializeSymbolWorker(symbol, isPrivate, propertyAsAlias);
                            if (context.reportedDiagnostic) {
                                oldcontext.reportedDiagnostic = context.reportedDiagnostic;
                            }
                            context = oldContext;
                        }
                    }
                    function serializeSymbolWorker(symbol, isPrivate, propertyAsAlias) {
                        var _a2, _b, _c, _d;
                        const symbolName2 = unescapeLeadingUnderscores(symbol.escapedName);
                        const isDefault = symbol.escapedName === "default" /* Default */;
                        if (isPrivate && !(context.flags & 131072 /* AllowAnonymousIdentifier */) && isStringANonContextualKeyword(symbolName2) && !isDefault) {
                            context.encounteredError = true;
                            return;
                        }
                        let needsPostExportDefault = isDefault && !!(symbol.flags & -113 /* ExportDoesNotSupportDefaultModifier */ || symbol.flags & 16 /* Function */ && length(getPropertiesOfType(getTypeOfSymbol(symbol)))) && !(symbol.flags & 2097152 /* Alias */);
                        let needsExportDeclaration = !needsPostExportDefault && !isPrivate && isStringANonContextualKeyword(symbolName2) && !isDefault;
                        if (needsPostExportDefault || needsExportDeclaration) {
                            isPrivate = true;
                        }
                        const modifierFlags = (!isPrivate ? 1 /* Export */ : 0) | (isDefault && !needsPostExportDefault ? 1024 /* Default */ : 0);
                        const isConstMergedWithNS = symbol.flags & 1536 /* Module */ && symbol.flags & (2 /* BlockScopedVariable */ | 1 /* FunctionScopedVariable */ | 4 /* Property */) && symbol.escapedName !== "export=" /* ExportEquals */;
                        const isConstMergedWithNSPrintableAsSignatureMerge = isConstMergedWithNS && isTypeRepresentableAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol);
                        if (symbol.flags & (16 /* Function */ | 8192 /* Method */) || isConstMergedWithNSPrintableAsSignatureMerge) {
                            serializeAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                        }
                        if (symbol.flags & 524288 /* TypeAlias */) {
                            serializeTypeAlias(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & (2 /* BlockScopedVariable */ | 1 /* FunctionScopedVariable */ | 4 /* Property */) && symbol.escapedName !== "export=" /* ExportEquals */ && !(symbol.flags & 4194304 /* Prototype */) && !(symbol.flags & 32 /* Class */) && !(symbol.flags & 8192 /* Method */) && !isConstMergedWithNSPrintableAsSignatureMerge) {
                            if (propertyAsAlias) {
                                const createdExport = serializeMaybeAliasAssignment(symbol);
                                if (createdExport) {
                                    needsExportDeclaration = false;
                                    needsPostExportDefault = false;
                                }
                            }
                            else {
                                const type = getTypeOfSymbol(symbol);
                                const localName = getInternalSymbolName(symbol, symbolName2);
                                if (!(symbol.flags & 16 /* Function */) && isTypeRepresentableAsFunctionNamespaceMerge(type, symbol)) {
                                    serializeAsFunctionNamespaceMerge(type, symbol, localName, modifierFlags);
                                }
                                else {
                                    const flags = !(symbol.flags & 2 /* BlockScopedVariable */) ? ((_a2 = symbol.parent) == null ? void 0 : _a2.valueDeclaration) && isSourceFile((_b = symbol.parent) == null ? void 0 : _b.valueDeclaration) ? 2 /* Const */ : void 0 : isConstVariable(symbol) ? 2 /* Const */ : 1 /* Let */;
                                    const name = needsPostExportDefault || !(symbol.flags & 4 /* Property */) ? localName : getUnusedName(localName, symbol);
                                    let textRange = symbol.declarations && find(symbol.declarations, (d) => isVariableDeclaration(d));
                                    if (textRange && isVariableDeclarationList(textRange.parent) && textRange.parent.declarations.length === 1) {
                                        textRange = textRange.parent.parent;
                                    }
                                    const propertyAccessRequire = (_c = symbol.declarations) == null ? void 0 : _c.find(isPropertyAccessExpression);
                                    if (propertyAccessRequire && isBinaryExpression(propertyAccessRequire.parent) && isIdentifier(propertyAccessRequire.parent.right) && ((_d = type.symbol) == null ? void 0 : _d.valueDeclaration) && isSourceFile(type.symbol.valueDeclaration)) {
                                        const alias = localName === propertyAccessRequire.parent.right.escapedText ? void 0 : propertyAccessRequire.parent.right;
                                        addResult(factory.createExportDeclaration(
                                        /*modifiers*/
                                        void 0, 
                                        /*isTypeOnly*/
                                        false, factory.createNamedExports([factory.createExportSpecifier(
                                            /*isTypeOnly*/
                                            false, alias, localName)])), 0 /* None */);
                                        context.tracker.trackSymbol(type.symbol, context.enclosingDeclaration, 111551 /* Value */);
                                    }
                                    else {
                                        const statement = setTextRange(factory.createVariableStatement(
                                        /*modifiers*/
                                        void 0, factory.createVariableDeclarationList([
                                            factory.createVariableDeclaration(name, 
                                            /*exclamationToken*/
                                            void 0, serializeTypeForDeclaration(context, type, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                        ], flags)), textRange);
                                        addResult(statement, name !== localName ? modifierFlags & ~1 /* Export */ : modifierFlags);
                                        if (name !== localName && !isPrivate) {
                                            addResult(factory.createExportDeclaration(
                                            /*modifiers*/
                                            void 0, 
                                            /*isTypeOnly*/
                                            false, factory.createNamedExports([factory.createExportSpecifier(
                                                /*isTypeOnly*/
                                                false, name, localName)])), 0 /* None */);
                                            needsExportDeclaration = false;
                                            needsPostExportDefault = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (symbol.flags & 384 /* Enum */) {
                            serializeEnum(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 32 /* Class */) {
                            if (symbol.flags & 4 /* Property */ && symbol.valueDeclaration && isBinaryExpression(symbol.valueDeclaration.parent) && isClassExpression(symbol.valueDeclaration.parent.right)) {
                                serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                            }
                            else {
                                serializeAsClass(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                            }
                        }
                        if (symbol.flags & (512 /* ValueModule */ | 1024 /* NamespaceModule */) && (!isConstMergedWithNS || isTypeOnlyNamespace(symbol)) || isConstMergedWithNSPrintableAsSignatureMerge) {
                            serializeModule(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 64 /* Interface */ && !(symbol.flags & 32 /* Class */)) {
                            serializeInterface(symbol, symbolName2, modifierFlags);
                        }
                        if (symbol.flags & 2097152 /* Alias */) {
                            serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName2), modifierFlags);
                        }
                        if (symbol.flags & 4 /* Property */ && symbol.escapedName === "export=" /* ExportEquals */) {
                            serializeMaybeAliasAssignment(symbol);
                        }
                        if (symbol.flags & 8388608 /* ExportStar */) {
                            if (symbol.declarations) {
                                for (const node of symbol.declarations) {
                                    const resolvedModule = resolveExternalModuleName(node, node.moduleSpecifier);
                                    if (!resolvedModule)
                                        continue;
                                    addResult(factory.createExportDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    node.isTypeOnly, 
                                    /*exportClause*/
                                    void 0, factory.createStringLiteral(getSpecifierForModuleSymbol(resolvedModule, context))), 0 /* None */);
                                }
                            }
                        }
                        if (needsPostExportDefault) {
                            addResult(factory.createExportAssignment(
                            /*modifiers*/
                            void 0, 
                            /*isExportAssignment*/
                            false, factory.createIdentifier(getInternalSymbolName(symbol, symbolName2))), 0 /* None */);
                        }
                        else if (needsExportDeclaration) {
                            addResult(factory.createExportDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*isTypeOnly*/
                            false, factory.createNamedExports([factory.createExportSpecifier(
                                /*isTypeOnly*/
                                false, getInternalSymbolName(symbol, symbolName2), symbolName2)])), 0 /* None */);
                        }
                    }
                    function includePrivateSymbol(symbol) {
                        if (some(symbol.declarations, isParameterDeclaration))
                            return;
                        Debug.assertIsDefined(deferredPrivatesStack[deferredPrivatesStack.length - 1]);
                        getUnusedName(unescapeLeadingUnderscores(symbol.escapedName), symbol);
                        const isExternalImportAlias = !!(symbol.flags & 2097152 /* Alias */) && !some(symbol.declarations, (d) => !!findAncestor(d, isExportDeclaration) || isNamespaceExport(d) || isImportEqualsDeclaration(d) && !isExternalModuleReference(d.moduleReference));
                        deferredPrivatesStack[isExternalImportAlias ? 0 : deferredPrivatesStack.length - 1].set(getSymbolId(symbol), symbol);
                    }
                    function isExportingScope(enclosingDeclaration2) {
                        return isSourceFile(enclosingDeclaration2) && (isExternalOrCommonJsModule(enclosingDeclaration2) || isJsonSourceFile(enclosingDeclaration2)) || isAmbientModule(enclosingDeclaration2) && !isGlobalScopeAugmentation(enclosingDeclaration2);
                    }
                    function addResult(node, additionalModifierFlags) {
                        if (canHaveModifiers(node)) {
                            let newModifierFlags = 0 /* None */;
                            const enclosingDeclaration2 = context.enclosingDeclaration && (isJSDocTypeAlias(context.enclosingDeclaration) ? getSourceFileOfNode(context.enclosingDeclaration) : context.enclosingDeclaration);
                            if (additionalModifierFlags & 1 /* Export */ && enclosingDeclaration2 && (isExportingScope(enclosingDeclaration2) || isModuleDeclaration(enclosingDeclaration2)) && canHaveExportModifier(node)) {
                                newModifierFlags |= 1 /* Export */;
                            }
                            if (addingDeclare && !(newModifierFlags & 1 /* Export */) && (!enclosingDeclaration2 || !(enclosingDeclaration2.flags & 16777216 /* Ambient */)) && (isEnumDeclaration(node) || isVariableStatement(node) || isFunctionDeclaration(node) || isClassDeclaration(node) || isModuleDeclaration(node))) {
                                newModifierFlags |= 2 /* Ambient */;
                            }
                            if (additionalModifierFlags & 1024 /* Default */ && (isClassDeclaration(node) || isInterfaceDeclaration(node) || isFunctionDeclaration(node))) {
                                newModifierFlags |= 1024 /* Default */;
                            }
                            if (newModifierFlags) {
                                node = factory.updateModifiers(node, newModifierFlags | getEffectiveModifierFlags(node));
                            }
                        }
                        results.push(node);
                    }
                    function serializeTypeAlias(symbol, symbolName2, modifierFlags) {
                        var _a2;
                        const aliasType = getDeclaredTypeOfTypeAlias(symbol);
                        const typeParams = getSymbolLinks(symbol).typeParameters;
                        const typeParamDecls = map(typeParams, (p) => typeParameterToDeclaration(p, context));
                        const jsdocAliasDecl = (_a2 = symbol.declarations) == null ? void 0 : _a2.find(isJSDocTypeAlias);
                        const commentText = getTextOfJSDocComment(jsdocAliasDecl ? jsdocAliasDecl.comment || jsdocAliasDecl.parent.comment : void 0);
                        const oldFlags = context.flags;
                        context.flags |= 8388608 /* InTypeAlias */;
                        const oldEnclosingDecl = context.enclosingDeclaration;
                        context.enclosingDeclaration = jsdocAliasDecl;
                        const typeNode = jsdocAliasDecl && jsdocAliasDecl.typeExpression && isJSDocTypeExpression(jsdocAliasDecl.typeExpression) && serializeExistingTypeNode(context, jsdocAliasDecl.typeExpression.type, includePrivateSymbol, bundled) || typeToTypeNodeHelper(aliasType, context);
                        addResult(setSyntheticLeadingComments(factory.createTypeAliasDeclaration(
                        /*modifiers*/
                        void 0, getInternalSymbolName(symbol, symbolName2), typeParamDecls, typeNode), !commentText ? [] : [{ kind: 3 /* MultiLineCommentTrivia */, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]), modifierFlags);
                        context.flags = oldFlags;
                        context.enclosingDeclaration = oldEnclosingDecl;
                    }
                    function serializeInterface(symbol, symbolName2, modifierFlags) {
                        const interfaceType = getDeclaredTypeOfClassOrInterface(symbol);
                        const localParams = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                        const typeParamDecls = map(localParams, (p) => typeParameterToDeclaration(p, context));
                        const baseTypes = getBaseTypes(interfaceType);
                        const baseType = length(baseTypes) ? getIntersectionType(baseTypes) : void 0;
                        const members = flatMap(getPropertiesOfType(interfaceType), (p) => serializePropertySymbolForInterface(p, baseType));
                        const callSignatures = serializeSignatures(0 /* Call */, interfaceType, baseType, 176 /* CallSignature */);
                        const constructSignatures = serializeSignatures(1 /* Construct */, interfaceType, baseType, 177 /* ConstructSignature */);
                        const indexSignatures = serializeIndexSignatures(interfaceType, baseType);
                        const heritageClauses = !length(baseTypes) ? void 0 : [factory.createHeritageClause(94 /* ExtendsKeyword */, mapDefined(baseTypes, (b) => trySerializeAsTypeReference(b, 111551 /* Value */)))];
                        addResult(factory.createInterfaceDeclaration(
                        /*modifiers*/
                        void 0, getInternalSymbolName(symbol, symbolName2), typeParamDecls, heritageClauses, [...indexSignatures, ...constructSignatures, ...callSignatures, ...members]), modifierFlags);
                    }
                    function getNamespaceMembersForSerialization(symbol) {
                        return !symbol.exports ? [] : filter(arrayFrom(symbol.exports.values()), isNamespaceMember);
                    }
                    function isTypeOnlyNamespace(symbol) {
                        return every(getNamespaceMembersForSerialization(symbol), (m) => !(getAllSymbolFlags(resolveSymbol(m)) & 111551 /* Value */));
                    }
                    function serializeModule(symbol, symbolName2, modifierFlags) {
                        const members = getNamespaceMembersForSerialization(symbol);
                        const locationMap = arrayToMultiMap(members, (m) => m.parent && m.parent === symbol ? "real" : "merged");
                        const realMembers = locationMap.get("real") || emptyArray;
                        const mergedMembers = locationMap.get("merged") || emptyArray;
                        if (length(realMembers)) {
                            const localName = getInternalSymbolName(symbol, symbolName2);
                            serializeAsNamespaceDeclaration(realMembers, localName, modifierFlags, !!(symbol.flags & (16 /* Function */ | 67108864 /* Assignment */)));
                        }
                        if (length(mergedMembers)) {
                            const containingFile = getSourceFileOfNode(context.enclosingDeclaration);
                            const localName = getInternalSymbolName(symbol, symbolName2);
                            const nsBody = factory.createModuleBlock([factory.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createNamedExports(mapDefined(filter(mergedMembers, (n) => n.escapedName !== "export=" /* ExportEquals */), (s) => {
                                    var _a2, _b;
                                    const name = unescapeLeadingUnderscores(s.escapedName);
                                    const localName2 = getInternalSymbolName(s, name);
                                    const aliasDecl = s.declarations && getDeclarationOfAliasSymbol(s);
                                    if (containingFile && (aliasDecl ? containingFile !== getSourceFileOfNode(aliasDecl) : !some(s.declarations, (d) => getSourceFileOfNode(d) === containingFile))) {
                                        (_b = (_a2 = context.tracker) == null ? void 0 : _a2.reportNonlocalAugmentation) == null ? void 0 : _b.call(_a2, containingFile, symbol, s);
                                        return void 0;
                                    }
                                    const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, 
                                    /*dontRecursivelyResolve*/
                                    true);
                                    includePrivateSymbol(target || s);
                                    const targetName = target ? getInternalSymbolName(target, unescapeLeadingUnderscores(target.escapedName)) : localName2;
                                    return factory.createExportSpecifier(
                                    /*isTypeOnly*/
                                    false, name === targetName ? void 0 : targetName, name);
                                })))]);
                            addResult(factory.createModuleDeclaration(
                            /*modifiers*/
                            void 0, factory.createIdentifier(localName), nsBody, 16 /* Namespace */), 0 /* None */);
                        }
                    }
                    function serializeEnum(symbol, symbolName2, modifierFlags) {
                        addResult(factory.createEnumDeclaration(factory.createModifiersFromModifierFlags(isConstEnumSymbol(symbol) ? 2048 /* Const */ : 0), getInternalSymbolName(symbol, symbolName2), map(filter(getPropertiesOfType(getTypeOfSymbol(symbol)), (p) => !!(p.flags & 8 /* EnumMember */)), (p) => {
                            const initializedValue = p.declarations && p.declarations[0] && isEnumMember(p.declarations[0]) ? getConstantValue2(p.declarations[0]) : void 0;
                            return factory.createEnumMember(unescapeLeadingUnderscores(p.escapedName), initializedValue === void 0 ? void 0 : typeof initializedValue === "string" ? factory.createStringLiteral(initializedValue) : factory.createNumericLiteral(initializedValue));
                        })), modifierFlags);
                    }
                    function serializeAsFunctionNamespaceMerge(type, symbol, localName, modifierFlags) {
                        const signatures = getSignaturesOfType(type, 0 /* Call */);
                        for (const sig of signatures) {
                            const decl = signatureToSignatureDeclarationHelper(sig, 259 /* FunctionDeclaration */, context, { name: factory.createIdentifier(localName), privateSymbolVisitor: includePrivateSymbol, bundledImports: bundled });
                            addResult(setTextRange(decl, getSignatureTextRangeLocation(sig)), modifierFlags);
                        }
                        if (!(symbol.flags & (512 /* ValueModule */ | 1024 /* NamespaceModule */) && !!symbol.exports && !!symbol.exports.size)) {
                            const props = filter(getPropertiesOfType(type), isNamespaceMember);
                            serializeAsNamespaceDeclaration(props, localName, modifierFlags, 
                            /*suppressNewPrivateContext*/
                            true);
                        }
                    }
                    function getSignatureTextRangeLocation(signature) {
                        if (signature.declaration && signature.declaration.parent) {
                            if (isBinaryExpression(signature.declaration.parent) && getAssignmentDeclarationKind(signature.declaration.parent) === 5 /* Property */) {
                                return signature.declaration.parent;
                            }
                            if (isVariableDeclaration(signature.declaration.parent) && signature.declaration.parent.parent) {
                                return signature.declaration.parent.parent;
                            }
                        }
                        return signature.declaration;
                    }
                    function serializeAsNamespaceDeclaration(props, localName, modifierFlags, suppressNewPrivateContext) {
                        if (length(props)) {
                            const localVsRemoteMap = arrayToMultiMap(props, (p) => !length(p.declarations) || some(p.declarations, (d) => getSourceFileOfNode(d) === getSourceFileOfNode(context.enclosingDeclaration)) ? "local" : "remote");
                            const localProps = localVsRemoteMap.get("local") || emptyArray;
                            let fakespace = parseNodeFactory.createModuleDeclaration(
                            /*modifiers*/
                            void 0, factory.createIdentifier(localName), factory.createModuleBlock([]), 16 /* Namespace */);
                            setParent(fakespace, enclosingDeclaration);
                            fakespace.locals = createSymbolTable(props);
                            fakespace.symbol = props[0].parent;
                            const oldResults = results;
                            results = [];
                            const oldAddingDeclare = addingDeclare;
                            addingDeclare = false;
                            const subcontext = { ...context, enclosingDeclaration: fakespace };
                            const oldContext = context;
                            context = subcontext;
                            visitSymbolTable(createSymbolTable(localProps), suppressNewPrivateContext, 
                            /*propertyAsAlias*/
                            true);
                            context = oldContext;
                            addingDeclare = oldAddingDeclare;
                            const declarations = results;
                            results = oldResults;
                            const defaultReplaced = map(declarations, (d) => isExportAssignment(d) && !d.isExportEquals && isIdentifier(d.expression) ? factory.createExportDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*isTypeOnly*/
                            false, factory.createNamedExports([factory.createExportSpecifier(
                                /*isTypeOnly*/
                                false, d.expression, factory.createIdentifier("default" /* Default */))])) : d);
                            const exportModifierStripped = every(defaultReplaced, (d) => hasSyntacticModifier(d, 1 /* Export */)) ? map(defaultReplaced, removeExportModifier) : defaultReplaced;
                            fakespace = factory.updateModuleDeclaration(fakespace, fakespace.modifiers, fakespace.name, factory.createModuleBlock(exportModifierStripped));
                            addResult(fakespace, modifierFlags);
                        }
                    }
                    function isNamespaceMember(p) {
                        return !!(p.flags & (788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */)) || !(p.flags & 4194304 /* Prototype */ || p.escapedName === "prototype" || p.valueDeclaration && isStatic(p.valueDeclaration) && isClassLike(p.valueDeclaration.parent));
                    }
                    function sanitizeJSDocImplements(clauses) {
                        const result = mapDefined(clauses, (e) => {
                            const oldEnclosing = context.enclosingDeclaration;
                            context.enclosingDeclaration = e;
                            let expr = e.expression;
                            if (isEntityNameExpression(expr)) {
                                if (isIdentifier(expr) && idText(expr) === "") {
                                    return cleanup(
                                    /*result*/
                                    void 0);
                                }
                                let introducesError;
                                ({ introducesError, node: expr } = trackExistingEntityName(expr, context, includePrivateSymbol));
                                if (introducesError) {
                                    return cleanup(
                                    /*result*/
                                    void 0);
                                }
                            }
                            return cleanup(factory.createExpressionWithTypeArguments(expr, map(e.typeArguments, (a) => serializeExistingTypeNode(context, a, includePrivateSymbol, bundled) || typeToTypeNodeHelper(getTypeFromTypeNode(a), context))));
                            function cleanup(result2) {
                                context.enclosingDeclaration = oldEnclosing;
                                return result2;
                            }
                        });
                        if (result.length === clauses.length) {
                            return result;
                        }
                        return void 0;
                    }
                    function serializeAsClass(symbol, localName, modifierFlags) {
                        var _a2, _b;
                        const originalDecl = (_a2 = symbol.declarations) == null ? void 0 : _a2.find(isClassLike);
                        const oldEnclosing = context.enclosingDeclaration;
                        context.enclosingDeclaration = originalDecl || oldEnclosing;
                        const localParams = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                        const typeParamDecls = map(localParams, (p) => typeParameterToDeclaration(p, context));
                        const classType = getDeclaredTypeOfClassOrInterface(symbol);
                        const baseTypes = getBaseTypes(classType);
                        const originalImplements = originalDecl && getEffectiveImplementsTypeNodes(originalDecl);
                        const implementsExpressions = originalImplements && sanitizeJSDocImplements(originalImplements) || mapDefined(getImplementsTypes(classType), serializeImplementedType);
                        const staticType = getTypeOfSymbol(symbol);
                        const isClass = !!((_b = staticType.symbol) == null ? void 0 : _b.valueDeclaration) && isClassLike(staticType.symbol.valueDeclaration);
                        const staticBaseType = isClass ? getBaseConstructorTypeOfClass(staticType) : anyType;
                        const heritageClauses = [
                            ...!length(baseTypes) ? [] : [factory.createHeritageClause(94 /* ExtendsKeyword */, map(baseTypes, (b) => serializeBaseType(b, staticBaseType, localName)))],
                            ...!length(implementsExpressions) ? [] : [factory.createHeritageClause(117 /* ImplementsKeyword */, implementsExpressions)]
                        ];
                        const symbolProps = getNonInheritedProperties(classType, baseTypes, getPropertiesOfType(classType));
                        const publicSymbolProps = filter(symbolProps, (s) => {
                            const valueDecl = s.valueDeclaration;
                            return !!valueDecl && !(isNamedDeclaration(valueDecl) && isPrivateIdentifier(valueDecl.name));
                        });
                        const hasPrivateIdentifier = some(symbolProps, (s) => {
                            const valueDecl = s.valueDeclaration;
                            return !!valueDecl && isNamedDeclaration(valueDecl) && isPrivateIdentifier(valueDecl.name);
                        });
                        const privateProperties = hasPrivateIdentifier ? [factory.createPropertyDeclaration(
                            /*modifiers*/
                            void 0, factory.createPrivateIdentifier("#private"), 
                            /*questionOrExclamationToken*/
                            void 0, 
                            /*type*/
                            void 0, 
                            /*initializer*/
                            void 0)] : emptyArray;
                        const publicProperties = flatMap(publicSymbolProps, (p) => serializePropertySymbolForClass(p, 
                        /*isStatic*/
                        false, baseTypes[0]));
                        const staticMembers = flatMap(filter(getPropertiesOfType(staticType), (p) => !(p.flags & 4194304 /* Prototype */) && p.escapedName !== "prototype" && !isNamespaceMember(p)), (p) => serializePropertySymbolForClass(p, 
                        /*isStatic*/
                        true, staticBaseType));
                        const isNonConstructableClassLikeInJsFile = !isClass && !!symbol.valueDeclaration && isInJSFile(symbol.valueDeclaration) && !some(getSignaturesOfType(staticType, 1 /* Construct */));
                        const constructors = isNonConstructableClassLikeInJsFile ? [factory.createConstructorDeclaration(factory.createModifiersFromModifierFlags(8 /* Private */), [], 
                            /*body*/
                            void 0)] : serializeSignatures(1 /* Construct */, staticType, staticBaseType, 173 /* Constructor */);
                        const indexSignatures = serializeIndexSignatures(classType, baseTypes[0]);
                        context.enclosingDeclaration = oldEnclosing;
                        addResult(setTextRange(factory.createClassDeclaration(
                        /*modifiers*/
                        void 0, localName, typeParamDecls, heritageClauses, [...indexSignatures, ...staticMembers, ...constructors, ...publicProperties, ...privateProperties]), symbol.declarations && filter(symbol.declarations, (d) => isClassDeclaration(d) || isClassExpression(d))[0]), modifierFlags);
                    }
                    function getSomeTargetNameFromDeclarations(declarations) {
                        return firstDefined(declarations, (d) => {
                            if (isImportSpecifier(d) || isExportSpecifier(d)) {
                                return idText(d.propertyName || d.name);
                            }
                            if (isBinaryExpression(d) || isExportAssignment(d)) {
                                const expression = isExportAssignment(d) ? d.expression : d.right;
                                if (isPropertyAccessExpression(expression)) {
                                    return idText(expression.name);
                                }
                            }
                            if (isAliasSymbolDeclaration2(d)) {
                                const name = getNameOfDeclaration(d);
                                if (name && isIdentifier(name)) {
                                    return idText(name);
                                }
                            }
                            return void 0;
                        });
                    }
                    function serializeAsAlias(symbol, localName, modifierFlags) {
                        var _a2, _b, _c, _d, _e;
                        const node = getDeclarationOfAliasSymbol(symbol);
                        if (!node)
                            return Debug.fail();
                        const target = getMergedSymbol(getTargetOfAliasDeclaration(node, 
                        /*dontRecursivelyResolve*/
                        true));
                        if (!target) {
                            return;
                        }
                        let verbatimTargetName = isShorthandAmbientModuleSymbol(target) && getSomeTargetNameFromDeclarations(symbol.declarations) || unescapeLeadingUnderscores(target.escapedName);
                        if (verbatimTargetName === "export=" /* ExportEquals */ && allowSyntheticDefaultImports) {
                            verbatimTargetName = "default" /* Default */;
                        }
                        const targetName = getInternalSymbolName(target, verbatimTargetName);
                        includePrivateSymbol(target);
                        switch (node.kind) {
                            case 205 /* BindingElement */:
                                if (((_b = (_a2 = node.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.kind) === 257 /* VariableDeclaration */) {
                                    const specifier2 = getSpecifierForModuleSymbol(target.parent || target, context);
                                    const { propertyName } = node;
                                    addResult(factory.createImportDeclaration(
                                    /*modifiers*/
                                    void 0, factory.createImportClause(
                                    /*isTypeOnly*/
                                    false, 
                                    /*name*/
                                    void 0, factory.createNamedImports([factory.createImportSpecifier(
                                        /*isTypeOnly*/
                                        false, propertyName && isIdentifier(propertyName) ? factory.createIdentifier(idText(propertyName)) : void 0, factory.createIdentifier(localName))])), factory.createStringLiteral(specifier2), 
                                    /*importClause*/
                                    void 0), 0 /* None */);
                                    break;
                                }
                                Debug.failBadSyntaxKind(((_c = node.parent) == null ? void 0 : _c.parent) || node, "Unhandled binding element grandparent kind in declaration serialization");
                                break;
                            case 300 /* ShorthandPropertyAssignment */:
                                if (((_e = (_d = node.parent) == null ? void 0 : _d.parent) == null ? void 0 : _e.kind) === 223 /* BinaryExpression */) {
                                    serializeExportSpecifier(unescapeLeadingUnderscores(symbol.escapedName), targetName);
                                }
                                break;
                            case 257 /* VariableDeclaration */:
                                if (isPropertyAccessExpression(node.initializer)) {
                                    const initializer = node.initializer;
                                    const uniqueName = factory.createUniqueName(localName);
                                    const specifier2 = getSpecifierForModuleSymbol(target.parent || target, context);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, uniqueName, factory.createExternalModuleReference(factory.createStringLiteral(specifier2))), 0 /* None */);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createIdentifier(localName), factory.createQualifiedName(uniqueName, initializer.name)), modifierFlags);
                                    break;
                                }
                            case 268 /* ImportEqualsDeclaration */:
                                if (target.escapedName === "export=" /* ExportEquals */ && some(target.declarations, (d) => isSourceFile(d) && isJsonSourceFile(d))) {
                                    serializeMaybeAliasAssignment(symbol);
                                    break;
                                }
                                const isLocalImport = !(target.flags & 512 /* ValueModule */) && !isVariableDeclaration(node);
                                addResult(factory.createImportEqualsDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createIdentifier(localName), isLocalImport ? symbolToName(target, context, 67108863 /* All */, 
                                /*expectsIdentifier*/
                                false) : factory.createExternalModuleReference(factory.createStringLiteral(getSpecifierForModuleSymbol(target, context)))), isLocalImport ? modifierFlags : 0 /* None */);
                                break;
                            case 267 /* NamespaceExportDeclaration */:
                                addResult(factory.createNamespaceExportDeclaration(idText(node.name)), 0 /* None */);
                                break;
                            case 270 /* ImportClause */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, factory.createIdentifier(localName), 
                                /*namedBindings*/
                                void 0), specifier2, node.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 271 /* NamespaceImport */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, 
                                /*importClause*/
                                void 0, factory.createNamespaceImport(factory.createIdentifier(localName))), specifier2, node.parent.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 277 /* NamespaceExport */:
                                addResult(factory.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createNamespaceExport(factory.createIdentifier(localName)), factory.createStringLiteral(getSpecifierForModuleSymbol(target, context))), 0 /* None */);
                                break;
                            case 273 /* ImportSpecifier */: {
                                const generatedSpecifier = getSpecifierForModuleSymbol(target.parent || target, context);
                                const specifier2 = bundled ? factory.createStringLiteral(generatedSpecifier) : node.parent.parent.parent.moduleSpecifier;
                                addResult(factory.createImportDeclaration(
                                /*modifiers*/
                                void 0, factory.createImportClause(
                                /*isTypeOnly*/
                                false, 
                                /*importClause*/
                                void 0, factory.createNamedImports([
                                    factory.createImportSpecifier(
                                    /*isTypeOnly*/
                                    false, localName !== verbatimTargetName ? factory.createIdentifier(verbatimTargetName) : void 0, factory.createIdentifier(localName))
                                ])), specifier2, node.parent.parent.parent.assertClause), 0 /* None */);
                                break;
                            }
                            case 278 /* ExportSpecifier */:
                                const specifier = node.parent.parent.moduleSpecifier;
                                serializeExportSpecifier(unescapeLeadingUnderscores(symbol.escapedName), specifier ? verbatimTargetName : targetName, specifier && isStringLiteralLike(specifier) ? factory.createStringLiteral(specifier.text) : void 0);
                                break;
                            case 274 /* ExportAssignment */:
                                serializeMaybeAliasAssignment(symbol);
                                break;
                            case 223 /* BinaryExpression */:
                            case 208 /* PropertyAccessExpression */:
                            case 209 /* ElementAccessExpression */:
                                if (symbol.escapedName === "default" /* Default */ || symbol.escapedName === "export=" /* ExportEquals */) {
                                    serializeMaybeAliasAssignment(symbol);
                                }
                                else {
                                    serializeExportSpecifier(localName, targetName);
                                }
                                break;
                            default:
                                return Debug.failBadSyntaxKind(node, "Unhandled alias declaration kind in symbol serializer!");
                        }
                    }
                    function serializeExportSpecifier(localName, targetName, specifier) {
                        addResult(factory.createExportDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*isTypeOnly*/
                        false, factory.createNamedExports([factory.createExportSpecifier(
                            /*isTypeOnly*/
                            false, localName !== targetName ? targetName : void 0, localName)]), specifier), 0 /* None */);
                    }
                    function serializeMaybeAliasAssignment(symbol) {
                        if (symbol.flags & 4194304 /* Prototype */) {
                            return false;
                        }
                        const name = unescapeLeadingUnderscores(symbol.escapedName);
                        const isExportEquals = name === "export=" /* ExportEquals */;
                        const isDefault = name === "default" /* Default */;
                        const isExportAssignmentCompatibleSymbolName = isExportEquals || isDefault;
                        const aliasDecl = symbol.declarations && getDeclarationOfAliasSymbol(symbol);
                        const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, 
                        /*dontRecursivelyResolve*/
                        true);
                        if (target && length(target.declarations) && some(target.declarations, (d) => getSourceFileOfNode(d) === getSourceFileOfNode(enclosingDeclaration))) {
                            const expr = aliasDecl && (isExportAssignment(aliasDecl) || isBinaryExpression(aliasDecl) ? getExportAssignmentExpression(aliasDecl) : getPropertyAssignmentAliasLikeExpression(aliasDecl));
                            const first2 = expr && isEntityNameExpression(expr) ? getFirstNonModuleExportsIdentifier(expr) : void 0;
                            const referenced = first2 && resolveEntityName(first2, 67108863 /* All */, 
                            /*ignoreErrors*/
                            true, 
                            /*dontResolveAlias*/
                            true, enclosingDeclaration);
                            if (referenced || target) {
                                includePrivateSymbol(referenced || target);
                            }
                            const prevDisableTrackSymbol = context.tracker.disableTrackSymbol;
                            context.tracker.disableTrackSymbol = true;
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, symbolToExpression(target, context, 67108863 /* All */)));
                            }
                            else {
                                if (first2 === expr && first2) {
                                    serializeExportSpecifier(name, idText(first2));
                                }
                                else if (expr && isClassExpression(expr)) {
                                    serializeExportSpecifier(name, getInternalSymbolName(target, symbolName(target)));
                                }
                                else {
                                    const varName = getUnusedName(name, symbol);
                                    addResult(factory.createImportEqualsDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createIdentifier(varName), symbolToName(target, context, 67108863 /* All */, 
                                    /*expectsIdentifier*/
                                    false)), 0 /* None */);
                                    serializeExportSpecifier(name, varName);
                                }
                            }
                            context.tracker.disableTrackSymbol = prevDisableTrackSymbol;
                            return true;
                        }
                        else {
                            const varName = getUnusedName(name, symbol);
                            const typeToSerialize = getWidenedType(getTypeOfSymbol(getMergedSymbol(symbol)));
                            if (isTypeRepresentableAsFunctionNamespaceMerge(typeToSerialize, symbol)) {
                                serializeAsFunctionNamespaceMerge(typeToSerialize, symbol, varName, isExportAssignmentCompatibleSymbolName ? 0 /* None */ : 1 /* Export */);
                            }
                            else {
                                const statement = factory.createVariableStatement(
                                /*modifiers*/
                                void 0, factory.createVariableDeclarationList([
                                    factory.createVariableDeclaration(varName, 
                                    /*exclamationToken*/
                                    void 0, serializeTypeForDeclaration(context, typeToSerialize, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                ], 2 /* Const */));
                                addResult(statement, target && target.flags & 4 /* Property */ && target.escapedName === "export=" /* ExportEquals */ ? 2 /* Ambient */ : name === varName ? 1 /* Export */ : 0 /* None */);
                            }
                            if (isExportAssignmentCompatibleSymbolName) {
                                results.push(factory.createExportAssignment(
                                /*modifiers*/
                                void 0, isExportEquals, factory.createIdentifier(varName)));
                                return true;
                            }
                            else if (name !== varName) {
                                serializeExportSpecifier(name, varName);
                                return true;
                            }
                            return false;
                        }
                    }
                    function isTypeRepresentableAsFunctionNamespaceMerge(typeToSerialize, hostSymbol) {
                        const ctxSrc = getSourceFileOfNode(context.enclosingDeclaration);
                        return getObjectFlags(typeToSerialize) & (16 /* Anonymous */ | 32 /* Mapped */) && !length(getIndexInfosOfType(typeToSerialize)) && !isClassInstanceSide(typeToSerialize) && // While a class instance is potentially representable as a NS, prefer printing a reference to the instance type and serializing the class
                            !!(length(filter(getPropertiesOfType(typeToSerialize), isNamespaceMember)) || length(getSignaturesOfType(typeToSerialize, 0 /* Call */))) && !length(getSignaturesOfType(typeToSerialize, 1 /* Construct */)) && // TODO: could probably serialize as function + ns + class, now that that's OK
                            !getDeclarationWithTypeAnnotation(hostSymbol, enclosingDeclaration) && !(typeToSerialize.symbol && some(typeToSerialize.symbol.declarations, (d) => getSourceFileOfNode(d) !== ctxSrc)) && !some(getPropertiesOfType(typeToSerialize), (p) => isLateBoundName(p.escapedName)) && !some(getPropertiesOfType(typeToSerialize), (p) => some(p.declarations, (d) => getSourceFileOfNode(d) !== ctxSrc)) && every(getPropertiesOfType(typeToSerialize), (p) => isIdentifierText(symbolName(p), languageVersion));
                    }
                    function makeSerializePropertySymbol(createProperty2, methodKind, useAccessors) {
                        return function serializePropertySymbol(p, isStatic2, baseType) {
                            var _a2, _b, _c, _d, _e;
                            const modifierFlags = getDeclarationModifierFlagsFromSymbol(p);
                            const isPrivate = !!(modifierFlags & 8 /* Private */);
                            if (isStatic2 && p.flags & (788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */)) {
                                return [];
                            }
                            if (p.flags & 4194304 /* Prototype */ || baseType && getPropertyOfType(baseType, p.escapedName) && isReadonlySymbol(getPropertyOfType(baseType, p.escapedName)) === isReadonlySymbol(p) && (p.flags & 16777216 /* Optional */) === (getPropertyOfType(baseType, p.escapedName).flags & 16777216 /* Optional */) && isTypeIdenticalTo(getTypeOfSymbol(p), getTypeOfPropertyOfType(baseType, p.escapedName))) {
                                return [];
                            }
                            const flag = modifierFlags & ~512 /* Async */ | (isStatic2 ? 32 /* Static */ : 0);
                            const name = getPropertyNameNodeForSymbol(p, context);
                            const firstPropertyLikeDecl = (_a2 = p.declarations) == null ? void 0 : _a2.find(or(isPropertyDeclaration, isAccessor, isVariableDeclaration, isPropertySignature, isBinaryExpression, isPropertyAccessExpression));
                            if (p.flags & 98304 /* Accessor */ && useAccessors) {
                                const result = [];
                                if (p.flags & 65536 /* SetAccessor */) {
                                    result.push(setTextRange(factory.createSetAccessorDeclaration(factory.createModifiersFromModifierFlags(flag), name, [factory.createParameterDeclaration(
                                        /*modifiers*/
                                        void 0, 
                                        /*dotDotDotToken*/
                                        void 0, "arg", 
                                        /*questionToken*/
                                        void 0, isPrivate ? void 0 : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled))], 
                                    /*body*/
                                    void 0), ((_b = p.declarations) == null ? void 0 : _b.find(isSetAccessor)) || firstPropertyLikeDecl));
                                }
                                if (p.flags & 32768 /* GetAccessor */) {
                                    const isPrivate2 = modifierFlags & 8 /* Private */;
                                    result.push(setTextRange(factory.createGetAccessorDeclaration(factory.createModifiersFromModifierFlags(flag), name, [], isPrivate2 ? void 0 : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled), 
                                    /*body*/
                                    void 0), ((_c = p.declarations) == null ? void 0 : _c.find(isGetAccessor)) || firstPropertyLikeDecl));
                                }
                                return result;
                            }
                            else if (p.flags & (4 /* Property */ | 3 /* Variable */ | 98304 /* Accessor */)) {
                                return setTextRange(createProperty2(factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? 64 /* Readonly */ : 0) | flag), name, p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, isPrivate ? void 0 : serializeTypeForDeclaration(context, getWriteTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled), 
                                // TODO: https://github.com/microsoft/TypeScript/pull/32372#discussion_r328386357
                                // interface members can't have initializers, however class members _can_
                                /*initializer*/
                                void 0), ((_d = p.declarations) == null ? void 0 : _d.find(or(isPropertyDeclaration, isVariableDeclaration))) || firstPropertyLikeDecl);
                            }
                            if (p.flags & (8192 /* Method */ | 16 /* Function */)) {
                                const type = getTypeOfSymbol(p);
                                const signatures = getSignaturesOfType(type, 0 /* Call */);
                                if (flag & 8 /* Private */) {
                                    return setTextRange(createProperty2(factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? 64 /* Readonly */ : 0) | flag), name, p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0, 
                                    /*type*/
                                    void 0, 
                                    /*initializer*/
                                    void 0), ((_e = p.declarations) == null ? void 0 : _e.find(isFunctionLikeDeclaration)) || signatures[0] && signatures[0].declaration || p.declarations && p.declarations[0]);
                                }
                                const results2 = [];
                                for (const sig of signatures) {
                                    const decl = signatureToSignatureDeclarationHelper(sig, methodKind, context, {
                                        name,
                                        questionToken: p.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0,
                                        modifiers: flag ? factory.createModifiersFromModifierFlags(flag) : void 0
                                    });
                                    const location = sig.declaration && isPrototypePropertyAssignment(sig.declaration.parent) ? sig.declaration.parent : sig.declaration;
                                    results2.push(setTextRange(decl, location));
                                }
                                return results2;
                            }
                            return Debug.fail(`Unhandled class member kind! ${p.__debugFlags || p.flags}`);
                        };
                    }
                    function serializePropertySymbolForInterface(p, baseType) {
                        return serializePropertySymbolForInterfaceWorker(p, 
                        /*isStatic*/
                        false, baseType);
                    }
                    function serializeSignatures(kind, input, baseType, outputKind) {
                        const signatures = getSignaturesOfType(input, kind);
                        if (kind === 1 /* Construct */) {
                            if (!baseType && every(signatures, (s) => length(s.parameters) === 0)) {
                                return [];
                            }
                            if (baseType) {
                                const baseSigs = getSignaturesOfType(baseType, 1 /* Construct */);
                                if (!length(baseSigs) && every(signatures, (s) => length(s.parameters) === 0)) {
                                    return [];
                                }
                                if (baseSigs.length === signatures.length) {
                                    let failed = false;
                                    for (let i = 0; i < baseSigs.length; i++) {
                                        if (!compareSignaturesIdentical(signatures[i], baseSigs[i], 
                                        /*partialMatch*/
                                        false, 
                                        /*ignoreThisTypes*/
                                        false, 
                                        /*ignoreReturnTypes*/
                                        true, compareTypesIdentical)) {
                                            failed = true;
                                            break;
                                        }
                                    }
                                    if (!failed) {
                                        return [];
                                    }
                                }
                            }
                            let privateProtected = 0;
                            for (const s of signatures) {
                                if (s.declaration) {
                                    privateProtected |= getSelectedEffectiveModifierFlags(s.declaration, 8 /* Private */ | 16 /* Protected */);
                                }
                            }
                            if (privateProtected) {
                                return [setTextRange(factory.createConstructorDeclaration(factory.createModifiersFromModifierFlags(privateProtected), 
                                    /*parameters*/
                                    [], 
                                    /*body*/
                                    void 0), signatures[0].declaration)];
                            }
                        }
                        const results2 = [];
                        for (const sig of signatures) {
                            const decl = signatureToSignatureDeclarationHelper(sig, outputKind, context);
                            results2.push(setTextRange(decl, sig.declaration));
                        }
                        return results2;
                    }
                    function serializeIndexSignatures(input, baseType) {
                        const results2 = [];
                        for (const info of getIndexInfosOfType(input)) {
                            if (baseType) {
                                const baseInfo = getIndexInfoOfType(baseType, info.keyType);
                                if (baseInfo) {
                                    if (isTypeIdenticalTo(info.type, baseInfo.type)) {
                                        continue;
                                    }
                                }
                            }
                            results2.push(indexInfoToIndexSignatureDeclarationHelper(info, context, 
                            /*typeNode*/
                            void 0));
                        }
                        return results2;
                    }
                    function serializeBaseType(t, staticType, rootName) {
                        const ref = trySerializeAsTypeReference(t, 111551 /* Value */);
                        if (ref) {
                            return ref;
                        }
                        const tempName = getUnusedName(`${rootName}_base`);
                        const statement = factory.createVariableStatement(
                        /*modifiers*/
                        void 0, factory.createVariableDeclarationList([
                            factory.createVariableDeclaration(tempName, 
                            /*exclamationToken*/
                            void 0, typeToTypeNodeHelper(staticType, context))
                        ], 2 /* Const */));
                        addResult(statement, 0 /* None */);
                        return factory.createExpressionWithTypeArguments(factory.createIdentifier(tempName), 
                        /*typeArgs*/
                        void 0);
                    }
                    function trySerializeAsTypeReference(t, flags) {
                        let typeArgs;
                        let reference;
                        if (t.target && isSymbolAccessibleByFlags(t.target.symbol, enclosingDeclaration, flags)) {
                            typeArgs = map(getTypeArguments(t), (t2) => typeToTypeNodeHelper(t2, context));
                            reference = symbolToExpression(t.target.symbol, context, 788968 /* Type */);
                        }
                        else if (t.symbol && isSymbolAccessibleByFlags(t.symbol, enclosingDeclaration, flags)) {
                            reference = symbolToExpression(t.symbol, context, 788968 /* Type */);
                        }
                        if (reference) {
                            return factory.createExpressionWithTypeArguments(reference, typeArgs);
                        }
                    }
                    function serializeImplementedType(t) {
                        const ref = trySerializeAsTypeReference(t, 788968 /* Type */);
                        if (ref) {
                            return ref;
                        }
                        if (t.symbol) {
                            return factory.createExpressionWithTypeArguments(symbolToExpression(t.symbol, context, 788968 /* Type */), 
                            /*typeArgs*/
                            void 0);
                        }
                    }
                    function getUnusedName(input, symbol) {
                        var _a2, _b;
                        const id = symbol ? getSymbolId(symbol) : void 0;
                        if (id) {
                            if (context.remappedSymbolNames.has(id)) {
                                return context.remappedSymbolNames.get(id);
                            }
                        }
                        if (symbol) {
                            input = getNameCandidateWorker(symbol, input);
                        }
                        let i = 0;
                        const original = input;
                        while ((_a2 = context.usedSymbolNames) == null ? void 0 : _a2.has(input)) {
                            i++;
                            input = `${original}_${i}`;
                        }
                        (_b = context.usedSymbolNames) == null ? void 0 : _b.add(input);
                        if (id) {
                            context.remappedSymbolNames.set(id, input);
                        }
                        return input;
                    }
                    function getNameCandidateWorker(symbol, localName) {
                        if (localName === "default" /* Default */ || localName === "__class" /* Class */ || localName === "__function" /* Function */) {
                            const flags = context.flags;
                            context.flags |= 16777216 /* InInitialEntityName */;
                            const nameCandidate = getNameOfSymbolAsWritten(symbol, context);
                            context.flags = flags;
                            localName = nameCandidate.length > 0 && isSingleOrDoubleQuote(nameCandidate.charCodeAt(0)) ? stripQuotes(nameCandidate) : nameCandidate;
                        }
                        if (localName === "default" /* Default */) {
                            localName = "_default";
                        }
                        else if (localName === "export=" /* ExportEquals */) {
                            localName = "_exports";
                        }
                        localName = isIdentifierText(localName, languageVersion) && !isStringANonContextualKeyword(localName) ? localName : "_" + localName.replace(/[^a-zA-Z0-9]/g, "_");
                        return localName;
                    }
                    function getInternalSymbolName(symbol, localName) {
                        const id = getSymbolId(symbol);
                        if (context.remappedSymbolNames.has(id)) {
                            return context.remappedSymbolNames.get(id);
                        }
                        localName = getNameCandidateWorker(symbol, localName);
                        context.remappedSymbolNames.set(id, localName);
                        return localName;
                    }
                }