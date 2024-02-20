function parenthesizeTypeArguments(typeArguments) {
                if (some(typeArguments)) {
                    return factory2.createNodeArray(sameMap(typeArguments, parenthesizeOrdinalTypeArgument));
                }
            }