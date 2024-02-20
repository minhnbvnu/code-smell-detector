function transformJSDocOptionalType(node) {
            return factory.createUnionTypeNode([visitNode(node.type, transformJSDocType, isTypeNode), factory.createTypeReferenceNode("undefined", emptyArray)]);
        }