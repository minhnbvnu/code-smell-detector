function createPromiseReturnType(func, promisedType) {
                const promiseType = createPromiseType(promisedType);
                if (promiseType === unknownType) {
                    error(func, isImportCall(func) ? Diagnostics.A_dynamic_import_call_returns_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option : Diagnostics.An_async_function_or_method_must_return_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option);
                    return errorType;
                }
                else if (!getGlobalPromiseConstructorSymbol(
                /*reportErrors*/
                true)) {
                    error(func, isImportCall(func) ? Diagnostics.A_dynamic_import_call_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option : Diagnostics.An_async_function_or_method_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option);
                }
                return promiseType;
            }