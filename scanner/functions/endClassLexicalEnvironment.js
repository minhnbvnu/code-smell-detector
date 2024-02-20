function endClassLexicalEnvironment() {
                lexicalEnvironment = lexicalEnvironment == null ? void 0 : lexicalEnvironment.previous;
            }