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