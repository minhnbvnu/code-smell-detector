function doChange2(changes, sourceFile, position, checker, preferences, compilerOptions) {
            const ctorSymbol = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position));
            if (!ctorSymbol || !ctorSymbol.valueDeclaration || !(ctorSymbol.flags & (16 /* Function */ | 3 /* Variable */))) {
                return void 0;
            }
            const ctorDeclaration = ctorSymbol.valueDeclaration;
            if (isFunctionDeclaration(ctorDeclaration) || isFunctionExpression(ctorDeclaration)) {
                changes.replaceNode(sourceFile, ctorDeclaration, createClassFromFunction(ctorDeclaration));
            }
            else if (isVariableDeclaration(ctorDeclaration)) {
                const classDeclaration = createClassFromVariableDeclaration(ctorDeclaration);
                if (!classDeclaration) {
                    return void 0;
                }
                const ancestor = ctorDeclaration.parent.parent;
                if (isVariableDeclarationList(ctorDeclaration.parent) && ctorDeclaration.parent.declarations.length > 1) {
                    changes.delete(sourceFile, ctorDeclaration);
                    changes.insertNodeAfter(sourceFile, ancestor, classDeclaration);
                }
                else {
                    changes.replaceNode(sourceFile, ancestor, classDeclaration);
                }
            }
            function createClassElementsFromSymbol(symbol) {
                const memberElements = [];
                if (symbol.exports) {
                    symbol.exports.forEach((member) => {
                        if (member.name === "prototype" && member.declarations) {
                            const firstDeclaration = member.declarations[0];
                            if (member.declarations.length === 1 && isPropertyAccessExpression(firstDeclaration) && isBinaryExpression(firstDeclaration.parent) && firstDeclaration.parent.operatorToken.kind === 63 /* EqualsToken */ && isObjectLiteralExpression(firstDeclaration.parent.right)) {
                                const prototypes = firstDeclaration.parent.right;
                                createClassElement(prototypes.symbol, 
                                /** modifiers */
                                void 0, memberElements);
                            }
                        }
                        else {
                            createClassElement(member, [factory.createToken(124 /* StaticKeyword */)], memberElements);
                        }
                    });
                }
                if (symbol.members) {
                    symbol.members.forEach((member, key) => {
                        var _a2, _b, _c, _d;
                        if (key === "constructor" && member.valueDeclaration) {
                            const prototypeAssignment = (_d = (_c = (_b = (_a2 = symbol.exports) == null ? void 0 : _a2.get("prototype")) == null ? void 0 : _b.declarations) == null ? void 0 : _c[0]) == null ? void 0 : _d.parent;
                            if (prototypeAssignment && isBinaryExpression(prototypeAssignment) && isObjectLiteralExpression(prototypeAssignment.right) && some(prototypeAssignment.right.properties, isConstructorAssignment)) {
                            }
                            else {
                                changes.delete(sourceFile, member.valueDeclaration.parent);
                            }
                            return;
                        }
                        createClassElement(member, 
                        /*modifiers*/
                        void 0, memberElements);
                    });
                }
                return memberElements;
                function shouldConvertDeclaration(_target, source) {
                    if (isAccessExpression(_target)) {
                        if (isPropertyAccessExpression(_target) && isConstructorAssignment(_target))
                            return true;
                        return isFunctionLike(source);
                    }
                    else {
                        return every(_target.properties, (property) => {
                            if (isMethodDeclaration(property) || isGetOrSetAccessorDeclaration(property))
                                return true;
                            if (isPropertyAssignment(property) && isFunctionExpression(property.initializer) && !!property.name)
                                return true;
                            if (isConstructorAssignment(property))
                                return true;
                            return false;
                        });
                    }
                }
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
            }
            function createClassFromVariableDeclaration(node) {
                const initializer = node.initializer;
                if (!initializer || !isFunctionExpression(initializer) || !isIdentifier(node.name)) {
                    return void 0;
                }
                const memberElements = createClassElementsFromSymbol(node.symbol);
                if (initializer.body) {
                    memberElements.unshift(factory.createConstructorDeclaration(
                    /*modifiers*/
                    void 0, initializer.parameters, initializer.body));
                }
                const modifiers = getModifierKindFromSource(node.parent.parent, 93 /* ExportKeyword */);
                const cls = factory.createClassDeclaration(modifiers, node.name, 
                /*typeParameters*/
                void 0, 
                /*heritageClauses*/
                void 0, memberElements);
                return cls;
            }
            function createClassFromFunction(node) {
                const memberElements = createClassElementsFromSymbol(ctorSymbol);
                if (node.body) {
                    memberElements.unshift(factory.createConstructorDeclaration(
                    /*modifiers*/
                    void 0, node.parameters, node.body));
                }
                const modifiers = getModifierKindFromSource(node, 93 /* ExportKeyword */);
                const cls = factory.createClassDeclaration(modifiers, node.name, 
                /*typeParameters*/
                void 0, 
                /*heritageClauses*/
                void 0, memberElements);
                return cls;
            }
        }