function updateJSDocTypeLikeTagWorker(kind, node, tagName = getDefaultTagName(node), typeExpression, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.comment !== comment ? update(createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment), node) : node;
            }