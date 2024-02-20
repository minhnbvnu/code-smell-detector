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