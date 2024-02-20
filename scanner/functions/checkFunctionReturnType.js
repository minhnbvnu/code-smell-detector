function checkFunctionReturnType(node, options, sourceCode, report) {
        if (isValidFunctionReturnType(node, options)) {
            return;
        }
        report((0, getFunctionHeadLoc_1.getFunctionHeadLoc)(node, sourceCode));
    }