function checkJsxExpression(node, checkMode) {
                checkGrammarJsxExpression(node);
                if (node.expression) {
                    const type = checkExpression(node.expression, checkMode);
                    if (node.dotDotDotToken && type !== anyType && !isArrayType(type)) {
                        error(node, Diagnostics.JSX_spread_child_must_be_an_array_type);
                    }
                    return type;
                }
                else {
                    return errorType;
                }
            }