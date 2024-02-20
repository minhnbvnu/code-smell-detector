function checkGrammarJsxExpression(node) {
                if (node.expression && isCommaSequence(node.expression)) {
                    return grammarErrorOnNode(node.expression, Diagnostics.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array);
                }
            }