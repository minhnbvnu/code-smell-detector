function createConstEqualsRequireDeclaration(name, quotedModuleSpecifier) {
            return factory.createVariableStatement(
            /*modifiers*/
            void 0, factory.createVariableDeclarationList([
                factory.createVariableDeclaration(typeof name === "string" ? factory.createIdentifier(name) : name, 
                /*exclamationToken*/
                void 0, 
                /*type*/
                void 0, factory.createCallExpression(factory.createIdentifier("require"), 
                /*typeArguments*/
                void 0, [quotedModuleSpecifier]))
            ], 2 /* Const */));
        }