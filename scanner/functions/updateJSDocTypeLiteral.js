function updateJSDocTypeLiteral(node, propertyTags, isArrayType) {
                return node.jsDocPropertyTags !== propertyTags || node.isArrayType !== isArrayType ? update(createJSDocTypeLiteral(propertyTags, isArrayType), node) : node;
            }