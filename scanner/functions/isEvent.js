function isEvent(expr, eventDeclarations) {
        for (let { node, enclosingContract } of eventDeclarations) {
            if (expr.callee.name === node.name && sourceCode.isAChildOf(expr, enclosingContract)) {
                return true;
            }
        }
        return false;
    }