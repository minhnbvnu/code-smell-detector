function isMultiplyByOne(node) {
        return node.operator === "*" && (node.left.type === "Literal" && node.left.value === 1 ||
            node.right.type === "Literal" && node.right.value === 1);
    }