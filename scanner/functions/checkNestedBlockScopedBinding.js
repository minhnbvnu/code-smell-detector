function checkNestedBlockScopedBinding(node, symbol) {
                if (languageVersion >= 2 /* ES2015 */ || (symbol.flags & (2 /* BlockScopedVariable */ | 32 /* Class */)) === 0 || !symbol.valueDeclaration || isSourceFile(symbol.valueDeclaration) || symbol.valueDeclaration.parent.kind === 295 /* CatchClause */) {
                    return;
                }
                const container = getEnclosingBlockScopeContainer(symbol.valueDeclaration);
                const isCaptured = isInsideFunctionOrInstancePropertyInitializer(node, container);
                const enclosingIterationStatement = getEnclosingIterationStatement(container);
                if (enclosingIterationStatement) {
                    if (isCaptured) {
                        let capturesBlockScopeBindingInLoopBody = true;
                        if (isForStatement(container)) {
                            const varDeclList = getAncestor(symbol.valueDeclaration, 258 /* VariableDeclarationList */);
                            if (varDeclList && varDeclList.parent === container) {
                                const part = getPartOfForStatementContainingNode(node.parent, container);
                                if (part) {
                                    const links = getNodeLinks(part);
                                    links.flags |= 8192 /* ContainsCapturedBlockScopeBinding */;
                                    const capturedBindings = links.capturedBlockScopeBindings || (links.capturedBlockScopeBindings = []);
                                    pushIfUnique(capturedBindings, symbol);
                                    if (part === container.initializer) {
                                        capturesBlockScopeBindingInLoopBody = false;
                                    }
                                }
                            }
                        }
                        if (capturesBlockScopeBindingInLoopBody) {
                            getNodeLinks(enclosingIterationStatement).flags |= 4096 /* LoopWithCapturedBlockScopedBinding */;
                        }
                    }
                    if (isForStatement(container)) {
                        const varDeclList = getAncestor(symbol.valueDeclaration, 258 /* VariableDeclarationList */);
                        if (varDeclList && varDeclList.parent === container && isAssignedInBodyOfForStatement(node, container)) {
                            getNodeLinks(symbol.valueDeclaration).flags |= 262144 /* NeedsLoopOutParameter */;
                        }
                    }
                    getNodeLinks(symbol.valueDeclaration).flags |= 32768 /* BlockScopedBindingInLoop */;
                }
                if (isCaptured) {
                    getNodeLinks(symbol.valueDeclaration).flags |= 16384 /* CapturedBlockScopedBinding */;
                }
            }