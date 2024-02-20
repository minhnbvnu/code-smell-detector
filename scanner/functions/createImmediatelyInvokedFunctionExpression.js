function createImmediatelyInvokedFunctionExpression(statements, param, paramValue) {
                return createCallExpression(createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                param ? [param] : [], 
                /*type*/
                void 0, createBlock(statements, 
                /*multiLine*/
                true)), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                paramValue ? [paramValue] : []);
            }