function updateJSDocEnumTag(node, tagName = getDefaultTagName(node), typeExpression, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.comment !== comment ? update(createJSDocEnumTag(tagName, typeExpression, comment), node) : node;
            }