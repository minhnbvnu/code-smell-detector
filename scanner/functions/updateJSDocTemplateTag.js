function updateJSDocTemplateTag(node, tagName = getDefaultTagName(node), constraint, typeParameters, comment) {
                return node.tagName !== tagName || node.constraint !== constraint || node.typeParameters !== typeParameters || node.comment !== comment ? update(createJSDocTemplateTag(tagName, constraint, typeParameters, comment), node) : node;
            }