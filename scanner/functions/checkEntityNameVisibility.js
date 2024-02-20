function checkEntityNameVisibility(entityName, enclosingDeclaration2) {
                const visibilityResult = resolver.isEntityNameVisible(entityName, enclosingDeclaration2);
                handleSymbolAccessibilityError(visibilityResult);
                recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForEntityName(entityName));
            }