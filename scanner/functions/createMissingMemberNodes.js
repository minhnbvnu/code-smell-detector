function createMissingMemberNodes(classDeclaration, possiblyMissingSymbols, sourceFile, context, preferences, importAdder, addClassElement) {
            const classMembers = classDeclaration.symbol.members;
            for (const symbol of possiblyMissingSymbols) {
                if (!classMembers.has(symbol.escapedName)) {
                    addNewNodeForMemberSymbol(symbol, classDeclaration, sourceFile, context, preferences, importAdder, addClassElement, 
                    /* body */
                    void 0);
                }
            }
        }