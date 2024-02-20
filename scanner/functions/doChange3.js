function doChange3(changeTracker, sourceFile, qualifiedName) {
            const rightText = qualifiedName.right.text;
            const replacement = factory.createIndexedAccessTypeNode(factory.createTypeReferenceNode(qualifiedName.left, 
            /*typeArguments*/
            void 0), factory.createLiteralTypeNode(factory.createStringLiteral(rightText)));
            changeTracker.replaceNode(sourceFile, qualifiedName, replacement);
        }