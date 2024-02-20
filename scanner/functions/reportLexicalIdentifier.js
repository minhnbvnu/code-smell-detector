function reportLexicalIdentifier() {
                lexicalScopeStack[0].forEach(arrowFunction => arrowsWithLexicalIdentifiers.add(arrowFunction));
            }