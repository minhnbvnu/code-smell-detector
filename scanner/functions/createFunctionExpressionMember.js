function createFunctionExpressionMember(members2, functionExpression, name) {
                        const fullModifiers = concatenate(modifiers, getModifierKindFromSource(functionExpression, 132 /* AsyncKeyword */));
                        const method = factory.createMethodDeclaration(fullModifiers, 
                        /*asteriskToken*/
                        void 0, name, 
                        /*questionToken*/
                        void 0, 
                        /*typeParameters*/
                        void 0, functionExpression.parameters, 
                        /*type*/
                        void 0, functionExpression.body);
                        copyLeadingComments(assignmentBinaryExpression, method, sourceFile);
                        members2.push(method);
                        return;
                    }