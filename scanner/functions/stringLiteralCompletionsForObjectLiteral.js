function stringLiteralCompletionsForObjectLiteral(checker, objectLiteralExpression) {
            const contextualType = checker.getContextualType(objectLiteralExpression);
            if (!contextualType)
                return void 0;
            const completionsType = checker.getContextualType(objectLiteralExpression, 4 /* Completions */);
            const symbols = getPropertiesForObjectExpression(contextualType, completionsType, objectLiteralExpression, checker);
            return {
                kind: 1 /* Properties */,
                symbols,
                hasIndexSignature: hasIndexSignature(contextualType)
            };
        }