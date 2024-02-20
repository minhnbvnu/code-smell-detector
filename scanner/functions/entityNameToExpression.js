function entityNameToExpression(entityName, languageVersion, quotePreference) {
            if (isIdentifier(entityName)) {
                return entityName;
            }
            const unescapedName = unescapeLeadingUnderscores(entityName.right.escapedText);
            if (canUsePropertyAccess(unescapedName, languageVersion)) {
                return factory.createPropertyAccessExpression(entityNameToExpression(entityName.left, languageVersion, quotePreference), unescapedName);
            }
            else {
                return factory.createElementAccessExpression(entityNameToExpression(entityName.left, languageVersion, quotePreference), factory.createStringLiteral(unescapedName, quotePreference === 0 /* Single */));
            }
        }