function createArrowFunctionExpressionMember(members2, arrowFunction, name) {
                        const arrowFunctionBody = arrowFunction.body;
                        let bodyBlock;
                        if (arrowFunctionBody.kind === 238 /* Block */) {
                            bodyBlock = arrowFunctionBody;
                        }
                        else {
                            bodyBlock = factory.createBlock([factory.createReturnStatement(arrowFunctionBody)]);
                        }
                        const fullModifiers = concatenate(modifiers, getModifierKindFromSource(arrowFunction, 132 /* AsyncKeyword */));
                        const method = factory.createMethodDeclaration(fullModifiers, 
                        /*asteriskToken*/
                        void 0, name, 
                        /*questionToken*/
                        void 0, 
                        /*typeParameters*/
                        void 0, arrowFunction.parameters, 
                        /*type*/
                        void 0, bodyBlock);
                        copyLeadingComments(assignmentBinaryExpression, method, sourceFile);
                        members2.push(method);
                    }