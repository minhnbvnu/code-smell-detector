function createPropertyOrShorthandAssignment(name, initializer) {
            if (isIdentifier(initializer) && getTextOfIdentifierOrLiteral(initializer) === name) {
                return factory.createShorthandPropertyAssignment(name);
            }
            return factory.createPropertyAssignment(name, initializer);
        }