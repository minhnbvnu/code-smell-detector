            function visitor(node) {
                if (!shouldVisitNode(node)) {
                    return node;
                }
                switch (node.kind) {
                    case 167 /* Decorator */:
                        return Debug.fail("Use `modifierVisitor` instead.");
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node, 
                        /*referencedName*/
                        void 0);
                    case 173 /* Constructor */:
                    case 169 /* PropertyDeclaration */:
                    case 172 /* ClassStaticBlockDeclaration */:
                        return Debug.fail("Not supported outside of a class. Use 'classElementVisitor' instead.");
                    case 166 /* Parameter */:
                        return visitParameterDeclaration(node);
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node, 
                        /*discarded*/
                        false);
                    case 299 /* PropertyAssignment */:
                        return visitPropertyAssignment(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 205 /* BindingElement */:
                        return visitBindingElement(node);
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    case 108 /* ThisKeyword */:
                        return visitThisExpression(node);
                    case 245 /* ForStatement */:
                        return visitForStatement(node);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node, 
                        /*discarded*/
                        false);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, 
                        /*discarded*/
                        false, 
                        /*referencedName*/
                        void 0);
                    case 356 /* PartiallyEmittedExpression */:
                        return visitPartiallyEmittedExpression(node, 
                        /*discarded*/
                        false, 
                        /*referencedName*/
                        void 0);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        return visitPreOrPostfixUnaryExpression(node, 
                        /*discard*/
                        false);
                    case 208 /* PropertyAccessExpression */:
                        return visitPropertyAccessExpression(node);
                    case 209 /* ElementAccessExpression */:
                        return visitElementAccessExpression(node);
                    case 164 /* ComputedPropertyName */:
                        return visitComputedPropertyName(node);
                    case 171 /* MethodDeclaration */:
                    case 175 /* SetAccessor */:
                    case 174 /* GetAccessor */:
                    case 215 /* FunctionExpression */:
                    case 259 /* FunctionDeclaration */: {
                        enterOther();
                        const result = visitEachChild(node, fallbackVisitor, context);
                        exitOther();
                        return result;
                    }
                    default:
                        return visitEachChild(node, fallbackVisitor, context);
                }
            }
            function createClassInfo(node) {
                let instanceExtraInitializersName;
                let staticExtraInitializersName;
                let hasStaticInitializers = false;
                let hasNonAmbientInstanceFields = false;
                let hasStaticPrivateClassElements = false;
                for (const member of node.members) {
                    if (isNamedClassElement(member) && nodeOrChildIsDecorated(
                    /*legacyDecorators*/
                    false, member, node)) {
                        if (hasStaticModifier(member)) {
                            staticExtraInitializersName != null ? staticExtraInitializersName : staticExtraInitializersName = factory2.createUniqueName("_staticExtraInitializers", 16 /* Optimistic */);
                        }
                        else {
                            instanceExtraInitializersName != null ? instanceExtraInitializersName : instanceExtraInitializersName = factory2.createUniqueName("_instanceExtraInitializers", 16 /* Optimistic */);
                        }
                    }
                    if (isClassStaticBlockDeclaration(member)) {
                        hasStaticInitializers = true;
                    }
                    else if (isPropertyDeclaration(member)) {
                        if (hasStaticModifier(member)) {
                            hasStaticInitializers || (hasStaticInitializers = !!member.initializer || hasDecorators(member));
                        }
                        else {
                            hasNonAmbientInstanceFields || (hasNonAmbientInstanceFields = !isAmbientPropertyDeclaration(member));
                        }
                    }
                    if ((isPrivateIdentifierClassElementDeclaration(member) || isAutoAccessorPropertyDeclaration(member)) && hasStaticModifier(member)) {
                        hasStaticPrivateClassElements = true;
                    }
                    if (staticExtraInitializersName && instanceExtraInitializersName && hasStaticInitializers && hasNonAmbientInstanceFields && hasStaticPrivateClassElements) {
                        break;
                    }
                }
                return {
                    class: node,
                    instanceExtraInitializersName,
                    staticExtraInitializersName,
                    hasStaticInitializers,
                    hasNonAmbientInstanceFields,
                    hasStaticPrivateClassElements
                };
            }
            function transformClassLike(node, className) {
                var _a2, _b, _c, _d, _e;
                startLexicalEnvironment();
                const classReference = (_a2 = node.name) != null ? _a2 : factory2.getGeneratedNameForNode(node);
                const classInfo2 = createClassInfo(node);
                const classDefinitionStatements = [];
                let leadingBlockStatements;
                let trailingBlockStatements;
                let syntheticConstructor;
                let heritageClauses;
                let shouldTransformPrivateStaticElementsInClass = false;
                const classDecorators = transformAllDecoratorsOfDeclaration(getAllDecoratorsOfClass(node));
                if (classDecorators) {
                    classInfo2.classDecoratorsName = factory2.createUniqueName("_classDecorators", 16 /* Optimistic */);
                    classInfo2.classDescriptorName = factory2.createUniqueName("_classDescriptor", 16 /* Optimistic */);
                    classInfo2.classExtraInitializersName = factory2.createUniqueName("_classExtraInitializers", 16 /* Optimistic */);
                    classInfo2.classThis = factory2.createUniqueName("_classThis", 16 /* Optimistic */);
                    classDefinitionStatements.push(createLet(classInfo2.classDecoratorsName, factory2.createArrayLiteralExpression(classDecorators)), createLet(classInfo2.classDescriptorName), createLet(classInfo2.classExtraInitializersName, factory2.createArrayLiteralExpression()), createLet(classInfo2.classThis));
                    if (classInfo2.hasStaticPrivateClassElements) {
                        shouldTransformPrivateStaticElementsInClass = true;
                        shouldTransformPrivateStaticElementsInFile = true;
                    }
                }
                if (classDecorators && containsLexicalSuperInStaticInitializer(node)) {
                    const extendsClause = getHeritageClause(node.heritageClauses, 94 /* ExtendsKeyword */);
                    const extendsElement = extendsClause && firstOrUndefined(extendsClause.types);
                    const extendsExpression = extendsElement && visitNode(extendsElement.expression, visitor, isExpression);
                    if (extendsExpression) {
                        classInfo2.classSuper = factory2.createUniqueName("_classSuper", 16 /* Optimistic */);
                        const unwrapped = skipOuterExpressions(extendsExpression);
                        const safeExtendsExpression = isClassExpression(unwrapped) && !unwrapped.name || isFunctionExpression(unwrapped) && !unwrapped.name || isArrowFunction(unwrapped) ? factory2.createComma(factory2.createNumericLiteral(0), extendsExpression) : extendsExpression;
                        classDefinitionStatements.push(createLet(classInfo2.classSuper, safeExtendsExpression));
                        const updatedExtendsElement = factory2.updateExpressionWithTypeArguments(extendsElement, classInfo2.classSuper, 
                        /*typeArguments*/
                        void 0);
                        const updatedExtendsClause = factory2.updateHeritageClause(extendsClause, [updatedExtendsElement]);
                        heritageClauses = factory2.createNodeArray([updatedExtendsClause]);
                    }
                }
                else {
                    heritageClauses = visitNodes2(node.heritageClauses, visitor, isHeritageClause);
                }
                const renamedClassThis = (_b = classInfo2.classThis) != null ? _b : factory2.createThis();
                const needsSetNameHelper = !((_c = getOriginalNode(node, isClassLike)) == null ? void 0 : _c.name) && (classDecorators || !isStringLiteral(className) || !isEmptyStringLiteral(className));
                if (needsSetNameHelper) {
                    const setNameExpr = emitHelpers().createSetFunctionNameHelper(factory2.createThis(), className);
                    leadingBlockStatements = append(leadingBlockStatements, factory2.createExpressionStatement(setNameExpr));
                }
                enterClass(classInfo2);
                let members = visitNodes2(node.members, classElementVisitor, isClassElement);
                if (pendingExpressions) {
                    let outerThis;
                    for (let expression of pendingExpressions) {
                        expression = visitNode(expression, function thisVisitor(node2) {
                            if (!(node2.transformFlags & 16384 /* ContainsLexicalThis */)) {
                                return node2;
                            }
                            switch (node2.kind) {
                                case 108 /* ThisKeyword */:
                                    if (!outerThis) {
                                        outerThis = factory2.createUniqueName("_outerThis", 16 /* Optimistic */);
                                        classDefinitionStatements.unshift(createLet(outerThis, factory2.createThis()));
                                    }
                                    return outerThis;
                                default:
                                    return visitEachChild(node2, thisVisitor, context);
                            }
                        }, isExpression);
                        const statement = factory2.createExpressionStatement(expression);
                        leadingBlockStatements = append(leadingBlockStatements, statement);
                    }
                    pendingExpressions = void 0;
                }
                exitClass();
                if (classInfo2.instanceExtraInitializersName && !getFirstConstructorWithBody(node)) {
                    const initializerStatements = prepareConstructor(node, classInfo2);
                    if (initializerStatements) {
                        const extendsClauseElement = getEffectiveBaseTypeNode(node);
                        const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== 104 /* NullKeyword */);
                        const constructorStatements = [];
                        if (isDerivedClass) {
                            const spreadArguments = factory2.createSpreadElement(factory2.createIdentifier("arguments"));
                            const superCall = factory2.createCallExpression(factory2.createSuper(), 
                            /*typeArguments*/
                            void 0, [spreadArguments]);
                            constructorStatements.push(factory2.createExpressionStatement(superCall));
                        }
                        addRange(constructorStatements, initializerStatements);
                        const constructorBody = factory2.createBlock(constructorStatements, 
                        /*multiLine*/
                        true);
                        syntheticConstructor = factory2.createConstructorDeclaration(
                        /*modifiers*/
                        void 0, [], constructorBody);
                    }
                }
                if (classInfo2.staticExtraInitializersName) {
                    classDefinitionStatements.push(createLet(classInfo2.staticExtraInitializersName, factory2.createArrayLiteralExpression()));
                }
                if (classInfo2.instanceExtraInitializersName) {
                    classDefinitionStatements.push(createLet(classInfo2.instanceExtraInitializersName, factory2.createArrayLiteralExpression()));
                }
                if (classInfo2.memberInfos) {
                    forEachEntry(classInfo2.memberInfos, (memberInfo, member) => {
                        if (isStatic(member)) {
                            classDefinitionStatements.push(createLet(memberInfo.memberDecoratorsName));
                            if (memberInfo.memberInitializersName) {
                                classDefinitionStatements.push(createLet(memberInfo.memberInitializersName, factory2.createArrayLiteralExpression()));
                            }
                            if (memberInfo.memberDescriptorName) {
                                classDefinitionStatements.push(createLet(memberInfo.memberDescriptorName));
                            }
                        }
                    });
                }
                if (classInfo2.memberInfos) {
                    forEachEntry(classInfo2.memberInfos, (memberInfo, member) => {
                        if (!isStatic(member)) {
                            classDefinitionStatements.push(createLet(memberInfo.memberDecoratorsName));
                            if (memberInfo.memberInitializersName) {
                                classDefinitionStatements.push(createLet(memberInfo.memberInitializersName, factory2.createArrayLiteralExpression()));
                            }
                            if (memberInfo.memberDescriptorName) {
                                classDefinitionStatements.push(createLet(memberInfo.memberDescriptorName));
                            }
                        }
                    });
                }
                leadingBlockStatements = addRange(leadingBlockStatements, classInfo2.staticNonFieldDecorationStatements);
                leadingBlockStatements = addRange(leadingBlockStatements, classInfo2.nonStaticNonFieldDecorationStatements);
                leadingBlockStatements = addRange(leadingBlockStatements, classInfo2.staticFieldDecorationStatements);
                leadingBlockStatements = addRange(leadingBlockStatements, classInfo2.nonStaticFieldDecorationStatements);
                if (classInfo2.classDescriptorName && classInfo2.classDecoratorsName && classInfo2.classExtraInitializersName && classInfo2.classThis) {
                    leadingBlockStatements != null ? leadingBlockStatements : leadingBlockStatements = [];
                    const valueProperty = factory2.createPropertyAssignment("value", factory2.createThis());
                    const classDescriptor = factory2.createObjectLiteralExpression([valueProperty]);
                    const classDescriptorAssignment = factory2.createAssignment(classInfo2.classDescriptorName, classDescriptor);
                    const classNameReference = factory2.createPropertyAccessExpression(factory2.createThis(), "name");
                    const esDecorateHelper2 = emitHelpers().createESDecorateHelper(factory2.createNull(), classDescriptorAssignment, classInfo2.classDecoratorsName, { kind: "class", name: classNameReference }, factory2.createNull(), classInfo2.classExtraInitializersName);
                    const esDecorateStatement = factory2.createExpressionStatement(esDecorateHelper2);
                    setSourceMapRange(esDecorateStatement, moveRangePastDecorators(node));
                    leadingBlockStatements.push(esDecorateStatement);
                    const classDescriptorValueReference = factory2.createPropertyAccessExpression(classInfo2.classDescriptorName, "value");
                    const classThisAssignment = factory2.createAssignment(classInfo2.classThis, classDescriptorValueReference);
                    const classReferenceAssignment = factory2.createAssignment(classReference, classThisAssignment);
                    leadingBlockStatements.push(factory2.createExpressionStatement(classReferenceAssignment));
                }
                if (classInfo2.staticExtraInitializersName) {
                    const runStaticInitializersHelper = emitHelpers().createRunInitializersHelper(renamedClassThis, classInfo2.staticExtraInitializersName);
                    const runStaticInitializersStatement = factory2.createExpressionStatement(runStaticInitializersHelper);
                    setSourceMapRange(runStaticInitializersStatement, (_d = node.name) != null ? _d : moveRangePastDecorators(node));
                    leadingBlockStatements = append(leadingBlockStatements, runStaticInitializersStatement);
                }
                if (classInfo2.classExtraInitializersName) {
                    const runClassInitializersHelper = emitHelpers().createRunInitializersHelper(renamedClassThis, classInfo2.classExtraInitializersName);
                    const runClassInitializersStatement = factory2.createExpressionStatement(runClassInitializersHelper);
                    setSourceMapRange(runClassInitializersStatement, (_e = node.name) != null ? _e : moveRangePastDecorators(node));
                    trailingBlockStatements = append(trailingBlockStatements, runClassInitializersStatement);
                }
                if (leadingBlockStatements && trailingBlockStatements && !classInfo2.hasStaticInitializers) {
                    addRange(leadingBlockStatements, trailingBlockStatements);
                    trailingBlockStatements = void 0;
                }
                let newMembers = members;
                if (leadingBlockStatements) {
                    const leadingStaticBlockBody = factory2.createBlock(leadingBlockStatements, 
                    /*multiline*/
                    true);
                    const leadingStaticBlock = factory2.createClassStaticBlockDeclaration(leadingStaticBlockBody);
                    if (shouldTransformPrivateStaticElementsInClass) {
                        setInternalEmitFlags(leadingStaticBlock, 32 /* TransformPrivateStaticElements */);
                    }
                    newMembers = [leadingStaticBlock, ...newMembers];
                }
                if (syntheticConstructor) {
                    newMembers = [...newMembers, syntheticConstructor];
                }
                if (trailingBlockStatements) {
                    const trailingStaticBlockBody = factory2.createBlock(trailingBlockStatements, 
                    /*multiline*/
                    true);
                    const trailingStaticBlock = factory2.createClassStaticBlockDeclaration(trailingStaticBlockBody);
                    newMembers = [...newMembers, trailingStaticBlock];
                }
                if (newMembers !== members) {
                    members = setTextRange(factory2.createNodeArray(newMembers), members);
                }
                const lexicalEnvironment = endLexicalEnvironment();
                let classExpression;
                if (classDecorators) {
                    classExpression = factory2.createClassExpression(
                    /*modifiers*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, heritageClauses, members);
                    const classReferenceDeclaration = factory2.createVariableDeclaration(classReference, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, classExpression);
                    const classReferenceVarDeclList = factory2.createVariableDeclarationList([classReferenceDeclaration]);
                    const returnExpr = classInfo2.classThis ? factory2.createAssignment(classReference, classInfo2.classThis) : classReference;
                    classDefinitionStatements.push(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, classReferenceVarDeclList), factory2.createReturnStatement(returnExpr));
                }
                else {
                    classExpression = factory2.createClassExpression(
                    /*modifiers*/
                    void 0, node.name, 
                    /*typeParameters*/
                    void 0, heritageClauses, members);
                    classDefinitionStatements.push(factory2.createReturnStatement(classExpression));
                }
                if (shouldTransformPrivateStaticElementsInClass) {
                    addInternalEmitFlags(classExpression, 32 /* TransformPrivateStaticElements */);
                    for (const member of classExpression.members) {
                        if ((isPrivateIdentifierClassElementDeclaration(member) || isAutoAccessorPropertyDeclaration(member)) && hasStaticModifier(member)) {
                            addInternalEmitFlags(member, 32 /* TransformPrivateStaticElements */);
                        }
                    }
                }
                setOriginalNode(classExpression, node);
                getOrCreateEmitNode(classExpression).classThis = classInfo2.classThis;
                return factory2.createImmediatelyInvokedArrowFunction(factory2.mergeLexicalEnvironment(classDefinitionStatements, lexicalEnvironment));
            }
            function partialTransformClassElement(member, useNamedEvaluation, classInfo2, createDescriptor) {
                var _a2, _b, _c, _d, _e, _f, _g, _h;
                let referencedName;
                let name;
                let initializersName;
                let thisArg;
                let descriptorName;
                if (!classInfo2) {
                    const modifiers2 = visitNodes2(member.modifiers, modifierVisitor, isModifier);
                    enterName();
                    if (useNamedEvaluation) {
                        ({ referencedName, name } = visitReferencedPropertyName(member.name));
                    }
                    else {
                        name = visitPropertyName(member.name);
                    }
                    exitName();
                    return { modifiers: modifiers2, referencedName, name, initializersName, descriptorName, thisArg };
                }
                const memberDecorators = transformAllDecoratorsOfDeclaration(getAllDecoratorsOfClassElement(member, classInfo2.class, 
                /*useLegacyDecorators*/
                false));
                const modifiers = visitNodes2(member.modifiers, modifierVisitor, isModifier);
                if (memberDecorators) {
                    const memberDecoratorsName = createHelperVariable(member, "decorators");
                    const memberDecoratorsArray = factory2.createArrayLiteralExpression(memberDecorators);
                    const memberDecoratorsAssignment = factory2.createAssignment(memberDecoratorsName, memberDecoratorsArray);
                    const memberInfo = { memberDecoratorsName };
                    (_a2 = classInfo2.memberInfos) != null ? _a2 : classInfo2.memberInfos = /* @__PURE__ */ new Map();
                    classInfo2.memberInfos.set(member, memberInfo);
                    pendingExpressions != null ? pendingExpressions : pendingExpressions = [];
                    pendingExpressions.push(memberDecoratorsAssignment);
                    const statements = isMethodOrAccessor(member) || isAutoAccessorPropertyDeclaration(member) ? isStatic(member) ? (_b = classInfo2.staticNonFieldDecorationStatements) != null ? _b : classInfo2.staticNonFieldDecorationStatements = [] : (_c = classInfo2.nonStaticNonFieldDecorationStatements) != null ? _c : classInfo2.nonStaticNonFieldDecorationStatements = [] : isPropertyDeclaration(member) && !isAutoAccessorPropertyDeclaration(member) ? isStatic(member) ? (_d = classInfo2.staticFieldDecorationStatements) != null ? _d : classInfo2.staticFieldDecorationStatements = [] : (_e = classInfo2.nonStaticFieldDecorationStatements) != null ? _e : classInfo2.nonStaticFieldDecorationStatements = [] : Debug.fail();
                    const kind = isGetAccessorDeclaration(member) ? "getter" : isSetAccessorDeclaration(member) ? "setter" : isMethodDeclaration(member) ? "method" : isAutoAccessorPropertyDeclaration(member) ? "accessor" : isPropertyDeclaration(member) ? "field" : Debug.fail();
                    let propertyName;
                    if (isIdentifier(member.name) || isPrivateIdentifier(member.name)) {
                        propertyName = { computed: false, name: member.name };
                    }
                    else if (isPropertyNameLiteral(member.name)) {
                        propertyName = { computed: true, name: factory2.createStringLiteralFromNode(member.name) };
                    }
                    else {
                        const expression = member.name.expression;
                        if (isPropertyNameLiteral(expression) && !isIdentifier(expression)) {
                            propertyName = { computed: true, name: factory2.createStringLiteralFromNode(expression) };
                        }
                        else {
                            enterName();
                            ({ referencedName, name } = visitReferencedPropertyName(member.name));
                            propertyName = { computed: true, name: referencedName };
                            exitName();
                        }
                    }
                    const context2 = {
                        kind,
                        name: propertyName,
                        static: isStatic(member),
                        private: isPrivateIdentifier(member.name),
                        access: {
                            // 15.7.3 CreateDecoratorAccessObject (kind, name)
                            // 2. If _kind_ is ~field~, ~method~, ~accessor~, or ~getter~, then ...
                            get: isPropertyDeclaration(member) || isGetAccessorDeclaration(member) || isMethodDeclaration(member),
                            // 3. If _kind_ is ~field~, ~accessor~, or ~setter~, then ...
                            set: isPropertyDeclaration(member) || isSetAccessorDeclaration(member)
                        }
                    };
                    const extraInitializers = isStatic(member) ? (_f = classInfo2.staticExtraInitializersName) != null ? _f : classInfo2.staticExtraInitializersName = factory2.createUniqueName("_staticExtraInitializers", 16 /* Optimistic */) : (_g = classInfo2.instanceExtraInitializersName) != null ? _g : classInfo2.instanceExtraInitializersName = factory2.createUniqueName("_instanceExtraInitializers", 16 /* Optimistic */);
                    if (isMethodOrAccessor(member)) {
                        let descriptor;
                        if (isPrivateIdentifierClassElementDeclaration(member) && createDescriptor) {
                            descriptor = createDescriptor(member, visitNodes2(modifiers, (node) => tryCast(node, isAsyncModifier), isModifier));
                            memberInfo.memberDescriptorName = descriptorName = createHelperVariable(member, "descriptor");
                            descriptor = factory2.createAssignment(descriptorName, descriptor);
                        }
                        const esDecorateExpression = emitHelpers().createESDecorateHelper(factory2.createThis(), descriptor != null ? descriptor : factory2.createNull(), memberDecoratorsName, context2, factory2.createNull(), extraInitializers);
                        const esDecorateStatement = factory2.createExpressionStatement(esDecorateExpression);
                        setSourceMapRange(esDecorateStatement, moveRangePastDecorators(member));
                        statements.push(esDecorateStatement);
                    }
                    else if (isPropertyDeclaration(member)) {
                        initializersName = (_h = memberInfo.memberInitializersName) != null ? _h : memberInfo.memberInitializersName = createHelperVariable(member, "initializers");
                        if (isStatic(member)) {
                            thisArg = classInfo2.classThis;
                        }
                        let descriptor;
                        if (isPrivateIdentifierClassElementDeclaration(member) && hasAccessorModifier(member) && createDescriptor) {
                            descriptor = createDescriptor(member, 
                            /*modifiers*/
                            void 0);
                            memberInfo.memberDescriptorName = descriptorName = createHelperVariable(member, "descriptor");
                            descriptor = factory2.createAssignment(descriptorName, descriptor);
                        }
                        const esDecorateExpression = emitHelpers().createESDecorateHelper(isAutoAccessorPropertyDeclaration(member) ? factory2.createThis() : factory2.createNull(), descriptor != null ? descriptor : factory2.createNull(), memberDecoratorsName, context2, initializersName, extraInitializers);
                        const esDecorateStatement = factory2.createExpressionStatement(esDecorateExpression);
                        setSourceMapRange(esDecorateStatement, moveRangePastDecorators(member));
                        statements.push(esDecorateStatement);
                    }
                }
                if (name === void 0) {
                    enterName();
                    if (useNamedEvaluation) {
                        ({ referencedName, name } = visitReferencedPropertyName(member.name));
                    }
                    else {
                        name = visitPropertyName(member.name);
                    }
                    exitName();
                }
                if (!some(modifiers) && (isMethodDeclaration(member) || isPropertyDeclaration(member))) {
                    setEmitFlags(name, 1024 /* NoLeadingComments */);
                }
                return { modifiers, referencedName, name, initializersName, descriptorName, thisArg };
            }
            function visitPropertyDeclaration(node) {
                enterClassElement(node);
                Debug.assert(!isAmbientPropertyDeclaration(node), "Not yet implemented.");
                const useNamedEvaluation = isNamedEvaluation(node, isAnonymousClassNeedingAssignedName);
                const { modifiers, name, referencedName, initializersName, descriptorName, thisArg } = partialTransformClassElement(node, useNamedEvaluation, classInfo, hasAccessorModifier(node) ? createAccessorPropertyDescriptorObject : void 0);
                startLexicalEnvironment();
                let initializer = referencedName ? visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, referencedName), isExpression) : visitNode(node.initializer, visitor, isExpression);
                if (initializersName) {
                    initializer = emitHelpers().createRunInitializersHelper(thisArg != null ? thisArg : factory2.createThis(), initializersName, initializer != null ? initializer : factory2.createVoidZero());
                }
                if (!isStatic(node) && (classInfo == null ? void 0 : classInfo.instanceExtraInitializersName) && !(classInfo == null ? void 0 : classInfo.hasInjectedInstanceInitializers)) {
                    classInfo.hasInjectedInstanceInitializers = true;
                    initializer != null ? initializer : initializer = factory2.createVoidZero();
                    initializer = factory2.createParenthesizedExpression(factory2.createComma(emitHelpers().createRunInitializersHelper(factory2.createThis(), classInfo.instanceExtraInitializersName), initializer));
                }
                if (isStatic(node) && classInfo && initializer) {
                    classInfo.hasStaticInitializers = true;
                }
                const declarations = endLexicalEnvironment();
                if (some(declarations)) {
                    initializer = factory2.createImmediatelyInvokedArrowFunction([
                        ...declarations,
                        factory2.createReturnStatement(initializer)
                    ]);
                }
                exitClassElement();
                if (hasAccessorModifier(node) && descriptorName) {
                    const commentRange = getCommentRange(node);
                    const sourceMapRange = getSourceMapRange(node);
                    const name2 = node.name;
                    let getterName = name2;
                    let setterName = name2;
                    if (isComputedPropertyName(name2) && !isSimpleInlineableExpression(name2.expression)) {
                        const cacheAssignment = findComputedPropertyNameCacheAssignment(name2);
                        if (cacheAssignment) {
                            getterName = factory2.updateComputedPropertyName(name2, visitNode(name2.expression, visitor, isExpression));
                            setterName = factory2.updateComputedPropertyName(name2, cacheAssignment.left);
                        }
                        else {
                            const temp = factory2.createTempVariable(hoistVariableDeclaration);
                            setSourceMapRange(temp, name2.expression);
                            const expression = visitNode(name2.expression, visitor, isExpression);
                            const assignment = factory2.createAssignment(temp, expression);
                            setSourceMapRange(assignment, name2.expression);
                            getterName = factory2.updateComputedPropertyName(name2, assignment);
                            setterName = factory2.updateComputedPropertyName(name2, temp);
                        }
                    }
                    const modifiersWithoutAccessor = visitNodes2(modifiers, (node2) => node2.kind !== 127 /* AccessorKeyword */ ? node2 : void 0, isModifier);
                    const backingField = createAccessorPropertyBackingField(factory2, node, modifiersWithoutAccessor, initializer);
                    setOriginalNode(backingField, node);
                    setEmitFlags(backingField, 3072 /* NoComments */);
                    setSourceMapRange(backingField, sourceMapRange);
                    setSourceMapRange(backingField.name, node.name);
                    const getter = createGetAccessorDescriptorForwarder(modifiersWithoutAccessor, getterName, descriptorName);
                    setOriginalNode(getter, node);
                    setCommentRange(getter, commentRange);
                    setSourceMapRange(getter, sourceMapRange);
                    const setter = createSetAccessorDescriptorForwarder(modifiersWithoutAccessor, setterName, descriptorName);
                    setOriginalNode(setter, node);
                    setEmitFlags(setter, 3072 /* NoComments */);
                    setSourceMapRange(setter, sourceMapRange);
                    return [backingField, getter, setter];
                }
                return finishClassElement(factory2.updatePropertyDeclaration(node, modifiers, name, 
                /*questionOrExclamationToken*/
                void 0, 
                /*type*/
                void 0, initializer), node);
            }
            function createDescriptorMethod(original, name, modifiers, asteriskToken, kind, parameters, body) {