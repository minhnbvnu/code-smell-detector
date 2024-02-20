function markPropertyAsReferenced(prop, nodeForCheckWriteOnly, isSelfTypeAccess2) {
                const valueDeclaration = prop && prop.flags & 106500 /* ClassMember */ && prop.valueDeclaration;
                if (!valueDeclaration) {
                    return;
                }
                const hasPrivateModifier = hasEffectiveModifier(valueDeclaration, 8 /* Private */);
                const hasPrivateIdentifier = prop.valueDeclaration && isNamedDeclaration(prop.valueDeclaration) && isPrivateIdentifier(prop.valueDeclaration.name);
                if (!hasPrivateModifier && !hasPrivateIdentifier) {
                    return;
                }
                if (nodeForCheckWriteOnly && isWriteOnlyAccess(nodeForCheckWriteOnly) && !(prop.flags & 65536 /* SetAccessor */)) {
                    return;
                }
                if (isSelfTypeAccess2) {
                    const containingMethod = findAncestor(nodeForCheckWriteOnly, isFunctionLikeDeclaration);
                    if (containingMethod && containingMethod.symbol === prop) {
                        return;
                    }
                }
                (getCheckFlags(prop) & 1 /* Instantiated */ ? getSymbolLinks(prop).target : prop).isReferenced = 67108863 /* All */;
            }