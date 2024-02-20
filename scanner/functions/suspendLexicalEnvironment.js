function suspendLexicalEnvironment() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is already suspended.");
                lexicalEnvironmentSuspended = true;
            }