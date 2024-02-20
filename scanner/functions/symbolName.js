function symbolName(symbol) {
            if (symbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
                return idText(symbol.valueDeclaration.name);
            }
            return unescapeLeadingUnderscores(symbol.escapedName);
        }