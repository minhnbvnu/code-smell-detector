function checkAwaitExpressionGrammar(node) {
                const container = getContainingFunctionOrClassStaticBlock(node);
                if (container && isClassStaticBlockDeclaration(container)) {
                    error(node, Diagnostics.Await_expression_cannot_be_used_inside_a_class_static_block);
                }
                else if (!(node.flags & 32768 /* AwaitContext */)) {
                    if (isInTopLevelContext(node)) {
                        const sourceFile = getSourceFileOfNode(node);
                        if (!hasParseDiagnostics(sourceFile)) {
                            let span;
                            if (!isEffectiveExternalModule(sourceFile, compilerOptions)) {
                                span != null ? span : span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                                const diagnostic = createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module);
                                diagnostics.add(diagnostic);
                            }
                            switch (moduleKind) {
                                case 100 /* Node16 */:
                                case 199 /* NodeNext */:
                                    if (sourceFile.impliedNodeFormat === 1 /* CommonJS */) {
                                        span != null ? span : span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                                        diagnostics.add(createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level));
                                        break;
                                    }
                                case 7 /* ES2022 */:
                                case 99 /* ESNext */:
                                case 4 /* System */:
                                    if (languageVersion >= 4 /* ES2017 */) {
                                        break;
                                    }
                                default:
                                    span != null ? span : span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                                    diagnostics.add(createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.Top_level_await_expressions_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_or_nodenext_and_the_target_option_is_set_to_es2017_or_higher));
                                    break;
                            }
                        }
                    }
                    else {
                        const sourceFile = getSourceFileOfNode(node);
                        if (!hasParseDiagnostics(sourceFile)) {
                            const span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                            const diagnostic = createFileDiagnostic(sourceFile, span.start, span.length, Diagnostics.await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules);
                            if (container && container.kind !== 173 /* Constructor */ && (getFunctionFlags(container) & 2 /* Async */) === 0) {
                                const relatedInfo = createDiagnosticForNode(container, Diagnostics.Did_you_mean_to_mark_this_function_as_async);
                                addRelatedInfo(diagnostic, relatedInfo);
                            }
                            diagnostics.add(diagnostic);
                        }
                    }
                }
                if (isInParameterInitializerBeforeContainingFunction(node)) {
                    error(node, Diagnostics.await_expressions_cannot_be_used_in_a_parameter_initializer);
                }
            }