function startLexicalEnvironment() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");
                lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentVariableDeclarations;
                lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentFunctionDeclarations;
                lexicalEnvironmentStatementsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentStatements;
                lexicalEnvironmentFlagsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentFlags;
                lexicalEnvironmentStackOffset++;
                lexicalEnvironmentVariableDeclarations = void 0;
                lexicalEnvironmentFunctionDeclarations = void 0;
                lexicalEnvironmentStatements = void 0;
                lexicalEnvironmentFlags = 0 /* None */;
            }