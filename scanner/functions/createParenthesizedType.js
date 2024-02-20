function createParenthesizedType(type) {
                const node = createBaseNode(193 /* ParenthesizedType */);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }