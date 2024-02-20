function couldBeError(node) {
    switch (node.type) {
        case "Identifier":
        case "CallExpression":
        case "NewExpression":
        case "MemberExpression":
        case "TaggedTemplateExpression":
        case "YieldExpression":
            return true // possibly an error object.

        case "AssignmentExpression":
            return couldBeError(node.right)

        case "SequenceExpression": {
            const exprs = node.expressions
            return exprs.length !== 0 && couldBeError(exprs[exprs.length - 1])
        }

        case "LogicalExpression":
            return couldBeError(node.left) || couldBeError(node.right)

        case "ConditionalExpression":
            return couldBeError(node.consequent) || couldBeError(node.alternate)

        default:
            return node.value === null
    }
}