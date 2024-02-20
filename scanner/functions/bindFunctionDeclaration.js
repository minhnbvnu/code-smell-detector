function bindFunctionDeclaration(node) {
                if (!file.isDeclarationFile && !(node.flags & 16777216 /* Ambient */)) {
                    if (isAsyncFunction(node)) {
                        emitFlags |= 2048 /* HasAsyncFunctions */;
                    }
                }
                checkStrictModeFunctionName(node);
                if (inStrictMode) {
                    checkStrictModeFunctionDeclaration(node);
                    bindBlockScopedDeclaration(node, 16 /* Function */, 110991 /* FunctionExcludes */);
                }
                else {
                    declareSymbolAndAddToSymbolTable(node, 16 /* Function */, 110991 /* FunctionExcludes */);
                }
            }