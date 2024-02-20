function getThisArgumentType(thisArgumentNode) {
                if (!thisArgumentNode) {
                    return voidType;
                }
                const thisArgumentType = checkExpression(thisArgumentNode);
                return isOptionalChainRoot(thisArgumentNode.parent) ? getNonNullableType(thisArgumentType) : isOptionalChain(thisArgumentNode.parent) ? removeOptionalTypeMarker(thisArgumentType) : thisArgumentType;
            }