function checkAllCodePathsInNonVoidFunctionReturnOrThrowDiagnostics() {
                    const functionFlags = getFunctionFlags(func);
                    const type = returnType && unwrapReturnType(returnType, functionFlags);
                    if (type && maybeTypeOfKind(type, 1 /* Any */ | 16384 /* Void */)) {
                        return;
                    }
                    if (func.kind === 170 /* MethodSignature */ || nodeIsMissing(func.body) || func.body.kind !== 238 /* Block */ || !functionHasImplicitReturn(func)) {
                        return;
                    }
                    const hasExplicitReturn = func.flags & 512 /* HasExplicitReturn */;
                    const errorNode = getEffectiveReturnTypeNode(func) || func;
                    if (type && type.flags & 131072 /* Never */) {
                        error(errorNode, Diagnostics.A_function_returning_never_cannot_have_a_reachable_end_point);
                    }
                    else if (type && !hasExplicitReturn) {
                        error(errorNode, Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value);
                    }
                    else if (type && strictNullChecks && !isTypeAssignableTo(undefinedType, type)) {
                        error(errorNode, Diagnostics.Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined);
                    }
                    else if (compilerOptions.noImplicitReturns) {
                        if (!type) {
                            if (!hasExplicitReturn) {
                                return;
                            }
                            const inferredReturnType = getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                            if (isUnwrappedReturnTypeVoidOrAny(func, inferredReturnType)) {
                                return;
                            }
                        }
                        error(errorNode, Diagnostics.Not_all_code_paths_return_a_value);
                    }
                }