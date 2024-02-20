function extractConstantInScope(node, scope, { substitutions }, rangeFacts, context) {
            const checker = context.program.getTypeChecker();
            const file = scope.getSourceFile();
            const localNameText = isPropertyAccessExpression(node) && !isClassLike(scope) && !checker.resolveName(node.name.text, node, 111551 /* Value */, 
            /*excludeGlobals*/
            false) && !isPrivateIdentifier(node.name) && !identifierToKeywordKind(node.name) ? node.name.text : getUniqueName(isClassLike(scope) ? "newProperty" : "newLocal", file);
            const isJS = isInJSFile(scope);
            let variableType = isJS || !checker.isContextSensitive(node) ? void 0 : checker.typeToTypeNode(checker.getContextualType(node), scope, 1 /* NoTruncation */);
            let initializer = transformConstantInitializer(skipParentheses(node), substitutions);
            ({ variableType, initializer } = transformFunctionInitializerAndType(variableType, initializer));
            suppressLeadingAndTrailingTrivia(initializer);
            const changeTracker = ts_textChanges_exports.ChangeTracker.fromContext(context);
            if (isClassLike(scope)) {
                Debug.assert(!isJS, "Cannot extract to a JS class");
                const modifiers = [];
                modifiers.push(factory.createModifier(121 /* PrivateKeyword */));
                if (rangeFacts & 32 /* InStaticRegion */) {
                    modifiers.push(factory.createModifier(124 /* StaticKeyword */));
                }
                modifiers.push(factory.createModifier(146 /* ReadonlyKeyword */));
                const newVariable = factory.createPropertyDeclaration(modifiers, localNameText, 
                /*questionToken*/
                void 0, variableType, initializer);
                let localReference = factory.createPropertyAccessExpression(rangeFacts & 32 /* InStaticRegion */ ? factory.createIdentifier(scope.name.getText()) : factory.createThis(), factory.createIdentifier(localNameText));
                if (isInJSXContent(node)) {
                    localReference = factory.createJsxExpression(
                    /*dotDotDotToken*/
                    void 0, localReference);
                }
                const maxInsertionPos = node.pos;
                const nodeToInsertBefore = getNodeToInsertPropertyBefore(maxInsertionPos, scope);
                changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newVariable, 
                /*blankLineBetween*/
                true);
                changeTracker.replaceNode(context.file, node, localReference);
            }
            else {
                const newVariableDeclaration = factory.createVariableDeclaration(localNameText, 
                /*exclamationToken*/
                void 0, variableType, initializer);
                const oldVariableDeclaration = getContainingVariableDeclarationIfInList(node, scope);
                if (oldVariableDeclaration) {
                    changeTracker.insertNodeBefore(context.file, oldVariableDeclaration, newVariableDeclaration);
                    const localReference = factory.createIdentifier(localNameText);
                    changeTracker.replaceNode(context.file, node, localReference);
                }
                else if (node.parent.kind === 241 /* ExpressionStatement */ && scope === findAncestor(node, isScope)) {
                    const newVariableStatement = factory.createVariableStatement(
                    /*modifiers*/
                    void 0, factory.createVariableDeclarationList([newVariableDeclaration], 2 /* Const */));
                    changeTracker.replaceNode(context.file, node.parent, newVariableStatement);
                }
                else {
                    const newVariableStatement = factory.createVariableStatement(
                    /*modifiers*/
                    void 0, factory.createVariableDeclarationList([newVariableDeclaration], 2 /* Const */));
                    const nodeToInsertBefore = getNodeToInsertConstantBefore(node, scope);
                    if (nodeToInsertBefore.pos === 0) {
                        changeTracker.insertNodeAtTopOfFile(context.file, newVariableStatement, 
                        /*blankLineBetween*/
                        false);
                    }
                    else {
                        changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newVariableStatement, 
                        /*blankLineBetween*/
                        false);
                    }
                    if (node.parent.kind === 241 /* ExpressionStatement */) {
                        changeTracker.delete(context.file, node.parent);
                    }
                    else {
                        let localReference = factory.createIdentifier(localNameText);
                        if (isInJSXContent(node)) {
                            localReference = factory.createJsxExpression(
                            /*dotDotDotToken*/
                            void 0, localReference);
                        }
                        changeTracker.replaceNode(context.file, node, localReference);
                    }
                }
            }
            const edits = changeTracker.getChanges();
            const renameFilename = node.getSourceFile().fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, localNameText, 
            /*isDeclaredBeforeUse*/
            true);
            return { renameFilename, renameLocation, edits };
            function transformFunctionInitializerAndType(variableType2, initializer2) {
                if (variableType2 === void 0)
                    return { variableType: variableType2, initializer: initializer2 };
                if (!isFunctionExpression(initializer2) && !isArrowFunction(initializer2) || !!initializer2.typeParameters)
                    return { variableType: variableType2, initializer: initializer2 };
                const functionType = checker.getTypeAtLocation(node);
                const functionSignature = singleOrUndefined(checker.getSignaturesOfType(functionType, 0 /* Call */));
                if (!functionSignature)
                    return { variableType: variableType2, initializer: initializer2 };
                if (!!functionSignature.getTypeParameters())
                    return { variableType: variableType2, initializer: initializer2 };
                const parameters = [];
                let hasAny = false;
                for (const p of initializer2.parameters) {
                    if (p.type) {
                        parameters.push(p);
                    }
                    else {
                        const paramType = checker.getTypeAtLocation(p);
                        if (paramType === checker.getAnyType())
                            hasAny = true;
                        parameters.push(factory.updateParameterDeclaration(p, p.modifiers, p.dotDotDotToken, p.name, p.questionToken, p.type || checker.typeToTypeNode(paramType, scope, 1 /* NoTruncation */), p.initializer));
                    }
                }
                if (hasAny)
                    return { variableType: variableType2, initializer: initializer2 };
                variableType2 = void 0;
                if (isArrowFunction(initializer2)) {
                    initializer2 = factory.updateArrowFunction(initializer2, canHaveModifiers(node) ? getModifiers(node) : void 0, initializer2.typeParameters, parameters, initializer2.type || checker.typeToTypeNode(functionSignature.getReturnType(), scope, 1 /* NoTruncation */), initializer2.equalsGreaterThanToken, initializer2.body);
                }
                else {
                    if (functionSignature && !!functionSignature.thisParameter) {
                        const firstParameter = firstOrUndefined(parameters);
                        if (!firstParameter || isIdentifier(firstParameter.name) && firstParameter.name.escapedText !== "this") {
                            const thisType = checker.getTypeOfSymbolAtLocation(functionSignature.thisParameter, node);
                            parameters.splice(0, 0, factory.createParameterDeclaration(
                            /* modifiers */
                            void 0, 
                            /* dotDotDotToken */
                            void 0, "this", 
                            /* questionToken */
                            void 0, checker.typeToTypeNode(thisType, scope, 1 /* NoTruncation */)));
                        }
                    }
                    initializer2 = factory.updateFunctionExpression(initializer2, canHaveModifiers(node) ? getModifiers(node) : void 0, initializer2.asteriskToken, initializer2.name, initializer2.typeParameters, parameters, initializer2.type || checker.typeToTypeNode(functionSignature.getReturnType(), scope, 1 /* NoTruncation */), initializer2.body);
                }
                return { variableType: variableType2, initializer: initializer2 };
            }
        }