function symbolValueDeclarationIsContextSensitive(symbol) {
                return symbol && !!symbol.valueDeclaration && isExpression(symbol.valueDeclaration) && !isContextSensitive(symbol.valueDeclaration);
            }