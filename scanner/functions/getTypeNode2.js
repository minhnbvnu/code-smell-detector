function getTypeNode2(checker, node, token) {
            let typeNode;
            if (token.parent.parent.kind === 223 /* BinaryExpression */) {
                const binaryExpression = token.parent.parent;
                const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
                const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)));
                typeNode = checker.typeToTypeNode(widenedType, node, 1 /* NoTruncation */);
            }
            else {
                const contextualType = checker.getContextualType(token.parent);
                typeNode = contextualType ? checker.typeToTypeNode(contextualType, 
                /*enclosingDeclaration*/
                void 0, 1 /* NoTruncation */) : void 0;
            }
            return typeNode || factory.createKeywordTypeNode(131 /* AnyKeyword */);
        }