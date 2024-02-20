function checkAsyncFunctionReturnType(node, returnTypeNode) {
                const returnType = getTypeFromTypeNode(returnTypeNode);
                if (languageVersion >= 2 /* ES2015 */) {
                    if (isErrorType(returnType)) {
                        return;
                    }
                    const globalPromiseType = getGlobalPromiseType(
                    /*reportErrors*/
                    true);
                    if (globalPromiseType !== emptyGenericType && !isReferenceToType2(returnType, globalPromiseType)) {
                        error(returnTypeNode, Diagnostics.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_Did_you_mean_to_write_Promise_0, typeToString(getAwaitedTypeNoAlias(returnType) || voidType));
                        return;
                    }
                }
                else {
                    markTypeNodeAsReferenced(returnTypeNode);
                    if (isErrorType(returnType)) {
                        return;
                    }
                    const promiseConstructorName = getEntityNameFromTypeNode(returnTypeNode);
                    if (promiseConstructorName === void 0) {
                        error(returnTypeNode, Diagnostics.Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Promise_compatible_constructor_value, typeToString(returnType));
                        return;
                    }
                    const promiseConstructorSymbol = resolveEntityName(promiseConstructorName, 111551 /* Value */, 
                    /*ignoreErrors*/
                    true);
                    const promiseConstructorType = promiseConstructorSymbol ? getTypeOfSymbol(promiseConstructorSymbol) : errorType;
                    if (isErrorType(promiseConstructorType)) {
                        if (promiseConstructorName.kind === 79 /* Identifier */ && promiseConstructorName.escapedText === "Promise" && getTargetType(returnType) === getGlobalPromiseType(
                        /*reportErrors*/
                        false)) {
                            error(returnTypeNode, Diagnostics.An_async_function_or_method_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option);
                        }
                        else {
                            error(returnTypeNode, Diagnostics.Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Promise_compatible_constructor_value, entityNameToString(promiseConstructorName));
                        }
                        return;
                    }
                    const globalPromiseConstructorLikeType = getGlobalPromiseConstructorLikeType(
                    /*reportErrors*/
                    true);
                    if (globalPromiseConstructorLikeType === emptyObjectType) {
                        error(returnTypeNode, Diagnostics.Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Promise_compatible_constructor_value, entityNameToString(promiseConstructorName));
                        return;
                    }
                    if (!checkTypeAssignableTo(promiseConstructorType, globalPromiseConstructorLikeType, returnTypeNode, Diagnostics.Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Promise_compatible_constructor_value)) {
                        return;
                    }
                    const rootName = promiseConstructorName && getFirstIdentifier(promiseConstructorName);
                    const collidingSymbol = getSymbol2(node.locals, rootName.escapedText, 111551 /* Value */);
                    if (collidingSymbol) {
                        error(collidingSymbol.valueDeclaration, Diagnostics.Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions, idText(rootName), entityNameToString(promiseConstructorName));
                        return;
                    }
                }
                checkAwaitedType(returnType, 
                /*withAlias*/
                false, node, Diagnostics.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member);
            }