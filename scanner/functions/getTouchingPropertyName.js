function getTouchingPropertyName(sourceFile, position) {
            return getTouchingToken(sourceFile, position, (n) => isPropertyNameLiteral(n) || isKeyword(n.kind) || isPrivateIdentifier(n));
        }