function endBlockScope() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot end a block scope during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot end a block scope after transformation has completed.");
                const statements = some(blockScopedVariableDeclarations) ? [
                    factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(blockScopedVariableDeclarations.map((identifier) => factory2.createVariableDeclaration(identifier)), 1 /* Let */))
                ] : void 0;
                blockScopeStackOffset--;
                blockScopedVariableDeclarations = blockScopedVariableDeclarationsStack[blockScopeStackOffset];
                if (blockScopeStackOffset === 0) {
                    blockScopedVariableDeclarationsStack = [];
                }
                return statements;
            }