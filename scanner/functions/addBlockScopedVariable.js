function addBlockScopedVariable(name) {
                Debug.assert(blockScopeStackOffset > 0, "Cannot add a block scoped variable outside of an iteration body.");
                (blockScopedVariableDeclarations || (blockScopedVariableDeclarations = [])).push(name);
            }