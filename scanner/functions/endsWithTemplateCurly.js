function endsWithTemplateCurly(node) {
        if (node.type === "BinaryExpression") {
            return startsWithTemplateCurly(node.right);
        }
        if (node.type === "TemplateLiteral") {
            return node.expressions.length && node.quasis.length && node.quasis[node.quasis.length - 1].range[0] === node.quasis[node.quasis.length - 1].range[1];
        }
        return node.type !== "Literal" || typeof node.value !== "string";
    }