function parseJSDocTypeNameWithNamespace(nested) {
                                const pos = scanner2.getTokenPos();
                                if (!tokenIsIdentifierOrKeyword(token())) {
                                    return void 0;
                                }
                                const typeNameOrNamespaceName = parseJSDocIdentifierName();
                                if (parseOptional(24 /* DotToken */)) {
                                    const body = parseJSDocTypeNameWithNamespace(
                                    /*nested*/
                                    true);
                                    const jsDocNamespaceNode = factory2.createModuleDeclaration(
                                    /*modifiers*/
                                    void 0, typeNameOrNamespaceName, body, nested ? 4 /* NestedNamespace */ : void 0);
                                    return finishNode(jsDocNamespaceNode, pos);
                                }
                                if (nested) {
                                    typeNameOrNamespaceName.flags |= 2048 /* IdentifierIsInJSDocNamespace */;
                                }
                                return typeNameOrNamespaceName;
                            }