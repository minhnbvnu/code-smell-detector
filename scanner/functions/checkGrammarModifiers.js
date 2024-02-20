function checkGrammarModifiers(node) {
                const quickResult = reportObviousDecoratorErrors(node) || reportObviousModifierErrors(node);
                if (quickResult !== void 0) {
                    return quickResult;
                }
                if (isParameter(node) && parameterIsThisKeyword(node)) {
                    return grammarErrorOnFirstToken(node, Diagnostics.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters);
                }
                let lastStatic, lastDeclare, lastAsync, lastOverride, firstDecorator;
                let flags = 0 /* None */;
                let sawExportBeforeDecorators = false;
                let hasLeadingDecorators = false;
                for (const modifier of node.modifiers) {
                    if (isDecorator(modifier)) {
                        if (!nodeCanBeDecorated(legacyDecorators, node, node.parent, node.parent.parent)) {
                            if (node.kind === 171 /* MethodDeclaration */ && !nodeIsPresent(node.body)) {
                                return grammarErrorOnFirstToken(node, Diagnostics.A_decorator_can_only_decorate_a_method_implementation_not_an_overload);
                            }
                            else {
                                return grammarErrorOnFirstToken(node, Diagnostics.Decorators_are_not_valid_here);
                            }
                        }
                        else if (legacyDecorators && (node.kind === 174 /* GetAccessor */ || node.kind === 175 /* SetAccessor */)) {
                            const accessors = getAllAccessorDeclarations(node.parent.members, node);
                            if (hasDecorators(accessors.firstAccessor) && node === accessors.secondAccessor) {
                                return grammarErrorOnFirstToken(node, Diagnostics.Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name);
                            }
                        }
                        if (flags & ~(1025 /* ExportDefault */ | 131072 /* Decorator */)) {
                            return grammarErrorOnNode(modifier, Diagnostics.Decorators_are_not_valid_here);
                        }
                        if (hasLeadingDecorators && flags & 126975 /* Modifier */) {
                            Debug.assertIsDefined(firstDecorator);
                            const sourceFile = getSourceFileOfNode(modifier);
                            if (!hasParseDiagnostics(sourceFile)) {
                                addRelatedInfo(error(modifier, Diagnostics.Decorators_may_not_appear_after_export_or_export_default_if_they_also_appear_before_export), createDiagnosticForNode(firstDecorator, Diagnostics.Decorator_used_before_export_here));
                                return true;
                            }
                            return false;
                        }
                        flags |= 131072 /* Decorator */;
                        if (!(flags & 126975 /* Modifier */)) {
                            hasLeadingDecorators = true;
                        }
                        else if (flags & 1 /* Export */) {
                            sawExportBeforeDecorators = true;
                        }
                        firstDecorator != null ? firstDecorator : firstDecorator = modifier;
                    }
                    else {
                        if (modifier.kind !== 146 /* ReadonlyKeyword */) {
                            if (node.kind === 168 /* PropertySignature */ || node.kind === 170 /* MethodSignature */) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_type_member, tokenToString(modifier.kind));
                            }
                            if (node.kind === 178 /* IndexSignature */ && (modifier.kind !== 124 /* StaticKeyword */ || !isClassLike(node.parent))) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_an_index_signature, tokenToString(modifier.kind));
                            }
                        }
                        if (modifier.kind !== 101 /* InKeyword */ && modifier.kind !== 145 /* OutKeyword */ && modifier.kind !== 85 /* ConstKeyword */) {
                            if (node.kind === 165 /* TypeParameter */) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_type_parameter, tokenToString(modifier.kind));
                            }
                        }
                        switch (modifier.kind) {
                            case 85 /* ConstKeyword */:
                                if (node.kind !== 263 /* EnumDeclaration */ && node.kind !== 165 /* TypeParameter */) {
                                    return grammarErrorOnNode(node, Diagnostics.A_class_member_cannot_have_the_0_keyword, tokenToString(85 /* ConstKeyword */));
                                }
                                const parent2 = node.parent;
                                if (node.kind === 165 /* TypeParameter */ && !(isFunctionLikeDeclaration(parent2) || isClassLike(parent2) || isFunctionTypeNode(parent2) || isConstructorTypeNode(parent2) || isCallSignatureDeclaration(parent2) || isConstructSignatureDeclaration(parent2) || isMethodSignature(parent2))) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_can_only_appear_on_a_type_parameter_of_a_function_method_or_class, tokenToString(modifier.kind));
                                }
                                break;
                            case 161 /* OverrideKeyword */:
                                if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "override");
                                }
                                else if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "override", "declare");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "override", "readonly");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "override", "accessor");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "override", "async");
                                }
                                flags |= 16384 /* Override */;
                                lastOverride = modifier;
                                break;
                            case 123 /* PublicKeyword */:
                            case 122 /* ProtectedKeyword */:
                            case 121 /* PrivateKeyword */:
                                const text = visibilityToString(modifierToFlag(modifier.kind));
                                if (flags & 28 /* AccessibilityModifier */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.Accessibility_modifier_already_seen);
                                }
                                else if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "override");
                                }
                                else if (flags & 32 /* Static */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "static");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "accessor");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "readonly");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "async");
                                }
                                else if (node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 308 /* SourceFile */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_or_namespace_element, text);
                                }
                                else if (flags & 256 /* Abstract */) {
                                    if (modifier.kind === 121 /* PrivateKeyword */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, text, "abstract");
                                    }
                                    else {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "abstract");
                                    }
                                }
                                else if (isPrivateIdentifierClassElementDeclaration(node)) {
                                    return grammarErrorOnNode(modifier, Diagnostics.An_accessibility_modifier_cannot_be_used_with_a_private_identifier);
                                }
                                flags |= modifierToFlag(modifier.kind);
                                break;
                            case 124 /* StaticKeyword */:
                                if (flags & 32 /* Static */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "static");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "readonly");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "async");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "accessor");
                                }
                                else if (node.parent.kind === 265 /* ModuleBlock */ || node.parent.kind === 308 /* SourceFile */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_or_namespace_element, "static");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                                }
                                else if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "static", "abstract");
                                }
                                else if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "override");
                                }
                                flags |= 32 /* Static */;
                                lastStatic = modifier;
                                break;
                            case 127 /* AccessorKeyword */:
                                if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "accessor");
                                }
                                else if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "accessor", "readonly");
                                }
                                else if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "accessor", "declare");
                                }
                                else if (node.kind !== 169 /* PropertyDeclaration */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.accessor_modifier_can_only_appear_on_a_property_declaration);
                                }
                                flags |= 128 /* Accessor */;
                                break;
                            case 146 /* ReadonlyKeyword */:
                                if (flags & 64 /* Readonly */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "readonly");
                                }
                                else if (node.kind !== 169 /* PropertyDeclaration */ && node.kind !== 168 /* PropertySignature */ && node.kind !== 178 /* IndexSignature */ && node.kind !== 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature);
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "readonly", "accessor");
                                }
                                flags |= 64 /* Readonly */;
                                break;
                            case 93 /* ExportKeyword */:
                                if (compilerOptions.verbatimModuleSyntax && !(node.flags & 16777216 /* Ambient */) && node.kind !== 262 /* TypeAliasDeclaration */ && node.kind !== 261 /* InterfaceDeclaration */ && // ModuleDeclaration needs to be checked that it is uninstantiated later
                                    node.kind !== 264 /* ModuleDeclaration */ && node.parent.kind === 308 /* SourceFile */ && (moduleKind === 1 /* CommonJS */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                                    return grammarErrorOnNode(modifier, Diagnostics.A_top_level_export_modifier_cannot_be_used_on_value_declarations_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                                }
                                if (flags & 1 /* Export */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "export");
                                }
                                else if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                                }
                                else if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "abstract");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "async");
                                }
                                else if (isClassLike(node.parent)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_class_elements_of_this_kind, "export");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                                }
                                flags |= 1 /* Export */;
                                break;
                            case 88 /* DefaultKeyword */:
                                const container = node.parent.kind === 308 /* SourceFile */ ? node.parent : node.parent.parent;
                                if (container.kind === 264 /* ModuleDeclaration */ && !isAmbientModule(container)) {
                                    return grammarErrorOnNode(modifier, Diagnostics.A_default_export_can_only_be_used_in_an_ECMAScript_style_module);
                                }
                                else if (!(flags & 1 /* Export */)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "default");
                                }
                                else if (sawExportBeforeDecorators) {
                                    return grammarErrorOnNode(firstDecorator, Diagnostics.Decorators_are_not_valid_here);
                                }
                                flags |= 1024 /* Default */;
                                break;
                            case 136 /* DeclareKeyword */:
                                if (flags & 2 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "declare");
                                }
                                else if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "async");
                                }
                                else if (flags & 16384 /* Override */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "override");
                                }
                                else if (isClassLike(node.parent) && !isPropertyDeclaration(node)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_class_elements_of_this_kind, "declare");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                                }
                                else if (node.parent.flags & 16777216 /* Ambient */ && node.parent.kind === 265 /* ModuleBlock */) {
                                    return grammarErrorOnNode(modifier, Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                                }
                                else if (isPrivateIdentifierClassElementDeclaration(node)) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_a_private_identifier, "declare");
                                }
                                else if (flags & 128 /* Accessor */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "declare", "accessor");
                                }
                                flags |= 2 /* Ambient */;
                                lastDeclare = modifier;
                                break;
                            case 126 /* AbstractKeyword */:
                                if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "abstract");
                                }
                                if (node.kind !== 260 /* ClassDeclaration */ && node.kind !== 182 /* ConstructorType */) {
                                    if (node.kind !== 171 /* MethodDeclaration */ && node.kind !== 169 /* PropertyDeclaration */ && node.kind !== 174 /* GetAccessor */ && node.kind !== 175 /* SetAccessor */) {
                                        return grammarErrorOnNode(modifier, Diagnostics.abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration);
                                    }
                                    if (!(node.parent.kind === 260 /* ClassDeclaration */ && hasSyntacticModifier(node.parent, 256 /* Abstract */))) {
                                        return grammarErrorOnNode(modifier, Diagnostics.Abstract_methods_can_only_appear_within_an_abstract_class);
                                    }
                                    if (flags & 32 /* Static */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "static", "abstract");
                                    }
                                    if (flags & 8 /* Private */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "private", "abstract");
                                    }
                                    if (flags & 512 /* Async */ && lastAsync) {
                                        return grammarErrorOnNode(lastAsync, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "async", "abstract");
                                    }
                                    if (flags & 16384 /* Override */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "abstract", "override");
                                    }
                                    if (flags & 128 /* Accessor */) {
                                        return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "abstract", "accessor");
                                    }
                                }
                                if (isNamedDeclaration(node) && node.name.kind === 80 /* PrivateIdentifier */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_a_private_identifier, "abstract");
                                }
                                flags |= 256 /* Abstract */;
                                break;
                            case 132 /* AsyncKeyword */:
                                if (flags & 512 /* Async */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "async");
                                }
                                else if (flags & 2 /* Ambient */ || node.parent.flags & 16777216 /* Ambient */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "async");
                                }
                                else if (node.kind === 166 /* Parameter */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "async");
                                }
                                if (flags & 256 /* Abstract */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "async", "abstract");
                                }
                                flags |= 512 /* Async */;
                                lastAsync = modifier;
                                break;
                            case 101 /* InKeyword */:
                            case 145 /* OutKeyword */:
                                const inOutFlag = modifier.kind === 101 /* InKeyword */ ? 32768 /* In */ : 65536 /* Out */;
                                const inOutText = modifier.kind === 101 /* InKeyword */ ? "in" : "out";
                                if (node.kind !== 165 /* TypeParameter */ || !(isInterfaceDeclaration(node.parent) || isClassLike(node.parent) || isTypeAliasDeclaration(node.parent))) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_can_only_appear_on_a_type_parameter_of_a_class_interface_or_type_alias, inOutText);
                                }
                                if (flags & inOutFlag) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, inOutText);
                                }
                                if (inOutFlag & 32768 /* In */ && flags & 65536 /* Out */) {
                                    return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "in", "out");
                                }
                                flags |= inOutFlag;
                                break;
                        }
                    }
                }
                if (node.kind === 173 /* Constructor */) {
                    if (flags & 32 /* Static */) {
                        return grammarErrorOnNode(lastStatic, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
                    }
                    if (flags & 16384 /* Override */) {
                        return grammarErrorOnNode(lastOverride, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "override");
                    }
                    if (flags & 512 /* Async */) {
                        return grammarErrorOnNode(lastAsync, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "async");
                    }
                    return false;
                }
                else if ((node.kind === 269 /* ImportDeclaration */ || node.kind === 268 /* ImportEqualsDeclaration */) && flags & 2 /* Ambient */) {
                    return grammarErrorOnNode(lastDeclare, Diagnostics.A_0_modifier_cannot_be_used_with_an_import_declaration, "declare");
                }
                else if (node.kind === 166 /* Parameter */ && flags & 16476 /* ParameterPropertyModifier */ && isBindingPattern(node.name)) {
                    return grammarErrorOnNode(node, Diagnostics.A_parameter_property_may_not_be_declared_using_a_binding_pattern);
                }
                else if (node.kind === 166 /* Parameter */ && flags & 16476 /* ParameterPropertyModifier */ && node.dotDotDotToken) {
                    return grammarErrorOnNode(node, Diagnostics.A_parameter_property_cannot_be_declared_using_a_rest_parameter);
                }
                if (flags & 512 /* Async */) {
                    return checkGrammarAsyncModifier(node, lastAsync);
                }
                return false;
            }