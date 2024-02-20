function isValidTypeOnlyAliasUseSite(useSite) {
            return !!(useSite.flags & 16777216 /* Ambient */) || isPartOfTypeQuery(useSite) || isIdentifierInNonEmittingHeritageClause(useSite) || isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite) || !(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
        }