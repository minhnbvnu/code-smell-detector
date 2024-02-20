function transformJSDocVariadicType(node) {
            return factory.createArrayTypeNode(visitNode(node.type, transformJSDocType, isTypeNode));
        }