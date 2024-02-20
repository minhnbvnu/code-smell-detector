function isConcatWithEmptyString(node) {
        return node.operator === "+" && ((isEmptyString(node.left) && !isStringType(node.right)) ||
            (isEmptyString(node.right) && !isStringType(node.left)));
    }