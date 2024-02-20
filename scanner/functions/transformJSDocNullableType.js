function transformJSDocNullableType(node) {
            return factory.createUnionTypeNode([visitNode(node.type, transformJSDocType, isTypeNode), factory.createTypeReferenceNode("null", emptyArray)]);
        }