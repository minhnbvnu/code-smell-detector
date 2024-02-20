function isPropertyAccessible(node, isSuper, isWrite, containingType, property) {
                if (isTypeAny(containingType)) {
                    return true;
                }
                if (property.valueDeclaration && isPrivateIdentifierClassElementDeclaration(property.valueDeclaration)) {
                    const declClass = getContainingClass(property.valueDeclaration);
                    return !isOptionalChain(node) && !!findAncestor(node, (parent2) => parent2 === declClass);
                }
                return checkPropertyAccessibilityAtLocation(node, isSuper, isWrite, containingType, property);
            }