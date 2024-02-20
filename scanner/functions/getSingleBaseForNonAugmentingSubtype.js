function getSingleBaseForNonAugmentingSubtype(type) {
                if (!(getObjectFlags(type) & 4 /* Reference */) || !(getObjectFlags(type.target) & 3 /* ClassOrInterface */)) {
                    return void 0;
                }
                if (getObjectFlags(type) & 33554432 /* IdenticalBaseTypeCalculated */) {
                    return getObjectFlags(type) & 67108864 /* IdenticalBaseTypeExists */ ? type.cachedEquivalentBaseType : void 0;
                }
                type.objectFlags |= 33554432 /* IdenticalBaseTypeCalculated */;
                const target = type.target;
                if (getObjectFlags(target) & 1 /* Class */) {
                    const baseTypeNode = getBaseTypeNodeOfClass(target);
                    if (baseTypeNode && baseTypeNode.expression.kind !== 79 /* Identifier */ && baseTypeNode.expression.kind !== 208 /* PropertyAccessExpression */) {
                        return void 0;
                    }
                }
                const bases = getBaseTypes(target);
                if (bases.length !== 1) {
                    return void 0;
                }
                if (getMembersOfSymbol(type.symbol).size) {
                    return void 0;
                }
                let instantiatedBase = !length(target.typeParameters) ? bases[0] : instantiateType(bases[0], createTypeMapper(target.typeParameters, getTypeArguments(type).slice(0, target.typeParameters.length)));
                if (length(getTypeArguments(type)) > length(target.typeParameters)) {
                    instantiatedBase = getTypeWithThisArgument(instantiatedBase, last(getTypeArguments(type)));
                }
                type.objectFlags |= 67108864 /* IdenticalBaseTypeExists */;
                return type.cachedEquivalentBaseType = instantiatedBase;
            }