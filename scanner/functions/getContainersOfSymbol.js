function getContainersOfSymbol(symbol, enclosingDeclaration, meaning) {
                const container = getParentOfSymbol(symbol);
                if (container && !(symbol.flags & 262144 /* TypeParameter */)) {
                    const additionalContainers = mapDefined(container.declarations, fileSymbolIfFileSymbolExportEqualsContainer);
                    const reexportContainers = enclosingDeclaration && getAlternativeContainingModules(symbol, enclosingDeclaration);
                    const objectLiteralContainer = getVariableDeclarationOfObjectLiteral(container, meaning);
                    if (enclosingDeclaration && container.flags & getQualifiedLeftMeaning(meaning) && getAccessibleSymbolChain(container, enclosingDeclaration, 1920 /* Namespace */, 
                    /*externalOnly*/
                    false)) {
                        return append(concatenate(concatenate([container], additionalContainers), reexportContainers), objectLiteralContainer);
                    }
                    const firstVariableMatch = !(container.flags & getQualifiedLeftMeaning(meaning)) && container.flags & 788968 /* Type */ && getDeclaredTypeOfSymbol(container).flags & 524288 /* Object */ && meaning === 111551 /* Value */ ? forEachSymbolTableInScope(enclosingDeclaration, (t) => {
                        return forEachEntry(t, (s) => {
                            if (s.flags & getQualifiedLeftMeaning(meaning) && getTypeOfSymbol(s) === getDeclaredTypeOfSymbol(container)) {
                                return s;
                            }
                        });
                    }) : void 0;
                    let res = firstVariableMatch ? [firstVariableMatch, ...additionalContainers, container] : [...additionalContainers, container];
                    res = append(res, objectLiteralContainer);
                    res = addRange(res, reexportContainers);
                    return res;
                }
                const candidates = mapDefined(symbol.declarations, (d) => {
                    if (!isAmbientModule(d) && d.parent) {
                        if (hasNonGlobalAugmentationExternalModuleSymbol(d.parent)) {
                            return getSymbolOfDeclaration(d.parent);
                        }
                        if (isModuleBlock(d.parent) && d.parent.parent && resolveExternalModuleSymbol(getSymbolOfDeclaration(d.parent.parent)) === symbol) {
                            return getSymbolOfDeclaration(d.parent.parent);
                        }
                    }
                    if (isClassExpression(d) && isBinaryExpression(d.parent) && d.parent.operatorToken.kind === 63 /* EqualsToken */ && isAccessExpression(d.parent.left) && isEntityNameExpression(d.parent.left.expression)) {
                        if (isModuleExportsAccessExpression(d.parent.left) || isExportsIdentifier(d.parent.left.expression)) {
                            return getSymbolOfDeclaration(getSourceFileOfNode(d));
                        }
                        checkExpressionCached(d.parent.left.expression);
                        return getNodeLinks(d.parent.left.expression).resolvedSymbol;
                    }
                });
                if (!length(candidates)) {
                    return void 0;
                }
                return mapDefined(candidates, (candidate) => getAliasForSymbolInContainer(candidate, symbol) ? candidate : void 0);
                function fileSymbolIfFileSymbolExportEqualsContainer(d) {
                    return container && getFileSymbolIfFileSymbolExportEqualsContainer(d, container);
                }
            }