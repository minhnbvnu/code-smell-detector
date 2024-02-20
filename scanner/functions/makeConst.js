function makeConst(modifiers, name, init) {
            return factory.createVariableStatement(modifiers, factory.createVariableDeclarationList([factory.createVariableDeclaration(name, 
                /*exclamationToken*/
                void 0, 
                /*type*/
                void 0, init)], 2 /* Const */));
        }