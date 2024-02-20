function bindVariableDeclarationOrBindingElement(node) {
                if (inStrictMode) {
                    checkStrictModeEvalOrArguments(node, node.name);
                }
                if (!isBindingPattern(node.name)) {
                    const possibleVariableDecl = node.kind === 257 /* VariableDeclaration */ ? node : node.parent.parent;
                    if (isInJSFile(node) && shouldResolveJsRequire(options) && isVariableDeclarationInitializedToBareOrAccessedRequire(possibleVariableDecl) && !getJSDocTypeTag(node) && !(getCombinedModifierFlags(node) & 1 /* Export */)) {
                        declareSymbolAndAddToSymbolTable(node, 2097152 /* Alias */, 2097152 /* AliasExcludes */);
                    }
                    else if (isBlockOrCatchScoped(node)) {
                        bindBlockScopedDeclaration(node, 2 /* BlockScopedVariable */, 111551 /* BlockScopedVariableExcludes */);
                    }
                    else if (isParameterDeclaration(node)) {
                        declareSymbolAndAddToSymbolTable(node, 1 /* FunctionScopedVariable */, 111551 /* ParameterExcludes */);
                    }
                    else {
                        declareSymbolAndAddToSymbolTable(node, 1 /* FunctionScopedVariable */, 111550 /* FunctionScopedVariableExcludes */);
                    }
                }
            }