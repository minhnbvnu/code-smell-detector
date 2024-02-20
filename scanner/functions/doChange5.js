function doChange5(changes, sourceFile, { container, typeNode, constraint, name }) {
            changes.replaceNode(sourceFile, container, factory.createMappedTypeNode(
            /*readonlyToken*/
            void 0, factory.createTypeParameterDeclaration(
            /*modifiers*/
            void 0, name, factory.createTypeReferenceNode(constraint)), 
            /*nameType*/
            void 0, 
            /*questionToken*/
            void 0, typeNode, 
            /*members*/
            void 0));
        }