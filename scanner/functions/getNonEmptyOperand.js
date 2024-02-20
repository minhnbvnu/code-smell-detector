function getNonEmptyOperand(node) {
        return isEmptyString(node.left) ? node.right : node.left;
    }