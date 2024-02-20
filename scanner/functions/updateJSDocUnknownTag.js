function updateJSDocUnknownTag(node, tagName, comment) {
                return node.tagName !== tagName || node.comment !== comment ? update(createJSDocUnknownTag(tagName, comment), node) : node;
            }