function isConstTypeParameterContext(node) {
                const contextualType = getContextualType2(node, 0 /* None */);
                return !!contextualType && someType(contextualType, isConstTypeVariable);
            }