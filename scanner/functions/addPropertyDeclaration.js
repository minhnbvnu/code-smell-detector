function addPropertyDeclaration(changeTracker, sourceFile, node, tokenName, typeNode, modifierFlags) {
            const modifiers = modifierFlags ? factory.createNodeArray(factory.createModifiersFromModifierFlags(modifierFlags)) : void 0;
            const property = isClassLike(node) ? factory.createPropertyDeclaration(modifiers, tokenName, 
            /*questionToken*/
            void 0, typeNode, 
            /*initializer*/
            void 0) : factory.createPropertySignature(
            /*modifiers*/
            void 0, tokenName, 
            /*questionToken*/
            void 0, typeNode);
            const lastProp = getNodeToInsertPropertyAfter(node);
            if (lastProp) {
                changeTracker.insertNodeAfter(sourceFile, lastProp, property);
            }
            else {
                changeTracker.insertMemberAtStart(sourceFile, node, property);
            }
        }