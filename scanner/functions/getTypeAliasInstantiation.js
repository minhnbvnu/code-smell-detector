function getTypeAliasInstantiation(symbol, typeArguments, aliasSymbol, aliasTypeArguments) {
                const type = getDeclaredTypeOfSymbol(symbol);
                if (type === intrinsicMarkerType && intrinsicTypeKinds.has(symbol.escapedName) && typeArguments && typeArguments.length === 1) {
                    return getStringMappingType(symbol, typeArguments[0]);
                }
                const links = getSymbolLinks(symbol);
                const typeParameters = links.typeParameters;
                const id = getTypeListId(typeArguments) + getAliasId(aliasSymbol, aliasTypeArguments);
                let instantiation = links.instantiations.get(id);
                if (!instantiation) {
                    links.instantiations.set(id, instantiation = instantiateTypeWithAlias(type, createTypeMapper(typeParameters, fillMissingTypeArguments(typeArguments, typeParameters, getMinTypeArgumentCount(typeParameters), isInJSFile(symbol.valueDeclaration))), aliasSymbol, aliasTypeArguments));
                }
                return instantiation;
            }