function startsWithTemplateCurly(node) {
        if (node.type === "BinaryExpression") {
            return startsWithTemplateCurly(node.left);
        }
        if (node.type === "TemplateLiteral") {
            return node.expressions.length && node.quasis.length && node.quasis[0].range[0] === node.quasis[0].range[1];
        }
        return node.type !== "Literal" || typeof node.value !== "string";
    }