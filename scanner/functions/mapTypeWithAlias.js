function mapTypeWithAlias(type, mapper, aliasSymbol, aliasTypeArguments) {
                return type.flags & 1048576 /* Union */ && aliasSymbol ? getUnionType(map(type.types, mapper), 1 /* Literal */, aliasSymbol, aliasTypeArguments) : mapType(type, mapper);
            }