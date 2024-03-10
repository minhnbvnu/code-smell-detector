function getDefinitionAtPosition(program, sourceFile, position, searchOtherFilesOnly, stopAtAlias) {
            var _a2, _b;
            const resolvedRef = getReferenceAtPosition(sourceFile, position, program);
            const fileReferenceDefinition = resolvedRef && [getDefinitionInfoForFileReference(resolvedRef.reference.fileName, resolvedRef.fileName, resolvedRef.unverified)] || emptyArray;
            if (resolvedRef == null ? void 0 : resolvedRef.file) {
                return fileReferenceDefinition;
            }
            const node = getTouchingPropertyName(sourceFile, position);
            if (node === sourceFile) {
                return void 0;
            }
            const { parent: parent2 } = node;
            const typeChecker = program.getTypeChecker();
            if (node.kind === 161 /* OverrideKeyword */ || isIdentifier(node) && isJSDocOverrideTag(parent2) && parent2.tagName === node) {
                return getDefinitionFromOverriddenMember(typeChecker, node) || emptyArray;
            }
            if (isJumpStatementTarget(node)) {
                const label = getTargetLabel(node.parent, node.text);
                return label ? [createDefinitionInfoFromName(typeChecker, label, "label" /* label */, node.text, 
                    /*containerName*/
                    void 0)] : void 0;
            }
            if (node.kind === 105 /* ReturnKeyword */) {
                const functionDeclaration = findAncestor(node.parent, (n) => isClassStaticBlockDeclaration(n) ? "quit" : isFunctionLikeDeclaration(n));
                return functionDeclaration ? [createDefinitionFromSignatureDeclaration(typeChecker, functionDeclaration)] : void 0;
            }
            if (node.kind === 133 /* AwaitKeyword */) {
                const functionDeclaration = findAncestor(node, (n) => isFunctionLikeDeclaration(n));
                const isAsyncFunction2 = functionDeclaration && some(functionDeclaration.modifiers, (node2) => node2.kind === 132 /* AsyncKeyword */);
                return isAsyncFunction2 ? [createDefinitionFromSignatureDeclaration(typeChecker, functionDeclaration)] : void 0;
            }
            if (node.kind === 125 /* YieldKeyword */) {
                const functionDeclaration = findAncestor(node, (n) => isFunctionLikeDeclaration(n));
                const isGeneratorFunction = functionDeclaration && functionDeclaration.asteriskToken;
                return isGeneratorFunction ? [createDefinitionFromSignatureDeclaration(typeChecker, functionDeclaration)] : void 0;
            }
            if (isStaticModifier(node) && isClassStaticBlockDeclaration(node.parent)) {
                const classDecl = node.parent.parent;
                const { symbol: symbol2, failedAliasResolution: failedAliasResolution2 } = getSymbol(classDecl, typeChecker, stopAtAlias);
                const staticBlocks = filter(classDecl.members, isClassStaticBlockDeclaration);
                const containerName = symbol2 ? typeChecker.symbolToString(symbol2, classDecl) : "";
                const sourceFile2 = node.getSourceFile();
                return map(staticBlocks, (staticBlock) => {
                    let { pos } = moveRangePastModifiers(staticBlock);
                    pos = skipTrivia(sourceFile2.text, pos);
                    return createDefinitionInfoFromName(typeChecker, staticBlock, "constructor" /* constructorImplementationElement */, "static {}", containerName, 
                    /*unverified*/
                    false, failedAliasResolution2, { start: pos, length: "static".length });
                });
            }
            let { symbol, failedAliasResolution } = getSymbol(node, typeChecker, stopAtAlias);
            let fallbackNode = node;
            if (searchOtherFilesOnly && failedAliasResolution) {
                const importDeclaration = forEach([node, ...(symbol == null ? void 0 : symbol.declarations) || emptyArray], (n) => findAncestor(n, isAnyImportOrBareOrAccessedRequire));
                const moduleSpecifier = importDeclaration && tryGetModuleSpecifierFromDeclaration(importDeclaration);
                if (moduleSpecifier) {
                    ({ symbol, failedAliasResolution } = getSymbol(moduleSpecifier, typeChecker, stopAtAlias));
                    fallbackNode = moduleSpecifier;
                }
            }
            if (!symbol && isModuleSpecifierLike(fallbackNode)) {
                const ref = (_b = (_a2 = sourceFile.resolvedModules) == null ? void 0 : _a2.get(fallbackNode.text, getModeForUsageLocation(sourceFile, fallbackNode))) == null ? void 0 : _b.resolvedModule;
                if (ref) {
                    return [{
                            name: fallbackNode.text,
                            fileName: ref.resolvedFileName,
                            containerName: void 0,
                            containerKind: void 0,
                            kind: "script" /* scriptElement */,
                            textSpan: createTextSpan(0, 0),
                            failedAliasResolution,
                            isAmbient: isDeclarationFileName(ref.resolvedFileName),
                            unverified: fallbackNode !== node
                        }];
                }
            }
            if (!symbol) {
                return concatenate(fileReferenceDefinition, getDefinitionInfoForIndexSignatures(node, typeChecker));
            }
            if (searchOtherFilesOnly && every(symbol.declarations, (d) => d.getSourceFile().fileName === sourceFile.fileName))
                return void 0;
            const calledDeclaration = tryGetSignatureDeclaration(typeChecker, node);
            if (calledDeclaration && !(isJsxOpeningLikeElement(node.parent) && isConstructorLike(calledDeclaration))) {
                const sigInfo = createDefinitionFromSignatureDeclaration(typeChecker, calledDeclaration, failedAliasResolution);
                if (typeChecker.getRootSymbols(symbol).some((s) => symbolMatchesSignature(s, calledDeclaration))) {
                    return [sigInfo];
                }
                else {
                    const defs = getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution, calledDeclaration) || emptyArray;
                    return node.kind === 106 /* SuperKeyword */ ? [sigInfo, ...defs] : [...defs, sigInfo];
                }
            }
            if (node.parent.kind === 300 /* ShorthandPropertyAssignment */) {
                const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
                const definitions = (shorthandSymbol == null ? void 0 : shorthandSymbol.declarations) ? shorthandSymbol.declarations.map((decl) => createDefinitionInfo(decl, typeChecker, shorthandSymbol, node, 
                /*unverified*/
                false, failedAliasResolution)) : emptyArray;
                return concatenate(definitions, getDefinitionFromObjectLiteralElement(typeChecker, node) || emptyArray);
            }
            if (isPropertyName(node) && isBindingElement(parent2) && isObjectBindingPattern(parent2.parent) && node === (parent2.propertyName || parent2.name)) {
                const name = getNameFromPropertyName(node);
                const type = typeChecker.getTypeAtLocation(parent2.parent);
                return name === void 0 ? emptyArray : flatMap(type.isUnion() ? type.types : [type], (t) => {
                    const prop = t.getProperty(name);
                    return prop && getDefinitionFromSymbol(typeChecker, prop, node);
                });
            }
            return concatenate(fileReferenceDefinition, getDefinitionFromObjectLiteralElement(typeChecker, node) || getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution));
        }