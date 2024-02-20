function getParentSyntaxParen(node, sourceCode) {
        const parent = node.parent;
        switch (parent.type) {
            case "CallExpression":
            case "NewExpression":
                if (parent.arguments.length === 1 && parent.arguments[0] === node) {
                    return sourceCode.getTokenAfter(parent.callee, isOpeningParenToken);
                }
                return null;
            case "DoWhileStatement":
                if (parent.test === node) {
                    return sourceCode.getTokenAfter(parent.body, isOpeningParenToken);
                }
                return null;
            case "IfStatement":
            case "WhileStatement":
                if (parent.test === node) {
                    return sourceCode.getFirstToken(parent, 1);
                }
                return null;
            case "ImportExpression":
                if (parent.source === node) {
                    return sourceCode.getFirstToken(parent, 1);
                }
                return null;
            case "SwitchStatement":
                if (parent.discriminant === node) {
                    return sourceCode.getFirstToken(parent, 1);
                }
                return null;
            case "WithStatement":
                if (parent.object === node) {
                    return sourceCode.getFirstToken(parent, 1);
                }
                return null;
            default:
                return null;
        }
    }