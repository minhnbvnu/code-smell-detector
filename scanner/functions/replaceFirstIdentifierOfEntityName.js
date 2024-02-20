function replaceFirstIdentifierOfEntityName(name, newIdentifier) {
            if (name.kind === 79 /* Identifier */) {
                return newIdentifier;
            }
            return factory.createQualifiedName(replaceFirstIdentifierOfEntityName(name.left, newIdentifier), name.right);
        }