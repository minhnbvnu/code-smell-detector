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