function createPropertyName(name, originalName) {
            return isIdentifier(originalName) ? factory.createIdentifier(name) : factory.createStringLiteral(name);
        }