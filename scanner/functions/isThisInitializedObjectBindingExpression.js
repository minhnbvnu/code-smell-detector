function isThisInitializedObjectBindingExpression(node) {
            return !!node && (isShorthandPropertyAssignment(node) || isPropertyAssignment(node)) && isBinaryExpression(node.parent.parent) && node.parent.parent.operatorToken.kind === 63 /* EqualsToken */ && node.parent.parent.right.kind === 108 /* ThisKeyword */;
        }