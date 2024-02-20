function getWidenedLiteralLikeTypeForContextualType(type, contextualType) {
                if (!isLiteralOfContextualType(type, contextualType)) {
                    type = getWidenedUniqueESSymbolType(getWidenedLiteralType(type));
                }
                return getRegularTypeOfLiteralType(type);
            }