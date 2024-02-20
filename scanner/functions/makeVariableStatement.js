function makeVariableStatement(name, type, initializer, flags = 2 /* Const */) {
            return factory.createVariableStatement(
            /*modifiers*/
            void 0, factory.createVariableDeclarationList([factory.createVariableDeclaration(name, 
                /*exclamationToken*/
                void 0, type, initializer)], flags));
        }