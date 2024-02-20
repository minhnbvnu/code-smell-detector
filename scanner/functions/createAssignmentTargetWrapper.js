function createAssignmentTargetWrapper(paramName, expression) {
                return createPropertyAccessExpression(
                // Explicit parens required because of v8 regression (https://bugs.chromium.org/p/v8/issues/detail?id=9560)
                createParenthesizedExpression(createObjectLiteralExpression([
                    createSetAccessorDeclaration(
                    /*modifiers*/
                    void 0, "value", [createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, paramName, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0, 
                        /*initializer*/
                        void 0)], createBlock([
                        createExpressionStatement(expression)
                    ]))
                ])), "value");
            }