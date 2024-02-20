function updateJSDocSeeTag(node, tagName, name, comment) {
                return node.tagName !== tagName || node.name !== name || node.comment !== comment ? update(createJSDocSeeTag(tagName, name, comment), node) : node;
            }