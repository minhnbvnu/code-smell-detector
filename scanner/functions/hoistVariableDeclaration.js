function hoistVariableDeclaration(name) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                const decl = setEmitFlags(factory2.createVariableDeclaration(name), 128 /* NoNestedSourceMaps */);
                if (!lexicalEnvironmentVariableDeclarations) {
                    lexicalEnvironmentVariableDeclarations = [decl];
                }
                else {
                    lexicalEnvironmentVariableDeclarations.push(decl);
                }
                if (lexicalEnvironmentFlags & 1 /* InParameters */) {
                    lexicalEnvironmentFlags |= 2 /* VariablesHoistedInParameters */;
                }
            }