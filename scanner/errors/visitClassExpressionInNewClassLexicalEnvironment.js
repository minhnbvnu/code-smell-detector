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