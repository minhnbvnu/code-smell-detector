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