function skipSynthesizedParentheses(node) {
                while (node.kind === 214 /* ParenthesizedExpression */ && nodeIsSynthesized(node)) {
                    node = node.expression;
                }
                return node;
            }