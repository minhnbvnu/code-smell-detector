function findFirstIllegalModifier(node) {
                switch (node.kind) {
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 173 /* Constructor */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 178 /* IndexSignature */:
                    case 264 /* ModuleDeclaration */:
                    case 269 /* ImportDeclaration */:
                    case 268 /* ImportEqualsDeclaration */:
                    case 275 /* ExportDeclaration */:
                    case 274 /* ExportAssignment */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 166 /* Parameter */:
                    case 165 /* TypeParameter */:
                        return void 0;
                    case 172 /* ClassStaticBlockDeclaration */:
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 267 /* NamespaceExportDeclaration */:
                    case 279 /* MissingDeclaration */:
                        return find(node.modifiers, isModifier);
                    default:
                        if (node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 308 /* SourceFile */) {
                            return void 0;
                        }
                        switch (node.kind) {
                            case 259 /* FunctionDeclaration */:
                                return findFirstModifierExcept(node, 132 /* AsyncKeyword */);
                            case 260 /* ClassDeclaration */:
                            case 182 /* ConstructorType */:
                                return findFirstModifierExcept(node, 126 /* AbstractKeyword */);
                            case 228 /* ClassExpression */:
                            case 261 /* InterfaceDeclaration */:
                            case 240 /* VariableStatement */:
                            case 262 /* TypeAliasDeclaration */:
                                return find(node.modifiers, isModifier);
                            case 263 /* EnumDeclaration */:
                                return findFirstModifierExcept(node, 85 /* ConstKeyword */);
                            default:
                                Debug.assertNever(node);
                        }
                }
            }