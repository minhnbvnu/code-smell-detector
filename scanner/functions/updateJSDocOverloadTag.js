function updateJSDocOverloadTag(node, tagName = getDefaultTagName(node), typeExpression, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.comment !== comment ? update(createJSDocOverloadTag(tagName, typeExpression, comment), node) : node;
            }