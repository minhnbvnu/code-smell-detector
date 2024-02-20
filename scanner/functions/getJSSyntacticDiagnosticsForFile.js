function getJSSyntacticDiagnosticsForFile(sourceFile) {
                return runWithCancellationToken(() => {
                    const diagnostics = [];
                    walk(sourceFile, sourceFile);
                    forEachChildRecursively(sourceFile, walk, walkArray);
                    return diagnostics;
                    function walk(node, parent2) {
                        switch (parent2.kind) {
                            case 166 /* Parameter */:
                            case 169 /* PropertyDeclaration */:
                            case 171 /* MethodDeclaration */:
                                if (parent2.questionToken === node) {
                                    diagnostics.push(createDiagnosticForNode2(node, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, "?"));
                                    return "skip";
                                }
                            case 170 /* MethodSignature */:
                            case 173 /* Constructor */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                            case 215 /* FunctionExpression */:
                            case 259 /* FunctionDeclaration */:
                            case 216 /* ArrowFunction */:
                            case 257 /* VariableDeclaration */:
                                if (parent2.type === node) {
                                    diagnostics.push(createDiagnosticForNode2(node, Diagnostics.Type_annotations_can_only_be_used_in_TypeScript_files));
                                    return "skip";
                                }
                        }
                        switch (node.kind) {
                            case 270 /* ImportClause */:
                                if (node.isTypeOnly) {
                                    diagnostics.push(createDiagnosticForNode2(parent2, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, "import type"));
                                    return "skip";
                                }
                                break;
                            case 275 /* ExportDeclaration */:
                                if (node.isTypeOnly) {
                                    diagnostics.push(createDiagnosticForNode2(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, "export type"));
                                    return "skip";
                                }
                                break;
                            case 273 /* ImportSpecifier */:
                            case 278 /* ExportSpecifier */:
                                if (node.isTypeOnly) {
                                    diagnostics.push(createDiagnosticForNode2(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, isImportSpecifier(node) ? "import...type" : "export...type"));
                                    return "skip";
                                }
                                break;
                            case 268 /* ImportEqualsDeclaration */:
                                diagnostics.push(createDiagnosticForNode2(node, Diagnostics.import_can_only_be_used_in_TypeScript_files));
                                return "skip";
                            case 274 /* ExportAssignment */:
                                if (node.isExportEquals) {
                                    diagnostics.push(createDiagnosticForNode2(node, Diagnostics.export_can_only_be_used_in_TypeScript_files));
                                    return "skip";
                                }
                                break;
                            case 294 /* HeritageClause */:
                                const heritageClause = node;
                                if (heritageClause.token === 117 /* ImplementsKeyword */) {
                                    diagnostics.push(createDiagnosticForNode2(node, Diagnostics.implements_clauses_can_only_be_used_in_TypeScript_files));
                                    return "skip";
                                }
                                break;
                            case 261 /* InterfaceDeclaration */:
                                const interfaceKeyword = tokenToString(118 /* InterfaceKeyword */);
                                Debug.assertIsDefined(interfaceKeyword);
                                diagnostics.push(createDiagnosticForNode2(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, interfaceKeyword));
                                return "skip";
                            case 264 /* ModuleDeclaration */:
                                const moduleKeyword = node.flags & 16 /* Namespace */ ? tokenToString(143 /* NamespaceKeyword */) : tokenToString(142 /* ModuleKeyword */);
                                Debug.assertIsDefined(moduleKeyword);
                                diagnostics.push(createDiagnosticForNode2(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, moduleKeyword));
                                return "skip";
                            case 262 /* TypeAliasDeclaration */:
                                diagnostics.push(createDiagnosticForNode2(node, Diagnostics.Type_aliases_can_only_be_used_in_TypeScript_files));
                                return "skip";
                            case 263 /* EnumDeclaration */:
                                const enumKeyword = Debug.checkDefined(tokenToString(92 /* EnumKeyword */));
                                diagnostics.push(createDiagnosticForNode2(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, enumKeyword));
                                return "skip";
                            case 232 /* NonNullExpression */:
                                diagnostics.push(createDiagnosticForNode2(node, Diagnostics.Non_null_assertions_can_only_be_used_in_TypeScript_files));
                                return "skip";
                            case 231 /* AsExpression */:
                                diagnostics.push(createDiagnosticForNode2(node.type, Diagnostics.Type_assertion_expressions_can_only_be_used_in_TypeScript_files));
                                return "skip";
                            case 235 /* SatisfiesExpression */:
                                diagnostics.push(createDiagnosticForNode2(node.type, Diagnostics.Type_satisfaction_expressions_can_only_be_used_in_TypeScript_files));
                                return "skip";
                            case 213 /* TypeAssertionExpression */:
                                Debug.fail();
                        }
                    }
                    function walkArray(nodes, parent2) {
                        if (canHaveIllegalDecorators(parent2)) {
                            const decorator = find(parent2.modifiers, isDecorator);
                            if (decorator) {
                                diagnostics.push(createDiagnosticForNode2(decorator, Diagnostics.Decorators_are_not_valid_here));
                            }
                        }
                        else if (canHaveDecorators(parent2) && parent2.modifiers) {
                            const decoratorIndex = findIndex(parent2.modifiers, isDecorator);
                            if (decoratorIndex >= 0) {
                                if (isParameter(parent2) && !options.experimentalDecorators) {
                                    diagnostics.push(createDiagnosticForNode2(parent2.modifiers[decoratorIndex], Diagnostics.Decorators_are_not_valid_here));
                                }
                                else if (isClassDeclaration(parent2)) {
                                    const exportIndex = findIndex(parent2.modifiers, isExportModifier);
                                    if (exportIndex >= 0) {
                                        const defaultIndex = findIndex(parent2.modifiers, isDefaultModifier);
                                        if (decoratorIndex > exportIndex && defaultIndex >= 0 && decoratorIndex < defaultIndex) {
                                            diagnostics.push(createDiagnosticForNode2(parent2.modifiers[decoratorIndex], Diagnostics.Decorators_are_not_valid_here));
                                        }
                                        else if (exportIndex >= 0 && decoratorIndex < exportIndex) {
                                            const trailingDecoratorIndex = findIndex(parent2.modifiers, isDecorator, exportIndex);
                                            if (trailingDecoratorIndex >= 0) {
                                                diagnostics.push(addRelatedInfo(createDiagnosticForNode2(parent2.modifiers[trailingDecoratorIndex], Diagnostics.Decorators_may_not_appear_after_export_or_export_default_if_they_also_appear_before_export), createDiagnosticForNode2(parent2.modifiers[decoratorIndex], Diagnostics.Decorator_used_before_export_here)));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        switch (parent2.kind) {
                            case 260 /* ClassDeclaration */:
                            case 228 /* ClassExpression */:
                            case 171 /* MethodDeclaration */:
                            case 173 /* Constructor */:
                            case 174 /* GetAccessor */:
                            case 175 /* SetAccessor */:
                            case 215 /* FunctionExpression */:
                            case 259 /* FunctionDeclaration */:
                            case 216 /* ArrowFunction */:
                                if (nodes === parent2.typeParameters) {
                                    diagnostics.push(createDiagnosticForNodeArray2(nodes, Diagnostics.Type_parameter_declarations_can_only_be_used_in_TypeScript_files));
                                    return "skip";
                                }
                            case 240 /* VariableStatement */:
                                if (nodes === parent2.modifiers) {
                                    checkModifiers(parent2.modifiers, parent2.kind === 240 /* VariableStatement */);
                                    return "skip";
                                }
                                break;
                            case 169 /* PropertyDeclaration */:
                                if (nodes === parent2.modifiers) {
                                    for (const modifier of nodes) {
                                        if (isModifier(modifier) && modifier.kind !== 124 /* StaticKeyword */ && modifier.kind !== 127 /* AccessorKeyword */) {
                                            diagnostics.push(createDiagnosticForNode2(modifier, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, tokenToString(modifier.kind)));
                                        }
                                    }
                                    return "skip";
                                }
                                break;
                            case 166 /* Parameter */:
                                if (nodes === parent2.modifiers && some(nodes, isModifier)) {
                                    diagnostics.push(createDiagnosticForNodeArray2(nodes, Diagnostics.Parameter_modifiers_can_only_be_used_in_TypeScript_files));
                                    return "skip";
                                }
                                break;
                            case 210 /* CallExpression */:
                            case 211 /* NewExpression */:
                            case 230 /* ExpressionWithTypeArguments */:
                            case 282 /* JsxSelfClosingElement */:
                            case 283 /* JsxOpeningElement */:
                            case 212 /* TaggedTemplateExpression */:
                                if (nodes === parent2.typeArguments) {
                                    diagnostics.push(createDiagnosticForNodeArray2(nodes, Diagnostics.Type_arguments_can_only_be_used_in_TypeScript_files));
                                    return "skip";
                                }
                                break;
                        }
                    }
                    function checkModifiers(modifiers, isConstValid) {
                        for (const modifier of modifiers) {
                            switch (modifier.kind) {
                                case 85 /* ConstKeyword */:
                                    if (isConstValid) {
                                        continue;
                                    }
                                case 123 /* PublicKeyword */:
                                case 121 /* PrivateKeyword */:
                                case 122 /* ProtectedKeyword */:
                                case 146 /* ReadonlyKeyword */:
                                case 136 /* DeclareKeyword */:
                                case 126 /* AbstractKeyword */:
                                case 161 /* OverrideKeyword */:
                                case 101 /* InKeyword */:
                                case 145 /* OutKeyword */:
                                    diagnostics.push(createDiagnosticForNode2(modifier, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, tokenToString(modifier.kind)));
                                    break;
                                case 124 /* StaticKeyword */:
                                case 93 /* ExportKeyword */:
                                case 88 /* DefaultKeyword */:
                                case 127 /* AccessorKeyword */:
                            }
                        }
                    }
                    function createDiagnosticForNodeArray2(nodes, message, arg0, arg1, arg2) {
                        const start = nodes.pos;
                        return createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2);
                    }
                    function createDiagnosticForNode2(node, message, arg0, arg1, arg2) {
                        return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2);
                    }
                });
            }