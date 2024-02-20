function checkExportAssignment(node) {
                const illegalContextMessage = node.isExportEquals ? Diagnostics.An_export_assignment_must_be_at_the_top_level_of_a_file_or_module_declaration : Diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration;
                if (checkGrammarModuleElementContext(node, illegalContextMessage)) {
                    return;
                }
                const container = node.parent.kind === 308 /* SourceFile */ ? node.parent : node.parent.parent;
                if (container.kind === 264 /* ModuleDeclaration */ && !isAmbientModule(container)) {
                    if (node.isExportEquals) {
                        error(node, Diagnostics.An_export_assignment_cannot_be_used_in_a_namespace);
                    }
                    else {
                        error(node, Diagnostics.A_default_export_can_only_be_used_in_an_ECMAScript_style_module);
                    }
                    return;
                }
                if (!checkGrammarModifiers(node) && hasEffectiveModifiers(node)) {
                    grammarErrorOnFirstToken(node, Diagnostics.An_export_assignment_cannot_have_modifiers);
                }
                const typeAnnotationNode = getEffectiveTypeAnnotationNode(node);
                if (typeAnnotationNode) {
                    checkTypeAssignableTo(checkExpressionCached(node.expression), getTypeFromTypeNode(typeAnnotationNode), node.expression);
                }
                const isIllegalExportDefaultInCJS = !node.isExportEquals && !(node.flags & 16777216 /* Ambient */) && compilerOptions.verbatimModuleSyntax && (moduleKind === 1 /* CommonJS */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */);
                if (node.expression.kind === 79 /* Identifier */) {
                    const id = node.expression;
                    const sym = getExportSymbolOfValueSymbolIfExported(resolveEntityName(id, 67108863 /* All */, 
                    /*ignoreErrors*/
                    true, 
                    /*dontResolveAlias*/
                    true, node));
                    if (sym) {
                        markAliasReferenced(sym, id);
                        if (getAllSymbolFlags(sym) & 111551 /* Value */) {
                            checkExpressionCached(id);
                            if (!isIllegalExportDefaultInCJS && !(node.flags & 16777216 /* Ambient */) && compilerOptions.verbatimModuleSyntax && getTypeOnlyAliasDeclaration(sym, 111551 /* Value */)) {
                                error(id, node.isExportEquals ? Diagnostics.An_export_declaration_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolves_to_a_type_only_declaration : Diagnostics.An_export_default_must_reference_a_real_value_when_verbatimModuleSyntax_is_enabled_but_0_resolves_to_a_type_only_declaration, idText(id));
                            }
                        }
                        else if (!isIllegalExportDefaultInCJS && !(node.flags & 16777216 /* Ambient */) && compilerOptions.verbatimModuleSyntax) {
                            error(id, node.isExportEquals ? Diagnostics.An_export_declaration_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers_to_a_type : Diagnostics.An_export_default_must_reference_a_value_when_verbatimModuleSyntax_is_enabled_but_0_only_refers_to_a_type, idText(id));
                        }
                    }
                    else {
                        checkExpressionCached(id);
                    }
                    if (getEmitDeclarations(compilerOptions)) {
                        collectLinkedAliases(id, 
                        /*setVisibility*/
                        true);
                    }
                }
                else {
                    checkExpressionCached(node.expression);
                }
                if (isIllegalExportDefaultInCJS) {
                    error(node, Diagnostics.ESM_syntax_is_not_allowed_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                }
                checkExternalModuleExports(container);
                if (node.flags & 16777216 /* Ambient */ && !isEntityNameExpression(node.expression)) {
                    grammarErrorOnNode(node.expression, Diagnostics.The_expression_of_an_export_assignment_must_be_an_identifier_or_qualified_name_in_an_ambient_context);
                }
                if (node.isExportEquals) {
                    if (moduleKind >= 5 /* ES2015 */ && (node.flags & 16777216 /* Ambient */ && getSourceFileOfNode(node).impliedNodeFormat === 99 /* ESNext */ || !(node.flags & 16777216 /* Ambient */) && getSourceFileOfNode(node).impliedNodeFormat !== 1 /* CommonJS */)) {
                        grammarErrorOnNode(node, Diagnostics.Export_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_export_default_or_another_module_format_instead);
                    }
                    else if (moduleKind === 4 /* System */ && !(node.flags & 16777216 /* Ambient */)) {
                        grammarErrorOnNode(node, Diagnostics.Export_assignment_is_not_supported_when_module_flag_is_system);
                    }
                }
            }