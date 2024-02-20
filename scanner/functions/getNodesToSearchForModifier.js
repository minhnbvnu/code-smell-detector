function getNodesToSearchForModifier(declaration, modifierFlag) {
                        const container = declaration.parent;
                        switch (container.kind) {
                            case 265 /* ModuleBlock */:
                            case 308 /* SourceFile */:
                            case 238 /* Block */:
                            case 292 /* CaseClause */:
                            case 293 /* DefaultClause */:
                                if (modifierFlag & 256 /* Abstract */ && isClassDeclaration(declaration)) {
                                    return [...declaration.members, declaration];
                                }
                                else {
                                    return container.statements;
                                }
                            case 173 /* Constructor */:
                            case 171 /* MethodDeclaration */:
                            case 259 /* FunctionDeclaration */:
                                return [...container.parameters, ...isClassLike(container.parent) ? container.parent.members : []];
                            case 260 /* ClassDeclaration */:
                            case 228 /* ClassExpression */:
                            case 261 /* InterfaceDeclaration */:
                            case 184 /* TypeLiteral */:
                                const nodes = container.members;
                                if (modifierFlag & (28 /* AccessibilityModifier */ | 64 /* Readonly */)) {
                                    const constructor = find(container.members, isConstructorDeclaration);
                                    if (constructor) {
                                        return [...nodes, ...constructor.parameters];
                                    }
                                }
                                else if (modifierFlag & 256 /* Abstract */) {
                                    return [...nodes, container];
                                }
                                return nodes;
                            case 207 /* ObjectLiteralExpression */:
                                return void 0;
                            default:
                                Debug.assertNever(container, "Invalid container kind.");
                        }
                    }