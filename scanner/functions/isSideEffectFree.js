function isSideEffectFree(node) {
                return SIDE_EFFECT_FREE_NODE_TYPES.has(node.type);
            }