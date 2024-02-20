function updateJsxOpeningElement(node, tagName, typeArguments, attributes) {
                return node.tagName !== tagName || node.typeArguments !== typeArguments || node.attributes !== attributes ? update(createJsxOpeningElement(tagName, typeArguments, attributes), node) : node;
            }