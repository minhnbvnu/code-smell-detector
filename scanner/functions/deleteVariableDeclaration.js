function deleteVariableDeclaration(changes, deletedNodesInLists, sourceFile, node) {
                        const { parent: parent2 } = node;
                        if (parent2.kind === 295 /* CatchClause */) {
                            changes.deleteNodeRange(sourceFile, findChildOfKind(parent2, 20 /* OpenParenToken */, sourceFile), findChildOfKind(parent2, 21 /* CloseParenToken */, sourceFile));
                            return;
                        }
                        if (parent2.declarations.length !== 1) {
                            deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                            return;
                        }
                        const gp = parent2.parent;
                        switch (gp.kind) {
                            case 247 /* ForOfStatement */:
                            case 246 /* ForInStatement */:
                                changes.replaceNode(sourceFile, node, factory.createObjectLiteralExpression());
                                break;
                            case 245 /* ForStatement */:
                                deleteNode(changes, sourceFile, parent2);
                                break;
                            case 240 /* VariableStatement */:
                                deleteNode(changes, sourceFile, gp, { leadingTriviaOption: hasJSDocNodes(gp) ? 2 /* JSDoc */ : 3 /* StartLine */ });
                                break;
                            default:
                                Debug.assertNever(gp);
                        }
                    }