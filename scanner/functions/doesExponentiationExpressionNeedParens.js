function doesExponentiationExpressionNeedParens(node, sourceCode) {
        const parent = node.parent.type === "ChainExpression" ? node.parent.parent : node.parent;
        const needsParens = (parent.type === "ClassDeclaration" ||
            (parent.type.endsWith("Expression") &&
                astUtils.getPrecedence(parent) >= PRECEDENCE_OF_EXPONENTIATION_EXPR &&
                !(parent.type === "BinaryExpression" && parent.operator === "**" && parent.right === node) &&
                !((parent.type === "CallExpression" || parent.type === "NewExpression") && parent.arguments.includes(node)) &&
                !(parent.type === "MemberExpression" && parent.computed && parent.property === node) &&
                !(parent.type === "ArrayExpression")));
        return needsParens && !astUtils.isParenthesised(sourceCode, node);
    }