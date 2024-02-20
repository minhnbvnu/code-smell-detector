function climbPastPropertyOrElementAccess(node) {
            return isRightSideOfPropertyAccess(node) || isArgumentExpressionOfElementAccess(node) ? node.parent : node;
        }