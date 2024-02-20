function getAliasId(aliasSymbol, aliasTypeArguments) {
                return aliasSymbol ? `@${getSymbolId(aliasSymbol)}` + (aliasTypeArguments ? `:${getTypeListId(aliasTypeArguments)}` : "") : "";
            }