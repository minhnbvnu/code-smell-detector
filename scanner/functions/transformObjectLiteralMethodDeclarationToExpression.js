function transformObjectLiteralMethodDeclarationToExpression(method, receiver, container, startsOnNewLine) {
                const expression = factory2.createAssignment(createMemberAccessForPropertyName(factory2, receiver, Debug.checkDefined(visitNode(method.name, visitor, isPropertyName))), transformFunctionLikeToExpression(method, 
                /*location*/
                method, 
                /*name*/
                void 0, container));
                setTextRange(expression, method);
                if (startsOnNewLine) {
                    startOnNewLine(expression);
                }
                return expression;
            }