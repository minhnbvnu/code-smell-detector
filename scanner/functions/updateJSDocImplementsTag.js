function updateJSDocImplementsTag(node, tagName = getDefaultTagName(node), className, comment) {
                return node.tagName !== tagName || node.class !== className || node.comment !== comment ? update(createJSDocImplementsTag(tagName, className, comment), node) : node;
            }