function getListByRange(start, end, node, sourceFile) {
                        switch (node.kind) {
                            case 180 /* TypeReference */:
                                return getList(node.typeArguments);
                            case 207 /* ObjectLiteralExpression */:
                                return getList(node.properties);
                            case 206 /* ArrayLiteralExpression */:
                                return getList(node.elements);
                            case 184 /* TypeLiteral */:
                                return getList(node.members);
                            case 259 /* FunctionDeclaration */:
                            case 215 /* FunctionExpression */:
                            case 216 /* ArrowFunction */:
                            case 171 /* MethodDeclaration */:
                            case 170 /* MethodSignature */:
                            case 176 /* CallSignature */:
                            case 173 /* Constructor */:
                            case 182 /* ConstructorType */:
                            case 177 /* ConstructSignature */:
                                return getList(node.typeParameters) || getList(node.parameters);
                            case 174 /* GetAccessor */:
                                return getList(node.parameters);
                            case 260 /* ClassDeclaration */:
                            case 228 /* ClassExpression */:
                            case 261 /* InterfaceDeclaration */:
                            case 262 /* TypeAliasDeclaration */:
                            case 348 /* JSDocTemplateTag */:
                                return getList(node.typeParameters);
                            case 211 /* NewExpression */:
                            case 210 /* CallExpression */:
                                return getList(node.typeArguments) || getList(node.arguments);
                            case 258 /* VariableDeclarationList */:
                                return getList(node.declarations);
                            case 272 /* NamedImports */:
                            case 276 /* NamedExports */:
                                return getList(node.elements);
                            case 203 /* ObjectBindingPattern */:
                            case 204 /* ArrayBindingPattern */:
                                return getList(node.elements);
                        }
                        function getList(list) {
                            return list && rangeContainsStartEnd(getVisualListRange(node, list, sourceFile), start, end) ? list : void 0;
                        }
                    }