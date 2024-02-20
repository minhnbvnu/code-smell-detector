function startBlockScope() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot start a block scope during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot start a block scope after transformation has completed.");
                blockScopedVariableDeclarationsStack[blockScopeStackOffset] = blockScopedVariableDeclarations;
                blockScopeStackOffset++;
                blockScopedVariableDeclarations = void 0;
            }