function checkGrammarComputedPropertyName(node) {
                if (node.kind !== 164 /* ComputedPropertyName */) {
                    return false;
                }
                const computedPropertyName = node;
                if (computedPropertyName.expression.kind === 223 /* BinaryExpression */ && computedPropertyName.expression.operatorToken.kind === 27 /* CommaToken */) {
                    return grammarErrorOnNode(computedPropertyName.expression, Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name);
                }
                return false;
            }