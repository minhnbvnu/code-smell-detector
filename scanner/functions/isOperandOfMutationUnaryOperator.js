function isOperandOfMutationUnaryOperator(node) {
        const argumentNode = node.parent.type === "ChainExpression"
            ? node.parent
            : node;
        const { parent } = argumentNode;
        return ((parent.type === "UpdateExpression" &&
            parent.argument === argumentNode) ||
            (parent.type === "UnaryExpression" &&
                parent.operator === "delete" &&
                parent.argument === argumentNode));
    }