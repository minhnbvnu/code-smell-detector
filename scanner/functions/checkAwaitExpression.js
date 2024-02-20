function checkAwaitExpression(node) {
                addLazyDiagnostic(() => checkAwaitExpressionGrammar(node));
                const operandType = checkExpression(node.expression);
                const awaitedType = checkAwaitedType(operandType, 
                /*withAlias*/
                true, node, Diagnostics.Type_of_await_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member);
                if (awaitedType === operandType && !isErrorType(awaitedType) && !(operandType.flags & 3 /* AnyOrUnknown */)) {
                    addErrorOrSuggestion(
                    /*isError*/
                    false, createDiagnosticForNode(node, Diagnostics.await_has_no_effect_on_the_type_of_this_expression));
                }
                return awaitedType;
            }