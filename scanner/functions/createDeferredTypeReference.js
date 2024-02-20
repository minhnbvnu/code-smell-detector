function createDeferredTypeReference(target, node, mapper, aliasSymbol, aliasTypeArguments) {
                if (!aliasSymbol) {
                    aliasSymbol = getAliasSymbolForTypeNode(node);
                    const localAliasTypeArguments = getTypeArgumentsForAliasSymbol(aliasSymbol);
                    aliasTypeArguments = mapper ? instantiateTypes(localAliasTypeArguments, mapper) : localAliasTypeArguments;
                }
                const type = createObjectType(4 /* Reference */, target.symbol);
                type.target = target;
                type.node = node;
                type.mapper = mapper;
                type.aliasSymbol = aliasSymbol;
                type.aliasTypeArguments = aliasTypeArguments;
                return type;
            }