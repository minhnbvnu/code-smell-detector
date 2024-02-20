function isParameterOrCatchClauseVariable(symbol) {
            const declaration = symbol.valueDeclaration && getRootDeclaration(symbol.valueDeclaration);
            return !!declaration && (isParameter(declaration) || isCatchClauseVariableDeclaration(declaration));
        }