function createJsonPropertyAssignment(name, initializer) {
            return factory.createPropertyAssignment(factory.createStringLiteral(name), initializer);
        }