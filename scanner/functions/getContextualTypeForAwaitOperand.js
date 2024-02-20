function getContextualTypeForAwaitOperand(node, contextFlags) {
                const contextualType = getContextualType2(node, contextFlags);
                if (contextualType) {
                    const contextualAwaitedType = getAwaitedTypeNoAlias(contextualType);
                    return contextualAwaitedType && getUnionType([contextualAwaitedType, createPromiseLikeType(contextualAwaitedType)]);
                }
                return void 0;
            }