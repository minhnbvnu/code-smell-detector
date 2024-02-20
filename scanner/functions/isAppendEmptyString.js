function isAppendEmptyString(node) {
        return node.operator === "+=" && isEmptyString(node.right);
    }