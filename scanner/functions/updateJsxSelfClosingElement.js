function updateJsxSelfClosingElement(node, tagName, typeArguments, attributes) {
                return node.tagName !== tagName || node.typeArguments !== typeArguments || node.attributes !== attributes ? update(createJsxSelfClosingElement(tagName, typeArguments, attributes), node) : node;
            }