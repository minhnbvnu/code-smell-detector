function hoistFunctionDeclaration(func) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                setEmitFlags(func, 2097152 /* CustomPrologue */);
                if (!lexicalEnvironmentFunctionDeclarations) {
                    lexicalEnvironmentFunctionDeclarations = [func];
                }
                else {
                    lexicalEnvironmentFunctionDeclarations.push(func);
                }
            }