function doChange20(changes, sourceFile, oldTypeNode, newType, checker) {
            changes.replaceNode(sourceFile, oldTypeNode, checker.typeToTypeNode(newType, 
            /*enclosingDeclaration*/
            oldTypeNode, 
            /*flags*/
            void 0));
        }