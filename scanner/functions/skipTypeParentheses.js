function skipTypeParentheses(node) {
            while (isParenthesizedTypeNode(node))
                node = node.type;
            return node;
        }