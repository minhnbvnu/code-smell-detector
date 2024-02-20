function transformESDecorators(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, startLexicalEnvironment, endLexicalEnvironment, hoistVariableDeclaration } = context;
            let top;
            let classInfo;
            let classThis;
            let classSuper;
            let pendingExpressions;
            let shouldTransformPrivateStaticElementsInFile;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                top = void 0;
                shouldTransformPrivateStaticElementsInFile = false;
                const visited = visitEachChild(node, visitor, context);
                addEmitHelpers(visited, context.readEmitHelpers());
                if (shouldTransformPrivateStaticElementsInFile) {
                    addInternalEmitFlags(visited, 32 /* TransformPrivateStaticElements */);
                    shouldTransformPrivateStaticElementsInFile = false;
                }
                return visited;
            }
            function updateState() {
                classInfo = void 0;
                classThis = void 0;
                classSuper = void 0;
                switch (top == null ? void 0 : top.kind) {
                    case "class":
                        classInfo = top.classInfo;
                        break;
                    case "class-element":
                        classInfo = top.next.classInfo;
                        classThis = top.classThis;
                        classSuper = top.classSuper;
                        break;
                    case "name":
                        const grandparent = top.next.next.next;
                        if ((grandparent == null ? void 0 : grandparent.kind) === "class-element") {
                            classInfo = grandparent.next.classInfo;
                            classThis = grandparent.classThis;
                            classSuper = grandparent.classSuper;
                        }
                        break;
                }
            }
            function enterClass(classInfo2) {
                top = { kind: "class", next: top, classInfo: classInfo2, savedPendingExpressions: pendingExpressions };
                pendingExpressions = void 0;
                updateState();
            }
            function exitClass() {
                Debug.assert((top == null ? void 0 : top.kind) === "class", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class' but got '${top == null ? void 0 : top.kind}' instead.`);
                pendingExpressions = top.savedPendingExpressions;
                top = top.next;
                updateState();
            }
            function enterClassElement(node) {
                var _a2, _b;
                Debug.assert((top == null ? void 0 : top.kind) === "class", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class' but got '${top == null ? void 0 : top.kind}' instead.`);
                top = { kind: "class-element", next: top };
                if (isClassStaticBlockDeclaration(node) || isPropertyDeclaration(node) && hasStaticModifier(node)) {
                    top.classThis = (_a2 = top.next.classInfo) == null ? void 0 : _a2.classThis;
                    top.classSuper = (_b = top.next.classInfo) == null ? void 0 : _b.classSuper;
                }
                updateState();
            }
            function exitClassElement() {
                var _a2;
                Debug.assert((top == null ? void 0 : top.kind) === "class-element", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class-element' but got '${top == null ? void 0 : top.kind}' instead.`);
                Debug.assert(((_a2 = top.next) == null ? void 0 : _a2.kind) === "class", "Incorrect value for top.next.kind.", () => {
                    var _a3;
                    return `Expected top.next.kind to be 'class' but got '${(_a3 = top.next) == null ? void 0 : _a3.kind}' instead.`;
                });
                top = top.next;
                updateState();
            }
            function enterName() {
                Debug.assert((top == null ? void 0 : top.kind) === "class-element", "Incorrect value for top.kind.", () => `Expected top.kind to be 'class-element' but got '${top == null ? void 0 : top.kind}' instead.`);
                top = { kind: "name", next: top };
                updateState();
            }
            function exitName() {
                Debug.assert((top == null ? void 0 : top.kind) === "name", "Incorrect value for top.kind.", () => `Expected top.kind to be 'name' but got '${top == null ? void 0 : top.kind}' instead.`);
                top = top.next;
                updateState();
            }
            function enterOther() {
                if ((top == null ? void 0 : top.kind) === "other") {
                    Debug.assert(!pendingExpressions);
                    top.depth++;
                }
                else {
                    top = { kind: "other", next: top, depth: 0, savedPendingExpressions: pendingExpressions };
                    pendingExpressions = void 0;
                    updateState();
                }
            }
            function exitOther() {
                Debug.assert((top == null ? void 0 : top.kind) === "other", "Incorrect value for top.kind.", () => `Expected top.kind to be 'other' but got '${top == null ? void 0 : top.kind}' instead.`);
                if (top.depth > 0) {
                    Debug.assert(!pendingExpressions);
                    top.depth--;
                }
                else {
                    pendingExpressions = top.savedPendingExpressions;
                    top = top.next;
                    updateState();
                }
            }
            function shouldVisitNode(node) {
                return !!(node.transformFlags & 33554432 /* ContainsDecorators */) || !!classThis && !!(node.transformFlags & 16384 /* ContainsLexicalThis */) || !!classThis && !!classSuper && !!(node.transformFlags & 134217728 /* ContainsLexicalSuper */);
            }
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
            function fallbackVisitor(node) {
                switch (node.kind) {
                    case 167 /* Decorator */:
                        return void 0;
                    default:
                        return visitor(node);
                }
            }
            function modifierVisitor(node) {
                switch (node.kind) {
                    case 167 /* Decorator */:
                        return void 0;
                    default:
                        return node;
                }
            }
            function classElementVisitor(node) {
                switch (node.kind) {
                    case 173 /* Constructor */:
                        return visitConstructorDeclaration(node);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node);
                    case 174 /* GetAccessor */:
                        return visitGetAccessorDeclaration(node);
                    case 175 /* SetAccessor */:
                        return visitSetAccessorDeclaration(node);
                    case 169 /* PropertyDeclaration */:
                        return visitPropertyDeclaration(node);
                    case 172 /* ClassStaticBlockDeclaration */:
                        return visitClassStaticBlockDeclaration(node);
                    default:
                        return visitor(node);
                }
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
            function getHelperVariableName(node) {
                let declarationName = node.name && isIdentifier(node.name) && !isGeneratedIdentifier(node.name) ? idText(node.name) : node.name && isPrivateIdentifier(node.name) && !isGeneratedIdentifier(node.name) ? idText(node.name).slice(1) : node.name && isStringLiteral(node.name) && isIdentifierText(node.name.text, 99 /* ESNext */) ? node.name.text : isClassLike(node) ? "class" : "member";
                if (isGetAccessor(node))
                    declarationName = `get_${declarationName}`;
                if (isSetAccessor(node))
                    declarationName = `set_${declarationName}`;
                if (node.name && isPrivateIdentifier(node.name))
                    declarationName = `private_${declarationName}`;
                if (isStatic(node))
                    declarationName = `static_${declarationName}`;
                return "_" + declarationName;
            }
            function createHelperVariable(node, suffix) {
                return factory2.createUniqueName(`${getHelperVariableName(node)}_${suffix}`, 16 /* Optimistic */ | 8 /* ReservedInNestedScopes */);
            }
            function createLet(name, initializer) {
                return factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(name, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer)
                ], 1 /* Let */));
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
            function containsLexicalSuperInStaticInitializer(node) {
                for (const member of node.members) {
                    if (isClassStaticBlockDeclaration(member) || isPropertyDeclaration(member) && hasStaticModifier(member)) {
                        if (member.transformFlags & 134217728 /* ContainsLexicalSuper */) {
                            return true;
                        }
                    }
                }
                return false;
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
            function isDecoratedClassLike(node) {
                return classOrConstructorParameterIsDecorated(
                /*legacyDecorators*/
                false, node) || childIsDecorated(
                /*legacyDecorators*/
                false, node);
            }
            function visitClassDeclaration(node) {
                var _a2;
                if (isDecoratedClassLike(node)) {
                    if (hasSyntacticModifier(node, 1 /* Export */) && hasSyntacticModifier(node, 1024 /* Default */)) {
                        const originalClass = (_a2 = getOriginalNode(node, isClassLike)) != null ? _a2 : node;
                        const className = originalClass.name ? factory2.createStringLiteralFromNode(originalClass.name) : factory2.createStringLiteral("default");
                        const iife = transformClassLike(node, className);
                        const statement = factory2.createExportDefault(iife);
                        setOriginalNode(statement, node);
                        setCommentRange(statement, getCommentRange(node));
                        setSourceMapRange(statement, moveRangePastDecorators(node));
                        return statement;
                    }
                    else {
                        Debug.assertIsDefined(node.name, "A class declaration that is not a default export must have a name.");
                        const iife = transformClassLike(node, factory2.createStringLiteralFromNode(node.name));
                        const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                        const varDecl = factory2.createVariableDeclaration(node.name, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, iife);
                        const varDecls = factory2.createVariableDeclarationList([varDecl], 1 /* Let */);
                        const statement = factory2.createVariableStatement(modifiers, varDecls);
                        setOriginalNode(statement, node);
                        setCommentRange(statement, getCommentRange(node));
                        return statement;
                    }
                }
                else {
                    const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                    const heritageClauses = visitNodes2(node.heritageClauses, visitor, isHeritageClause);
                    enterClass(
                    /*classInfo*/
                    void 0);
                    const members = visitNodes2(node.members, classElementVisitor, isClassElement);
                    exitClass();
                    return factory2.updateClassDeclaration(node, modifiers, node.name, 
                    /*typeParameters*/
                    void 0, heritageClauses, members);
                }
            }
            function visitClassExpression(node, referencedName) {
                if (isDecoratedClassLike(node)) {
                    const className = node.name ? factory2.createStringLiteralFromNode(node.name) : referencedName != null ? referencedName : factory2.createStringLiteral("");
                    const iife = transformClassLike(node, className);
                    setOriginalNode(iife, node);
                    return iife;
                }
                else {
                    const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                    const heritageClauses = visitNodes2(node.heritageClauses, visitor, isHeritageClause);
                    enterClass(
                    /*classInfo*/
                    void 0);
                    const members = visitNodes2(node.members, classElementVisitor, isClassElement);
                    exitClass();
                    return factory2.updateClassExpression(node, modifiers, node.name, 
                    /*typeParameters*/
                    void 0, heritageClauses, members);
                }
            }
            function prepareConstructor(_parent, classInfo2) {
                if (classInfo2.instanceExtraInitializersName && !classInfo2.hasNonAmbientInstanceFields) {
                    const statements = [];
                    statements.push(factory2.createExpressionStatement(emitHelpers().createRunInitializersHelper(factory2.createThis(), classInfo2.instanceExtraInitializersName)));
                    return statements;
                }
            }
            function visitConstructorDeclaration(node) {
                enterClassElement(node);
                const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                const parameters = visitNodes2(node.parameters, visitor, isParameter);
                let body;
                if (node.body && classInfo) {
                    const initializerStatements = prepareConstructor(classInfo.class, classInfo);
                    if (initializerStatements) {
                        const statements = [];
                        const nonPrologueStart = factory2.copyPrologue(node.body.statements, statements, 
                        /*ensureUseStrict*/
                        false, visitor);
                        const superStatementIndex = findSuperStatementIndex(node.body.statements, nonPrologueStart);
                        if (superStatementIndex >= 0) {
                            addRange(statements, visitNodes2(node.body.statements, visitor, isStatement, nonPrologueStart, superStatementIndex + 1 - nonPrologueStart));
                            addRange(statements, initializerStatements);
                            addRange(statements, visitNodes2(node.body.statements, visitor, isStatement, superStatementIndex + 1));
                        }
                        else {
                            addRange(statements, initializerStatements);
                            addRange(statements, visitNodes2(node.body.statements, visitor, isStatement));
                        }
                        body = factory2.createBlock(statements, 
                        /*multiLine*/
                        true);
                        setOriginalNode(body, node.body);
                        setTextRange(body, node.body);
                    }
                }
                body != null ? body : body = visitNode(node.body, visitor, isBlock);
                exitClassElement();
                return factory2.updateConstructorDeclaration(node, modifiers, parameters, body);
            }
            function finishClassElement(updated, original) {
                if (updated !== original) {
                    setCommentRange(updated, original);
                    setSourceMapRange(updated, moveRangePastDecorators(original));
                }
                return updated;
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
            function visitMethodDeclaration(node) {
                enterClassElement(node);
                const { modifiers, name, descriptorName } = partialTransformClassElement(node, 
                /*useNamedEvaluation*/
                false, classInfo, createMethodDescriptorObject);
                if (descriptorName) {
                    exitClassElement();
                    return finishClassElement(createMethodDescriptorForwarder(modifiers, name, descriptorName), node);
                }
                else {
                    const parameters = visitNodes2(node.parameters, visitor, isParameter);
                    const body = visitNode(node.body, visitor, isBlock);
                    exitClassElement();
                    return finishClassElement(factory2.updateMethodDeclaration(node, modifiers, node.asteriskToken, name, 
                    /*questionToken*/
                    void 0, 
                    /*typeParameters*/
                    void 0, parameters, 
                    /*type*/
                    void 0, body), node);
                }
            }
            function visitGetAccessorDeclaration(node) {
                enterClassElement(node);
                const { modifiers, name, descriptorName } = partialTransformClassElement(node, 
                /*useNamedEvaluation*/
                false, classInfo, createGetAccessorDescriptorObject);
                if (descriptorName) {
                    exitClassElement();
                    return finishClassElement(createGetAccessorDescriptorForwarder(modifiers, name, descriptorName), node);
                }
                else {
                    const parameters = visitNodes2(node.parameters, visitor, isParameter);
                    const body = visitNode(node.body, visitor, isBlock);
                    exitClassElement();
                    return finishClassElement(factory2.updateGetAccessorDeclaration(node, modifiers, name, parameters, 
                    /*type*/
                    void 0, body), node);
                }
            }
            function visitSetAccessorDeclaration(node) {
                enterClassElement(node);
                const { modifiers, name, descriptorName } = partialTransformClassElement(node, 
                /*useNamedEvaluation*/
                false, classInfo, createSetAccessorDescriptorObject);
                if (descriptorName) {
                    exitClassElement();
                    return finishClassElement(createSetAccessorDescriptorForwarder(modifiers, name, descriptorName), node);
                }
                else {
                    const parameters = visitNodes2(node.parameters, visitor, isParameter);
                    const body = visitNode(node.body, visitor, isBlock);
                    exitClassElement();
                    return finishClassElement(factory2.updateSetAccessorDeclaration(node, modifiers, name, parameters, body), node);
                }
            }
            function visitClassStaticBlockDeclaration(node) {
                enterClassElement(node);
                if (classInfo)
                    classInfo.hasStaticInitializers = true;
                const result = visitEachChild(node, visitor, context);
                exitClassElement();
                return result;
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
            function visitThisExpression(node) {
                return classThis != null ? classThis : node;
            }
            function visitCallExpression(node) {
                if (isSuperProperty(node.expression) && classThis) {
                    const expression = visitNode(node.expression, visitor, isExpression);
                    const argumentsList = visitNodes2(node.arguments, visitor, isExpression);
                    const invocation = factory2.createFunctionCallCall(expression, classThis, argumentsList);
                    setOriginalNode(invocation, node);
                    setTextRange(invocation, node);
                    return invocation;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitTaggedTemplateExpression(node) {
                if (isSuperProperty(node.tag) && classThis) {
                    const tag = visitNode(node.tag, visitor, isExpression);
                    const boundTag = factory2.createFunctionBindCall(tag, classThis, []);
                    setOriginalNode(boundTag, node);
                    setTextRange(boundTag, node);
                    const template = visitNode(node.template, visitor, isTemplateLiteral);
                    return factory2.updateTaggedTemplateExpression(node, boundTag, 
                    /*typeArguments*/
                    void 0, template);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitPropertyAccessExpression(node) {
                if (isSuperProperty(node) && isIdentifier(node.name) && classThis && classSuper) {
                    const propertyName = factory2.createStringLiteralFromNode(node.name);
                    const superProperty = factory2.createReflectGetCall(classSuper, propertyName, classThis);
                    setOriginalNode(superProperty, node.expression);
                    setTextRange(superProperty, node.expression);
                    return superProperty;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitElementAccessExpression(node) {
                if (isSuperProperty(node) && classThis && classSuper) {
                    const propertyName = visitNode(node.argumentExpression, visitor, isExpression);
                    const superProperty = factory2.createReflectGetCall(classSuper, propertyName, classThis);
                    setOriginalNode(superProperty, node.expression);
                    setTextRange(superProperty, node.expression);
                    return superProperty;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitParameterDeclaration(node) {
                let updated;
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = getAssignedNameOfIdentifier(node.name, node.initializer);
                    const name = visitNode(node.name, visitor, isBindingName);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    updated = factory2.updateParameterDeclaration(node, 
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, name, 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer);
                }
                else {
                    updated = factory2.updateParameterDeclaration(node, 
                    /*modifiers*/
                    void 0, node.dotDotDotToken, visitNode(node.name, visitor, isBindingName), 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, visitNode(node.initializer, visitor, isExpression));
                }
                if (updated !== node) {
                    setCommentRange(updated, node);
                    setTextRange(updated, moveRangePastModifiers(node));
                    setSourceMapRange(updated, moveRangePastModifiers(node));
                    setEmitFlags(updated.name, 64 /* NoTrailingSourceMap */);
                }
                return updated;
            }
            function isAnonymousClassNeedingAssignedName(node) {
                return isClassExpression(node) && !node.name && isDecoratedClassLike(node);
            }
            function visitForStatement(node) {
                return factory2.updateForStatement(node, visitNode(node.initializer, discardedValueVisitor, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, discardedValueVisitor, isExpression), visitIterationBody(node.statement, visitor, context));
            }
            function visitExpressionStatement(node) {
                return visitEachChild(node, discardedValueVisitor, context);
            }
            function visitBinaryExpression(node, discarded) {
                if (isDestructuringAssignment(node)) {
                    const left = visitAssignmentPattern(node.left);
                    const right = visitNode(node.right, visitor, isExpression);
                    return factory2.updateBinaryExpression(node, left, node.operatorToken, right);
                }
                if (isAssignmentExpression(node)) {
                    if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                        const assignedName = getAssignedNameOfIdentifier(node.left, node.right);
                        const left = visitNode(node.left, visitor, isExpression);
                        const right = visitNode(node.right, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                        return factory2.updateBinaryExpression(node, left, node.operatorToken, right);
                    }
                    if (isSuperProperty(node.left) && classThis && classSuper) {
                        let setterName = isElementAccessExpression(node.left) ? visitNode(node.left.argumentExpression, visitor, isExpression) : isIdentifier(node.left.name) ? factory2.createStringLiteralFromNode(node.left.name) : void 0;
                        if (setterName) {
                            let expression = visitNode(node.right, visitor, isExpression);
                            if (isCompoundAssignment(node.operatorToken.kind)) {
                                let getterName = setterName;
                                if (!isSimpleInlineableExpression(setterName)) {
                                    getterName = factory2.createTempVariable(hoistVariableDeclaration);
                                    setterName = factory2.createAssignment(getterName, setterName);
                                }
                                const superPropertyGet = factory2.createReflectGetCall(classSuper, getterName, classThis);
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
                            expression = factory2.createReflectSetCall(classSuper, setterName, expression, classThis);
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
                if (node.operatorToken.kind === 27 /* CommaToken */) {
                    const left = visitNode(node.left, discardedValueVisitor, isExpression);
                    const right = visitNode(node.right, discarded ? discardedValueVisitor : visitor, isExpression);
                    return factory2.updateBinaryExpression(node, left, node.operatorToken, right);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitPreOrPostfixUnaryExpression(node, discarded) {
                if (node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) {
                    const operand = skipParentheses(node.operand);
                    if (isSuperProperty(operand) && classThis && classSuper) {
                        let setterName = isElementAccessExpression(operand) ? visitNode(operand.argumentExpression, visitor, isExpression) : isIdentifier(operand.name) ? factory2.createStringLiteralFromNode(operand.name) : void 0;
                        if (setterName) {
                            let getterName = setterName;
                            if (!isSimpleInlineableExpression(setterName)) {
                                getterName = factory2.createTempVariable(hoistVariableDeclaration);
                                setterName = factory2.createAssignment(getterName, setterName);
                            }
                            let expression = factory2.createReflectGetCall(classSuper, getterName, classThis);
                            setOriginalNode(expression, node);
                            setTextRange(expression, node);
                            const temp = discarded ? void 0 : factory2.createTempVariable(hoistVariableDeclaration);
                            expression = expandPreOrPostfixIncrementOrDecrementExpression(factory2, node, expression, hoistVariableDeclaration, temp);
                            expression = factory2.createReflectSetCall(classSuper, setterName, expression, classThis);
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
                return visitEachChild(node, visitor, context);
            }
            function visitCommaListExpression(node, discarded) {
                const elements = discarded ? visitCommaListElements(node.elements, discardedValueVisitor) : visitCommaListElements(node.elements, visitor, discardedValueVisitor);
                return factory2.updateCommaListExpression(node, elements);
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
                const referencedName = factory2.getGeneratedNameForNode(node);
                hoistVariableDeclaration(referencedName);
                const key = emitHelpers().createPropKeyHelper(visitNode(node.expression, visitor, isExpression));
                const assignment = factory2.createAssignment(referencedName, key);
                const name = factory2.updateComputedPropertyName(node, injectPendingExpressions(assignment));
                return { referencedName, name };
            }
            function visitPropertyName(node) {
                if (isComputedPropertyName(node)) {
                    return visitComputedPropertyName(node);
                }
                return visitNode(node, visitor, isPropertyName);
            }
            function visitComputedPropertyName(node) {
                let expression = visitNode(node.expression, visitor, isExpression);
                if (!isSimpleInlineableExpression(expression)) {
                    expression = injectPendingExpressions(expression);
                }
                return factory2.updateComputedPropertyName(node, expression);
            }
            function visitPropertyAssignment(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const { referencedName, name } = visitReferencedPropertyName(node.name);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, referencedName), isExpression);
                    return factory2.updatePropertyAssignment(node, name, initializer);
                }
                return visitEachChild(node, visitor, context);
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
            function visitDestructuringAssignmentTarget(node) {
                if (isObjectLiteralExpression(node) || isArrayLiteralExpression(node)) {
                    return visitAssignmentPattern(node);
                }
                if (isSuperProperty(node) && classThis && classSuper) {
                    const propertyName = isElementAccessExpression(node) ? visitNode(node.argumentExpression, visitor, isExpression) : isIdentifier(node.name) ? factory2.createStringLiteralFromNode(node.name) : void 0;
                    if (propertyName) {
                        const paramName = factory2.createTempVariable(
                        /*recordTempVariable*/
                        void 0);
                        const expression = factory2.createAssignmentTargetWrapper(paramName, factory2.createReflectSetCall(classSuper, propertyName, paramName, classThis));
                        setOriginalNode(expression, node);
                        setTextRange(expression, node);
                        return expression;
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function visitAssignmentElement(node) {
                if (isAssignmentExpression(node, 
                /*excludeCompoundAssignment*/
                true)) {
                    const assignmentTarget = visitDestructuringAssignmentTarget(node.left);
                    let initializer;
                    if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                        const assignedName = getAssignedNameOfIdentifier(node.left, node.right);
                        initializer = visitNode(node.right, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    }
                    else {
                        initializer = visitNode(node.right, visitor, isExpression);
                    }
                    return factory2.updateBinaryExpression(node, assignmentTarget, node.operatorToken, initializer);
                }
                else {
                    return visitDestructuringAssignmentTarget(node);
                }
            }
            function visitAssignmentRestElement(node) {
                if (isLeftHandSideExpression(node.expression)) {
                    const expression = visitDestructuringAssignmentTarget(node.expression);
                    return factory2.updateSpreadElement(node, expression);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitArrayAssignmentElement(node) {
                Debug.assertNode(node, isArrayBindingOrAssignmentElement);
                if (isSpreadElement(node))
                    return visitAssignmentRestElement(node);
                if (!isOmittedExpression(node))
                    return visitAssignmentElement(node);
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
                    const name = visitNode(node.name, visitor, isIdentifier);
                    const objectAssignmentInitializer = visitNode(node.objectAssignmentInitializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    return factory2.updateShorthandPropertyAssignment(node, name, objectAssignmentInitializer);
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
                    const elements = visitNodes2(node.elements, visitArrayAssignmentElement, isExpression);
                    return factory2.updateArrayLiteralExpression(node, elements);
                }
                else {
                    const properties = visitNodes2(node.properties, visitObjectAssignmentElement, isObjectLiteralElementLike);
                    return factory2.updateObjectLiteralExpression(node, properties);
                }
            }
            function visitExportAssignment(node) {
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const referencedName = factory2.createStringLiteral(node.isExportEquals ? "" : "default");
                    const modifiers = visitNodes2(node.modifiers, modifierVisitor, isModifier);
                    const expression = visitNode(node.expression, (node2) => namedEvaluationVisitor(node2, referencedName), isExpression);
                    return factory2.updateExportAssignment(node, modifiers, expression);
                }
                return visitEachChild(node, visitor, context);
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
            function transformAllDecoratorsOfDeclaration(allDecorators) {
                if (!allDecorators) {
                    return void 0;
                }
                const decoratorExpressions = [];
                addRange(decoratorExpressions, map(allDecorators.decorators, transformDecorator));
                return decoratorExpressions;
            }
            function transformDecorator(decorator) {
                const expression = visitNode(decorator.expression, visitor, isExpression);
                setEmitFlags(expression, 3072 /* NoComments */);
                return expression;
            }
            function createDescriptorMethod(original, name, modifiers, asteriskToken, kind, parameters, body) {
                const func = factory2.createFunctionExpression(modifiers, asteriskToken, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, parameters, 
                /*type*/
                void 0, body != null ? body : factory2.createBlock([]));
                setOriginalNode(func, original);
                setSourceMapRange(func, moveRangePastDecorators(original));
                setEmitFlags(func, 3072 /* NoComments */);
                const prefix = kind === "get" || kind === "set" ? kind : void 0;
                const functionName = factory2.createStringLiteralFromNode(name, 
                /*isSingleQuote*/
                void 0);
                const namedFunction = emitHelpers().createSetFunctionNameHelper(func, functionName, prefix);
                const method = factory2.createPropertyAssignment(factory2.createIdentifier(kind), namedFunction);
                setOriginalNode(method, original);
                setSourceMapRange(method, moveRangePastDecorators(original));
                setEmitFlags(method, 3072 /* NoComments */);
                return method;
            }
            function createMethodDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, node.asteriskToken, "value", visitNodes2(node.parameters, visitor, isParameter), visitNode(node.body, visitor, isBlock))
                ]);
            }
            function createGetAccessorDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "get", [], visitNode(node.body, visitor, isBlock))
                ]);
            }
            function createSetAccessorDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "set", visitNodes2(node.parameters, visitor, isParameter), visitNode(node.body, visitor, isBlock))
                ]);
            }
            function createAccessorPropertyDescriptorObject(node, modifiers) {
                return factory2.createObjectLiteralExpression([
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "get", [], factory2.createBlock([
                        factory2.createReturnStatement(factory2.createPropertyAccessExpression(factory2.createThis(), factory2.getGeneratedPrivateNameForNode(node.name)))
                    ])),
                    createDescriptorMethod(node, node.name, modifiers, 
                    /*asteriskToken*/
                    void 0, "set", [factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, "value")], factory2.createBlock([
                        factory2.createExpressionStatement(factory2.createAssignment(factory2.createPropertyAccessExpression(factory2.createThis(), factory2.getGeneratedPrivateNameForNode(node.name)), factory2.createIdentifier("value")))
                    ]))
                ]);
            }
            function createMethodDescriptorForwarder(modifiers, name, descriptorName) {
                modifiers = visitNodes2(modifiers, (node) => isStaticModifier(node) ? node : void 0, isModifier);
                return factory2.createGetAccessorDeclaration(modifiers, name, [], 
                /*type*/
                void 0, factory2.createBlock([
                    factory2.createReturnStatement(factory2.createPropertyAccessExpression(descriptorName, factory2.createIdentifier("value")))
                ]));
            }
            function createGetAccessorDescriptorForwarder(modifiers, name, descriptorName) {
                modifiers = visitNodes2(modifiers, (node) => isStaticModifier(node) ? node : void 0, isModifier);
                return factory2.createGetAccessorDeclaration(modifiers, name, [], 
                /*type*/
                void 0, factory2.createBlock([
                    factory2.createReturnStatement(factory2.createFunctionCallCall(factory2.createPropertyAccessExpression(descriptorName, factory2.createIdentifier("get")), factory2.createThis(), []))
                ]));
            }
            function createSetAccessorDescriptorForwarder(modifiers, name, descriptorName) {
                modifiers = visitNodes2(modifiers, (node) => isStaticModifier(node) ? node : void 0, isModifier);
                return factory2.createSetAccessorDeclaration(modifiers, name, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, "value")], factory2.createBlock([
                    factory2.createReturnStatement(factory2.createFunctionCallCall(factory2.createPropertyAccessExpression(descriptorName, factory2.createIdentifier("set")), factory2.createThis(), [factory2.createIdentifier("value")]))
                ]));
            }
            function getAssignedNameOfIdentifier(name, initializer) {
                const originalClass = getOriginalNode(initializer, isClassLike);
                return originalClass && !originalClass.name && hasSyntacticModifier(originalClass, 1024 /* Default */) ? factory2.createStringLiteral("default") : factory2.createStringLiteralFromNode(name);
            }
        }