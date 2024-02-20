function updateParenthesizedType(node, type) {
                return node.type !== type ? update(createParenthesizedType(type), node) : node;
            }