function checkAndAggregateReturnExpressionTypes(func, checkMode) {
                const functionFlags = getFunctionFlags(func);
                const aggregatedTypes = [];
                let hasReturnWithNoExpression = functionHasImplicitReturn(func);
                let hasReturnOfTypeNever = false;
                forEachReturnStatement(func.body, (returnStatement) => {
                    const expr = returnStatement.expression;
                    if (expr) {
                        let type = checkExpressionCached(expr, checkMode && checkMode & ~8 /* SkipGenericFunctions */);
                        if (functionFlags & 2 /* Async */) {
                            type = unwrapAwaitedType(checkAwaitedType(type, 
                            /*withAlias*/
                            false, func, Diagnostics.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member));
                        }
                        if (type.flags & 131072 /* Never */) {
                            hasReturnOfTypeNever = true;
                        }
                        pushIfUnique(aggregatedTypes, type);
                    }
                    else {
                        hasReturnWithNoExpression = true;
                    }
                });
                if (aggregatedTypes.length === 0 && !hasReturnWithNoExpression && (hasReturnOfTypeNever || mayReturnNever(func))) {
                    return void 0;
                }
                if (strictNullChecks && aggregatedTypes.length && hasReturnWithNoExpression && !(isJSConstructor(func) && aggregatedTypes.some((t) => t.symbol === func.symbol))) {
                    pushIfUnique(aggregatedTypes, undefinedType);
                }
                return aggregatedTypes;
            }