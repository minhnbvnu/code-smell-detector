function endLexicalEnvironment() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");
                let statements;
                if (lexicalEnvironmentVariableDeclarations || lexicalEnvironmentFunctionDeclarations || lexicalEnvironmentStatements) {
                    if (lexicalEnvironmentFunctionDeclarations) {
                        statements = [...lexicalEnvironmentFunctionDeclarations];
                    }
                    if (lexicalEnvironmentVariableDeclarations) {
                        const statement = factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, factory2.createVariableDeclarationList(lexicalEnvironmentVariableDeclarations));
                        setEmitFlags(statement, 2097152 /* CustomPrologue */);
                        if (!statements) {
                            statements = [statement];
                        }
                        else {
                            statements.push(statement);
                        }
                    }
                    if (lexicalEnvironmentStatements) {
                        if (!statements) {
                            statements = [...lexicalEnvironmentStatements];
                        }
                        else {
                            statements = [...statements, ...lexicalEnvironmentStatements];
                        }
                    }
                }
                lexicalEnvironmentStackOffset--;
                lexicalEnvironmentVariableDeclarations = lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset];
                lexicalEnvironmentFunctionDeclarations = lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset];
                lexicalEnvironmentStatements = lexicalEnvironmentStatementsStack[lexicalEnvironmentStackOffset];
                lexicalEnvironmentFlags = lexicalEnvironmentFlagsStack[lexicalEnvironmentStackOffset];
                if (lexicalEnvironmentStackOffset === 0) {
                    lexicalEnvironmentVariableDeclarationsStack = [];
                    lexicalEnvironmentFunctionDeclarationsStack = [];
                    lexicalEnvironmentStatementsStack = [];
                    lexicalEnvironmentFlagsStack = [];
                }
                return statements;
            }