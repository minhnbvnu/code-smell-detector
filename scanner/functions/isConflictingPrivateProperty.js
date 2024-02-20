function isConflictingPrivateProperty(prop) {
                return !prop.valueDeclaration && !!(getCheckFlags(prop) & 1024 /* ContainsPrivate */);
            }