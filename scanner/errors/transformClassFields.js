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
            function addPrivateIdentifierClassElementToEnvironment(node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
            function addPrivateIdentifierPropertyDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {
            function addPrivateIdentifierMethodDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {
            function addPrivateIdentifierGetAccessorDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
            function addPrivateIdentifierSetAccessorDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, previousInfo) {
            function addPrivateIdentifierAutoAccessorPropertyDeclarationToEnvironment(_node, name, lex, privateEnv, isStatic2, isValid, _previousInfo) {