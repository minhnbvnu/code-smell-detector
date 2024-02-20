function extractFunctionInScope(node, scope, { usages: usagesInScope, typeParameterUsages, substitutions }, exposedVariableDeclarations, range, context) {
            const checker = context.program.getTypeChecker();
            const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
            const importAdder = ts_codefix_exports.createImportAdder(context.file, context.program, context.preferences, context.host);
            const file = scope.getSourceFile();
            const functionNameText = getUniqueName(isClassLike(scope) ? "newMethod" : "newFunction", file);
            const isJS = isInJSFile(scope);
            const functionName = factory.createIdentifier(functionNameText);
            let returnType;
            const parameters = [];
            const callArguments = [];
            let writes;
            usagesInScope.forEach((usage, name) => {
                let typeNode;
                if (!isJS) {
                    let type = checker.getTypeOfSymbolAtLocation(usage.symbol, usage.node);
                    type = checker.getBaseTypeOfLiteralType(type);
                    typeNode = ts_codefix_exports.typeToAutoImportableTypeNode(checker, importAdder, type, scope, scriptTarget, 1 /* NoTruncation */);
                }
                const paramDecl = factory.createParameterDeclaration(
                /*modifiers*/
                void 0, 
                /*dotDotDotToken*/
                void 0, 
                /*name*/
                name, 
                /*questionToken*/
                void 0, typeNode);
                parameters.push(paramDecl);
                if (usage.usage === 2 /* Write */) {
                    (writes || (writes = [])).push(usage);
                }
                callArguments.push(factory.createIdentifier(name));
            });
            const typeParametersAndDeclarations = arrayFrom(typeParameterUsages.values(), (type) => ({ type, declaration: getFirstDeclaration(type) }));
            const sortedTypeParametersAndDeclarations = typeParametersAndDeclarations.sort(compareTypesByDeclarationOrder);
            const typeParameters = sortedTypeParametersAndDeclarations.length === 0 ? void 0 : sortedTypeParametersAndDeclarations.map((t) => t.declaration);
            const callTypeArguments = typeParameters !== void 0 ? typeParameters.map((decl) => factory.createTypeReferenceNode(decl.name, 
            /*typeArguments*/
            void 0)) : void 0;
            if (isExpression(node) && !isJS) {
                const contextualType = checker.getContextualType(node);
                returnType = checker.typeToTypeNode(contextualType, scope, 1 /* NoTruncation */);
            }
            const { body, returnValueProperty } = transformFunctionBody(node, exposedVariableDeclarations, writes, substitutions, !!(range.facts & 1 /* HasReturn */));
            suppressLeadingAndTrailingTrivia(body);
            let newFunction;
            const callThis = !!(range.facts & 16 /* UsesThisInFunction */);
            if (isClassLike(scope)) {
                const modifiers = isJS ? [] : [factory.createModifier(121 /* PrivateKeyword */)];
                if (range.facts & 32 /* InStaticRegion */) {
                    modifiers.push(factory.createModifier(124 /* StaticKeyword */));
                }
                if (range.facts & 4 /* IsAsyncFunction */) {
                    modifiers.push(factory.createModifier(132 /* AsyncKeyword */));
                }
                newFunction = factory.createMethodDeclaration(modifiers.length ? modifiers : void 0, range.facts & 2 /* IsGenerator */ ? factory.createToken(41 /* AsteriskToken */) : void 0, functionName, 
                /*questionToken*/
                void 0, typeParameters, parameters, returnType, body);
            }
            else {
                if (callThis) {
                    parameters.unshift(factory.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, 
                    /*name*/
                    "this", 
                    /*questionToken*/
                    void 0, checker.typeToTypeNode(checker.getTypeAtLocation(range.thisNode), scope, 1 /* NoTruncation */), 
                    /*initializer*/
                    void 0));
                }
                newFunction = factory.createFunctionDeclaration(range.facts & 4 /* IsAsyncFunction */ ? [factory.createToken(132 /* AsyncKeyword */)] : void 0, range.facts & 2 /* IsGenerator */ ? factory.createToken(41 /* AsteriskToken */) : void 0, functionName, typeParameters, parameters, returnType, body);
            }
            const changeTracker = ts_textChanges_exports.ChangeTracker.fromContext(context);
            const minInsertionPos = (isReadonlyArray(range.range) ? last(range.range) : range.range).end;
            const nodeToInsertBefore = getNodeToInsertFunctionBefore(minInsertionPos, scope);
            if (nodeToInsertBefore) {
                changeTracker.insertNodeBefore(context.file, nodeToInsertBefore, newFunction, 
                /*blankLineBetween*/
                true);
            }
            else {
                changeTracker.insertNodeAtEndOfScope(context.file, scope, newFunction);
            }
            importAdder.writeFixes(changeTracker);
            const newNodes = [];
            const called = getCalledExpression(scope, range, functionNameText);
            if (callThis) {
                callArguments.unshift(factory.createIdentifier("this"));
            }
            let call = factory.createCallExpression(callThis ? factory.createPropertyAccessExpression(called, "call") : called, callTypeArguments, 
            // Note that no attempt is made to take advantage of type argument inference
            callArguments);
            if (range.facts & 2 /* IsGenerator */) {
                call = factory.createYieldExpression(factory.createToken(41 /* AsteriskToken */), call);
            }
            if (range.facts & 4 /* IsAsyncFunction */) {
                call = factory.createAwaitExpression(call);
            }
            if (isInJSXContent(node)) {
                call = factory.createJsxExpression(
                /*dotDotDotToken*/
                void 0, call);
            }
            if (exposedVariableDeclarations.length && !writes) {
                Debug.assert(!returnValueProperty, "Expected no returnValueProperty");
                Debug.assert(!(range.facts & 1 /* HasReturn */), "Expected RangeFacts.HasReturn flag to be unset");
                if (exposedVariableDeclarations.length === 1) {
                    const variableDeclaration = exposedVariableDeclarations[0];
                    newNodes.push(factory.createVariableStatement(
                    /*modifiers*/
                    void 0, factory.createVariableDeclarationList([factory.createVariableDeclaration(getSynthesizedDeepClone(variableDeclaration.name), 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        getSynthesizedDeepClone(variableDeclaration.type), 
                        /*initializer*/
                        call)], variableDeclaration.parent.flags)));
                }
                else {
                    const bindingElements = [];
                    const typeElements = [];
                    let commonNodeFlags = exposedVariableDeclarations[0].parent.flags;
                    let sawExplicitType = false;
                    for (const variableDeclaration of exposedVariableDeclarations) {
                        bindingElements.push(factory.createBindingElement(
                        /*dotDotDotToken*/
                        void 0, 
                        /*propertyName*/
                        void 0, 
                        /*name*/
                        getSynthesizedDeepClone(variableDeclaration.name)));
                        const variableType = checker.typeToTypeNode(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(variableDeclaration)), scope, 1 /* NoTruncation */);
                        typeElements.push(factory.createPropertySignature(
                        /*modifiers*/
                        void 0, 
                        /*name*/
                        variableDeclaration.symbol.name, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        variableType));
                        sawExplicitType = sawExplicitType || variableDeclaration.type !== void 0;
                        commonNodeFlags = commonNodeFlags & variableDeclaration.parent.flags;
                    }
                    const typeLiteral = sawExplicitType ? factory.createTypeLiteralNode(typeElements) : void 0;
                    if (typeLiteral) {
                        setEmitFlags(typeLiteral, 1 /* SingleLine */);
                    }
                    newNodes.push(factory.createVariableStatement(
                    /*modifiers*/
                    void 0, factory.createVariableDeclarationList([factory.createVariableDeclaration(factory.createObjectBindingPattern(bindingElements), 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        typeLiteral, 
                        /*initializer*/
                        call)], commonNodeFlags)));
                }
            }
            else if (exposedVariableDeclarations.length || writes) {
                if (exposedVariableDeclarations.length) {
                    for (const variableDeclaration of exposedVariableDeclarations) {
                        let flags = variableDeclaration.parent.flags;
                        if (flags & 2 /* Const */) {
                            flags = flags & ~2 /* Const */ | 1 /* Let */;
                        }
                        newNodes.push(factory.createVariableStatement(
                        /*modifiers*/
                        void 0, factory.createVariableDeclarationList([factory.createVariableDeclaration(variableDeclaration.symbol.name, 
                            /*exclamationToken*/
                            void 0, getTypeDeepCloneUnionUndefined(variableDeclaration.type))], flags)));
                    }
                }
                if (returnValueProperty) {
                    newNodes.push(factory.createVariableStatement(
                    /*modifiers*/
                    void 0, factory.createVariableDeclarationList([factory.createVariableDeclaration(returnValueProperty, 
                        /*exclamationToken*/
                        void 0, getTypeDeepCloneUnionUndefined(returnType))], 1 /* Let */)));
                }
                const assignments = getPropertyAssignmentsForWritesAndVariableDeclarations(exposedVariableDeclarations, writes);
                if (returnValueProperty) {
                    assignments.unshift(factory.createShorthandPropertyAssignment(returnValueProperty));
                }
                if (assignments.length === 1) {
                    Debug.assert(!returnValueProperty, "Shouldn't have returnValueProperty here");
                    newNodes.push(factory.createExpressionStatement(factory.createAssignment(assignments[0].name, call)));
                    if (range.facts & 1 /* HasReturn */) {
                        newNodes.push(factory.createReturnStatement());
                    }
                }
                else {
                    newNodes.push(factory.createExpressionStatement(factory.createAssignment(factory.createObjectLiteralExpression(assignments), call)));
                    if (returnValueProperty) {
                        newNodes.push(factory.createReturnStatement(factory.createIdentifier(returnValueProperty)));
                    }
                }
            }
            else {
                if (range.facts & 1 /* HasReturn */) {
                    newNodes.push(factory.createReturnStatement(call));
                }
                else if (isReadonlyArray(range.range)) {
                    newNodes.push(factory.createExpressionStatement(call));
                }
                else {
                    newNodes.push(call);
                }
            }
            if (isReadonlyArray(range.range)) {
                changeTracker.replaceNodeRangeWithNodes(context.file, first(range.range), last(range.range), newNodes);
            }
            else {
                changeTracker.replaceNodeWithNodes(context.file, range.range, newNodes);
            }
            const edits = changeTracker.getChanges();
            const renameRange = isReadonlyArray(range.range) ? first(range.range) : range.range;
            const renameFilename = renameRange.getSourceFile().fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, functionNameText, 
            /*isDeclaredBeforeUse*/
            false);
            return { renameFilename, renameLocation, edits };
            function getTypeDeepCloneUnionUndefined(typeNode) {
                if (typeNode === void 0) {
                    return void 0;
                }
                const clone2 = getSynthesizedDeepClone(typeNode);
                let withoutParens = clone2;
                while (isParenthesizedTypeNode(withoutParens)) {
                    withoutParens = withoutParens.type;
                }
                return isUnionTypeNode(withoutParens) && find(withoutParens.types, (t) => t.kind === 155 /* UndefinedKeyword */) ? clone2 : factory.createUnionTypeNode([clone2, factory.createKeywordTypeNode(155 /* UndefinedKeyword */)]);
            }
        }