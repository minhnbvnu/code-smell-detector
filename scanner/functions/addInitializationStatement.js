function addInitializationStatement(node) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                setEmitFlags(node, 2097152 /* CustomPrologue */);
                if (!lexicalEnvironmentStatements) {
                    lexicalEnvironmentStatements = [node];
                }
                else {
                    lexicalEnvironmentStatements.push(node);
                }
            }