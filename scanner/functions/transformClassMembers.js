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