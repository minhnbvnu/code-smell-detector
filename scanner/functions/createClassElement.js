function createClassElement(symbol2, modifiers, members) {
                    if (!(symbol2.flags & 8192 /* Method */) && !(symbol2.flags & 4096 /* ObjectLiteral */)) {
                        return;
                    }
                    const memberDeclaration = symbol2.valueDeclaration;
                    const assignmentBinaryExpression = memberDeclaration.parent;
                    const assignmentExpr = assignmentBinaryExpression.right;
                    if (!shouldConvertDeclaration(memberDeclaration, assignmentExpr)) {
                        return;
                    }
                    if (some(members, (m) => {
                        const name = getNameOfDeclaration(m);
                        if (name && isIdentifier(name) && idText(name) === symbolName(symbol2)) {
                            return true;
                        }
                        return false;
                    })) {
                        return;
                    }
                    const nodeToDelete = assignmentBinaryExpression.parent && assignmentBinaryExpression.parent.kind === 241 /* ExpressionStatement */ ? assignmentBinaryExpression.parent : assignmentBinaryExpression;
                    changes.delete(sourceFile, nodeToDelete);
                    if (!assignmentExpr) {
                        members.push(factory.createPropertyDeclaration(modifiers, symbol2.name, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0, 
                        /*initializer*/
                        void 0));
                        return;
                    }
                    if (isAccessExpression(memberDeclaration) && (isFunctionExpression(assignmentExpr) || isArrowFunction(assignmentExpr))) {
                        const quotePreference = getQuotePreference(sourceFile, preferences);
                        const name = tryGetPropertyName(memberDeclaration, compilerOptions, quotePreference);
                        if (name) {
                            createFunctionLikeExpressionMember(members, assignmentExpr, name);
                        }
                        return;
                    }
                    else if (isObjectLiteralExpression(assignmentExpr)) {
                        forEach(assignmentExpr.properties, (property) => {
                            if (isMethodDeclaration(property) || isGetOrSetAccessorDeclaration(property)) {
                                members.push(property);
                            }
                            if (isPropertyAssignment(property) && isFunctionExpression(property.initializer)) {
                                createFunctionLikeExpressionMember(members, property.initializer, property.name);
                            }
                            if (isConstructorAssignment(property))
                                return;
                            return;
                        });
                        return;
                    }
                    else {
                        if (isSourceFileJS(sourceFile))
                            return;
                        if (!isPropertyAccessExpression(memberDeclaration))
                            return;
                        const prop = factory.createPropertyDeclaration(modifiers, memberDeclaration.name, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0, assignmentExpr);
                        copyLeadingComments(assignmentBinaryExpression.parent, prop, sourceFile);
                        members.push(prop);
                        return;
                    }
                    function createFunctionLikeExpressionMember(members2, expression, name) {
                        if (isFunctionExpression(expression))
                            return createFunctionExpressionMember(members2, expression, name);
                        else
                            return createArrowFunctionExpressionMember(members2, expression, name);
                    }
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
                }