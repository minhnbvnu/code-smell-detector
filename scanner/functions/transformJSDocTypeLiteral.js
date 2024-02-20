function transformJSDocTypeLiteral(node) {
            const typeNode = factory.createTypeLiteralNode(map(node.jsDocPropertyTags, (tag) => factory.createPropertySignature(
            /*modifiers*/
            void 0, isIdentifier(tag.name) ? tag.name : tag.name.right, isOptionalJSDocPropertyLikeTag(tag) ? factory.createToken(57 /* QuestionToken */) : void 0, tag.typeExpression && visitNode(tag.typeExpression.type, transformJSDocType, isTypeNode) || factory.createKeywordTypeNode(131 /* AnyKeyword */))));
            setEmitFlags(typeNode, 1 /* SingleLine */);
            return typeNode;
        }