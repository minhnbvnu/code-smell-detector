function checkFunctionExpressionReturnType(node, options, sourceCode, report) {
        if (isValidFunctionExpressionReturnType(node, options)) {
            return;
        }
        checkFunctionReturnType(node, options, sourceCode, report);
    }