function updateJSDocComment(node, comment, tags) {
                return node.comment !== comment || node.tags !== tags ? update(createJSDocComment(comment, tags), node) : node;
            }