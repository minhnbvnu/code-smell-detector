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