function createImmediatelyInvokedArrowFunction(statements, param, paramValue) {
                return createCallExpression(createArrowFunction(
                /*modifiers*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                param ? [param] : [], 
                /*type*/
                void 0, 
                /*equalsGreaterThanToken*/
                void 0, createBlock(statements, 
                /*multiLine*/
                true)), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                paramValue ? [paramValue] : []);
            }