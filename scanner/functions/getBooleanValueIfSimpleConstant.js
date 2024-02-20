function getBooleanValueIfSimpleConstant(node) {
        if (node.type === "Literal") {
            return Boolean(node.value);
        }
        return void 0;
    }