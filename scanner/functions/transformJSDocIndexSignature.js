function transformJSDocIndexSignature(node) {
            const index = factory.createParameterDeclaration(
            /*modifiers*/
            void 0, 
            /*dotDotDotToken*/
            void 0, node.typeArguments[0].kind === 148 /* NumberKeyword */ ? "n" : "s", 
            /*questionToken*/
            void 0, factory.createTypeReferenceNode(node.typeArguments[0].kind === 148 /* NumberKeyword */ ? "number" : "string", []), 
            /*initializer*/
            void 0);
            const indexSignature = factory.createTypeLiteralNode([factory.createIndexSignature(
                /*modifiers*/
                void 0, [index], node.typeArguments[1])]);
            setEmitFlags(indexSignature, 1 /* SingleLine */);
            return indexSignature;
        }