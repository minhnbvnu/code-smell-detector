function getPrivateIdentifierPropertyOfType(leftType, lexicallyScopedIdentifier) {
                return getPropertyOfType(leftType, lexicallyScopedIdentifier.escapedName);
            }