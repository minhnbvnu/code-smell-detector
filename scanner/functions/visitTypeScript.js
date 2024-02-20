function visitTypeScript(node) {
                if (isStatement(node) && hasSyntacticModifier(node, 2 /* Ambient */)) {
                    return factory2.createNotEmittedStatement(node);
                }
                switch (node.kind) {
                    case 93 /* ExportKeyword */:
                    case 88 /* DefaultKeyword */:
                        return currentNamespace ? void 0 : node;
                    case 123 /* PublicKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                    case 126 /* AbstractKeyword */:
                    case 161 /* OverrideKeyword */:
                    case 85 /* ConstKeyword */:
                    case 136 /* DeclareKeyword */:
                    case 146 /* ReadonlyKeyword */:
                    case 101 /* InKeyword */:
                    case 145 /* OutKeyword */:
                    case 185 /* ArrayType */:
                    case 186 /* TupleType */:
                    case 187 /* OptionalType */:
                    case 188 /* RestType */:
                    case 184 /* TypeLiteral */:
                    case 179 /* TypePredicate */:
                    case 165 /* TypeParameter */:
                    case 131 /* AnyKeyword */:
                    case 157 /* UnknownKeyword */:
                    case 134 /* BooleanKeyword */:
                    case 152 /* StringKeyword */:
                    case 148 /* NumberKeyword */:
                    case 144 /* NeverKeyword */:
                    case 114 /* VoidKeyword */:
                    case 153 /* SymbolKeyword */:
                    case 182 /* ConstructorType */:
                    case 181 /* FunctionType */:
                    case 183 /* TypeQuery */:
                    case 180 /* TypeReference */:
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                    case 191 /* ConditionalType */:
                    case 193 /* ParenthesizedType */:
                    case 194 /* ThisType */:
                    case 195 /* TypeOperator */:
                    case 196 /* IndexedAccessType */:
                    case 197 /* MappedType */:
                    case 198 /* LiteralType */:
                    case 178 /* IndexSignature */:
                        return void 0;
                    case 262 /* TypeAliasDeclaration */:
                        return factory2.createNotEmittedStatement(node);
                    case 267 /* NamespaceExportDeclaration */:
                        return void 0;
                    case 261 /* InterfaceDeclaration */:
                        return factory2.createNotEmittedStatement(node);
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node);
                    case 294 /* HeritageClause */:
                        return visitHeritageClause(node);
                    case 230 /* ExpressionWithTypeArguments */:
                        return visitExpressionWithTypeArguments(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 173 /* Constructor */:
                    case 169 /* PropertyDeclaration */:
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 172 /* ClassStaticBlockDeclaration */:
                        return Debug.fail("Class and object literal elements must be visited with their respective visitors");
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    case 216 /* ArrowFunction */:
                        return visitArrowFunction(node);
                    case 166 /* Parameter */:
                        return visitParameter(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node);
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                        return visitAssertionExpression(node);
                    case 235 /* SatisfiesExpression */:
                        return visitSatisfiesExpression(node);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 211 /* NewExpression */:
                        return visitNewExpression(node);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
                    case 232 /* NonNullExpression */:
                        return visitNonNullExpression(node);
                    case 263 /* EnumDeclaration */:
                        return visitEnumDeclaration(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 264 /* ModuleDeclaration */:
                        return visitModuleDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return visitImportEqualsDeclaration(node);
                    case 282 /* JsxSelfClosingElement */:
                        return visitJsxSelfClosingElement(node);
                    case 283 /* JsxOpeningElement */:
                        return visitJsxJsxOpeningElement(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }