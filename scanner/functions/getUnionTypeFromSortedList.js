function getUnionTypeFromSortedList(types, precomputedObjectFlags, aliasSymbol, aliasTypeArguments, origin) {
                if (types.length === 0) {
                    return neverType;
                }
                if (types.length === 1) {
                    return types[0];
                }
                const typeKey = !origin ? getTypeListId(types) : origin.flags & 1048576 /* Union */ ? `|${getTypeListId(origin.types)}` : origin.flags & 2097152 /* Intersection */ ? `&${getTypeListId(origin.types)}` : `#${origin.type.id}|${getTypeListId(types)}`;
                const id = typeKey + getAliasId(aliasSymbol, aliasTypeArguments);
                let type = unionTypes.get(id);
                if (!type) {
                    type = createType(1048576 /* Union */);
                    type.objectFlags = precomputedObjectFlags | getPropagatingFlagsOfTypes(types, 
                    /*excludeKinds*/
                    98304 /* Nullable */);
                    type.types = types;
                    type.origin = origin;
                    type.aliasSymbol = aliasSymbol;
                    type.aliasTypeArguments = aliasTypeArguments;
                    if (types.length === 2 && types[0].flags & 512 /* BooleanLiteral */ && types[1].flags & 512 /* BooleanLiteral */) {
                        type.flags |= 16 /* Boolean */;
                        type.intrinsicName = "boolean";
                    }
                    unionTypes.set(id, type);
                }
                return type;
            }