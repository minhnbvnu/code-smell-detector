function getYieldedTypeOfYieldExpression(node, expressionType, sentType, isAsync) {
                const errorNode = node.expression || node;
                const yieldedType = node.asteriskToken ? checkIteratedTypeOrElementType(isAsync ? 19 /* AsyncYieldStar */ : 17 /* YieldStar */, expressionType, sentType, errorNode) : expressionType;
                return !isAsync ? yieldedType : getAwaitedType(yieldedType, errorNode, node.asteriskToken ? Diagnostics.Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member : Diagnostics.Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member);
            }