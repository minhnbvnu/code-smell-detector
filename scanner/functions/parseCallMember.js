function parseCallMember(object) {
        return {
            type: Syntax.CallExpression,
            callee: object,
            'arguments': parseArguments()
        };
    }