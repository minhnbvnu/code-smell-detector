function addDefaultValueAssignmentForBindingPattern(parameter, context) {
            const { factory: factory2 } = context;
            context.addInitializationStatement(factory2.createVariableStatement(
            /*modifiers*/
            void 0, factory2.createVariableDeclarationList([
                factory2.createVariableDeclaration(parameter.name, 
                /*exclamationToken*/
                void 0, parameter.type, parameter.initializer ? factory2.createConditionalExpression(factory2.createStrictEquality(factory2.getGeneratedNameForNode(parameter), factory2.createVoidZero()), 
                /*questionToken*/
                void 0, parameter.initializer, 
                /*colonToken*/
                void 0, factory2.getGeneratedNameForNode(parameter)) : factory2.getGeneratedNameForNode(parameter))
            ])));
            return factory2.updateParameterDeclaration(parameter, parameter.modifiers, parameter.dotDotDotToken, factory2.getGeneratedNameForNode(parameter), parameter.questionToken, parameter.type, 
            /*initializer*/
            void 0);
        }