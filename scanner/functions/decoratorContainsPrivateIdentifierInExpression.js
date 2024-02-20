function decoratorContainsPrivateIdentifierInExpression(decorator) {
                return !!(decorator.transformFlags & 536870912 /* ContainsPrivateIdentifierInExpression */);
            }