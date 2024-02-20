function getCurrentScope(statementType) {
                let currentScope;
                if (statementType === "var") {
                    currentScope = functionStack[functionStack.length - 1];
                }
                else if (statementType === "let") {
                    currentScope = blockStack[blockStack.length - 1].let;
                }
                else if (statementType === "const") {
                    currentScope = blockStack[blockStack.length - 1].const;
                }
                return currentScope;
            }