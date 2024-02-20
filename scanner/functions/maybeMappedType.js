function maybeMappedType(node, symbol) {
                const container = findAncestor(node.parent, (n) => isComputedPropertyName(n) || isPropertySignature(n) ? false : isTypeLiteralNode(n) || "quit");
                if (container && container.members.length === 1) {
                    const type = getDeclaredTypeOfSymbol(symbol);
                    return !!(type.flags & 1048576 /* Union */) && allTypesAssignableToKind(type, 384 /* StringOrNumberLiteral */, 
                    /*strict*/
                    true);
                }
                return false;
            }