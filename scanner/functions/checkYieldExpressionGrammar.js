function checkYieldExpressionGrammar() {
                    if (!(node.flags & 8192 /* YieldContext */)) {
                        grammarErrorOnFirstToken(node, Diagnostics.A_yield_expression_is_only_allowed_in_a_generator_body);
                    }
                    if (isInParameterInitializerBeforeContainingFunction(node)) {
                        error(node, Diagnostics.yield_expressions_cannot_be_used_in_a_parameter_initializer);
                    }
                }