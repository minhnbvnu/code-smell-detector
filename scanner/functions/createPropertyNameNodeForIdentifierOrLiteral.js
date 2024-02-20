function createPropertyNameNodeForIdentifierOrLiteral(name, target, singleQuote, stringNamed) {
            return isIdentifierText(name, target) ? factory.createIdentifier(name) : !stringNamed && isNumericLiteralName(name) && +name >= 0 ? factory.createNumericLiteral(+name) : factory.createStringLiteral(name, !!singleQuote);
        }