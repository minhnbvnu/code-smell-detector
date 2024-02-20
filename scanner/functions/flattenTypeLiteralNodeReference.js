function flattenTypeLiteralNodeReference(checker, node) {
            if (!node)
                return void 0;
            if (isIntersectionTypeNode(node)) {
                const result = [];
                const seen = /* @__PURE__ */ new Map();
                for (const type of node.types) {
                    const flattenedTypeMembers = flattenTypeLiteralNodeReference(checker, type);
                    if (!flattenedTypeMembers || !flattenedTypeMembers.every((type2) => type2.name && addToSeen(seen, getNameFromPropertyName(type2.name)))) {
                        return void 0;
                    }
                    addRange(result, flattenedTypeMembers);
                }
                return result;
            }
            else if (isParenthesizedTypeNode(node)) {
                return flattenTypeLiteralNodeReference(checker, node.type);
            }
            else if (isTypeLiteralNode(node)) {
                return node.members;
            }
            return void 0;
        }