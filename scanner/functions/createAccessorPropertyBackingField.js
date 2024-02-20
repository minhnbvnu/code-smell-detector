function createAccessorPropertyBackingField(factory2, node, modifiers, initializer) {
            return factory2.updatePropertyDeclaration(node, modifiers, factory2.getGeneratedPrivateNameForNode(node.name, 
            /*prefix*/
            void 0, "_accessor_storage"), 
            /*questionOrExclamationToken*/
            void 0, 
            /*type*/
            void 0, initializer);
        }