function checkGrammarImportCallExpression(node) {
                if (compilerOptions.verbatimModuleSyntax && moduleKind === 1 /* CommonJS */) {
                    return grammarErrorOnNode(node, Diagnostics.ESM_syntax_is_not_allowed_in_a_CommonJS_module_when_verbatimModuleSyntax_is_enabled);
                }
                if (moduleKind === 5 /* ES2015 */) {
                    return grammarErrorOnNode(node, Diagnostics.Dynamic_imports_are_only_supported_when_the_module_flag_is_set_to_es2020_es2022_esnext_commonjs_amd_system_umd_node16_or_nodenext);
                }
                if (node.typeArguments) {
                    return grammarErrorOnNode(node, Diagnostics.This_use_of_import_is_invalid_import_calls_can_be_written_but_they_must_have_parentheses_and_cannot_have_type_arguments);
                }
                const nodeArguments = node.arguments;
                if (moduleKind !== 99 /* ESNext */ && moduleKind !== 199 /* NodeNext */ && moduleKind !== 100 /* Node16 */) {
                    checkGrammarForDisallowedTrailingComma(nodeArguments);
                    if (nodeArguments.length > 1) {
                        const assertionArgument = nodeArguments[1];
                        return grammarErrorOnNode(assertionArgument, Diagnostics.Dynamic_imports_only_support_a_second_argument_when_the_module_option_is_set_to_esnext_node16_or_nodenext);
                    }
                }
                if (nodeArguments.length === 0 || nodeArguments.length > 2) {
                    return grammarErrorOnNode(node, Diagnostics.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_assertion_as_arguments);
                }
                const spreadElement = find(nodeArguments, isSpreadElement);
                if (spreadElement) {
                    return grammarErrorOnNode(spreadElement, Diagnostics.Argument_of_dynamic_import_cannot_be_spread_element);
                }
                return false;
            }