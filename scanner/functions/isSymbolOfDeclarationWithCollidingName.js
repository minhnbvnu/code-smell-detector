function isSymbolOfDeclarationWithCollidingName(symbol) {
                if (symbol.flags & 418 /* BlockScoped */ && symbol.valueDeclaration && !isSourceFile(symbol.valueDeclaration)) {
                    const links = getSymbolLinks(symbol);
                    if (links.isDeclarationWithCollidingName === void 0) {
                        const container = getEnclosingBlockScopeContainer(symbol.valueDeclaration);
                        if (isStatementWithLocals(container) || isSymbolOfDestructuredElementOfCatchBinding(symbol)) {
                            const nodeLinks2 = getNodeLinks(symbol.valueDeclaration);
                            if (resolveName(container.parent, symbol.escapedName, 111551 /* Value */, 
                            /*nameNotFoundMessage*/
                            void 0, 
                            /*nameArg*/
                            void 0, 
                            /*isUse*/
                            false)) {
                                links.isDeclarationWithCollidingName = true;
                            }
                            else if (nodeLinks2.flags & 16384 /* CapturedBlockScopedBinding */) {
                                const isDeclaredInLoop = nodeLinks2.flags & 32768 /* BlockScopedBindingInLoop */;
                                const inLoopInitializer = isIterationStatement(container, 
                                /*lookInLabeledStatements*/
                                false);
                                const inLoopBodyBlock = container.kind === 238 /* Block */ && isIterationStatement(container.parent, 
                                /*lookInLabeledStatements*/
                                false);
                                links.isDeclarationWithCollidingName = !isBlockScopedContainerTopLevel(container) && (!isDeclaredInLoop || !inLoopInitializer && !inLoopBodyBlock);
                            }
                            else {
                                links.isDeclarationWithCollidingName = false;
                            }
                        }
                    }
                    return links.isDeclarationWithCollidingName;
                }
                return false;
            }