function getTypeOfExpression(node) {
                const quickType = getQuickTypeOfExpression(node);
                if (quickType) {
                    return quickType;
                }
                if (node.flags & 134217728 /* TypeCached */ && flowTypeCache) {
                    const cachedType = flowTypeCache[getNodeId(node)];
                    if (cachedType) {
                        return cachedType;
                    }
                }
                const startInvocationCount = flowInvocationCount;
                const type = checkExpression(node);
                if (flowInvocationCount !== startInvocationCount) {
                    const cache = flowTypeCache || (flowTypeCache = []);
                    cache[getNodeId(node)] = type;
                    setNodeFlags(node, node.flags | 134217728 /* TypeCached */);
                }
                return type;
            }