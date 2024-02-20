function checkVarDeclaredNamesNotShadowed(node) {
                if ((getCombinedNodeFlags(node) & 3 /* BlockScoped */) !== 0 || isParameterDeclaration(node)) {
                    return;
                }
                if (node.kind === 257 /* VariableDeclaration */ && !node.initializer) {
                    return;
                }
                const symbol = getSymbolOfDeclaration(node);
                if (symbol.flags & 1 /* FunctionScopedVariable */) {
                    if (!isIdentifier(node.name))
                        return Debug.fail();
                    const localDeclarationSymbol = resolveName(node, node.name.escapedText, 3 /* Variable */, 
                    /*nodeNotFoundErrorMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    false);
                    if (localDeclarationSymbol && localDeclarationSymbol !== symbol && localDeclarationSymbol.flags & 2 /* BlockScopedVariable */) {
                        if (getDeclarationNodeFlagsFromSymbol(localDeclarationSymbol) & 3 /* BlockScoped */) {
                            const varDeclList = getAncestor(localDeclarationSymbol.valueDeclaration, 258 /* VariableDeclarationList */);
                            const container = varDeclList.parent.kind === 240 /* VariableStatement */ && varDeclList.parent.parent ? varDeclList.parent.parent : void 0;
                            const namesShareScope = container && (container.kind === 238 /* Block */ && isFunctionLike(container.parent) || container.kind === 265 /* ModuleBlock */ || container.kind === 264 /* ModuleDeclaration */ || container.kind === 308 /* SourceFile */);
                            if (!namesShareScope) {
                                const name = symbolToString(localDeclarationSymbol);
                                error(node, Diagnostics.Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1, name, name);
                            }
                        }
                    }
                }
            }