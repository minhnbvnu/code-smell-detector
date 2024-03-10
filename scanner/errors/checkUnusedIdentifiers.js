function checkUnusedIdentifiers(potentiallyUnusedIdentifiers, addDiagnostic) {
                for (const node of potentiallyUnusedIdentifiers) {
                    switch (node.kind) {
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */:
                            checkUnusedClassMembers(node, addDiagnostic);
                            checkUnusedTypeParameters(node, addDiagnostic);
                            break;
                        case 308 /* SourceFile */:
                        case 264 /* ModuleDeclaration */:
                        case 238 /* Block */:
                        case 266 /* CaseBlock */:
                        case 245 /* ForStatement */:
                        case 246 /* ForInStatement */:
                        case 247 /* ForOfStatement */:
                            checkUnusedLocalsAndParameters(node, addDiagnostic);
                            break;
                        case 173 /* Constructor */:
                        case 215 /* FunctionExpression */:
                        case 259 /* FunctionDeclaration */:
                        case 216 /* ArrowFunction */:
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            if (node.body) {
                                checkUnusedLocalsAndParameters(node, addDiagnostic);
                            }
                            checkUnusedTypeParameters(node, addDiagnostic);
                            break;
                        case 170 /* MethodSignature */:
                        case 176 /* CallSignature */:
                        case 177 /* ConstructSignature */:
                        case 181 /* FunctionType */:
                        case 182 /* ConstructorType */:
                        case 262 /* TypeAliasDeclaration */:
                        case 261 /* InterfaceDeclaration */:
                            checkUnusedTypeParameters(node, addDiagnostic);
                            break;
                        case 192 /* InferType */:
                            checkUnusedInferTypeParameter(node, addDiagnostic);
                            break;
                        default:
                            Debug.assertNever(node, "Node should not have been registered for unused identifiers check");
                    }
                }
            }