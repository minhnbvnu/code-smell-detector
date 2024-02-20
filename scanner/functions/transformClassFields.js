function transformClassFields(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, hoistVariableDeclaration, endLexicalEnvironment, startLexicalEnvironment, resumeLexicalEnvironment, addBlockScopedVariable } = context;
            const resolver = context.getEmitResolver();
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const useDefineForClassFields = getUseDefineForClassFields(compilerOptions);
            const legacyDecorators = !!compilerOptions.experimentalDecorators;
            const shouldTransformInitializersUsingSet = !useDefineForClassFields;
            const shouldTransformInitializersUsingDefine = useDefineForClassFields && languageVersion < 9 /* ES2022 */;
            const shouldTransformInitializers = shouldTransformInitializersUsingSet || shouldTransformInitializersUsingDefine;
            const shouldTransformPrivateElementsOrClassStaticBlocks = languageVersion < 9 /* ES2022 */;
            const shouldTransformAutoAccessors = languageVersion < 99 /* ESNext */ ? -1 /* True */ : !useDefineForClassFields ? 3 /* Maybe */ : 0 /* False */;
            const shouldTransformThisInStaticInitializers = languageVersion < 9 /* ES2022 */;
            const shouldTransformSuperInStaticInitializers = shouldTransformThisInStaticInitializers && languageVersion >= 2 /* ES2015 */;
            const shouldTransformAnything = shouldTransformInitializers || shouldTransformPrivateElementsOrClassStaticBlocks || shouldTransformAutoAccessors === -1 /* True */;
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onSubstituteNode = onSubstituteNode;
            const previousOnEmitNode = context.onEmitNode;
            context.onEmitNode = onEmitNode;
            let shouldTransformPrivateStaticElementsInFile = false;
            let enabledSubstitutions;
            let classAliases;
            let pendingExpressions;
            let pendingStatements;
            let lexicalEnvironment;
            const lexicalEnvironmentMap = /* @__PURE__ */ new Map();
            let currentClassContainer;
            let currentStaticPropertyDeclarationOrStaticBlock;
            let shouldSubstituteThisWithClassThis = false;
            let previousShouldSubstituteThisWithClassThis = false;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                lexicalEnvironment = void 0;
                shouldTransformPrivateStaticElementsInFile = !!(getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */);
                if (!shouldTransformAnything && !shouldTransformPrivateStaticElementsInFile) {
                    return node;
                }
                const visited = visitEachChild(node, visitor, context);
                addEmitHelpers(visited, context.readEmitHelpers());
                return visited;
            }
            function modifierVisitor(node) {
                switch (node.kind) {
                    case 127 /* AccessorKeyword */:
                        return shouldTransformAutoAccessorsInCurrentClass() ? void 0 : node;
                    default:
                        return tryCast(node, isModifier);
                }
            }
            function visitor(node) {
                if (!(node.transformFlags & 16777216 /* ContainsClassFields */) && !(node.transformFlags & 134234112 /* ContainsLexicalThisOrSuper */)) {
                    return node;
                }
                switch (node.kind) {
                    case 127 /* AccessorKeyword */:
                        return Debug.fail("Use `modifierVisitor` instead.");
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node, 
                        /*referencedName*/
                        void 0);
                    case 172 /* ClassStaticBlockDeclaration */:
                    case 169 /* PropertyDeclaration */:
                        return Debug.fail("Use `classElementVisitor` instead.");
                    case 299 /* PropertyAssignment */:
                        return visitPropertyAssignment(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 166 /* Parameter */:
                        return visitParameterDeclaration(node);
                    case 205 /* BindingElement */:
                        return visitBindingElement(node);
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    case 80 /* PrivateIdentifier */:
                        return visitPrivateIdentifier(node);
                    case 208 /* PropertyAccessExpression */:
                        return visitPropertyAccessExpression(node);
                    case 209 /* ElementAccessExpression */:
                        return visitElementAccessExpression(node);
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        return visitPreOrPostfixUnaryExpression(node, 
                        /*discarded*/
                        false);
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node, 
                        /*discarded*/
                        false);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, 
                        /*discarded*/
                        false, 
                        /*referencedName*/
                        void 0);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
                    case 245 /* ForStatement */:
                        return visitForStatement(node);
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 173 /* Constructor */:
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */: {
                        return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                        /*current*/
                        void 0, fallbackVisitor, node);
                    }
                    default:
                        return fallbackVisitor(node);
                }
            }
            function fallbackVisitor(node) {
                return visitEachChild(node, visitor, context);
            }
            function namedEvaluationVisitor(node, referencedName) {
                switch (node.kind) {
                    case 356 /* PartiallyEmittedExpression */:
                        return visitPartiallyEmittedExpression(node, 
                        /*discarded*/
                        false, referencedName);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, 
                        /*discarded*/
                        false, referencedName);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node, referencedName);
                    default:
                        return visitor(node);
                }
            }
            function discardedValueVisitor(node) {
                switch (node.kind) {
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        return visitPreOrPostfixUnaryExpression(node, 
                        /*discarded*/
                        true);
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node, 
                        /*discarded*/
                        true);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node, 
                        /*discarded*/
                        true);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, 
                        /*discarded*/
                        true, 
                        /*referencedName*/
                        void 0);
                    default:
                        return visitor(node);
                }
            }
            function heritageClauseVisitor(node) {
                switch (node.kind) {
                    case 294 /* HeritageClause */:
                        return visitEachChild(node, heritageClauseVisitor, context);
                    case 230 /* ExpressionWithTypeArguments */:
                        return visitExpressionWithTypeArgumentsInHeritageClause(node);
                    default:
                        return visitor(node);
                }
            }
            function assignmentTargetVisitor(node) {
                switch (node.kind) {
                    case 207 /* ObjectLiteralExpression */:
                    case 206 /* ArrayLiteralExpression */:
                        return visitAssignmentPattern(node);
                    default:
                        return visitor(node);
                }
            }
            function classElementVisitor(node) {
                switch (node.kind) {
                    case 173 /* Constructor */:
                        return visitConstructorDeclaration(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 171 /* MethodDeclaration */:
                        return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                        /*current*/
                        void 0, visitMethodOrAccessorDeclaration, node);
                    case 169 /* PropertyDeclaration */:
                        return setCurrentStaticPropertyDeclarationOrStaticBlockAnd(
                        /*current*/
                        void 0, visitPropertyDeclaration, node);
                    case 172 /* ClassStaticBlockDeclaration */:
                        return visitClassStaticBlockDeclaration(node);
                    case 164 /* ComputedPropertyName */:
                        return visitComputedPropertyName(node);
                    case 237 /* SemicolonClassElement */:
                        return node;
                    default:
                        return isModifierLike(node) ? modifierVisitor(node) : visitor(node);
                }
            }
            function propertyNameVisitor(node) {
                switch (node.kind) {
                    case 164 /* ComputedPropertyName */:
                        return visitComputedPropertyName(node);
                    default:
                        return visitor(node);
                }
            }
            function accessorFieldResultVisitor(node) {
                switch (node.kind) {
                    case 169 /* PropertyDeclaration */:
                        return transformFieldInitializer(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return classElementVisitor(node);
                    default:
                        Debug.assertMissingNode(node, "Expected node to either be a PropertyDeclaration, GetAccessorDeclaration, or SetAccessorDeclaration");
                        break;
                }
            }
            function visitPrivateIdentifier(node) {
                if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
                    return node;
                }
                if (isStatement(node.parent)) {
                    return node;
                }
                return setOriginalNode(factory2.createIdentifier(""), node);
            }
            function transformPrivateIdentifierInInExpression(node) {
                const info = accessPrivateIdentifier2(node.left);
                if (info) {
                    const receiver = visitNode(node.right, visitor, isExpression);
                    return setOriginalNode(emitHelpers().createClassPrivateFieldInHelper(info.brandCheckIdentifier, receiver), node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitPropertyAssignment(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const { referencedName, name } = visitReferencedPropertyName(node.name);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, referencedName), isExpression);
                    return factory2.updatePropertyAssignment(node, name, initializer);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitVariableStatement(node) {
                const savedPendingStatements = pendingStatements;
                pendingStatements = [];
                const visitedNode = visitEachChild(node, visitor, context);
                const statement = some(pendingStatements) ? [visitedNode, ...pendingStatements] : visitedNode;
                pendingStatements = savedPendingStatements;
                return statement;
            }
            function getAssignedNameOfIdentifier(name, initializer) {
                const originalClass = getOriginalNode(initializer, isClassLike);
                return originalClass && !originalClass.name && hasSyntacticModifier(originalClass, 1024 /* Default */) ? factory2.createStringLiteral("default") : factory2.createStringLiteralFromNode(name);
            }
            function visitVariableDeclaration(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = getAssignedNameOfIdentifier(node.name, node.initializer);
                    const name = visitNode(node.name, visitor, isBindingName);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateVariableDeclaration(node, name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitParameterDeclaration(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = getAssignedNameOfIdentifier(node.name, node.initializer);
                    const name = visitNode(node.name, visitor, isBindingName);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateParameterDeclaration(node, 
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, name, 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitBindingElement(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = getAssignedNameOfIdentifier(node.name, node.initializer);
                    const propertyName = visitNode(node.propertyName, visitor, isPropertyName);
                    const name = visitNode(node.name, visitor, isBindingName);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateBindingElement(node, 
                    /*dotDotDotToken*/
                    void 0, propertyName, name, initializer);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitExportAssignment(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = factory2.createStringLiteral(node.isExportEquals ? "" : "default");
                    const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                    const expression = visitNode(node.expression, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateExportAssignment(node, modifiers, expression);
                }
                return visitEachChild(node, visitor, context);
            }
            function injectPendingExpressions(expression) {
                if (some(pendingExpressions)) {
                    if (isParenthesizedExpression(expression)) {
                        pendingExpressions.push(expression.expression);
                        expression = factory2.updateParenthesizedExpression(expression, factory2.inlineExpressions(pendingExpressions));
                    }
                    else {
                        pendingExpressions.push(expression);
                        expression = factory2.inlineExpressions(pendingExpressions);
                    }
                    pendingExpressions = void 0;
                }
                return expression;
            }
            function visitComputedPropertyName(node) {
                const expression = visitNode(node.expression, visitor, isExpression);
                return factory2.updateComputedPropertyName(node, injectPendingExpressions(expression));
            }
            function visitConstructorDeclaration(node) {
                if (currentClassContainer) {
                    return transformConstructor(node, currentClassContainer);
                }
                return fallbackVisitor(node);
            }
            function shouldTransformClassElementToWeakMap(node) {
                if (shouldTransformPrivateElementsOrClassStaticBlocks)
                    return true;
                if (hasStaticModifier(node) && getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */)
                    return true;
                return false;
            }
            function visitMethodOrAccessorDeclaration(node) {
                Debug.assert(!hasDecorators(node));
                if (!isPrivateIdentifierClassElementDeclaration(node) || !shouldTransformClassElementToWeakMap(node)) {
                    return visitEachChild(node, classElementVisitor, context);
                }
                const info = accessPrivateIdentifier2(node.name);
                Debug.assert(info, "Undeclared private name for property declaration.");
                if (!info.isValid) {
                    return node;
                }
                const functionName = getHoistedFunctionName(node);
                if (functionName) {
                    getPendingExpressions().push(factory2.createAssignment(functionName, factory2.createFunctionExpression(filter(node.modifiers, (m) => isModifier(m) && !isStaticModifier(m) && !isAccessorModifier(m)), node.asteriskToken, functionName, 
                    /* typeParameters */
                    void 0, visitParameterList(node.parameters, visitor, context), 
                    /* type */
                    void 0, visitFunctionBody(node.body, visitor, context))));
                }
                return void 0;
            }
            function setCurrentStaticPropertyDeclarationOrStaticBlockAnd(current, visitor2, arg) {
                const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
                currentStaticPropertyDeclarationOrStaticBlock = current;
                const result = visitor2(arg);
                currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
                return result;
            }
            function getHoistedFunctionName(node) {
                Debug.assert(isPrivateIdentifier(node.name));
                const info = accessPrivateIdentifier2(node.name);
                Debug.assert(info, "Undeclared private name for property declaration.");
                if (info.kind === "m" /* Method */) {
                    return info.methodName;
                }
                if (info.kind === "a" /* Accessor */) {
                    if (isGetAccessor(node)) {
                        return info.getterName;
                    }
                    if (isSetAccessor(node)) {
                        return info.setterName;
                    }
                }
            }
            function transformAutoAccessor(node) {
                const commentRange = getCommentRange(node);
                const sourceMapRange = getSourceMapRange(node);
                const name = node.name;
                let getterName = name;
                let setterName = name;
                if (isComputedPropertyName(name) && !isSimpleInlineableExpression(name.expression)) {
                    const cacheAssignment = findComputedPropertyNameCacheAssignment(name);
                    if (cacheAssignment) {
                        getterName = factory2.updateComputedPropertyName(name, visitNode(name.expression, visitor, isExpression));
                        setterName = factory2.updateComputedPropertyName(name, cacheAssignment.left);
                    }
                    else {
                        const temp = factory2.createTempVariable(hoistVariableDeclaration);
                        setSourceMapRange(temp, name.expression);
                        const expression = visitNode(name.expression, visitor, isExpression);
                        const assignment = factory2.createAssignment(temp, expression);
                        setSourceMapRange(assignment, name.expression);
                        getterName = factory2.updateComputedPropertyName(name, assignment);
                        setterName = factory2.updateComputedPropertyName(name, temp);
                    }
                }
                const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                const backingField = createAccessorPropertyBackingField(factory2, node, modifiers, node.initializer);
                setOriginalNode(backingField, node);
                setEmitFlags(backingField, 3072 /* NoComments */);
                setSourceMapRange(backingField, sourceMapRange);
                const getter = createAccessorPropertyGetRedirector(factory2, node, modifiers, getterName);
                setOriginalNode(getter, node);
                setCommentRange(getter, commentRange);
                setSourceMapRange(getter, sourceMapRange);
                const setter = createAccessorPropertySetRedirector(factory2, node, modifiers, setterName);
                setOriginalNode(setter, node);
                setEmitFlags(setter, 3072 /* NoComments */);
                setSourceMapRange(setter, sourceMapRange);
                return visitArray([backingField, getter, setter], accessorFieldResultVisitor, isClassElement);
            }
            function transformPrivateFieldInitializer(node) {
                if (shouldTransformClassElementToWeakMap(node)) {
                    const info = accessPrivateIdentifier2(node.name);
                    Debug.assert(info, "Undeclared private name for property declaration.");
                    if (!info.isValid) {
                        return node;
                    }
                    if (info.isStatic && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                        const statement = transformPropertyOrClassStaticBlock(node, factory2.createThis());
                        if (statement) {
                            return factory2.createClassStaticBlockDeclaration(factory2.createBlock([statement], 
                            /*multiLine*/
                            true));
                        }
                    }
                    return void 0;
                }
                if (shouldTransformInitializersUsingSet && !isStatic(node) && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) && lexicalEnvironment.data.facts & 16 /* WillHoistInitializersToConstructor */) {
                    return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, visitor, isModifierLike), node.name, 
                    /*questionOrExclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0);
                }
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const { referencedName, name } = visitReferencedPropertyName(node.name);
                    return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), name, 
                    /*questionOrExclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, visitNode(node.initializer, (child) => namedEvaluationVisitor(child, referencedName), isExpression));
                }
                return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), visitNode(node.name, propertyNameVisitor, isPropertyName), 
                /*questionOrExclamationToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
            }
            function transformPublicFieldInitializer(node) {
                if (shouldTransformInitializers && !isAutoAccessorPropertyDeclaration(node)) {
                    const expr = getPropertyNameExpressionIfNeeded(node.name, 
                    /*shouldHoist*/
                    !!node.initializer || useDefineForClassFields, 
                    /*captureReferencedName*/
                    isNamedEvaluation(node, isAnonymousClassNeedingAssignedName));
                    if (expr) {
                        getPendingExpressions().push(...flattenCommaList(expr));
                    }
                    if (isStatic(node) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                        const initializerStatement = transformPropertyOrClassStaticBlock(node, factory2.createThis());
                        if (initializerStatement) {
                            const staticBlock = factory2.createClassStaticBlockDeclaration(factory2.createBlock([initializerStatement]));
                            setOriginalNode(staticBlock, node);
                            setCommentRange(staticBlock, node);
                            setCommentRange(initializerStatement, { pos: -1, end: -1 });
                            setSyntheticLeadingComments(initializerStatement, void 0);
                            setSyntheticTrailingComments(initializerStatement, void 0);
                            return staticBlock;
                        }
                    }
                    return void 0;
                }
                return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), visitNode(node.name, propertyNameVisitor, isPropertyName), 
                /*questionOrExclamationToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
            }
            function transformFieldInitializer(node) {
                Debug.assert(!hasDecorators(node), "Decorators should already have been transformed and elided.");
                return isPrivateIdentifierClassElementDeclaration(node) ? transformPrivateFieldInitializer(node) : transformPublicFieldInitializer(node);
            }
            function shouldTransformAutoAccessorsInCurrentClass() {
                return shouldTransformAutoAccessors === -1 /* True */ || shouldTransformAutoAccessors === 3 /* Maybe */ && !!(lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) && !!(lexicalEnvironment.data.facts & 16 /* WillHoistInitializersToConstructor */);
            }
            function visitPropertyDeclaration(node) {
                if (isAutoAccessorPropertyDeclaration(node) && (shouldTransformAutoAccessorsInCurrentClass() || hasStaticModifier(node) && getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */)) {
                    return transformAutoAccessor(node);
                }
                return transformFieldInitializer(node);
            }
            function createPrivateIdentifierAccess(info, receiver) {
                return createPrivateIdentifierAccessHelper(info, visitNode(receiver, visitor, isExpression));
            }
            function createPrivateIdentifierAccessHelper(info, receiver) {
                setCommentRange(receiver, moveRangePos(receiver, -1));
                switch (info.kind) {
                    case "a" /* Accessor */:
                        return emitHelpers().createClassPrivateFieldGetHelper(receiver, info.brandCheckIdentifier, info.kind, info.getterName);
                    case "m" /* Method */:
                        return emitHelpers().createClassPrivateFieldGetHelper(receiver, info.brandCheckIdentifier, info.kind, info.methodName);
                    case "f" /* Field */:
                        return emitHelpers().createClassPrivateFieldGetHelper(receiver, info.brandCheckIdentifier, info.kind, info.isStatic ? info.variableName : void 0);
                    case "untransformed":
                        return Debug.fail("Access helpers should not be created for untransformed private elements");
                    default:
                        Debug.assertNever(info, "Unknown private element type");
                }
            }
            function visitPropertyAccessExpression(node) {
                if (isPrivateIdentifier(node.name)) {
                    const privateIdentifierInfo = accessPrivateIdentifier2(node.name);
                    if (privateIdentifierInfo) {
                        return setTextRange(setOriginalNode(createPrivateIdentifierAccess(privateIdentifierInfo, node.expression), node), node);
                    }
                }
                if (shouldTransformSuperInStaticInitializers && isSuperProperty(node) && isIdentifier(node.name) && currentStaticPropertyDeclarationOrStaticBlock && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data)) {
                    const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
                    if (facts & 1 /* ClassWasDecorated */) {
                        return visitInvalidSuperProperty(node);
                    }
                    if (classConstructor && superClassReference) {
                        const superProperty = factory2.createReflectGetCall(superClassReference, factory2.createStringLiteralFromNode(node.name), classConstructor);
                        setOriginalNode(superProperty, node.expression);
                        setTextRange(superProperty, node.expression);
                        return superProperty;
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitElementAccessExpression(node) {
                if (shouldTransformSuperInStaticInitializers && isSuperProperty(node) && currentStaticPropertyDeclarationOrStaticBlock && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data)) {
                    const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
                    if (facts & 1 /* ClassWasDecorated */) {
                        return visitInvalidSuperProperty(node);
                    }
                    if (classConstructor && superClassReference) {
                        const superProperty = factory2.createReflectGetCall(superClassReference, visitNode(node.argumentExpression, visitor, isExpression), classConstructor);
                        setOriginalNode(superProperty, node.expression);
                        setTextRange(superProperty, node.expression);
                        return superProperty;
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitPreOrPostfixUnaryExpression(node, discarded) {
                if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                    const operand = skipParentheses(node.operand);
                    if (isPrivateIdentifierPropertyAccessExpression(operand)) {
                        let info;
                        if (info = accessPrivateIdentifier2(operand.name)) {
                            const receiver = visitNode(operand.expression, visitor, isExpression);
                            const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);
                            let expression = createPrivateIdentifierAccess(info, readExpression);
                            const temp = isPrefixUnaryExpression(node) || discarded ? void 0 : factory2.createTempVariable(hoistVariableDeclaration);
                            expression = expandPreOrPostfixIncrementOrDecrementExpression(factory2, node, expression, hoistVariableDeclaration, temp);
                            expression = createPrivateIdentifierAssignment(info, initializeExpression || readExpression, expression, 63 /* EqualsToken */);
                            setOriginalNode(expression, node);
                            setTextRange(expression, node);
                            if (temp) {
                                expression = factory2.createComma(expression, temp);
                                setTextRange(expression, node);
                            }
                            return expression;
                        }
                    }
                    else if (shouldTransformSuperInStaticInitializers && isSuperProperty(operand) && currentStaticPropertyDeclarationOrStaticBlock && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data)) {
                        const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
                        if (facts & 1 /* ClassWasDecorated */) {
                            const expression = visitInvalidSuperProperty(operand);
                            return isPrefixUnaryExpression(node) ? factory2.updatePrefixUnaryExpression(node, expression) : factory2.updatePostfixUnaryExpression(node, expression);
                        }
                        if (classConstructor && superClassReference) {
                            let setterName;
                            let getterName;
                            if (isPropertyAccessExpression(operand)) {
                                if (isIdentifier(operand.name)) {
                                    getterName = setterName = factory2.createStringLiteralFromNode(operand.name);
                                }
                            }
                            else {
                                if (isSimpleInlineableExpression(operand.argumentExpression)) {
                                    getterName = setterName = operand.argumentExpression;
                                }
                                else {
                                    getterName = factory2.createTempVariable(hoistVariableDeclaration);
                                    setterName = factory2.createAssignment(getterName, visitNode(operand.argumentExpression, visitor, isExpression));
                                }
                            }
                            if (setterName && getterName) {
                                let expression = factory2.createReflectGetCall(superClassReference, getterName, classConstructor);
                                setTextRange(expression, operand);
                                const temp = discarded ? void 0 : factory2.createTempVariable(hoistVariableDeclaration);
                                expression = expandPreOrPostfixIncrementOrDecrementExpression(factory2, node, expression, hoistVariableDeclaration, temp);
                                expression = factory2.createReflectSetCall(superClassReference, setterName, expression, classConstructor);
                                setOriginalNode(expression, node);
                                setTextRange(expression, node);
                                if (temp) {
                                    expression = factory2.createComma(expression, temp);
                                    setTextRange(expression, node);
                                }
                                return expression;
                            }
                        }
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitForStatement(node) {
                return factory2.updateForStatement(node, visitNode(node.initializer, discardedValueVisitor, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, discardedValueVisitor, isExpression), visitIterationBody(node.statement, visitor, context));
            }
            function visitExpressionStatement(node) {
                return factory2.updateExpressionStatement(node, visitNode(node.expression, discardedValueVisitor, isExpression));
            }
            function createCopiableReceiverExpr(receiver) {
                const clone2 = nodeIsSynthesized(receiver) ? receiver : factory2.cloneNode(receiver);
                if (isSimpleInlineableExpression(receiver)) {
                    return { readExpression: clone2, initializeExpression: void 0 };
                }
                const readExpression = factory2.createTempVariable(hoistVariableDeclaration);
                const initializeExpression = factory2.createAssignment(readExpression, clone2);
                return { readExpression, initializeExpression };
            }
            function visitCallExpression(node) {
                var _a2;
                if (isPrivateIdentifierPropertyAccessExpression(node.expression) && accessPrivateIdentifier2(node.expression.name)) {
                    const { thisArg, target } = factory2.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion);
                    if (isCallChain(node)) {
                        return factory2.updateCallChain(node, factory2.createPropertyAccessChain(visitNode(target, visitor, isExpression), node.questionDotToken, "call"), 
                        /*questionDotToken*/
                        void 0, 
                        /*typeArguments*/
                        void 0, [visitNode(thisArg, visitor, isExpression), ...visitNodes2(node.arguments, visitor, isExpression)]);
                    }
                    return factory2.updateCallExpression(node, factory2.createPropertyAccessExpression(visitNode(target, visitor, isExpression), "call"), 
                    /*typeArguments*/
                    void 0, [visitNode(thisArg, visitor, isExpression), ...visitNodes2(node.arguments, visitor, isExpression)]);
                }
                if (shouldTransformSuperInStaticInitializers && isSuperProperty(node.expression) && currentStaticPropertyDeclarationOrStaticBlock && ((_a2 = lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) == null ? void 0 : _a2.classConstructor)) {
                    const invocation = factory2.createFunctionCallCall(visitNode(node.expression, visitor, isExpression), lexicalEnvironment.data.classConstructor, visitNodes2(node.arguments, visitor, isExpression));
                    setOriginalNode(invocation, node);
                    setTextRange(invocation, node);
                    return invocation;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitTaggedTemplateExpression(node) {
                var _a2;
                if (isPrivateIdentifierPropertyAccessExpression(node.tag) && accessPrivateIdentifier2(node.tag.name)) {
                    const { thisArg, target } = factory2.createCallBinding(node.tag, hoistVariableDeclaration, languageVersion);
                    return factory2.updateTaggedTemplateExpression(node, factory2.createCallExpression(factory2.createPropertyAccessExpression(visitNode(target, visitor, isExpression), "bind"), 
                    /*typeArguments*/
                    void 0, [visitNode(thisArg, visitor, isExpression)]), 
                    /*typeArguments*/
                    void 0, visitNode(node.template, visitor, isTemplateLiteral));
                }
                if (shouldTransformSuperInStaticInitializers && isSuperProperty(node.tag) && currentStaticPropertyDeclarationOrStaticBlock && ((_a2 = lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) == null ? void 0 : _a2.classConstructor)) {
                    const invocation = factory2.createFunctionBindCall(visitNode(node.tag, visitor, isExpression), lexicalEnvironment.data.classConstructor, []);
                    setOriginalNode(invocation, node);
                    setTextRange(invocation, node);
                    return factory2.updateTaggedTemplateExpression(node, invocation, 
                    /*typeArguments*/
                    void 0, visitNode(node.template, visitor, isTemplateLiteral));
                }
                return visitEachChild(node, visitor, context);
            }
            function transformClassStaticBlockDeclaration(node) {
                if (lexicalEnvironment) {
                    lexicalEnvironmentMap.set(getOriginalNode(node), lexicalEnvironment);
                }
                if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                    startLexicalEnvironment();
                    let statements = setCurrentStaticPropertyDeclarationOrStaticBlockAnd(node, (statements2) => visitNodes2(statements2, visitor, isStatement), node.body.statements);
                    statements = factory2.mergeLexicalEnvironment(statements, endLexicalEnvironment());
                    const iife = factory2.createImmediatelyInvokedArrowFunction(statements);
                    setOriginalNode(iife, node);
                    setTextRange(iife, node);
                    addEmitFlags(iife, 4 /* AdviseOnEmitNode */);
                    return iife;
                }
            }
            function isAnonymousClassNeedingAssignedName(node) {
                if (isClassExpression(node) && !node.name) {
                    const staticPropertiesOrClassStaticBlocks = getStaticPropertiesAndClassStaticBlock(node);
                    const classStaticBlock = find(staticPropertiesOrClassStaticBlocks, isClassStaticBlockDeclaration);
                    if (classStaticBlock) {
                        for (const statement of classStaticBlock.body.statements) {
                            if (isExpressionStatement(statement) && isCallToHelper(statement.expression, "___setFunctionName")) {
                                return false;
                            }
                        }
                    }
                    const hasTransformableStatics = (shouldTransformPrivateElementsOrClassStaticBlocks || !!(getInternalEmitFlags(node) && 32 /* TransformPrivateStaticElements */)) && some(staticPropertiesOrClassStaticBlocks, (node2) => isClassStaticBlockDeclaration(node2) || isPrivateIdentifierClassElementDeclaration(node2) || shouldTransformInitializers && isInitializedProperty(node2));
                    return hasTransformableStatics;
                }
                return false;
            }
            function visitBinaryExpression(node, discarded) {
                if (isDestructuringAssignment(node)) {
                    const savedPendingExpressions = pendingExpressions;
                    pendingExpressions = void 0;
                    node = factory2.updateBinaryExpression(node, visitNode(node.left, assignmentTargetVisitor, isExpression), node.operatorToken, visitNode(node.right, visitor, isExpression));
                    const expr = some(pendingExpressions) ? factory2.inlineExpressions(compact([...pendingExpressions, node])) : node;
                    pendingExpressions = savedPendingExpressions;
                    return expr;
                }
                if (isAssignmentExpression(node)) {
                    if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                        const assignedName = getAssignedNameOfIdentifier(node.left, node.right);
                        const left = visitNode(node.left, visitor, isExpression);
                        const right = visitNode(node.right, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                        return factory2.updateBinaryExpression(node, left, node.operatorToken, right);
                    }
                    if (isPrivateIdentifierPropertyAccessExpression(node.left)) {
                        const info = accessPrivateIdentifier2(node.left.name);
                        if (info) {
                            return setTextRange(setOriginalNode(createPrivateIdentifierAssignment(info, node.left.expression, node.right, node.operatorToken.kind), node), node);
                        }
                    }
                    else if (shouldTransformSuperInStaticInitializers && isSuperProperty(node.left) && currentStaticPropertyDeclarationOrStaticBlock && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data)) {
                        const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
                        if (facts & 1 /* ClassWasDecorated */) {
                            return factory2.updateBinaryExpression(node, visitInvalidSuperProperty(node.left), node.operatorToken, visitNode(node.right, visitor, isExpression));
                        }
                        if (classConstructor && superClassReference) {
                            let setterName = isElementAccessExpression(node.left) ? visitNode(node.left.argumentExpression, visitor, isExpression) : isIdentifier(node.left.name) ? factory2.createStringLiteralFromNode(node.left.name) : void 0;
                            if (setterName) {
                                let expression = visitNode(node.right, visitor, isExpression);
                                if (isCompoundAssignment(node.operatorToken.kind)) {
                                    let getterName = setterName;
                                    if (!isSimpleInlineableExpression(setterName)) {
                                        getterName = factory2.createTempVariable(hoistVariableDeclaration);
                                        setterName = factory2.createAssignment(getterName, setterName);
                                    }
                                    const superPropertyGet = factory2.createReflectGetCall(superClassReference, getterName, classConstructor);
                                    setOriginalNode(superPropertyGet, node.left);
                                    setTextRange(superPropertyGet, node.left);
                                    expression = factory2.createBinaryExpression(superPropertyGet, getNonAssignmentOperatorForCompoundAssignment(node.operatorToken.kind), expression);
                                    setTextRange(expression, node);
                                }
                                const temp = discarded ? void 0 : factory2.createTempVariable(hoistVariableDeclaration);
                                if (temp) {
                                    expression = factory2.createAssignment(temp, expression);
                                    setTextRange(temp, node);
                                }
                                expression = factory2.createReflectSetCall(superClassReference, setterName, expression, classConstructor);
                                setOriginalNode(expression, node);
                                setTextRange(expression, node);
                                if (temp) {
                                    expression = factory2.createComma(expression, temp);
                                    setTextRange(expression, node);
                                }
                                return expression;
                            }
                        }
                    }
                }
                if (isPrivateIdentifierInExpression(node)) {
                    return transformPrivateIdentifierInInExpression(node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitCommaListExpression(node, discarded) {
                const elements = discarded ? visitCommaListElements(node.elements, discardedValueVisitor) : visitCommaListElements(node.elements, visitor, discardedValueVisitor);
                return factory2.updateCommaListExpression(node, elements);
            }
            function visitParenthesizedExpression(node, discarded, referencedName) {
                const visitorFunc = discarded ? discardedValueVisitor : referencedName ? (node2) => namedEvaluationVisitor(node2, referencedName) : visitor;
                const expression = visitNode(node.expression, visitorFunc, isExpression);
                return factory2.updateParenthesizedExpression(node, expression);
            }
            function visitPartiallyEmittedExpression(node, discarded, referencedName) {
                const visitorFunc = discarded ? discardedValueVisitor : referencedName ? (node2) => namedEvaluationVisitor(node2, referencedName) : visitor;
                const expression = visitNode(node.expression, visitorFunc, isExpression);
                return factory2.updatePartiallyEmittedExpression(node, expression);
            }
            function visitReferencedPropertyName(node) {
                if (isPropertyNameLiteral(node) || isPrivateIdentifier(node)) {
                    const referencedName2 = factory2.createStringLiteralFromNode(node);
                    const name2 = visitNode(node, visitor, isPropertyName);
                    return { referencedName: referencedName2, name: name2 };
                }
                if (isPropertyNameLiteral(node.expression) && !isIdentifier(node.expression)) {
                    const referencedName2 = factory2.createStringLiteralFromNode(node.expression);
                    const name2 = visitNode(node, visitor, isPropertyName);
                    return { referencedName: referencedName2, name: name2 };
                }
                const referencedName = factory2.createTempVariable(hoistVariableDeclaration);
                const key = emitHelpers().createPropKeyHelper(visitNode(node.expression, visitor, isExpression));
                const assignment = factory2.createAssignment(referencedName, key);
                const name = factory2.updateComputedPropertyName(node, injectPendingExpressions(assignment));
                return { referencedName, name };
            }
            function createPrivateIdentifierAssignment(info, receiver, right, operator) {
                receiver = visitNode(receiver, visitor, isExpression);
                right = visitNode(right, visitor, isExpression);
                if (isCompoundAssignment(operator)) {
                    const { readExpression, initializeExpression } = createCopiableReceiverExpr(receiver);
                    receiver = initializeExpression || readExpression;
                    right = factory2.createBinaryExpression(createPrivateIdentifierAccessHelper(info, readExpression), getNonAssignmentOperatorForCompoundAssignment(operator), right);
                }
                setCommentRange(receiver, moveRangePos(receiver, -1));
                switch (info.kind) {
                    case "a" /* Accessor */:
                        return emitHelpers().createClassPrivateFieldSetHelper(receiver, info.brandCheckIdentifier, right, info.kind, info.setterName);
                    case "m" /* Method */:
                        return emitHelpers().createClassPrivateFieldSetHelper(receiver, info.brandCheckIdentifier, right, info.kind, 
                        /* f */
                        void 0);
                    case "f" /* Field */:
                        return emitHelpers().createClassPrivateFieldSetHelper(receiver, info.brandCheckIdentifier, right, info.kind, info.isStatic ? info.variableName : void 0);
                    case "untransformed":
                        return Debug.fail("Access helpers should not be created for untransformed private elements");
                    default:
                        Debug.assertNever(info, "Unknown private element type");
                }
            }
            function getPrivateInstanceMethodsAndAccessors(node) {
                return filter(node.members, isNonStaticMethodOrAccessorWithPrivateName);
            }
            function getClassFacts(node) {
                let facts = 0 /* None */;
                const original = getOriginalNode(node);
                if (isClassDeclaration(original) && classOrConstructorParameterIsDecorated(legacyDecorators, original)) {
                    facts |= 1 /* ClassWasDecorated */;
                }
                let containsPublicInstanceFields = false;
                let containsInitializedPublicInstanceFields = false;
                let containsInstancePrivateElements = false;
                let containsInstanceAutoAccessors = false;
                for (const member of node.members) {
                    if (isStatic(member)) {
                        if (member.name && (isPrivateIdentifier(member.name) || isAutoAccessorPropertyDeclaration(member)) && shouldTransformPrivateElementsOrClassStaticBlocks) {
                            facts |= 2 /* NeedsClassConstructorReference */;
                        }
                        if (isPropertyDeclaration(member) || isClassStaticBlockDeclaration(member)) {
                            if (shouldTransformThisInStaticInitializers && member.transformFlags & 16384 /* ContainsLexicalThis */) {
                                facts |= 8 /* NeedsSubstitutionForThisInClassStaticField */;
                                if (!(facts & 1 /* ClassWasDecorated */)) {
                                    facts |= 2 /* NeedsClassConstructorReference */;
                                }
                            }
                            if (shouldTransformSuperInStaticInitializers && member.transformFlags & 134217728 /* ContainsLexicalSuper */) {
                                if (!(facts & 1 /* ClassWasDecorated */)) {
                                    facts |= 2 /* NeedsClassConstructorReference */ | 4 /* NeedsClassSuperReference */;
                                }
                            }
                        }
                    }
                    else if (!hasAbstractModifier(getOriginalNode(member))) {
                        if (isAutoAccessorPropertyDeclaration(member)) {
                            containsInstanceAutoAccessors = true;
                            containsInstancePrivateElements || (containsInstancePrivateElements = isPrivateIdentifierClassElementDeclaration(member));
                        }
                        else if (isPrivateIdentifierClassElementDeclaration(member)) {
                            containsInstancePrivateElements = true;
                        }
                        else if (isPropertyDeclaration(member)) {
                            containsPublicInstanceFields = true;
                            containsInitializedPublicInstanceFields || (containsInitializedPublicInstanceFields = !!member.initializer);
                        }
                    }
                }
                const willHoistInitializersToConstructor = shouldTransformInitializersUsingDefine && containsPublicInstanceFields || shouldTransformInitializersUsingSet && containsInitializedPublicInstanceFields || shouldTransformPrivateElementsOrClassStaticBlocks && containsInstancePrivateElements || shouldTransformPrivateElementsOrClassStaticBlocks && containsInstanceAutoAccessors && shouldTransformAutoAccessors === -1 /* True */;
                if (willHoistInitializersToConstructor) {
                    facts |= 16 /* WillHoistInitializersToConstructor */;
                }
                return facts;
            }
            function visitExpressionWithTypeArgumentsInHeritageClause(node) {
                var _a2;
                const facts = ((_a2 = lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) == null ? void 0 : _a2.facts) || 0 /* None */;
                if (facts & 4 /* NeedsClassSuperReference */) {
                    const temp = factory2.createTempVariable(hoistVariableDeclaration, 
                    /*reserveInNestedScopes*/
                    true);
                    getClassLexicalEnvironment().superClassReference = temp;
                    return factory2.updateExpressionWithTypeArguments(node, factory2.createAssignment(temp, visitNode(node.expression, visitor, isExpression)), 
                    /*typeArguments*/
                    void 0);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitInNewClassLexicalEnvironment(node, referencedName, visitor2) {
                const savedCurrentClassContainer = currentClassContainer;
                const savedPendingExpressions = pendingExpressions;
                const savedLexicalEnvironment = lexicalEnvironment;
                currentClassContainer = node;
                pendingExpressions = void 0;
                startClassLexicalEnvironment();
                const shouldAlwaysTransformPrivateStaticElements = getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */;
                if (shouldTransformPrivateElementsOrClassStaticBlocks || shouldAlwaysTransformPrivateStaticElements) {
                    const name = getNameOfDeclaration(node);
                    if (name && isIdentifier(name)) {
                        getPrivateIdentifierEnvironment().data.className = name;
                    }
                }
                if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                    const privateInstanceMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
                    if (some(privateInstanceMethodsAndAccessors)) {
                        getPrivateIdentifierEnvironment().data.weakSetName = createHoistedVariableForClass("instances", privateInstanceMethodsAndAccessors[0].name);
                    }
                }
                const facts = getClassFacts(node);
                if (facts) {
                    getClassLexicalEnvironment().facts = facts;
                }
                if (facts & 8 /* NeedsSubstitutionForThisInClassStaticField */) {
                    enableSubstitutionForClassStaticThisOrSuperReference();
                }
                const result = visitor2(node, facts, referencedName);
                endClassLexicalEnvironment();
                Debug.assert(lexicalEnvironment === savedLexicalEnvironment);
                currentClassContainer = savedCurrentClassContainer;
                pendingExpressions = savedPendingExpressions;
                return result;
            }
            function visitClassDeclaration(node) {
                return visitInNewClassLexicalEnvironment(node, 
                /*referencedName*/
                void 0, visitClassDeclarationInNewClassLexicalEnvironment);
            }
            function visitClassDeclarationInNewClassLexicalEnvironment(node, facts) {
                var _a2, _b;
                let pendingClassReferenceAssignment;
                if (facts & 2 /* NeedsClassConstructorReference */) {
                    if (shouldTransformPrivateElementsOrClassStaticBlocks && ((_a2 = node.emitNode) == null ? void 0 : _a2.classThis)) {
                        getClassLexicalEnvironment().classConstructor = node.emitNode.classThis;
                        pendingClassReferenceAssignment = factory2.createAssignment(node.emitNode.classThis, factory2.getInternalName(node));
                    }
                    else {
                        const temp = factory2.createTempVariable(hoistVariableDeclaration, 
                        /*reservedInNestedScopes*/
                        true);
                        getClassLexicalEnvironment().classConstructor = factory2.cloneNode(temp);
                        pendingClassReferenceAssignment = factory2.createAssignment(temp, factory2.getInternalName(node));
                    }
                    if ((_b = node.emitNode) == null ? void 0 : _b.classThis) {
                        getClassLexicalEnvironment().classThis = node.emitNode.classThis;
                    }
                }
                const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                const heritageClauses = visitNodes2(node.heritageClauses, heritageClauseVisitor, isHeritageClause);
                const { members, prologue } = transformClassMembers(node);
                const classDecl = factory2.updateClassDeclaration(node, modifiers, node.name, 
                /*typeParameters*/
                void 0, heritageClauses, members);
                const statements = [];
                if (prologue) {
                    statements.push(factory2.createExpressionStatement(prologue));
                }
                statements.push(classDecl);
                if (pendingClassReferenceAssignment) {
                    getPendingExpressions().unshift(pendingClassReferenceAssignment);
                }
                if (some(pendingExpressions)) {
                    statements.push(factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions)));
                }
                if (shouldTransformInitializersUsingSet || shouldTransformPrivateElementsOrClassStaticBlocks || getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */) {
                    const staticProperties = getStaticPropertiesAndClassStaticBlock(node);
                    if (some(staticProperties)) {
                        addPropertyOrClassStaticBlockStatements(statements, staticProperties, factory2.getInternalName(node));
                    }
                }
                return statements;
            }
            function visitClassExpression(node, referencedName) {
                return visitInNewClassLexicalEnvironment(node, referencedName, visitClassExpressionInNewClassLexicalEnvironment);
            }
            function visitClassExpressionInNewClassLexicalEnvironment(node, facts, referencedName) {
                var _a2, _b, _c, _d, _e, _f;
                const isDecoratedClassDeclaration = !!(facts & 1 /* ClassWasDecorated */);
                const staticPropertiesOrClassStaticBlocks = getStaticPropertiesAndClassStaticBlock(node);
                const isClassWithConstructorReference = resolver.getNodeCheckFlags(node) & 1048576 /* ClassWithConstructorReference */;
                let temp;
                function createClassTempVar() {
                    var _a3;
                    if (shouldTransformPrivateElementsOrClassStaticBlocks && ((_a3 = node.emitNode) == null ? void 0 : _a3.classThis)) {
                        return getClassLexicalEnvironment().classConstructor = node.emitNode.classThis;
                    }
                    const classCheckFlags = resolver.getNodeCheckFlags(node);
                    const isClassWithConstructorReference2 = classCheckFlags & 1048576 /* ClassWithConstructorReference */;
                    const requiresBlockScopedVar = classCheckFlags & 32768 /* BlockScopedBindingInLoop */;
                    const temp2 = factory2.createTempVariable(requiresBlockScopedVar ? addBlockScopedVariable : hoistVariableDeclaration, !!isClassWithConstructorReference2);
                    getClassLexicalEnvironment().classConstructor = factory2.cloneNode(temp2);
                    return temp2;
                }
                if ((_a2 = node.emitNode) == null ? void 0 : _a2.classThis) {
                    getClassLexicalEnvironment().classThis = node.emitNode.classThis;
                }
                if (facts & 2 /* NeedsClassConstructorReference */) {
                    temp != null ? temp : temp = createClassTempVar();
                }
                const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                const heritageClauses = visitNodes2(node.heritageClauses, heritageClauseVisitor, isHeritageClause);
                const { members, prologue } = transformClassMembers(node);
                let classExpression = factory2.updateClassExpression(node, modifiers, node.name, 
                /*typeParameters*/
                void 0, heritageClauses, members);
                const expressions = [];
                if (prologue) {
                    expressions.push(prologue);
                }
                const hasTransformableStatics = (shouldTransformPrivateElementsOrClassStaticBlocks || getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */) && some(staticPropertiesOrClassStaticBlocks, (node2) => isClassStaticBlockDeclaration(node2) || isPrivateIdentifierClassElementDeclaration(node2) || shouldTransformInitializers && isInitializedProperty(node2));
                if (hasTransformableStatics || some(pendingExpressions) || referencedName) {
                    if (isDecoratedClassDeclaration) {
                        Debug.assertIsDefined(pendingStatements, "Decorated classes transformed by TypeScript are expected to be within a variable declaration.");
                        if (some(pendingExpressions)) {
                            addRange(pendingStatements, map(pendingExpressions, factory2.createExpressionStatement));
                        }
                        if (referencedName) {
                            if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                                const setNameExpression = emitHelpers().createSetFunctionNameHelper((_c = temp != null ? temp : (_b = node.emitNode) == null ? void 0 : _b.classThis) != null ? _c : factory2.getInternalName(node), referencedName);
                                pendingStatements.push(factory2.createExpressionStatement(setNameExpression));
                            }
                            else {
                                const setNameExpression = emitHelpers().createSetFunctionNameHelper(factory2.createThis(), referencedName);
                                classExpression = factory2.updateClassExpression(classExpression, classExpression.modifiers, classExpression.name, classExpression.typeParameters, classExpression.heritageClauses, [
                                    factory2.createClassStaticBlockDeclaration(factory2.createBlock([
                                        factory2.createExpressionStatement(setNameExpression)
                                    ])),
                                    ...classExpression.members
                                ]);
                            }
                        }
                        if (some(staticPropertiesOrClassStaticBlocks)) {
                            addPropertyOrClassStaticBlockStatements(pendingStatements, staticPropertiesOrClassStaticBlocks, (_e = (_d = node.emitNode) == null ? void 0 : _d.classThis) != null ? _e : factory2.getInternalName(node));
                        }
                        if (temp) {
                            expressions.push(factory2.createAssignment(temp, classExpression));
                        }
                        else if (shouldTransformPrivateElementsOrClassStaticBlocks && ((_f = node.emitNode) == null ? void 0 : _f.classThis)) {
                            expressions.push(factory2.createAssignment(node.emitNode.classThis, classExpression));
                        }
                        else {
                            expressions.push(classExpression);
                        }
                    }
                    else {
                        temp != null ? temp : temp = createClassTempVar();
                        if (isClassWithConstructorReference) {
                            enableSubstitutionForClassAliases();
                            const alias = factory2.cloneNode(temp);
                            alias.emitNode.autoGenerate.flags &= ~8 /* ReservedInNestedScopes */;
                            classAliases[getOriginalNodeId(node)] = alias;
                        }
                        expressions.push(factory2.createAssignment(temp, classExpression));
                        addRange(expressions, pendingExpressions);
                        if (referencedName) {
                            expressions.push(emitHelpers().createSetFunctionNameHelper(temp, referencedName));
                        }
                        addRange(expressions, generateInitializedPropertyExpressionsOrClassStaticBlock(staticPropertiesOrClassStaticBlocks, temp));
                        expressions.push(factory2.cloneNode(temp));
                    }
                }
                else {
                    expressions.push(classExpression);
                }
                if (expressions.length > 1) {
                    addEmitFlags(classExpression, 131072 /* Indented */);
                    expressions.forEach(startOnNewLine);
                }
                return factory2.inlineExpressions(expressions);
            }
            function visitClassStaticBlockDeclaration(node) {
                if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
                    return visitEachChild(node, visitor, context);
                }
                return void 0;
            }
            function transformClassMembers(node) {
                const shouldTransformPrivateStaticElementsInClass = !!(getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */);
                if (shouldTransformPrivateElementsOrClassStaticBlocks || shouldTransformPrivateStaticElementsInFile) {
                    for (const member of node.members) {
                        if (isPrivateIdentifierClassElementDeclaration(member)) {
                            if (shouldTransformClassElementToWeakMap(member)) {
                                addPrivateIdentifierToEnvironment(member, member.name, addPrivateIdentifierClassElementToEnvironment);
                            }
                            else {
                                const privateEnv = getPrivateIdentifierEnvironment();
                                setPrivateIdentifier(privateEnv, member.name, { kind: "untransformed" });
                            }
                        }
                    }
                    if (shouldTransformPrivateElementsOrClassStaticBlocks) {
                        if (some(getPrivateInstanceMethodsAndAccessors(node))) {
                            createBrandCheckWeakSetForPrivateMethods();
                        }
                    }
                    if (shouldTransformAutoAccessorsInCurrentClass()) {
                        for (const member of node.members) {
                            if (isAutoAccessorPropertyDeclaration(member)) {
                                const storageName = factory2.getGeneratedPrivateNameForNode(member.name, 
                                /*prefix*/
                                void 0, "_accessor_storage");
                                if (shouldTransformPrivateElementsOrClassStaticBlocks || shouldTransformPrivateStaticElementsInClass && hasStaticModifier(member)) {
                                    addPrivateIdentifierToEnvironment(member, storageName, addPrivateIdentifierPropertyDeclarationToEnvironment);
                                }
                                else {
                                    const privateEnv = getPrivateIdentifierEnvironment();
                                    setPrivateIdentifier(privateEnv, storageName, { kind: "untransformed" });
                                }
                            }
                        }
                    }
                }
                let members = visitNodes2(node.members, classElementVisitor, isClassElement);
                let syntheticConstructor;
                if (!some(members, isConstructorDeclaration)) {
                    syntheticConstructor = transformConstructor(
                    /*constructor*/
                    void 0, node);
                }
                let prologue;
                let syntheticStaticBlock;
                if (!shouldTransformPrivateElementsOrClassStaticBlocks && some(pendingExpressions)) {
                    let statement = factory2.createExpressionStatement(factory2.inlineExpressions(pendingExpressions));
                    if (statement.transformFlags & 134234112 /* ContainsLexicalThisOrSuper */) {
                        const temp = factory2.createTempVariable(hoistVariableDeclaration);
                        const arrow = factory2.createArrowFunction(
                        /*modifiers*/
                        void 0, 
                        /*typeParameters*/
                        void 0, 
                        /*parameters*/
                        [], 
                        /*type*/
                        void 0, 
                        /*equalsGreaterThanToken*/
                        void 0, factory2.createBlock([statement]));
                        prologue = factory2.createAssignment(temp, arrow);
                        statement = factory2.createExpressionStatement(factory2.createCallExpression(temp, 
                        /*typeArguments*/
                        void 0, []));
                    }
                    const block = factory2.createBlock([statement]);
                    syntheticStaticBlock = factory2.createClassStaticBlockDeclaration(block);
                    pendingExpressions = void 0;
                }
                if (syntheticConstructor || syntheticStaticBlock) {
                    let membersArray;
                    membersArray = append(membersArray, syntheticConstructor);
                    membersArray = append(membersArray, syntheticStaticBlock);
                    membersArray = addRange(membersArray, members);
                    members = setTextRange(factory2.createNodeArray(membersArray), 
                    /*location*/
                    node.members);
                }
                return { members, prologue };
            }
            function createBrandCheckWeakSetForPrivateMethods() {
                const { weakSetName } = getPrivateIdentifierEnvironment().data;
                Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");
                getPendingExpressions().push(factory2.createAssignment(weakSetName, factory2.createNewExpression(factory2.createIdentifier("WeakSet"), 
                /*typeArguments*/
                void 0, [])));
            }
            function transformConstructor(constructor, container) {
                constructor = visitNode(constructor, visitor, isConstructorDeclaration);
                if (!(lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) || !(lexicalEnvironment.data.facts & 16 /* WillHoistInitializersToConstructor */)) {
                    return constructor;
                }
                const extendsClauseElement = getEffectiveBaseTypeNode(container);
                const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== 104 /* NullKeyword */);
                const parameters = visitParameterList(constructor ? constructor.parameters : void 0, visitor, context);
                const body = transformConstructorBody(container, constructor, isDerivedClass);
                if (!body) {
                    return constructor;
                }
                if (constructor) {
                    Debug.assert(parameters);
                    return factory2.updateConstructorDeclaration(constructor, 
                    /*modifiers*/
                    void 0, parameters, body);
                }
                return startOnNewLine(setOriginalNode(setTextRange(factory2.createConstructorDeclaration(
                /*modifiers*/
                void 0, parameters != null ? parameters : [], body), constructor || container), constructor));
            }
            function transformConstructorBody(node, constructor, isDerivedClass) {
                var _a2, _b;
                const instanceProperties = getProperties(node, 
                /*requireInitializer*/
                false, 
                /*isStatic*/
                false);
                let properties = instanceProperties;
                if (!useDefineForClassFields) {
                    properties = filter(properties, (property) => !!property.initializer || isPrivateIdentifier(property.name) || hasAccessorModifier(property));
                }
                const privateMethodsAndAccessors = getPrivateInstanceMethodsAndAccessors(node);
                const needsConstructorBody = some(properties) || some(privateMethodsAndAccessors);
                if (!constructor && !needsConstructorBody) {
                    return visitFunctionBody(
                    /*node*/
                    void 0, visitor, context);
                }
                resumeLexicalEnvironment();
                const needsSyntheticConstructor = !constructor && isDerivedClass;
                let indexOfFirstStatementAfterSuperAndPrologue = 0;
                let prologueStatementCount = 0;
                let superStatementIndex = -1;
                let statements = [];
                if ((_a2 = constructor == null ? void 0 : constructor.body) == null ? void 0 : _a2.statements) {
                    prologueStatementCount = factory2.copyPrologue(constructor.body.statements, statements, 
                    /*ensureUseStrict*/
                    false, visitor);
                    superStatementIndex = findSuperStatementIndex(constructor.body.statements, prologueStatementCount);
                    if (superStatementIndex >= 0) {
                        indexOfFirstStatementAfterSuperAndPrologue = superStatementIndex + 1;
                        statements = [
                            ...statements.slice(0, prologueStatementCount),
                            ...visitNodes2(constructor.body.statements, visitor, isStatement, prologueStatementCount, indexOfFirstStatementAfterSuperAndPrologue - prologueStatementCount),
                            ...statements.slice(prologueStatementCount)
                        ];
                    }
                    else if (prologueStatementCount >= 0) {
                        indexOfFirstStatementAfterSuperAndPrologue = prologueStatementCount;
                    }
                }
                if (needsSyntheticConstructor) {
                    statements.push(factory2.createExpressionStatement(factory2.createCallExpression(factory2.createSuper(), 
                    /*typeArguments*/
                    void 0, [factory2.createSpreadElement(factory2.createIdentifier("arguments"))])));
                }
                let parameterPropertyDeclarationCount = 0;
                if (constructor == null ? void 0 : constructor.body) {
                    for (let i = indexOfFirstStatementAfterSuperAndPrologue; i < constructor.body.statements.length; i++) {
                        const statement = constructor.body.statements[i];
                        if (isParameterPropertyDeclaration(getOriginalNode(statement), constructor)) {
                            parameterPropertyDeclarationCount++;
                        }
                        else {
                            break;
                        }
                    }
                    if (parameterPropertyDeclarationCount > 0) {
                        indexOfFirstStatementAfterSuperAndPrologue += parameterPropertyDeclarationCount;
                    }
                }
                const receiver = factory2.createThis();
                addInstanceMethodStatements(statements, privateMethodsAndAccessors, receiver);
                if (constructor) {
                    const parameterProperties = filter(instanceProperties, (prop) => isParameterPropertyDeclaration(getOriginalNode(prop), constructor));
                    const nonParameterProperties = filter(properties, (prop) => !isParameterPropertyDeclaration(getOriginalNode(prop), constructor));
                    addPropertyOrClassStaticBlockStatements(statements, parameterProperties, receiver);
                    addPropertyOrClassStaticBlockStatements(statements, nonParameterProperties, receiver);
                }
                else {
                    addPropertyOrClassStaticBlockStatements(statements, properties, receiver);
                }
                if (constructor) {
                    addRange(statements, visitNodes2(constructor.body.statements, visitor, isStatement, indexOfFirstStatementAfterSuperAndPrologue));
                }
                statements = factory2.mergeLexicalEnvironment(statements, endLexicalEnvironment());
                if (statements.length === 0 && !constructor) {
                    return void 0;
                }
                const multiLine = (constructor == null ? void 0 : constructor.body) && constructor.body.statements.length >= statements.length ? (_b = constructor.body.multiLine) != null ? _b : statements.length > 0 : statements.length > 0;
                return setTextRange(factory2.createBlock(setTextRange(factory2.createNodeArray(statements), 
                /*location*/
                constructor ? constructor.body.statements : node.members), multiLine), 
                /*location*/
                constructor ? constructor.body : void 0);
            }
            function addPropertyOrClassStaticBlockStatements(statements, properties, receiver) {
                for (const property of properties) {
                    if (isStatic(property) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                        continue;
                    }
                    const statement = transformPropertyOrClassStaticBlock(property, receiver);
                    if (!statement) {
                        continue;
                    }
                    statements.push(statement);
                }
            }
            function transformPropertyOrClassStaticBlock(property, receiver) {
                const expression = isClassStaticBlockDeclaration(property) ? transformClassStaticBlockDeclaration(property) : transformProperty(property, receiver);
                if (!expression) {
                    return void 0;
                }
                const statement = factory2.createExpressionStatement(expression);
                setOriginalNode(statement, property);
                addEmitFlags(statement, getEmitFlags(property) & 3072 /* NoComments */);
                setCommentRange(statement, property);
                const propertyOriginalNode = getOriginalNode(property);
                if (isParameter(propertyOriginalNode)) {
                    setSourceMapRange(statement, propertyOriginalNode);
                    removeAllComments(statement);
                }
                else {
                    setSourceMapRange(statement, moveRangePastModifiers(property));
                }
                setSyntheticLeadingComments(expression, void 0);
                setSyntheticTrailingComments(expression, void 0);
                if (hasAccessorModifier(propertyOriginalNode)) {
                    addEmitFlags(statement, 3072 /* NoComments */);
                }
                return statement;
            }
            function generateInitializedPropertyExpressionsOrClassStaticBlock(propertiesOrClassStaticBlocks, receiver) {
                const expressions = [];
                for (const property of propertiesOrClassStaticBlocks) {
                    const expression = isClassStaticBlockDeclaration(property) ? transformClassStaticBlockDeclaration(property) : transformProperty(property, receiver);
                    if (!expression) {
                        continue;
                    }
                    startOnNewLine(expression);
                    setOriginalNode(expression, property);
                    addEmitFlags(expression, getEmitFlags(property) & 3072 /* NoComments */);
                    setSourceMapRange(expression, moveRangePastModifiers(property));
                    setCommentRange(expression, property);
                    expressions.push(expression);
                }
                return expressions;
            }
            function transformProperty(property, receiver) {
                var _a2;
                const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
                const transformed = transformPropertyWorker(property, receiver);
                if (transformed && hasStaticModifier(property) && ((_a2 = lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) == null ? void 0 : _a2.facts)) {
                    setOriginalNode(transformed, property);
                    addEmitFlags(transformed, 4 /* AdviseOnEmitNode */);
                    setSourceMapRange(transformed, getSourceMapRange(property.name));
                    lexicalEnvironmentMap.set(getOriginalNode(property), lexicalEnvironment);
                }
                currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
                return transformed;
            }
            function transformPropertyWorker(property, receiver) {
                const emitAssignment = !useDefineForClassFields;
                let referencedName;
                if (isNamedEvaluation(property, isAnonymousClassNeedingAssignedName)) {
                    if (isPropertyNameLiteral(property.name) || isPrivateIdentifier(property.name)) {
                        referencedName = factory2.createStringLiteralFromNode(property.name);
                    }
                    else if (isPropertyNameLiteral(property.name.expression) && !isIdentifier(property.name.expression)) {
                        referencedName = factory2.createStringLiteralFromNode(property.name.expression);
                    }
                    else {
                        referencedName = factory2.getGeneratedNameForNode(property.name);
                    }
                }
                const propertyName = hasAccessorModifier(property) ? factory2.getGeneratedPrivateNameForNode(property.name) : isComputedPropertyName(property.name) && !isSimpleInlineableExpression(property.name.expression) ? factory2.updateComputedPropertyName(property.name, factory2.getGeneratedNameForNode(property.name)) : property.name;
                if (hasStaticModifier(property)) {
                    currentStaticPropertyDeclarationOrStaticBlock = property;
                }
                const initializerVisitor = referencedName ? (child) => namedEvaluationVisitor(child, referencedName) : visitor;
                if (isPrivateIdentifier(propertyName) && shouldTransformClassElementToWeakMap(property)) {
                    const privateIdentifierInfo = accessPrivateIdentifier2(propertyName);
                    if (privateIdentifierInfo) {
                        if (privateIdentifierInfo.kind === "f" /* Field */) {
                            if (!privateIdentifierInfo.isStatic) {
                                return createPrivateInstanceFieldInitializer(receiver, visitNode(property.initializer, initializerVisitor, isExpression), privateIdentifierInfo.brandCheckIdentifier);
                            }
                            else {
                                return createPrivateStaticFieldInitializer(privateIdentifierInfo.variableName, visitNode(property.initializer, initializerVisitor, isExpression));
                            }
                        }
                        else {
                            return void 0;
                        }
                    }
                    else {
                        Debug.fail("Undeclared private name for property declaration.");
                    }
                }
                if ((isPrivateIdentifier(propertyName) || hasStaticModifier(property)) && !property.initializer) {
                    return void 0;
                }
                const propertyOriginalNode = getOriginalNode(property);
                if (hasSyntacticModifier(propertyOriginalNode, 256 /* Abstract */)) {
                    return void 0;
                }
                let initializer = visitNode(property.initializer, initializerVisitor, isExpression);
                if (isParameterPropertyDeclaration(propertyOriginalNode, propertyOriginalNode.parent) && isIdentifier(propertyName)) {
                    const localName = factory2.cloneNode(propertyName);
                    if (initializer) {
                        if (isParenthesizedExpression(initializer) && isCommaExpression(initializer.expression) && isCallToHelper(initializer.expression.left, "___runInitializers") && isVoidExpression(initializer.expression.right) && isNumericLiteral(initializer.expression.right.expression)) {
                            initializer = initializer.expression.left;
                        }
                        initializer = factory2.inlineExpressions([initializer, localName]);
                    }
                    else {
                        initializer = localName;
                    }
                    setEmitFlags(propertyName, 3072 /* NoComments */ | 96 /* NoSourceMap */);
                    setSourceMapRange(localName, propertyOriginalNode.name);
                    setEmitFlags(localName, 3072 /* NoComments */);
                }
                else {
                    initializer != null ? initializer : initializer = factory2.createVoidZero();
                }
                if (emitAssignment || isPrivateIdentifier(propertyName)) {
                    const memberAccess = createMemberAccessForPropertyName(factory2, receiver, propertyName, 
                    /*location*/
                    propertyName);
                    addEmitFlags(memberAccess, 1024 /* NoLeadingComments */);
                    const expression = factory2.createAssignment(memberAccess, initializer);
                    return expression;
                }
                else {
                    const name = isComputedPropertyName(propertyName) ? propertyName.expression : isIdentifier(propertyName) ? factory2.createStringLiteral(unescapeLeadingUnderscores(propertyName.escapedText)) : propertyName;
                    const descriptor = factory2.createPropertyDescriptor({ value: initializer, configurable: true, writable: true, enumerable: true });
                    return factory2.createObjectDefinePropertyCall(receiver, name, descriptor);
                }
            }
            function enableSubstitutionForClassAliases() {
                if ((enabledSubstitutions & 1 /* ClassAliases */) === 0) {
                    enabledSubstitutions |= 1 /* ClassAliases */;
                    context.enableSubstitution(79 /* Identifier */);
                    classAliases = [];
                }
            }
            function enableSubstitutionForClassStaticThisOrSuperReference() {
                if ((enabledSubstitutions & 2 /* ClassStaticThisOrSuperReference */) === 0) {
                    enabledSubstitutions |= 2 /* ClassStaticThisOrSuperReference */;
                    context.enableSubstitution(108 /* ThisKeyword */);
                    context.enableEmitNotification(259 /* FunctionDeclaration */);
                    context.enableEmitNotification(215 /* FunctionExpression */);
                    context.enableEmitNotification(173 /* Constructor */);
                    context.enableEmitNotification(174 /* GetAccessor */);
                    context.enableEmitNotification(175 /* SetAccessor */);
                    context.enableEmitNotification(171 /* MethodDeclaration */);
                    context.enableEmitNotification(169 /* PropertyDeclaration */);
                    context.enableEmitNotification(164 /* ComputedPropertyName */);
                }
            }
            function addInstanceMethodStatements(statements, methods, receiver) {
                if (!shouldTransformPrivateElementsOrClassStaticBlocks || !some(methods)) {
                    return;
                }
                const { weakSetName } = getPrivateIdentifierEnvironment().data;
                Debug.assert(weakSetName, "weakSetName should be set in private identifier environment");
                statements.push(factory2.createExpressionStatement(createPrivateInstanceMethodInitializer(receiver, weakSetName)));
            }
            function visitInvalidSuperProperty(node) {
                return isPropertyAccessExpression(node) ? factory2.updatePropertyAccessExpression(node, factory2.createVoidZero(), node.name) : factory2.updateElementAccessExpression(node, factory2.createVoidZero(), visitNode(node.argumentExpression, visitor, isExpression));
            }
            function getPropertyNameExpressionIfNeeded(name, shouldHoist, captureReferencedName) {
                if (isComputedPropertyName(name)) {
                    const cacheAssignment = findComputedPropertyNameCacheAssignment(name);
                    let expression = visitNode(name.expression, visitor, isExpression);
                    const innerExpression = skipPartiallyEmittedExpressions(expression);
                    const inlinable = isSimpleInlineableExpression(innerExpression);
                    const alreadyTransformed = !!cacheAssignment || isAssignmentExpression(innerExpression) && isGeneratedIdentifier(innerExpression.left);
                    if (!alreadyTransformed && !inlinable && shouldHoist) {
                        const generatedName = factory2.getGeneratedNameForNode(name);
                        if (resolver.getNodeCheckFlags(name) & 32768 /* BlockScopedBindingInLoop */) {
                            addBlockScopedVariable(generatedName);
                        }
                        else {
                            hoistVariableDeclaration(generatedName);
                        }
                        if (captureReferencedName) {
                            expression = emitHelpers().createPropKeyHelper(expression);
                        }
                        return factory2.createAssignment(generatedName, expression);
                    }
                    return inlinable || isIdentifier(innerExpression) ? void 0 : expression;
                }
            }
            function startClassLexicalEnvironment() {
                lexicalEnvironment = { previous: lexicalEnvironment, data: void 0 };
            }
            function endClassLexicalEnvironment() {
                lexicalEnvironment = lexicalEnvironment == null ? void 0 : lexicalEnvironment.previous;
            }
            function getClassLexicalEnvironment() {
                var _a2;
                Debug.assert(lexicalEnvironment);
                return (_a2 = lexicalEnvironment.data) != null ? _a2 : lexicalEnvironment.data = {
                    facts: 0 /* None */,
                    classConstructor: void 0,
                    classThis: void 0,
                    superClassReference: void 0
                    // privateIdentifierEnvironment: undefined,
                };
            }
            function getPrivateIdentifierEnvironment() {
                var _a2;
                Debug.assert(lexicalEnvironment);
                return (_a2 = lexicalEnvironment.privateEnv) != null ? _a2 : lexicalEnvironment.privateEnv = newPrivateEnvironment({
                    className: void 0,
                    weakSetName: void 0
                });
            }
            function getPendingExpressions() {
                return pendingExpressions != null ? pendingExpressions : pendingExpressions = [];
            }
            function addPrivateIdentifierClassElementToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
                if (isAutoAccessorPropertyDeclaration(node)) {
                    addPrivateIdentifierAutoAccessorPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isPropertyDeclaration(node)) {
                    addPrivateIdentifierPropertyDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isMethodDeclaration(node)) {
                    addPrivateIdentifierMethodDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isGetAccessorDeclaration(node)) {
                    addPrivateIdentifierGetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
                else if (isSetAccessorDeclaration(node)) {
                    addPrivateIdentifierSetAccessorDeclarationToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
                }
            }
            function addPrivateIdentifierPropertyDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {
                var _a2;
                if (isStatic2) {
                    const brandCheckIdentifier = Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment");
                    const variableName = createHoistedVariableForPrivateName(name);
                    setPrivateIdentifier(privateEnv, name, {
                        kind: "f" /* Field */,
                        isStatic: true,
                        brandCheckIdentifier,
                        variableName,
                        isValid
                    });
                }
                else {
                    const weakMapName = createHoistedVariableForPrivateName(name);
                    setPrivateIdentifier(privateEnv, name, {
                        kind: "f" /* Field */,
                        isStatic: false,
                        brandCheckIdentifier: weakMapName,
                        isValid
                    });
                    getPendingExpressions().push(factory2.createAssignment(weakMapName, factory2.createNewExpression(factory2.createIdentifier("WeakMap"), 
                    /*typeArguments*/
                    void 0, [])));
                }
            }
            function addPrivateIdentifierMethodDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {
                var _a2;
                const methodName = createHoistedVariableForPrivateName(name);
                const brandCheckIdentifier = isStatic2 ? Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment") : Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");
                setPrivateIdentifier(privateEnv, name, {
                    kind: "m" /* Method */,
                    methodName,
                    brandCheckIdentifier,
                    isStatic: isStatic2,
                    isValid
                });
            }
            function addPrivateIdentifierGetAccessorDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
                var _a2;
                const getterName = createHoistedVariableForPrivateName(name, "_get");
                const brandCheckIdentifier = isStatic2 ? Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment") : Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");
                if ((previousInfo == null ? void 0 : previousInfo.kind) === "a" /* Accessor */ && previousInfo.isStatic === isStatic2 && !previousInfo.getterName) {
                    previousInfo.getterName = getterName;
                }
                else {
                    setPrivateIdentifier(privateEnv, name, {
                        kind: "a" /* Accessor */,
                        getterName,
                        setterName: void 0,
                        brandCheckIdentifier,
                        isStatic: isStatic2,
                        isValid
                    });
                }
            }
            function addPrivateIdentifierSetAccessorDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
                var _a2;
                const setterName = createHoistedVariableForPrivateName(name, "_set");
                const brandCheckIdentifier = isStatic2 ? Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment") : Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");
                if ((previousInfo == null ? void 0 : previousInfo.kind) === "a" /* Accessor */ && previousInfo.isStatic === isStatic2 && !previousInfo.setterName) {
                    previousInfo.setterName = setterName;
                }
                else {
                    setPrivateIdentifier(privateEnv, name, {
                        kind: "a" /* Accessor */,
                        getterName: void 0,
                        setterName,
                        brandCheckIdentifier,
                        isStatic: isStatic2,
                        isValid
                    });
                }
            }
            function addPrivateIdentifierAutoAccessorPropertyDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {
                var _a2;
                const getterName = createHoistedVariableForPrivateName(name, "_get");
                const setterName = createHoistedVariableForPrivateName(name, "_set");
                const brandCheckIdentifier = isStatic2 ? Debug.checkDefined((_a2 = lex.classThis) != null ? _a2 : lex.classConstructor, "classConstructor should be set in private identifier environment") : Debug.checkDefined(privateEnv.data.weakSetName, "weakSetName should be set in private identifier environment");
                setPrivateIdentifier(privateEnv, name, {
                    kind: "a" /* Accessor */,
                    getterName,
                    setterName,
                    brandCheckIdentifier,
                    isStatic: isStatic2,
                    isValid
                });
            }
            function addPrivateIdentifierToEnvironment(node, name, addDeclaration) {
                const lex = getClassLexicalEnvironment();
                const privateEnv = getPrivateIdentifierEnvironment();
                const previousInfo = getPrivateIdentifier(privateEnv, name);
                const isStatic2 = hasStaticModifier(node);
                const isValid = !isReservedPrivateName(name) && previousInfo === void 0;
                addDeclaration(node, name, lex, privateEnv, isStatic2, isValid, previousInfo);
            }
            function createHoistedVariableForClass(name, node, suffix) {
                const { className } = getPrivateIdentifierEnvironment().data;
                const prefix = className ? { prefix: "_", node: className, suffix: "_" } : "_";
                const identifier = typeof name === "object" ? factory2.getGeneratedNameForNode(name, 16 /* Optimistic */ | 8 /* ReservedInNestedScopes */, prefix, suffix) : typeof name === "string" ? factory2.createUniqueName(name, 16 /* Optimistic */, prefix, suffix) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0, 
                /*reserveInNestedScopes*/
                true, prefix, suffix);
                if (resolver.getNodeCheckFlags(node) & 32768 /* BlockScopedBindingInLoop */) {
                    addBlockScopedVariable(identifier);
                }
                else {
                    hoistVariableDeclaration(identifier);
                }
                return identifier;
            }
            function createHoistedVariableForPrivateName(name, suffix) {
                var _a2;
                const text = tryGetTextOfPropertyName(name);
                return createHoistedVariableForClass((_a2 = text == null ? void 0 : text.substring(1)) != null ? _a2 : name, name, suffix);
            }
            function accessPrivateIdentifier2(name) {
                const info = accessPrivateIdentifier(lexicalEnvironment, name);
                return (info == null ? void 0 : info.kind) === "untransformed" ? void 0 : info;
            }
            function wrapPrivateIdentifierForDestructuringTarget(node) {
                const parameter = factory2.getGeneratedNameForNode(node);
                const info = accessPrivateIdentifier2(node.name);
                if (!info) {
                    return visitEachChild(node, visitor, context);
                }
                let receiver = node.expression;
                if (isThisProperty(node) || isSuperProperty(node) || !isSimpleCopiableExpression(node.expression)) {
                    receiver = factory2.createTempVariable(hoistVariableDeclaration, 
                    /*reservedInNestedScopes*/
                    true);
                    getPendingExpressions().push(factory2.createBinaryExpression(receiver, 63 /* EqualsToken */, visitNode(node.expression, visitor, isExpression)));
                }
                return factory2.createAssignmentTargetWrapper(parameter, createPrivateIdentifierAssignment(info, receiver, parameter, 63 /* EqualsToken */));
            }
            function visitDestructuringAssignmentTarget(node) {
                if (isObjectLiteralExpression(node) || isArrayLiteralExpression(node)) {
                    return visitAssignmentPattern(node);
                }
                if (isPrivateIdentifierPropertyAccessExpression(node)) {
                    return wrapPrivateIdentifierForDestructuringTarget(node);
                }
                else if (shouldTransformSuperInStaticInitializers && isSuperProperty(node) && currentStaticPropertyDeclarationOrStaticBlock && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data)) {
                    const { classConstructor, superClassReference, facts } = lexicalEnvironment.data;
                    if (facts & 1 /* ClassWasDecorated */) {
                        return visitInvalidSuperProperty(node);
                    }
                    else if (classConstructor && superClassReference) {
                        const name = isElementAccessExpression(node) ? visitNode(node.argumentExpression, visitor, isExpression) : isIdentifier(node.name) ? factory2.createStringLiteralFromNode(node.name) : void 0;
                        if (name) {
                            const temp = factory2.createTempVariable(
                            /*recordTempVariable*/
                            void 0);
                            return factory2.createAssignmentTargetWrapper(temp, factory2.createReflectSetCall(superClassReference, name, temp, classConstructor));
                        }
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitAssignmentElement(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const left = visitDestructuringAssignmentTarget(node.left);
                    const assignedName = getAssignedNameOfIdentifier(node.left, node.right);
                    const right = visitNode(node.right, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateBinaryExpression(node, left, node.operatorToken, right);
                }
                if (isAssignmentExpression(node, 
                /*excludeCompoundAssignment*/
                true)) {
                    const left = visitDestructuringAssignmentTarget(node.left);
                    const right = visitNode(node.right, visitor, isExpression);
                    return factory2.updateBinaryExpression(node, left, node.operatorToken, right);
                }
                return visitDestructuringAssignmentTarget(node);
            }
            function visitAssignmentRestElement(node) {
                if (isLeftHandSideExpression(node.expression)) {
                    const expression = visitDestructuringAssignmentTarget(node.expression);
                    return factory2.updateSpreadElement(node, expression);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitArrayAssignmentElement(node) {
                if (isArrayBindingOrAssignmentElement(node)) {
                    if (isSpreadElement(node))
                        return visitAssignmentRestElement(node);
                    if (!isOmittedExpression(node))
                        return visitAssignmentElement(node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitAssignmentProperty(node) {
                const name = visitNode(node.name, visitor, isPropertyName);
                if (isAssignmentExpression(node.initializer, 
                /*excludeCompoundAssignment*/
                true)) {
                    const assignmentElement = visitAssignmentElement(node.initializer);
                    return factory2.updatePropertyAssignment(node, name, assignmentElement);
                }
                if (isLeftHandSideExpression(node.initializer)) {
                    const assignmentElement = visitDestructuringAssignmentTarget(node.initializer);
                    return factory2.updatePropertyAssignment(node, name, assignmentElement);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitShorthandAssignmentProperty(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = getAssignedNameOfIdentifier(node.name, node.objectAssignmentInitializer);
                    const objectAssignmentInitializer = visitNode(node.objectAssignmentInitializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateShorthandPropertyAssignment(node, node.name, objectAssignmentInitializer);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitAssignmentRestProperty(node) {
                if (isLeftHandSideExpression(node.expression)) {
                    const expression = visitDestructuringAssignmentTarget(node.expression);
                    return factory2.updateSpreadAssignment(node, expression);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitObjectAssignmentElement(node) {
                Debug.assertNode(node, isObjectBindingOrAssignmentElement);
                if (isSpreadAssignment(node))
                    return visitAssignmentRestProperty(node);
                if (isShorthandPropertyAssignment(node))
                    return visitShorthandAssignmentProperty(node);
                if (isPropertyAssignment(node))
                    return visitAssignmentProperty(node);
                return visitEachChild(node, visitor, context);
            }
            function visitAssignmentPattern(node) {
                if (isArrayLiteralExpression(node)) {
                    return factory2.updateArrayLiteralExpression(node, visitNodes2(node.elements, visitArrayAssignmentElement, isExpression));
                }
                else {
                    return factory2.updateObjectLiteralExpression(node, visitNodes2(node.properties, visitObjectAssignmentElement, isObjectLiteralElementLike));
                }
            }
            function onEmitNode(hint, node, emitCallback) {
                const original = getOriginalNode(node);
                const lex = lexicalEnvironmentMap.get(original);
                if (lex) {
                    const savedLexicalEnvironment = lexicalEnvironment;
                    const savedPreviousShouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                    lexicalEnvironment = lex;
                    previousShouldSubstituteThisWithClassThis = shouldSubstituteThisWithClassThis;
                    shouldSubstituteThisWithClassThis = !isClassStaticBlockDeclaration(original) || !(getInternalEmitFlags(original) & 32 /* TransformPrivateStaticElements */);
                    previousOnEmitNode(hint, node, emitCallback);
                    shouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                    previousShouldSubstituteThisWithClassThis = savedPreviousShouldSubstituteThisWithClassThis;
                    lexicalEnvironment = savedLexicalEnvironment;
                    return;
                }
                switch (node.kind) {
                    case 215 /* FunctionExpression */:
                        if (isArrowFunction(original) || getEmitFlags(node) & 524288 /* AsyncFunctionBody */) {
                            break;
                        }
                    case 259 /* FunctionDeclaration */:
                    case 173 /* Constructor */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 171 /* MethodDeclaration */:
                    case 169 /* PropertyDeclaration */: {
                        const savedLexicalEnvironment = lexicalEnvironment;
                        const savedPreviousShouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                        lexicalEnvironment = void 0;
                        previousShouldSubstituteThisWithClassThis = shouldSubstituteThisWithClassThis;
                        shouldSubstituteThisWithClassThis = false;
                        previousOnEmitNode(hint, node, emitCallback);
                        shouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                        previousShouldSubstituteThisWithClassThis = savedPreviousShouldSubstituteThisWithClassThis;
                        lexicalEnvironment = savedLexicalEnvironment;
                        return;
                    }
                    case 164 /* ComputedPropertyName */: {
                        const savedLexicalEnvironment = lexicalEnvironment;
                        const savedShouldSubstituteThisWithClassThis = shouldSubstituteThisWithClassThis;
                        lexicalEnvironment = lexicalEnvironment == null ? void 0 : lexicalEnvironment.previous;
                        shouldSubstituteThisWithClassThis = previousShouldSubstituteThisWithClassThis;
                        previousOnEmitNode(hint, node, emitCallback);
                        shouldSubstituteThisWithClassThis = savedShouldSubstituteThisWithClassThis;
                        lexicalEnvironment = savedLexicalEnvironment;
                        return;
                    }
                }
                previousOnEmitNode(hint, node, emitCallback);
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
                    case 108 /* ThisKeyword */:
                        return substituteThisExpression(node);
                }
                return node;
            }
            function substituteThisExpression(node) {
                if (enabledSubstitutions & 2 /* ClassStaticThisOrSuperReference */ && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data)) {
                    const { facts, classConstructor, classThis } = lexicalEnvironment.data;
                    if (facts & 1 /* ClassWasDecorated */ && legacyDecorators) {
                        return factory2.createParenthesizedExpression(factory2.createVoidZero());
                    }
                    const substituteThis = shouldSubstituteThisWithClassThis ? classThis != null ? classThis : classConstructor : classConstructor;
                    if (substituteThis) {
                        return setTextRange(setOriginalNode(factory2.cloneNode(substituteThis), node), node);
                    }
                }
                return node;
            }
            function substituteExpressionIdentifier(node) {
                return trySubstituteClassAlias(node) || node;
            }
            function trySubstituteClassAlias(node) {
                if (enabledSubstitutions & 1 /* ClassAliases */) {
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