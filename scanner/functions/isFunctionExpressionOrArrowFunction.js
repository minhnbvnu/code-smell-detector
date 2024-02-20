function isFunctionExpressionOrArrowFunction(node) {
            return node.kind === 215 /* FunctionExpression */ || node.kind === 216 /* ArrowFunction */;
        }