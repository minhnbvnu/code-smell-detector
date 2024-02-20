function getCannotFindNameDiagnosticForName(node) {
                switch (node.escapedText) {
                    case "document":
                    case "console":
                        return Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom;
                    case "$":
                        return compilerOptions.types ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery;
                    case "describe":
                    case "suite":
                    case "it":
                    case "test":
                        return compilerOptions.types ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha;
                    case "process":
                    case "require":
                    case "Buffer":
                    case "module":
                        return compilerOptions.types ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode;
                    case "Map":
                    case "Set":
                    case "Promise":
                    case "Symbol":
                    case "WeakMap":
                    case "WeakSet":
                    case "Iterator":
                    case "AsyncIterator":
                    case "SharedArrayBuffer":
                    case "Atomics":
                    case "AsyncIterable":
                    case "AsyncIterableIterator":
                    case "AsyncGenerator":
                    case "AsyncGeneratorFunction":
                    case "BigInt":
                    case "Reflect":
                    case "BigInt64Array":
                    case "BigUint64Array":
                        return Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later;
                    case "await":
                        if (isCallExpression(node.parent)) {
                            return Diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function;
                        }
                    default:
                        if (node.parent.kind === 300 /* ShorthandPropertyAssignment */) {
                            return Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer;
                        }
                        else {
                            return Diagnostics.Cannot_find_name_0;
                        }
                }
            }