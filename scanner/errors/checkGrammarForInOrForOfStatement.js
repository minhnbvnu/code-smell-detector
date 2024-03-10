function checkGrammarForInOrForOfStatement(forInOrOfStatement) {
                if (checkGrammarStatementInAmbientContext(forInOrOfStatement)) {
                    return true;
                }
                if (forInOrOfStatement.kind === 247 /* ForOfStatement */ && forInOrOfStatement.awaitModifier) {
                    if (!(forInOrOfStatement.flags & 32768 /* AwaitContext */)) {
                        const sourceFile = getSourceFileOfNode(forInOrOfStatement);
                        if (isInTopLevelContext(forInOrOfStatement)) {
                            if (!hasParseDiagnostics(sourceFile)) {
                                if (!isEffectiveExternalModule(sourceFile, compilerOptions)) {
                                    diagnostics.add(createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.for_await_loops_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module));
                                }
                                switch (moduleKind) {
                                    case 100 /* Node16 */:
                                    case 199 /* NodeNext */:
                                        if (sourceFile.impliedNodeFormat === 1 /* CommonJS */) {
                                            diagnostics.add(createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.The_current_file_is_a_CommonJS_module_and_cannot_use_await_at_the_top_level));
                                            break;
                                        }
                                    case 7 /* ES2022 */:
                                    case 99 /* ESNext */:
                                    case 4 /* System */:
                                        if (languageVersion >= 4 /* ES2017 */) {
                                            break;
                                        }
                                    default:
                                        diagnostics.add(createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.Top_level_for_await_loops_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_or_nodenext_and_the_target_option_is_set_to_es2017_or_higher));
                                        break;
                                }
                            }
                        }
                        else {
                            if (!hasParseDiagnostics(sourceFile)) {
                                const diagnostic = createDiagnosticForNode(forInOrOfStatement.awaitModifier, Diagnostics.for_await_loops_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules);
                                const func = getContainingFunction(forInOrOfStatement);
                                if (func && func.kind !== 173 /* Constructor */) {
                                    Debug.assert((getFunctionFlags(func) & 2 /* Async */) === 0, "Enclosing function should never be an async function.");
                                    const relatedInfo = createDiagnosticForNode(func, Diagnostics.Did_you_mean_to_mark_this_function_as_async);
                                    addRelatedInfo(diagnostic, relatedInfo);
                                }
                                diagnostics.add(diagnostic);
                                return true;
                            }
                        }
                        return false;
                    }
                }
                if (isForOfStatement(forInOrOfStatement) && !(forInOrOfStatement.flags & 32768 /* AwaitContext */) && isIdentifier(forInOrOfStatement.initializer) && forInOrOfStatement.initializer.escapedText === "async") {
                    grammarErrorOnNode(forInOrOfStatement.initializer, Diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async);
                    return false;
                }
                if (forInOrOfStatement.initializer.kind === 258 /* VariableDeclarationList */) {
                    const variableList = forInOrOfStatement.initializer;
                    if (!checkGrammarVariableDeclarationList(variableList)) {
                        const declarations = variableList.declarations;
                        if (!declarations.length) {
                            return false;
                        }
                        if (declarations.length > 1) {
                            const diagnostic = forInOrOfStatement.kind === 246 /* ForInStatement */ ? Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement : Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement;
                            return grammarErrorOnFirstToken(variableList.declarations[1], diagnostic);
                        }
                        const firstDeclaration = declarations[0];
                        if (firstDeclaration.initializer) {
                            const diagnostic = forInOrOfStatement.kind === 246 /* ForInStatement */ ? Diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer : Diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer;
                            return grammarErrorOnNode(firstDeclaration.name, diagnostic);
                        }
                        if (firstDeclaration.type) {
                            const diagnostic = forInOrOfStatement.kind === 246 /* ForInStatement */ ? Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation : Diagnostics.The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation;
                            return grammarErrorOnNode(firstDeclaration, diagnostic);
                        }
                    }
                }
                return false;
            }