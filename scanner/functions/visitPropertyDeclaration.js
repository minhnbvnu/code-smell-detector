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