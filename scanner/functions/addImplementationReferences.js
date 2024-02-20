function addImplementationReferences(refNode, addReference2, state) {
                        if (isDeclarationName(refNode) && isImplementation(refNode.parent)) {
                            addReference2(refNode);
                            return;
                        }
                        if (refNode.kind !== 79 /* Identifier */) {
                            return;
                        }
                        if (refNode.parent.kind === 300 /* ShorthandPropertyAssignment */) {
                            getReferenceEntriesForShorthandPropertyAssignment(refNode, state.checker, addReference2);
                        }
                        const containingClass = getContainingClassIfInHeritageClause(refNode);
                        if (containingClass) {
                            addReference2(containingClass);
                            return;
                        }
                        const typeNode = findAncestor(refNode, (a) => !isQualifiedName(a.parent) && !isTypeNode(a.parent) && !isTypeElement(a.parent));
                        const typeHavingNode = typeNode.parent;
                        if (hasType(typeHavingNode) && typeHavingNode.type === typeNode && state.markSeenContainingTypeReference(typeHavingNode)) {
                            if (hasInitializer(typeHavingNode)) {
                                addIfImplementation(typeHavingNode.initializer);
                            }
                            else if (isFunctionLike(typeHavingNode) && typeHavingNode.body) {
                                const body = typeHavingNode.body;
                                if (body.kind === 238 /* Block */) {
                                    forEachReturnStatement(body, (returnStatement) => {
                                        if (returnStatement.expression)
                                            addIfImplementation(returnStatement.expression);
                                    });
                                }
                                else {
                                    addIfImplementation(body);
                                }
                            }
                            else if (isAssertionExpression(typeHavingNode)) {
                                addIfImplementation(typeHavingNode.expression);
                            }
                        }
                        function addIfImplementation(e) {
                            if (isImplementationExpression(e))
                                addReference2(e);
                        }
                    }