function nodeWillIndentChild(settings, parent2, child, sourceFile, indentByDefault) {
                        const childKind = child ? child.kind : 0 /* Unknown */;
                        switch (parent2.kind) {
                            case 241 /* ExpressionStatement */:
                            case 260 /* ClassDeclaration */:
                            case 228 /* ClassExpression */:
                            case 261 /* InterfaceDeclaration */:
                            case 263 /* EnumDeclaration */:
                            case 262 /* TypeAliasDeclaration */:
                            case 206 /* ArrayLiteralExpression */:
                            case 238 /* Block */:
                            case 265 /* ModuleBlock */:
                            case 207 /* ObjectLiteralExpression */:
                            case 184 /* TypeLiteral */:
                            case 197 /* MappedType */:
                            case 186 /* TupleType */:
                            case 266 /* CaseBlock */:
                            case 293 /* DefaultClause */:
                            case 292 /* CaseClause */:
                            case 214 /* ParenthesizedExpression */:
                            case 208 /* PropertyAccessExpression */:
                            case 210 /* CallExpression */:
                            case 211 /* NewExpression */:
                            case 240 /* VariableStatement */:
                            case 274 /* ExportAssignment */:
                            case 250 /* ReturnStatement */:
                            case 224 /* ConditionalExpression */:
                            case 204 /* ArrayBindingPattern */:
                            case 203 /* ObjectBindingPattern */:
                            case 283 /* JsxOpeningElement */:
                            case 286 /* JsxOpeningFragment */:
                            case 282 /* JsxSelfClosingElement */:
                            case 291 /* JsxExpression */:
                            case 170 /* MethodSignature */:
                            case 176 /* CallSignature */:
                            case 177 /* ConstructSignature */:
                            case 166 /* Parameter */:
                            case 181 /* FunctionType */:
                            case 182 /* ConstructorType */:
                            case 193 /* ParenthesizedType */:
                            case 212 /* TaggedTemplateExpression */:
                            case 220 /* AwaitExpression */:
                            case 276 /* NamedExports */:
                            case 272 /* NamedImports */:
                            case 278 /* ExportSpecifier */:
                            case 273 /* ImportSpecifier */:
                            case 169 /* PropertyDeclaration */:
                                return true;
                            case 257 /* VariableDeclaration */:
                            case 299 /* PropertyAssignment */:
                            case 223 /* BinaryExpression */:
                                if (!settings.indentMultiLineObjectLiteralBeginningOnBlankLine && sourceFile && childKind === 207 /* ObjectLiteralExpression */) {
                                    return rangeIsOnOneLine(sourceFile, child);
                                }
                                if (parent2.kind === 223 /* BinaryExpression */ && sourceFile && child && childKind === 281 /* JsxElement */) {
                                    const parentStartLine = sourceFile.getLineAndCharacterOfPosition(skipTrivia(sourceFile.text, parent2.pos)).line;
                                    const childStartLine = sourceFile.getLineAndCharacterOfPosition(skipTrivia(sourceFile.text, child.pos)).line;
                                    return parentStartLine !== childStartLine;
                                }
                                if (parent2.kind !== 223 /* BinaryExpression */) {
                                    return true;
                                }
                                break;
                            case 243 /* DoStatement */:
                            case 244 /* WhileStatement */:
                            case 246 /* ForInStatement */:
                            case 247 /* ForOfStatement */:
                            case 245 /* ForStatement */:
                            case 242 /* IfStatement */:
                            case 259 /* FunctionDeclaration */:
                            case 215 /* FunctionExpression */:
                            case 171 /* MethodDeclaration */:
                            case 173 /* Constructor */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                                return childKind !== 238 /* Block */;
                            case 216 /* ArrowFunction */:
                                if (sourceFile && childKind === 214 /* ParenthesizedExpression */) {
                                    return rangeIsOnOneLine(sourceFile, child);
                                }
                                return childKind !== 238 /* Block */;
                            case 275 /* ExportDeclaration */:
                                return childKind !== 276 /* NamedExports */;
                            case 269 /* ImportDeclaration */:
                                return childKind !== 270 /* ImportClause */ || !!child.namedBindings && child.namedBindings.kind !== 272 /* NamedImports */;
                            case 281 /* JsxElement */:
                                return childKind !== 284 /* JsxClosingElement */;
                            case 285 /* JsxFragment */:
                                return childKind !== 287 /* JsxClosingFragment */;
                            case 190 /* IntersectionType */:
                            case 189 /* UnionType */:
                                if (childKind === 184 /* TypeLiteral */ || childKind === 186 /* TupleType */) {
                                    return false;
                                }
                                break;
                        }
                        return indentByDefault;
                    }