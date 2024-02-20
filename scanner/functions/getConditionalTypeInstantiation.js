function getConditionalTypeInstantiation(type, mapper, aliasSymbol, aliasTypeArguments) {
                const root = type.root;
                if (root.outerTypeParameters) {
                    const typeArguments = map(root.outerTypeParameters, (t) => getMappedType(t, mapper));
                    const id = getTypeListId(typeArguments) + getAliasId(aliasSymbol, aliasTypeArguments);
                    let result = root.instantiations.get(id);
                    if (!result) {
                        const newMapper = createTypeMapper(root.outerTypeParameters, typeArguments);
                        const checkType = root.checkType;
                        const distributionType = root.isDistributive ? getMappedType(checkType, newMapper) : void 0;
                        result = distributionType && checkType !== distributionType && distributionType.flags & (1048576 /* Union */ | 131072 /* Never */) ? mapTypeWithAlias(getReducedType(distributionType), (t) => getConditionalType(root, prependTypeMapping(checkType, t, newMapper)), aliasSymbol, aliasTypeArguments) : getConditionalType(root, newMapper, aliasSymbol, aliasTypeArguments);
                        root.instantiations.set(id, result);
                    }
                    return result;
                }
                return type;
            }