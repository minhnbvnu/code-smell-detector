function createJSDocTypeLiteral(propertyTags, isArrayType = false) {
                const node = createBaseDeclaration(325 /* JSDocTypeLiteral */);
                node.jsDocPropertyTags = asNodeArray(propertyTags);
                node.isArrayType = isArrayType;
                return node;
            }