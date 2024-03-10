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