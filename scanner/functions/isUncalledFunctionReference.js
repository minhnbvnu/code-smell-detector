function isUncalledFunctionReference(node, symbol) {
                if (symbol.flags & (16 /* Function */ | 8192 /* Method */)) {
                    const parent2 = findAncestor(node.parent, (n) => !isAccessExpression(n)) || node.parent;
                    if (isCallLikeExpression(parent2)) {
                        return isCallOrNewExpression(parent2) && isIdentifier(node) && hasMatchingArgument(parent2, node);
                    }
                    return every(symbol.declarations, (d) => !isFunctionLike(d) || !!(getCombinedNodeFlags(d) & 268435456 /* Deprecated */));
                }
                return true;
            }