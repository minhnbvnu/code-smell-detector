function parseSimpleArrowFunctionExpression(pos, identifier, allowReturnTypeInArrowFunction, asyncModifier) {
                        Debug.assert(token() === 38 /* EqualsGreaterThanToken */, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
                        const parameter = factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, identifier, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0, 
                        /*initializer*/
                        void 0);
                        finishNode(parameter, identifier.pos);
                        const parameters = createNodeArray([parameter], parameter.pos, parameter.end);
                        const equalsGreaterThanToken = parseExpectedToken(38 /* EqualsGreaterThanToken */);
                        const body = parseArrowFunctionExpressionBody(
                        /*isAsync*/
                        !!asyncModifier, allowReturnTypeInArrowFunction);
                        const node = factory2.createArrowFunction(asyncModifier, 
                        /*typeParameters*/
                        void 0, parameters, 
                        /*type*/
                        void 0, equalsGreaterThanToken, body);
                        return addJSDocComment(finishNode(node, pos));
                    }