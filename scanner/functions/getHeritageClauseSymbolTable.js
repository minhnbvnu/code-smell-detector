function getHeritageClauseSymbolTable(classDeclaration, checker) {
            const heritageClauseNode = getEffectiveBaseTypeNode(classDeclaration);
            if (!heritageClauseNode)
                return createSymbolTable();
            const heritageClauseType = checker.getTypeAtLocation(heritageClauseNode);
            const heritageClauseTypeSymbols = checker.getPropertiesOfType(heritageClauseType);
            return createSymbolTable(heritageClauseTypeSymbols.filter(symbolPointsToNonPrivateMember));
        }