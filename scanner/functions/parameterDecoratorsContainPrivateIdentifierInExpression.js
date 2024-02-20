function parameterDecoratorsContainPrivateIdentifierInExpression(parameterDecorators) {
                return some(parameterDecorators, decoratorContainsPrivateIdentifierInExpression);
            }