function hasNavigationBarName(node) {
            return !hasDynamicName(node) || node.kind !== 223 /* BinaryExpression */ && isPropertyAccessExpression(node.name.expression) && isIdentifier(node.name.expression.expression) && idText(node.name.expression.expression) === "Symbol";
        }