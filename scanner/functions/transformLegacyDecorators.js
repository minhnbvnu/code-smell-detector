function transformLegacyDecorators(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, hoistVariableDeclaration } = context;
            const resolver = context.getEmitResolver();
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onSubstituteNode = onSubstituteNode;
            let classAliases;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                const visited = visitEachChild(node, visitor, context);
                addEmitHelpers(visited, context.readEmitHelpers());
                return visited;
            }
            function modifierVisitor(node) {
                return isDecorator(node) ? void 0 : node;
            }
            function visitor(node) {
                if (!(node.transformFlags & 33554432 /* ContainsDecorators */)) {
                    return node;
                }
                switch (node.kind) {
                    case 167 /* Decorator */:
                        return void 0;
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node);
                    case 173 /* Constructor */:
                        return visitConstructorDeclaration(node);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node);
                    case 175 /* SetAccessor */:
                        return visitSetAccessorDeclaration(node);
                    case 174 /* GetAccessor */:
                        return visitGetAccessorDeclaration(node);
                    case 169 /* PropertyDeclaration */:
                        return visitPropertyDeclaration(node);
                    case 166 /* Parameter */:
                        return visitParameterDeclaration(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitClassDeclaration(node) {
                if (!(classOrConstructorParameterIsDecorated(
                /*legacyDecorators*/
                true, node) || childIsDecorated(
                /*legacyDecorators*/
                true, node))) {
                    return visitEachChild(node, visitor, context);
                }
                const statements = classOrConstructorParameterIsDecorated(
                /*useLegacyDecorators*/
                true, node) ? transformClassDeclarationWithClassDecorators(node, node.name) : transformClassDeclarationWithoutClassDecorators(node, node.name);
                if (statements.length > 1) {
                    statements.push(factory2.createEndOfDeclarationMarker(node));
                    setEmitFlags(statements[0], getEmitFlags(statements[0]) | 8388608 /* HasEndOfDeclarationMarker */);
                }
                return singleOrMany(statements);
            }
            function decoratorContainsPrivateIdentifierInExpression(decorator) {
                return !!(decorator.transformFlags & 536870912 /* ContainsPrivateIdentifierInExpression */);
            }
            function parameterDecoratorsContainPrivateIdentifierInExpression(parameterDecorators) {
                return some(parameterDecorators, decoratorContainsPrivateIdentifierInExpression);
            }
            function hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node) {
                for (const member of node.members) {
                    if (!canHaveDecorators(member))
                        continue;
                    const allDecorators = getAllDecoratorsOfClassElement(member, node, 
                    /*useLegacyDecorators*/
                    true);
                    if (some(allDecorators == null ? void 0 : allDecorators.decorators, decoratorContainsPrivateIdentifierInExpression))
                        return true;
                    if (some(allDecorators == null ? void 0 : allDecorators.parameters, parameterDecoratorsContainPrivateIdentifierInExpression))
                        return true;
                }
                return false;
            }
            function transformDecoratorsOfClassElements(node, members) {
                let decorationStatements = [];
                addClassElementDecorationStatements(decorationStatements, node, 
                /*isStatic*/
                false);
                addClassElementDecorationStatements(decorationStatements, node, 
                /*isStatic*/
                true);
                if (hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node)) {
                    members = setTextRange(factory2.createNodeArray([
                        ...members,
                        factory2.createClassStaticBlockDeclaration(factory2.createBlock(decorationStatements, 
                        /*multiLine*/
                        true))
                    ]), members);
                    decorationStatements = void 0;
                }
                return { decorationStatements, members };
            }
            function transformClassDeclarationWithoutClassDecorators(node, name) {
                const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                const heritageClauses = visitNodes2(node.heritageClauses, visitor, isHeritageClause);
                let members = visitNodes2(node.members, visitor, isClassElement);
                let decorationStatements = [];
                ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));
                const updated = factory2.updateClassDeclaration(node, modifiers, name, 
                /*typeParameters*/
                void 0, heritageClauses, members);
                return addRange([updated], decorationStatements);
            }
            function transformClassDeclarationWithClassDecorators(node, name) {
                const location = moveRangePastModifiers(node);
                const classAlias = getClassAliasIfNeeded(node);
                const declName = languageVersion <= 2 /* ES2015 */ ? factory2.getInternalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true) : factory2.getLocalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
                const heritageClauses = visitNodes2(node.heritageClauses, visitor, isHeritageClause);
                let members = visitNodes2(node.members, visitor, isClassElement);
                let decorationStatements = [];
                ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));
                const classExpression = factory2.createClassExpression(
                /*modifiers*/
                void 0, name && isGeneratedIdentifier(name) ? void 0 : name, 
                /*typeParameters*/
                void 0, heritageClauses, members);
                setOriginalNode(classExpression, node);
                setTextRange(classExpression, location);
                const statement = factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(declName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, classAlias ? factory2.createAssignment(classAlias, classExpression) : classExpression)
                ], 1 /* Let */));
                setOriginalNode(statement, node);
                setTextRange(statement, location);
                setCommentRange(statement, node);
                const statements = [statement];
                addRange(statements, decorationStatements);
                addConstructorDecorationStatement(statements, node);
                return statements;
            }
            function visitClassExpression(node) {
                return factory2.updateClassExpression(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), node.name, 
                /*typeParameters*/
                void 0, visitNodes2(node.heritageClauses, visitor, isHeritageClause), visitNodes2(node.members, visitor, isClassElement));
            }
            function visitConstructorDeclaration(node) {
                return factory2.updateConstructorDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), visitNodes2(node.parameters, visitor, isParameter), visitNode(node.body, visitor, isBlock));
            }
            function finishClassElement(updated, original) {
                if (updated !== original) {
                    setCommentRange(updated, original);
                    setSourceMapRange(updated, moveRangePastModifiers(original));
                }
                return updated;
            }
            function visitMethodDeclaration(node) {
                return finishClassElement(factory2.updateMethodDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), node.asteriskToken, Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)), 
                /*questionToken*/
                void 0, 
                /*typeParameters*/
                void 0, visitNodes2(node.parameters, visitor, isParameter), 
                /*type*/
                void 0, visitNode(node.body, visitor, isBlock)), node);
            }
            function visitGetAccessorDeclaration(node) {
                return finishClassElement(factory2.updateGetAccessorDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)), visitNodes2(node.parameters, visitor, isParameter), 
                /*type*/
                void 0, visitNode(node.body, visitor, isBlock)), node);
            }
            function visitSetAccessorDeclaration(node) {
                return finishClassElement(factory2.updateSetAccessorDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)), visitNodes2(node.parameters, visitor, isParameter), visitNode(node.body, visitor, isBlock)), node);
            }
            function visitPropertyDeclaration(node) {
                if (node.flags & 16777216 /* Ambient */ || hasSyntacticModifier(node, 2 /* Ambient */)) {
                    return void 0;
                }
                return finishClassElement(factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)), 
                /*questionOrExclamationToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression)), node);
            }
            function visitParameterDeclaration(node) {
                const updated = factory2.updateParameterDeclaration(node, elideNodes(factory2, node.modifiers), node.dotDotDotToken, Debug.checkDefined(visitNode(node.name, visitor, isBindingName)), 
                /*questionToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
                if (updated !== node) {
                    setCommentRange(updated, node);
                    setTextRange(updated, moveRangePastModifiers(node));
                    setSourceMapRange(updated, moveRangePastModifiers(node));
                    setEmitFlags(updated.name, 64 /* NoTrailingSourceMap */);
                }
                return updated;
            }
            function isSyntheticMetadataDecorator(node) {
                return isCallToHelper(node.expression, "___metadata");
            }
            function transformAllDecoratorsOfDeclaration(allDecorators) {
                if (!allDecorators) {
                    return void 0;
                }
                const { false: decorators, true: metadata } = groupBy(allDecorators.decorators, isSyntheticMetadataDecorator);
                const decoratorExpressions = [];
                addRange(decoratorExpressions, map(decorators, transformDecorator));
                addRange(decoratorExpressions, flatMap(allDecorators.parameters, transformDecoratorsOfParameter));
                addRange(decoratorExpressions, map(metadata, transformDecorator));
                return decoratorExpressions;
            }
            function addClassElementDecorationStatements(statements, node, isStatic2) {
                addRange(statements, map(generateClassElementDecorationExpressions(node, isStatic2), (expr) => factory2.createExpressionStatement(expr)));
            }
            function isDecoratedClassElement(member, isStaticElement, parent2) {
                return nodeOrChildIsDecorated(
                /*legacyDecorators*/
                true, member, parent2) && isStaticElement === isStatic(member);
            }
            function getDecoratedClassElements(node, isStatic2) {
                return filter(node.members, (m) => isDecoratedClassElement(m, isStatic2, node));
            }
            function generateClassElementDecorationExpressions(node, isStatic2) {
                const members = getDecoratedClassElements(node, isStatic2);
                let expressions;
                for (const member of members) {
                    expressions = append(expressions, generateClassElementDecorationExpression(node, member));
                }
                return expressions;
            }
            function generateClassElementDecorationExpression(node, member) {
                const allDecorators = getAllDecoratorsOfClassElement(member, node, 
                /*useLegacyDecorators*/
                true);
                const decoratorExpressions = transformAllDecoratorsOfDeclaration(allDecorators);
                if (!decoratorExpressions) {
                    return void 0;
                }
                const prefix = getClassMemberPrefix(node, member);
                const memberName = getExpressionForPropertyName(member, 
                /*generateNameForComputedPropertyName*/
                !hasSyntacticModifier(member, 2 /* Ambient */));
                const descriptor = languageVersion > 0 /* ES3 */ ? isPropertyDeclaration(member) && !hasAccessorModifier(member) ? factory2.createVoidZero() : factory2.createNull() : void 0;
                const helper = emitHelpers().createDecorateHelper(decoratorExpressions, prefix, memberName, descriptor);
                setEmitFlags(helper, 3072 /* NoComments */);
                setSourceMapRange(helper, moveRangePastModifiers(member));
                return helper;
            }
            function addConstructorDecorationStatement(statements, node) {
                const expression = generateConstructorDecorationExpression(node);
                if (expression) {
                    statements.push(setOriginalNode(factory2.createExpressionStatement(expression), node));
                }
            }
            function generateConstructorDecorationExpression(node) {
                const allDecorators = getAllDecoratorsOfClass(node);
                const decoratorExpressions = transformAllDecoratorsOfDeclaration(allDecorators);
                if (!decoratorExpressions) {
                    return void 0;
                }
                const classAlias = classAliases && classAliases[getOriginalNodeId(node)];
                const localName = languageVersion <= 2 /* ES2015 */ ? factory2.getInternalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true) : factory2.getLocalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
                const decorate = emitHelpers().createDecorateHelper(decoratorExpressions, localName);
                const expression = factory2.createAssignment(localName, classAlias ? factory2.createAssignment(classAlias, decorate) : decorate);
                setEmitFlags(expression, 3072 /* NoComments */);
                setSourceMapRange(expression, moveRangePastModifiers(node));
                return expression;
            }
            function transformDecorator(decorator) {
                return Debug.checkDefined(visitNode(decorator.expression, visitor, isExpression));
            }
            function transformDecoratorsOfParameter(decorators, parameterOffset) {
                let expressions;
                if (decorators) {
                    expressions = [];
                    for (const decorator of decorators) {
                        const helper = emitHelpers().createParamHelper(transformDecorator(decorator), parameterOffset);
                        setTextRange(helper, decorator.expression);
                        setEmitFlags(helper, 3072 /* NoComments */);
                        expressions.push(helper);
                    }
                }
                return expressions;
            }
            function getExpressionForPropertyName(member, generateNameForComputedPropertyName) {
                const name = member.name;
                if (isPrivateIdentifier(name)) {
                    return factory2.createIdentifier("");
                }
                else if (isComputedPropertyName(name)) {
                    return generateNameForComputedPropertyName && !isSimpleInlineableExpression(name.expression) ? factory2.getGeneratedNameForNode(name) : name.expression;
                }
                else if (isIdentifier(name)) {
                    return factory2.createStringLiteral(idText(name));
                }
                else {
                    return factory2.cloneNode(name);
                }
            }
            function enableSubstitutionForClassAliases() {
                if (!classAliases) {
                    context.enableSubstitution(79 /* Identifier */);
                    classAliases = [];
                }
            }
            function getClassAliasIfNeeded(node) {
                if (resolver.getNodeCheckFlags(node) & 1048576 /* ClassWithConstructorReference */) {
                    enableSubstitutionForClassAliases();
                    const classAlias = factory2.createUniqueName(node.name && !isGeneratedIdentifier(node.name) ? idText(node.name) : "default");
                    classAliases[getOriginalNodeId(node)] = classAlias;
                    hoistVariableDeclaration(classAlias);
                    return classAlias;
                }
            }
            function getClassPrototype(node) {
                return factory2.createPropertyAccessExpression(factory2.getDeclarationName(node), "prototype");
            }
            function getClassMemberPrefix(node, member) {
                return isStatic(member) ? factory2.getDeclarationName(node) : getClassPrototype(node);
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (hint === 1 /* Expression */) {
                    return substituteExpression(node);
                }
                return node;
            }
            function substituteExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return substituteExpressionIdentifier(node);
                }
                return node;
            }
            function substituteExpressionIdentifier(node) {
                var _a2;
                return (_a2 = trySubstituteClassAlias(node)) != null ? _a2 : node;
            }
            function trySubstituteClassAlias(node) {
                if (classAliases) {
                    if (resolver.getNodeCheckFlags(node) & 2097152 /* ConstructorReferenceInClass */) {
                        const declaration = resolver.getReferencedValueDeclaration(node);
                        if (declaration) {
                            const classAlias = classAliases[declaration.id];
                            if (classAlias) {
                                const clone2 = factory2.cloneNode(classAlias);
                                setSourceMapRange(clone2, node);
                                setCommentRange(clone2, node);
                                return clone2;
                            }
                        }
                    }
                }
                return void 0;
            }
        }