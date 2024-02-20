function createLet(name, initializer) {
                return factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer)
                ], 1 /* Let */));
            }