function renameCollidingVarNames(nodeToRename, checker, synthNamesMap) {
            const identsToRenameMap = /* @__PURE__ */ new Map();
            const collidingSymbolMap = createMultiMap();
            forEachChild(nodeToRename, function visit(node) {
                if (!isIdentifier(node)) {
                    forEachChild(node, visit);
                    return;
                }
                const symbol = checker.getSymbolAtLocation(node);
                if (symbol) {
                    const type = checker.getTypeAtLocation(node);
                    const lastCallSignature = getLastCallSignature(type, checker);
                    const symbolIdString = getSymbolId(symbol).toString();
                    if (lastCallSignature && !isParameter(node.parent) && !isFunctionLikeDeclaration(node.parent) && !synthNamesMap.has(symbolIdString)) {
                        const firstParameter = firstOrUndefined(lastCallSignature.parameters);
                        const ident = (firstParameter == null ? void 0 : firstParameter.valueDeclaration) && isParameter(firstParameter.valueDeclaration) && tryCast(firstParameter.valueDeclaration.name, isIdentifier) || factory.createUniqueName("result", 16 /* Optimistic */);
                        const synthName = getNewNameIfConflict(ident, collidingSymbolMap);
                        synthNamesMap.set(symbolIdString, synthName);
                        collidingSymbolMap.add(ident.text, symbol);
                    }
                    else if (node.parent && (isParameter(node.parent) || isVariableDeclaration(node.parent) || isBindingElement(node.parent))) {
                        const originalName = node.text;
                        const collidingSymbols = collidingSymbolMap.get(originalName);
                        if (collidingSymbols && collidingSymbols.some((prevSymbol) => prevSymbol !== symbol)) {
                            const newName = getNewNameIfConflict(node, collidingSymbolMap);
                            identsToRenameMap.set(symbolIdString, newName.identifier);
                            synthNamesMap.set(symbolIdString, newName);
                            collidingSymbolMap.add(originalName, symbol);
                        }
                        else {
                            const identifier = getSynthesizedDeepClone(node);
                            synthNamesMap.set(symbolIdString, createSynthIdentifier(identifier));
                            collidingSymbolMap.add(originalName, symbol);
                        }
                    }
                }
            });
            return getSynthesizedDeepCloneWithReplacements(nodeToRename, 
            /*includeTrivia*/
            true, (original) => {
                if (isBindingElement(original) && isIdentifier(original.name) && isObjectBindingPattern(original.parent)) {
                    const symbol = checker.getSymbolAtLocation(original.name);
                    const renameInfo = symbol && identsToRenameMap.get(String(getSymbolId(symbol)));
                    if (renameInfo && renameInfo.text !== (original.name || original.propertyName).getText()) {
                        return factory.createBindingElement(original.dotDotDotToken, original.propertyName || original.name, renameInfo, original.initializer);
                    }
                }
                else if (isIdentifier(original)) {
                    const symbol = checker.getSymbolAtLocation(original);
                    const renameInfo = symbol && identsToRenameMap.get(String(getSymbolId(symbol)));
                    if (renameInfo) {
                        return factory.createIdentifier(renameInfo.text);
                    }
                }
            });
        }