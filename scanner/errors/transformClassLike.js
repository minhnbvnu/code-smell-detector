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