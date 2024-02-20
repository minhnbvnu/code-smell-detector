function getContextualKeywords(contextToken, position) {
            const entries = [];
            if (contextToken) {
                const file = contextToken.getSourceFile();
                const parent2 = contextToken.parent;
                const tokenLine = file.getLineAndCharacterOfPosition(contextToken.end).line;
                const currentLine = file.getLineAndCharacterOfPosition(position).line;
                if ((isImportDeclaration(parent2) || isExportDeclaration(parent2) && parent2.moduleSpecifier) && contextToken === parent2.moduleSpecifier && tokenLine === currentLine) {
                    entries.push({
                        name: tokenToString(130 /* AssertKeyword */),
                        kind: "keyword" /* keyword */,
                        kindModifiers: "" /* none */,
                        sortText: SortText.GlobalsOrKeywords
                    });
                }
            }
            return entries;
        }