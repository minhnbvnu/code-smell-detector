function deleteDeclaration2(changes, deletedNodesInLists, sourceFile, node) {
                        switch (node.kind) {
                            case 166 /* Parameter */: {
                                const oldFunction = node.parent;
                                if (isArrowFunction(oldFunction) && oldFunction.parameters.length === 1 && !findChildOfKind(oldFunction, 20 /* OpenParenToken */, sourceFile)) {
                                    changes.replaceNodeWithText(sourceFile, node, "()");
                                }
                                else {
                                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                                }
                                break;
                            }
                            case 269 /* ImportDeclaration */:
                            case 268 /* ImportEqualsDeclaration */:
                                const isFirstImport = sourceFile.imports.length && node === first(sourceFile.imports).parent || node === find(sourceFile.statements, isAnyImportSyntax);
                                deleteNode(changes, sourceFile, node, {
                                    leadingTriviaOption: isFirstImport ? 0 /* Exclude */ : hasJSDocNodes(node) ? 2 /* JSDoc */ : 3 /* StartLine */
                                });
                                break;
                            case 205 /* BindingElement */:
                                const pattern = node.parent;
                                const preserveComma = pattern.kind === 204 /* ArrayBindingPattern */ && node !== last(pattern.elements);
                                if (preserveComma) {
                                    deleteNode(changes, sourceFile, node);
                                }
                                else {
                                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                                }
                                break;
                            case 257 /* VariableDeclaration */:
                                deleteVariableDeclaration(changes, deletedNodesInLists, sourceFile, node);
                                break;
                            case 165 /* TypeParameter */:
                                deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                                break;
                            case 273 /* ImportSpecifier */:
                                const namedImports = node.parent;
                                if (namedImports.elements.length === 1) {
                                    deleteImportBinding(changes, sourceFile, namedImports);
                                }
                                else {
                                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                                }
                                break;
                            case 271 /* NamespaceImport */:
                                deleteImportBinding(changes, sourceFile, node);
                                break;
                            case 26 /* SemicolonToken */:
                                deleteNode(changes, sourceFile, node, { trailingTriviaOption: 0 /* Exclude */ });
                                break;
                            case 98 /* FunctionKeyword */:
                                deleteNode(changes, sourceFile, node, { leadingTriviaOption: 0 /* Exclude */ });
                                break;
                            case 260 /* ClassDeclaration */:
                            case 259 /* FunctionDeclaration */:
                                deleteNode(changes, sourceFile, node, { leadingTriviaOption: hasJSDocNodes(node) ? 2 /* JSDoc */ : 3 /* StartLine */ });
                                break;
                            default:
                                if (!node.parent) {
                                    deleteNode(changes, sourceFile, node);
                                }
                                else if (isImportClause(node.parent) && node.parent.name === node) {
                                    deleteDefaultImport(changes, sourceFile, node.parent);
                                }
                                else if (isCallExpression(node.parent) && contains(node.parent.arguments, node)) {
                                    deleteNodeInList(changes, deletedNodesInLists, sourceFile, node);
                                }
                                else {
                                    deleteNode(changes, sourceFile, node);
                                }
                        }
                    }