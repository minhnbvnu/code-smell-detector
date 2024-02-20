function updateJSDocTypedefTag(node, tagName = getDefaultTagName(node), typeExpression, fullName, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.fullName !== fullName || node.comment !== comment ? update(createJSDocTypedefTag(tagName, typeExpression, fullName, comment), node) : node;
            }