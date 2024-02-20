function createExpressionForMethodDeclaration(factory2, method, receiver) {
            return setOriginalNode(setTextRange(factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, method.name, 
            /*location*/
            method.name), setOriginalNode(setTextRange(factory2.createFunctionExpression(getModifiers(method), method.asteriskToken, 
            /*name*/
            void 0, 
            /*typeParameters*/
            void 0, method.parameters, 
            /*type*/
            void 0, method.body
            // TODO: GH#18217
            ), 
            /*location*/
            method), 
            /*original*/
            method)), 
            /*location*/
            method), 
            /*original*/
            method);
        }