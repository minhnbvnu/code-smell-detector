function updateJSDocTypeExpression(node, type) {
                return node.type !== type ? update(createJSDocTypeExpression(type), node) : node;
            }