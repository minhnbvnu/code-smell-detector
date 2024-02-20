function isParameterDeclarationWithIdentifierName(symbol) {
                return symbol.valueDeclaration && isParameter(symbol.valueDeclaration) && isIdentifier(symbol.valueDeclaration.name);
            }