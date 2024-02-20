function isRequireCallArgument(node) {
            return isCallExpression(node.parent) && firstOrUndefined(node.parent.arguments) === node && isIdentifier(node.parent.expression) && node.parent.expression.escapedText === "require";
        }