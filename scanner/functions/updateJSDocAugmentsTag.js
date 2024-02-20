function updateJSDocAugmentsTag(node, tagName = getDefaultTagName(node), className, comment) {
                return node.tagName !== tagName || node.class !== className || node.comment !== comment ? update(createJSDocAugmentsTag(tagName, className, comment), node) : node;
            }